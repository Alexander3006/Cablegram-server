import { Aggregate } from '../Aggregate';
import { UserId } from '../user/UserId.value';
import { IdentityEmail } from './IdentityEmail.value';
import { IdentityHash } from './IdentityHash.value';
import { IdentityId } from './IdentityId.value';
import { IdentitySalt } from './IdentitySalt.value';

export class Identity extends Aggregate<IdentityId> {
  public userId: UserId;
  public identityEmail: IdentityEmail;
  public identityHash: IdentityHash;
  public identitySalt: IdentitySalt;
  private constructor(
    id: IdentityId,
    user: UserId,
    email: IdentityEmail,
    hash: IdentityHash,
    salt: IdentitySalt,
  ) {
    super(id);
    this.userId = user;
    this.identityEmail = email;
    this.identityHash = hash;
    this.identitySalt = salt;
  }

  public static from(
    id: IdentityId,
    user: UserId,
    email: IdentityEmail,
    hash: IdentityHash,
    salt: IdentitySalt,
  ): Identity {
    return new Identity(id, user, email, hash, salt);
  }

  public static create(
    id: number,
    userId: string,
    email: string,
    hash: string,
    salt: string,
  ): Identity {
    return this.from(
      IdentityId.create(id),
      UserId.create(userId),
      IdentityEmail.create(email),
      IdentityHash.create(hash),
      IdentitySalt.create(salt),
    );
  }
}
