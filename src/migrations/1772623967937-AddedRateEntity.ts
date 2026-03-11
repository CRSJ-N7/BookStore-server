import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedRateEntity1772623967937 implements MigrationInterface {
    name = 'AddedRateEntity1772623967937'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "rate" ("id" SERIAL NOT NULL, "value" integer NOT NULL DEFAULT '1', "userId" integer, "bookId" integer, CONSTRAINT "PK_2618d0d38af322d152ccc328f33" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "rate" ADD CONSTRAINT "FK_7440b44c5acbec8b2ebfc3af7d2" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "rate" ADD CONSTRAINT "FK_dc0ed8cca45796530b3654fc4cd" FOREIGN KEY ("bookId") REFERENCES "book"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "rate" DROP CONSTRAINT "FK_dc0ed8cca45796530b3654fc4cd"`);
        await queryRunner.query(`ALTER TABLE "rate" DROP CONSTRAINT "FK_7440b44c5acbec8b2ebfc3af7d2"`);
        await queryRunner.query(`DROP TABLE "rate"`);
    }

}
