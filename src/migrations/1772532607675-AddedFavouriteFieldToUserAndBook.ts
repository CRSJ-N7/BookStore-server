import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedFavouriteFieldToUserAndBook1772532607675 implements MigrationInterface {
    name = 'AddedFavouriteFieldToUserAndBook1772532607675'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user_favourites_book" ("userId" integer NOT NULL, "bookId" integer NOT NULL, CONSTRAINT "PK_599ffa9a2004f3e701a7542f96c" PRIMARY KEY ("userId", "bookId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_ec5a57e9e4832d8811769cfb41" ON "user_favourites_book" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_58da80bf6a6b8d11fc7fa70cf8" ON "user_favourites_book" ("bookId") `);
        await queryRunner.query(`ALTER TABLE "user_favourites_book" ADD CONSTRAINT "FK_ec5a57e9e4832d8811769cfb410" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_favourites_book" ADD CONSTRAINT "FK_58da80bf6a6b8d11fc7fa70cf89" FOREIGN KEY ("bookId") REFERENCES "book"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_favourites_book" DROP CONSTRAINT "FK_58da80bf6a6b8d11fc7fa70cf89"`);
        await queryRunner.query(`ALTER TABLE "user_favourites_book" DROP CONSTRAINT "FK_ec5a57e9e4832d8811769cfb410"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_58da80bf6a6b8d11fc7fa70cf8"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_ec5a57e9e4832d8811769cfb41"`);
        await queryRunner.query(`DROP TABLE "user_favourites_book"`);
    }

}
