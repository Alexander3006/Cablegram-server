import { MigrationInterface, QueryRunner } from 'typeorm';

export class message1612379400075 implements MigrationInterface {
  name = 'message1612379400075';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "Messages" ("id" SERIAL NOT NULL, CONSTRAINT "PK_ecc722506c4b974388431745e8b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "Contents_type_enum" AS ENUM('text', 'img', 'sound', 'video')`,
    );
    await queryRunner.query(
      `CREATE TABLE "Contents" ("id" SERIAL NOT NULL, "type" "Contents_type_enum" NOT NULL, "body" text NOT NULL, "messageId" integer, CONSTRAINT "PK_d427815af9a8dbf5ca9c56fee62" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "Contents" ADD CONSTRAINT "FK_eedb452f51348d605c9da08b1e8" FOREIGN KEY ("messageId") REFERENCES "Messages"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "Contents" DROP CONSTRAINT "FK_eedb452f51348d605c9da08b1e8"`,
    );
    await queryRunner.query(`DROP TABLE "Contents"`);
    await queryRunner.query(`DROP TYPE "Contents_type_enum"`);
    await queryRunner.query(`DROP TABLE "Messages"`);
  }
}
