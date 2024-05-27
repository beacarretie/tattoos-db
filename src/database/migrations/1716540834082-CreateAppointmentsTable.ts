import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateAppointmentsTable1716540834082 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name:"appointments",
                columns:[
                    {
                        name:"id",
                        type:"int",
                        isPrimary:true,
                        isGenerated:true,
                        generationStrategy:"increment"
                    },
                    {
                        name:"day_date",
                        type:"datetime",
                    },
                    {
                        name:"professor_id",
                        type:"int"
                    },
                    {
                        name:"student_id",
                        type:"int"
                    },
                    {
                        name:"description",
                        type:"varchar",
                        length:"200"
                    },
                    {
                        name:"price",
                        type:"int",
                    }
                ],
                foreignKeys:[
                    {
                        columnNames:["professor_id"],
                        referencedTableName: "professors",
                        referencedColumnNames:["user_id"],
                        onDelete: "CASCADE"
                    },
                    {
                        columnNames:["student_id"],
                        referencedTableName: "students",
                        referencedColumnNames:["user_id"],
                        onDelete: "CASCADE"
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("appointments");
    }

}
