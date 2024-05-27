import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateProfessorsTable1716540774848 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name:"professors",
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
                        name:"style",
                        type:"varchar",
                        length:"20"
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
        await queryRunner.dropTable("professors");
    }

}
