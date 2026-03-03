import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedQuantityFieldToCartItem1772520665854 implements MigrationInterface {
    name = 'AddedQuantityFieldToCartItem1772520665854'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cart_item" ADD "quantity" integer NOT NULL DEFAULT '1'`);
        await queryRunner.query(`ALTER TABLE "cart_item" ADD CONSTRAINT "UQ_abdddff53b6b793db841465d4dd" UNIQUE ("userId", "bookId")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cart_item" DROP CONSTRAINT "UQ_abdddff53b6b793db841465d4dd"`);
        await queryRunner.query(`ALTER TABLE "cart_item" DROP COLUMN "quantity"`);
    }

}
