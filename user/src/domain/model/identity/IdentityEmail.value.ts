export class IdentityEmail {
  public email: string;

  private constructor(email: string) {
    this.email = email;
  }

  public static validate(email: string): boolean {
    if (!email?.length) return false;
    return true;
  }

  public static create(email: string): IdentityEmail {
    if (!this.validate(email)) throw new Error('Email is not valid');
    return new IdentityEmail(email);
  }
}
