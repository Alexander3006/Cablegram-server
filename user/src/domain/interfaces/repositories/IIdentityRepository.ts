import { Identity } from '../../model/identity/Identity.aggregate';
import { IdentityEmail } from '../../model/identity/IdentityEmail.value';
import { IdentityHash } from '../../model/identity/IdentityHash.value';
import { IdentityId } from '../../model/identity/IdentityId.value';
import { IdentitySalt } from '../../model/identity/IdentitySalt.value';
import { UserId } from '../../model/user/UserId.value';

export interface IIdentityRepository {
  create(
    identityEmail: IdentityEmail,
    identityHash: IdentityHash,
    identitySalt: IdentitySalt,
    userId: UserId,
  ): Promise<Identity>;
  delete(identity: IdentityId): Promise<void>;
  update(identity: Identity): Promise<Identity>;
  get(options: IdentityEmail): Promise<Identity>;
}
