import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangedFieldsInRateAndBookEntities1772690786972 implements MigrationInterface {
    name = 'ChangedFieldsInRateAndBookEntities1772690786972'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "book" ADD "avgRating" integer NOT NULL DEFAULT '1'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "book" DROP COLUMN "avgRating"`);
    }

}
