import {MigrationInterface, QueryRunner} from "typeorm";

export class AddDateColumsToMeasurement1649602799407 implements MigrationInterface {
    name = 'AddDateColumsToMeasurement1649602799407'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`measurement\` ADD \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`measurement\` ADD \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`measurement\` DROP COLUMN \`updatedAt\``);
        await queryRunner.query(`ALTER TABLE \`measurement\` DROP COLUMN \`createdAt\``);
    }

}
