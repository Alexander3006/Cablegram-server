export class UserName {
  public name: string;

  private constructor(name: string) {
    this.name = name;
  }

  public static create(name: string): UserName {
    if (!name) throw new Error('Users name do not exist');
    if (!name.length) throw new Error('Users name is too short');
    return new UserName(name);
  }
}
