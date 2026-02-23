import { MigrationInterface, QueryRunner } from "typeorm";

export class BookEntityAdded1771880903907 implements MigrationInterface {
  name = "BookEntityAdded1771880903907";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "book" ("id" SERIAL NOT NULL, "author" character varying, "cover" character varying, "description" character varying, "price" double precision, CONSTRAINT "PK_a3afef72ec8f80e6e5c310b28a4" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "book"`);
  }
}
