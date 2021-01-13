export interface IUnitOfWork {
  startTransaction(): void;
  complete<T>(work: () => Promise<T>): Promise<T>;
  getRepository<T>(constructor: new () => T): T;
}
