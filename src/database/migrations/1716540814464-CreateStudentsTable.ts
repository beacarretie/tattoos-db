import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateStudentsTable1716540814464 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name:"students",
                columns:[
                    {
                        name:"id",
                        type:"int",
                        isPrimary:true,
                        isGenerated:true,
                        generationStrategy:"increment"
                    },
                    {
                        name:"user_id",
                        type:"int",
                    },
                    {
                        name:"area",
                        type:"varchar",
                        length:"50"
                    }
                ],
                foreignKeys:[
                    {
                        columnNames:["user_id"],
                        referencedTableName: "users",
                        referencedColumnNames:["id"],
                        onDelete: "CASCADE"

                    },
                    
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("students");
    }

}
