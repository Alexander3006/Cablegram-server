export abstract class Aggregate<T> {
  public id: T;
  constructor(id: T) {
    this.id = id;
  }
}
