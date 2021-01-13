import { randomBytes } from 'crypto';

export class IdentitySalt {
  public salt: string;

  private constructor(salt: string) {
    this.salt = salt;
  }

  public static create(salt?: string): IdentitySalt {
    if (!salt) throw new Error('Salt do not exist');
    return new IdentitySalt(salt);
  }

  public static generate(): IdentitySalt {
    const salt: string = randomBytes(8).toString('hex');
    return new IdentitySalt(salt);
  }
}
