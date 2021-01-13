import { readFileSync } from 'fs';
import * as path from 'path';

export interface TransportConfig {
  port: number;
}
export interface SSL {
  key: Buffer;
  cert: Buffer;
}

export const ssl = (() => {
  const ssl = {
    key: readFileSync(path.join(__dirname, '../../cert/ssl.key')),
    cert: readFileSync(path.join(__dirname, '../../cert/ssl.pem')),
  };
  return (): SSL => ssl;
})();

export default () => {
  return {
    https: {
      port: process.env.API_GATEWAY_PORT,
    },
  };
};
