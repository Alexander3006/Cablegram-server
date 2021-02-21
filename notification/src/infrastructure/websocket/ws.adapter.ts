import {
  createParamDecorator,
  INestApplication,
  Logger,
  WebSocketAdapter,
} from '@nestjs/common';
import { WsAdapter } from '@nestjs/platform-ws';
import WebSocket, { Server, ServerOptions } from 'ws';
import * as url from 'url';
import { createServer } from 'http';
import { TransportConfig } from 'src/configurations/transport.config';
import { AuthService } from '../authService/auth.service';
import { WsException } from '@nestjs/websockets';
import { ExecutionContext, WsArgumentsHost } from '@nestjs/common/interfaces';
import { UserDto } from 'src/domain/interfaces/authService';
import { ConnectionsState } from 'src/application/connections/connectionsState.service';

const AUTH_SOCKET_KEY = 'CLIENT_AUTH';

export const SocketClient = createParamDecorator(
  (_, ctx: ExecutionContext): UserDto => {
    const wsArgumentsHost: WsArgumentsHost = ctx.switchToWs();
    const socket = wsArgumentsHost.getClient();
    const client = socket[AUTH_SOCKET_KEY];
    return client;
  },
);

export const InitCustomWebSocketAdapter = (
  app: INestApplication,
  config: TransportConfig,
): INestApplication => {
  const authService = app.get(AuthService);
  const connectionsState = app.get(ConnectionsState);
  app.useWebSocketAdapter(
    new CustomWebSocketAdapter(app, connectionsState, authService, config),
  );
  return app;
};

export class CustomWebSocketAdapter extends WsAdapter
  implements WebSocketAdapter {
  private readonly _logger: Logger;
  constructor(
    _app: INestApplication,
    private readonly _connectionState: ConnectionsState,
    private readonly _authService: AuthService,
    private readonly _config: TransportConfig,
  ) {
    super(_app);
    this._logger = new Logger(CustomWebSocketAdapter.name);
  }

  public create(): Server {
    const { port, host } = this._config;
    const server = createServer(/*{ ...ssl() }*/).listen(port, host, () => {
      this._logger.log(`The server ws://${host}:${port} has been started`);
    });
    const wss = new Server({
      server: server,
    } as ServerOptions);
    return wss;
  }

  public bindClientConnect(
    server: Server,
    callback: (socket: WebSocket) => void,
  ): void {
    server.on('connection', async (socket: WebSocket, req) => {
      try {
        const { token } = url.parse(req.url, true).query;
        if (!token) throw new WsException(`No authentication token`);
        const client = await this._authService.validate(token as string);
        if (!client) throw new WsException(`Invalid token`);
        await this._connectionState.subscribe(client, socket);
        socket[AUTH_SOCKET_KEY] = client;
        socket.on('close', () => {
          this._connectionState.unsubscribe(socket);
        });
        callback(socket);
      } catch (err) {
        this._logger.error(err);
        this._connectionState.unsubscribe(socket);
        return;
      }
    });
  }
}
