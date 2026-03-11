import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangedTypeOfAvgRatingFieldInBook1772987672428 implements MigrationInterface {
    name = 'ChangedTypeOfAvgRatingFieldInBook1772987672428'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "book" DROP COLUMN "avgRating"`);
        await queryRunner.query(`ALTER TABLE "book" ADD "avgRating" double precision NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "book" DROP COLUMN "avgRating"`);
        await queryRunner.query(`ALTER TABLE "book" ADD "avgRating" integer NOT NULL DEFAULT '1'`);
    }

}
