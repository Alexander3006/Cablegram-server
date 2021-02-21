export class PermissionsRequestDto {
  constructor(public author: string, public room: number) {}
}

export interface IPermissionsService {
  canMessageSend(request: PermissionsRequestDto): Promise<boolean>;
}
