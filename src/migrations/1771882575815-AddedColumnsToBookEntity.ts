import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedColumnsToBookEntity1771882575815 implements MigrationInterface {
    name = 'AddedColumnsToBookEntity1771882575815'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "book" ADD "genre" character varying`);
        await queryRunner.query(`ALTER TABLE "book" ADD "name" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "book" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "book" DROP COLUMN "genre"`);
    }

}
