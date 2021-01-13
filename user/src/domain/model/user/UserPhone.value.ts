export class UserPhone {
  public phone: string;

  private constructor(phone: string) {
    this.phone = phone;
  }

  public static create(phone: string): UserPhone {
    if (!phone) throw new Error('Phone do not exist');
    if (phone.length < 9) throw Error('Phone is too short');
    return new UserPhone(phone);
  }
}
