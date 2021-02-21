export enum RoomGrantRolesEnum {
  USER,
  SUPERUSER,
  AUTHOR,
}

export class RoomGrantRole {
  public role: RoomGrantRolesEnum;

  private constructor(role: RoomGrantRolesEnum) {
    this.role = role;
  }

  public static create(role: RoomGrantRolesEnum): RoomGrantRole {
    if (role === undefined) throw new Error('Rooms role do not exist');
    return new RoomGrantRole(role);
  }

  public compareImpact(roomGrantRole: RoomGrantRole): boolean {
    return this.role > roomGrantRole.role;
  }

  public equalsImpact(roomGrantRole: RoomGrantRole): boolean {
    return this.role === roomGrantRole.role;
  }

  public canUpdate(update: RoomGrantRole, delegatRole: RoomGrantRole): boolean {
    const can = this.compareImpact(update) && this.compareImpact(delegatRole);
    return can;
  }

  public canDelete(delegatRole: RoomGrantRole): boolean {
    const can = this.compareImpact(delegatRole);
    return can;
  }
}
