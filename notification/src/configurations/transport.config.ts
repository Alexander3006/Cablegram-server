import { readFileSync } from 'fs';
import { join } from 'path';

export interface TransportConfig {
  host: string;
  port: number;
}
export interface SSL {
  key: Buffer;
  cert: Buffer;
}

export const ssl = (() => {
  const ssl = {
    key: readFileSync(join(__dirname, '../../cert/ssl.key')),
    cert: readFileSync(join(__dirname, '../../cert/ssl.pem')),
  };
  return (): SSL => ssl;
})();

export default () => {
  const wss_port = process.env.WEBSOCKET_GATEWAY_PORT;
  return {
    wss: {
      port: wss_port,
      host: '192.168.0.105',
    },
  };
};
