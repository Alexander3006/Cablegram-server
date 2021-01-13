export class AuthDto {
  email: string;
  password: string;
}

export class AccessPayloadDto {
  id: string;
  tag: string;
  phone: string;
  constructor(id: string, tag: string, phone: string) {
    this.id = id;
    this.tag = tag;
    this.phone = phone;
  }
}

export class RefreshPayloadDto {
  id: string;
  constructor(id: string) {
    this.id = id;
  }
}

export class JwtTokens {
  access: string;
  refresh: string;
}
