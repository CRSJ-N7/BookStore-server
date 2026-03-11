import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangedDefaultInRateEntity1772624114261 implements MigrationInterface {
    name = 'ChangedDefaultInRateEntity1772624114261'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "rate" ALTER COLUMN "value" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "rate" ADD CONSTRAINT "UQ_5188b488c021d2e5340698ca185" UNIQUE ("userId", "bookId")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "rate" DROP CONSTRAINT "UQ_5188b488c021d2e5340698ca185"`);
        await queryRunner.query(`ALTER TABLE "rate" ALTER COLUMN "value" SET DEFAULT '1'`);
    }

}
