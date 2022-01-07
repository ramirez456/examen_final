import {MigrationInterface, QueryRunner} from "typeorm";

export class InitialSchema1637301014705 implements MigrationInterface {
    name = 'InitialSchema1637301014705'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`asistencia_ddd_nest\`.\`participantes\` (\`id\` bigint UNSIGNED NOT NULL AUTO_INCREMENT, \`first_name\` varchar(150) NOT NULL, \`last_name\` varchar(150) NOT NULL, \`dni\` varchar(150) NOT NULL, \`created_at\` datetime NULL, \`created_by\` bigint NULL, \`updated_at\` datetime NULL, \`updated_by\` bigint NULL, UNIQUE INDEX \`UQ_participante_dni\` (\`dni\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`asistencia_ddd_nest\`.\`participantes\``);
        await queryRunner.query(`DROP INDEX \`UQ_participante_dni\` ON \`asistencia_ddd_nest\`.\`participantes\``);   
    }

}
