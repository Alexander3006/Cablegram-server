import { Module, Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UsersModule } from 'src/infrastructure/usersService/users.module';
import { UsersService } from 'src/infrastructure/usersService/users.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JsonWebTokenService, JwtOptions } from './jsonWebToken.service';

const JsonWebTokenServiceProvider: Provider = {
  provide: JsonWebTokenService,
  useFactory: <P extends object, T extends object>(_config: ConfigService) => {
    const jwtOptions: JwtOptions = _config.get<JwtOptions>('jwt');
    return new JsonWebTokenService<P, T>(jwtOptions);
  },
  inject: [ConfigService],
};

const AuthServiceProvider: Provider = {
  provide: AuthService,
  useClass: AuthService,
};

@Module({
  imports: [UsersModule],
  providers: [UsersService, JsonWebTokenServiceProvider, AuthServiceProvider],
  controllers: [AuthController],
  exports: [JsonWebTokenServiceProvider, AuthServiceProvider],
})
export class AuthModule {}
