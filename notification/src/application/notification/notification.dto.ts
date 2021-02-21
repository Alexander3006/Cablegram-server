export class UserNotificationDto {
  constructor(public event: string, public users: string[], public data: any) {}
}

export class RoomNotificationDto {
  constructor(public event: string, public room: number, public data: any) {}
}
