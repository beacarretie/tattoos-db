import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUsersTable1710255956715 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
          new Table({
            name: "users",
            columns: [
              {
                name: "id",
                type: "int",
                isPrimary: true,
                isGenerated: true,
                generationStrategy: "increment",
              },
              {
                name: "username",
                type: "varchar",
                length: "50",
              },
              {
                name: "email",
                type: "varchar",
                length: "100",
                isUnique: true,
              },
              {
                name: "phone_number",
                type: "int",
              },
              {
                name: "password",
                type: "varchar",
                length: "200",
              },
              {
                name: "role",
                type: "enum",
                enum: ["user", "admin", "super_admin"],
                default: '"user"',
              },
              {
                name: "is_active",
                type: "boolean",
                default: true,
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
        await queryRunner.dropTable("users");
      }

}
