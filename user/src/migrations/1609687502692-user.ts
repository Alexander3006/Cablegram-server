import { MigrationInterface, QueryRunner } from 'typeorm';

export class user1609687502692 implements MigrationInterface {
  name = 'user1609687502692';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "Users_gender_enum" AS ENUM('male', 'female')`,
    );
    await queryRunner.query(
      `CREATE TABLE "Users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "tag" character varying NOT NULL, "name" character varying(32) NOT NULL, "surname" character varying(32) NOT NULL, "phone" character varying(16) NOT NULL, "gender" "Users_gender_enum" NOT NULL, CONSTRAINT "PK_16d4f7d636df336db11d87413e3" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_36435a405311eee847a2dd93e3" ON "Users" ("tag") `,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_f0444b8b5c111257c300932ae0" ON "Users" ("phone") `,
    );
    await queryRunner.query(
      `CREATE TABLE "Identities" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "hash" character varying(128) NOT NULL, "salt" character varying NOT NULL, "userId" uuid, CONSTRAINT "REL_d6c71e83f2685521e7021414af" UNIQUE ("userId"), CONSTRAINT "PK_46ceadc7237d0d38a38b5170b21" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_89b40c1f0d2011d93d5b032a9a" ON "Identities" ("email") `,
    );
    await queryRunner.query(
      `ALTER TABLE "Identities" ADD CONSTRAINT "FK_d6c71e83f2685521e7021414af8" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "Identities" DROP CONSTRAINT "FK_d6c71e83f2685521e7021414af8"`,
    );
    await queryRunner.query(`DROP INDEX "IDX_89b40c1f0d2011d93d5b032a9a"`);
    await queryRunner.query(`DROP TABLE "Identities"`);
    await queryRunner.query(`DROP INDEX "IDX_f0444b8b5c111257c300932ae0"`);
    await queryRunner.query(`DROP INDEX "IDX_36435a405311eee847a2dd93e3"`);
    await queryRunner.query(`DROP TABLE "Users"`);
    await queryRunner.query(`DROP TYPE "Users_gender_enum"`);
  }
}
