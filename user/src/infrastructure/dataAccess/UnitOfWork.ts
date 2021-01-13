import { Injectable, Scope } from '@nestjs/common';
import { IUnitOfWork } from 'src/domain/interfaces/IUnitOfWork';
import { Connection, EntityManager, QueryRunner } from 'typeorm';

@Injectable({ scope: Scope.REQUEST })
export class UnitOfWork implements IUnitOfWork {
  private readonly _queryRunner: QueryRunner;
  private _transactionManager: EntityManager;
  constructor(private readonly _connection: Connection) {
    this._queryRunner = _connection.createQueryRunner();
  }

  async startTransaction() {
    await this._queryRunner.startTransaction();
    this._transactionManager = this._queryRunner.manager;
  }

  getRepository<T>(R: new (transaction: EntityManager) => T): T {
    if (!this._transactionManager) {
      throw new Error('Unit of work is not started');
    }
    return new R(this._transactionManager);
  }

  async complete<T>(work: () => Promise<T>): Promise<T> {
    try {
      const res = await work();
      await this._queryRunner.commitTransaction();
      return res;
    } catch (error) {
      await this._queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await this._queryRunner.release();
    }
  }
}
