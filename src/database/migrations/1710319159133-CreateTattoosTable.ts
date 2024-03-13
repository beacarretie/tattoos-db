import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTattoosTable1710319159133 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
          new Table({
            name: "tattoos",
            columns: [
              {
                name: "id",
                type: "int",
                isPrimary: true,
                isGenerated: true,
                generationStrategy: "increment",
              },
              {
                name: "work",
                type: "enum",
                enum: ["tattoo", "piercing"]
              },
              {
                name: "name",
                type: "varchar",
                length: "255",
              },
              {
                name: "description",
                type: "varchar",
                length: "255",
              },
              {
                name: "photo",
                type: "varchar",
                length: "2000",
              },
              {
                name: "price",
                type: "int"
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
        await queryRunner.dropTable("tattoos");
      }

}
