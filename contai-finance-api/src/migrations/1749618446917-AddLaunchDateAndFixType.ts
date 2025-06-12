import { MigrationInterface, QueryRunner } from "typeorm";

export class AddLaunchDateAndFixType1749618446917 implements MigrationInterface {
    name = 'AddLaunchDateAndFixType1749618446917'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "launches" ADD "launchDate" TIMESTAMP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "launches" DROP COLUMN "launchDate"`);
    }

}
