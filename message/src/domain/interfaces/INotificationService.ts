export interface INotificationService {
  notifyUsers<D>(users: string[], event: string, data: D): Promise<void>;
  notifyRoom<D>(room: number, event: string, data: D): Promise<void>;
}
