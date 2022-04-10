import {MigrationInterface, QueryRunner} from "typeorm";

export class InitialDatabaseSchema1649596117723 implements MigrationInterface {
    name = 'InitialDatabaseSchema1649596117723'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`measurement\` (\`id\` varchar(36) NOT NULL, \`weight\` float NOT NULL, \`userId\` varchar(255) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` varchar(36) NOT NULL, \`firstName\` varchar(255) NULL, \`lastName\` varchar(255) NULL, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`weight\` float NULL, \`height\` float NULL, \`gender\` enum ('Male', 'Female') NULL, \`DOB\` datetime NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`comment\` (\`id\` varchar(36) NOT NULL, \`comment\` varchar(255) NOT NULL, \`userId\` varchar(255) NOT NULL, \`dietId\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`diet\` (\`id\` varchar(36) NOT NULL, \`intakeId\` varchar(255) NOT NULL, \`period\` enum ('Daily', 'Weekly', 'Monthly', 'Yearly') NULL, \`creatorId\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`REL_30d7085f6a2f62262e95223553\` (\`intakeId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`intake\` (\`id\` varchar(36) NOT NULL, \`calorie\` int NOT NULL, \`fat\` int NOT NULL, \`carbs\` int NOT NULL, \`protein\` int NOT NULL, \`userId\` varchar(255) NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user_saved_diets_diet\` (\`userId\` varchar(36) NOT NULL, \`dietId\` varchar(36) NOT NULL, INDEX \`IDX_e858c0eb6952ddf922cb8fee0a\` (\`userId\`), INDEX \`IDX_11caa0ed1ff4ce23019b64b828\` (\`dietId\`), PRIMARY KEY (\`userId\`, \`dietId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user_liked_diets_diet\` (\`userId\` varchar(36) NOT NULL, \`dietId\` varchar(36) NOT NULL, INDEX \`IDX_53fbc5318fd6d1f4e3f053556f\` (\`userId\`), INDEX \`IDX_929fab450beaad49e590f20ad4\` (\`dietId\`), PRIMARY KEY (\`userId\`, \`dietId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`measurement\` ADD CONSTRAINT \`FK_e2c952d9d21c2899bfc69508300\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`comment\` ADD CONSTRAINT \`FK_c0354a9a009d3bb45a08655ce3b\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`comment\` ADD CONSTRAINT \`FK_f67a76fe932ea5f3486d29cf5d7\` FOREIGN KEY (\`dietId\`) REFERENCES \`diet\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`diet\` ADD CONSTRAINT \`FK_30d7085f6a2f62262e95223553f\` FOREIGN KEY (\`intakeId\`) REFERENCES \`intake\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`diet\` ADD CONSTRAINT \`FK_d8c08e1b629ee3eeef9a49e98ca\` FOREIGN KEY (\`creatorId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`intake\` ADD CONSTRAINT \`FK_c221e0114146d63f7ea8eb880e3\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_saved_diets_diet\` ADD CONSTRAINT \`FK_e858c0eb6952ddf922cb8fee0a5\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`user_saved_diets_diet\` ADD CONSTRAINT \`FK_11caa0ed1ff4ce23019b64b8286\` FOREIGN KEY (\`dietId\`) REFERENCES \`diet\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_liked_diets_diet\` ADD CONSTRAINT \`FK_53fbc5318fd6d1f4e3f053556f8\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`user_liked_diets_diet\` ADD CONSTRAINT \`FK_929fab450beaad49e590f20ad44\` FOREIGN KEY (\`dietId\`) REFERENCES \`diet\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_liked_diets_diet\` DROP FOREIGN KEY \`FK_929fab450beaad49e590f20ad44\``);
        await queryRunner.query(`ALTER TABLE \`user_liked_diets_diet\` DROP FOREIGN KEY \`FK_53fbc5318fd6d1f4e3f053556f8\``);
        await queryRunner.query(`ALTER TABLE \`user_saved_diets_diet\` DROP FOREIGN KEY \`FK_11caa0ed1ff4ce23019b64b8286\``);
        await queryRunner.query(`ALTER TABLE \`user_saved_diets_diet\` DROP FOREIGN KEY \`FK_e858c0eb6952ddf922cb8fee0a5\``);
        await queryRunner.query(`ALTER TABLE \`intake\` DROP FOREIGN KEY \`FK_c221e0114146d63f7ea8eb880e3\``);
        await queryRunner.query(`ALTER TABLE \`diet\` DROP FOREIGN KEY \`FK_d8c08e1b629ee3eeef9a49e98ca\``);
        await queryRunner.query(`ALTER TABLE \`diet\` DROP FOREIGN KEY \`FK_30d7085f6a2f62262e95223553f\``);
        await queryRunner.query(`ALTER TABLE \`comment\` DROP FOREIGN KEY \`FK_f67a76fe932ea5f3486d29cf5d7\``);
        await queryRunner.query(`ALTER TABLE \`comment\` DROP FOREIGN KEY \`FK_c0354a9a009d3bb45a08655ce3b\``);
        await queryRunner.query(`ALTER TABLE \`measurement\` DROP FOREIGN KEY \`FK_e2c952d9d21c2899bfc69508300\``);
        await queryRunner.query(`DROP INDEX \`IDX_929fab450beaad49e590f20ad4\` ON \`user_liked_diets_diet\``);
        await queryRunner.query(`DROP INDEX \`IDX_53fbc5318fd6d1f4e3f053556f\` ON \`user_liked_diets_diet\``);
        await queryRunner.query(`DROP TABLE \`user_liked_diets_diet\``);
        await queryRunner.query(`DROP INDEX \`IDX_11caa0ed1ff4ce23019b64b828\` ON \`user_saved_diets_diet\``);
        await queryRunner.query(`DROP INDEX \`IDX_e858c0eb6952ddf922cb8fee0a\` ON \`user_saved_diets_diet\``);
        await queryRunner.query(`DROP TABLE \`user_saved_diets_diet\``);
        await queryRunner.query(`DROP TABLE \`intake\``);
        await queryRunner.query(`DROP INDEX \`REL_30d7085f6a2f62262e95223553\` ON \`diet\``);
        await queryRunner.query(`DROP TABLE \`diet\``);
        await queryRunner.query(`DROP TABLE \`comment\``);
        await queryRunner.query(`DROP INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` ON \`user\``);
        await queryRunner.query(`DROP TABLE \`user\``);
        await queryRunner.query(`DROP TABLE \`measurement\``);
    }

}
