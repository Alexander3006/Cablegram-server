import { MigrationInterface, QueryRunner } from 'typeorm';

export class message21612379809502 implements MigrationInterface {
  name = 'message21612379809502';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "Messages" ADD "author" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "Messages" ADD "room" integer NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "Messages" DROP COLUMN "room"`);
    await queryRunner.query(`ALTER TABLE "Messages" DROP COLUMN "author"`);
  }
}
