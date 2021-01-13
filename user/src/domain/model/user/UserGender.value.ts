export enum UserGenderEnum {
  MALE = 'male',
  FEMALE = 'female',
}

export class UserGender {
  public gender: UserGenderEnum;

  private constructor(gender: UserGenderEnum) {
    this.gender = gender;
  }

  public static create(gender: UserGenderEnum): UserGender {
    if (!gender) throw new Error('Gender do not exist');
    return new UserGender(gender);
  }
}
