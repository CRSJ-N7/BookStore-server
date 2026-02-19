import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedAvatarColumnToUserEntity1771332953886 implements MigrationInterface {
    name = 'AddedAvatarColumnToUserEntity1771332953886'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "avatar" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "avatar"`);
    }

}
