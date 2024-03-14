import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateArtistsTable1710438342748 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
          new Table({
            name: "tattoo_artists",
            columns: [
              {
                name: "id",
                type: "int",
                isPrimary: true,
                isGenerated: true,
                generationStrategy: "increment",
              },
              {
                name: "tattoo_artist",
                type: "varchar",
                length: "50",
              },
              {
                name: "password",
                type: "varchar",
                length: "200",
              },
              {
                name: "description",
                type: "varchar",
                length: "255",
                default: '"rellenar"',
              },
              {
                name: "photo",
                type: "varchar",
                length: "2000",
                default: '"photo"',
              },
              {
                name: "role",
                type: "enum",
                enum: ["user", "admin", "super_admin"],
                default: '"admin"',
              },
              {
                name: "created_at",
                type: "timestamp",
                default: "CURRENT_TIMESTAMP",
              },
              {
                name: "updated_at",
                type: "timestamp",
                default: "CURRENT_TIMESTAMP",
                onUpdate: "CURRENT_TIMESTAMP",
              },
            ],
          }),
          true
        );
      }


    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("tattoo_artists");
      }

}
