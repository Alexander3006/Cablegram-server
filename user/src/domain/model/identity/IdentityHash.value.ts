import { createHash } from 'crypto';
import { IdentitySalt } from './IdentitySalt.value';

export class IdentityHash {
  public hash: string;

  private constructor(hash: string) {
    this.hash = hash;
  }

  public static create(hash: string): IdentityHash {
    if (!hash && !hash.length) {
      throw new Error('Hash is not valid');
    }
    return new IdentityHash(hash);
  }

  public static validate(password: string): boolean {
    if (password?.length <= 6) return false;
    return true;
  }

  public static generate(password: string, salt: IdentitySalt): IdentityHash {
    if (!this.validate(password)) throw new Error('Pasword is not valid');
    const hash = createHash('sha256')
      .update(password + salt)
      .digest('hex');
    return new IdentityHash(hash);
  }

  public equals(identityHash: IdentityHash): boolean {
    return this.hash === identityHash.hash;
  }
}
