export class UserSurname {
  public surname: string;

  private constructor(surname: string) {
    this.surname = surname;
  }

  public static create(surname: string): UserSurname {
    if (!surname) throw new Error('Surname do not exist');
    if (!surname.length) throw new Error('Surname is too short');
    return new UserSurname(surname);
  }
}
