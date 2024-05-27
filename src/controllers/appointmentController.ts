import { Request,Response } from "express";
import { User } from "../models/User";
import { Appointment } from "../models/Appointment";
import { Professor } from "../models/Professor";
import { Student } from "../models/Student";
import { Role } from "../models/Role";
import bcrypt from 'bcrypt';
import { UserRoles } from "../constants/UserRoles";
import { Console } from "console";

export const appointmentController = {

    //Get all Appointments
    async getAll(req:Request,res:Response){
        try {
            const page = Number(req.query.page) || 1;
            const limit = Number(req.query.limit) || 10;

            const [appointments,totalAppointments] = await Appointment.findAndCount(
                {
                    select:{
                        id:true,
                        day_date:true,
                        description:true,
                        price:true,
                        professorID:true,
                        studentID: true,
                    },
                }
            );
            
            res.json(appointments);

        }catch(error){
            res.status(500).json({message:"Something went wrong"});
        }
    },

    //Get Appointment by ID
    async getById(req:Request,res:Response){
        try {
            const id = Number(req.params.id);
            const appointment = await Appointment.findOne({
                relations:{
                    professor:{
                        user:true
                    },
                    student:{
                        user:true
                    
                    },
                },
                select:{
                    id:true,
                    day_date:true,
                    description:true,
                    price:true,
                    professor:{
                            id:true,
                            user:{
                                firstName:true,
                                email:true,
                                phone:true,
                            }                                  
                    },
                    student:{
                        id:true, 
                        user:{
                            firstName:true,
                            email:true,
                            phone:true,
                        }               
                    }
                    },
                    where:{
                        id:id
                    }
                    
                });
            if(!appointment){
                res.status(404).json({message:"Appointment not found"});
                return;
            }

            console.log(appointment);

            res.json(appointment);
        }catch(error){
            res.status(500).json({message:"Something went wrong"});
        }
    },


    //Create Appointment
    async create(req:Request,res:Response){
        try {
            const {day_date,description,price,professor,student} = req.body;
            const appointment = Appointment.create({
                day_date:day_date,
                description: description,
                price:price,
                professorID:professor,
                student:student
            });

            await appointment.save();
            res.json(appointment);
        }catch(error){
            res.status(500).json({message:"Something went wrong"});
            
        }
    },

    //Update Appointment
    async update(req:Request,res:Response){
        try {
            const id = Number(req.params.id);
            const {day_date,description,price,professor,student} = req.body;
            const appointment = await Appointment.findOne({where:{id:id}});
                
            if(!appointment){
                res.status(404).json({message:"Appointment not found"});
                return;
            }
            appointment.day_date = day_date;
            appointment.description = description;
            appointment.price = price;
            appointment.professorID = professor;
            appointment.studentID = student;
            await appointment.save();
            res.json(appointment);
        }catch(error){
            res.status(500).json({message:"Something went wrong"});
        }
    },

    //Delete Appointment
    async delete(req:Request,res:Response){
        try {
            const id = Number(req.params.id);
            const appointment = await Appointment.findOne({where:{id:id}});
            if(!appointment){
                res.status(404).json({message:"Appointment not found"});
                return;
            }
            await appointment.remove();
            res.json({message:"Appointment deleted"});
        }catch(error){
            res.status(500).json({message:"Something went wrong"});
        }
    },

    async getByLogedStudent(req:Request,res:Response){
        const student = await Student.findOne({
            select:{
                id:true
            },
            where:{
                userID:req.tokenData?.userId
            }});
            console.log(req.tokenData);
            console.log(student);
    
        const appointments = await Appointment.find({
            relations:{
                professor:true,
                student:true,
            },
            select:{
                id:true,
                day_date:true,
                description:true,
                price:true,
                professor:{
                        id:true,
                        user:{
                            firstName:true,
                            email:true,
                            phone:true,
                        }                                  
                },
                student:{
                    id:true, 
                    user:{
                        firstName:true,
                        email:true,
                        phone:true,
                    }               
                }
                },
                where:{
                    // studentID:student?.id
                    studentID:req.tokenData.userId
                }
                
            });
            res.json(appointments).status(200);
    
        },


    //Get all Appointments by Loged Professor
    async getByLogedProfessor(req:Request,res:Response){
        const professor = await Professor.findOne({
            select:{
                id:true
            },
            where:{
                userID:req.tokenData?.userId
            }});
            console.log(req.tokenData.userId);
            console.log("caca",professor);
    
        const appointments = await Appointment.find({
            relations:{
                professor:true,
                student:true,
            },
            select:{
                id:true,
                day_date:true,
                description:true,
                price:true,
                professor:{
                        id:true,
                        user:{
                            firstName:true,
                            email:true,
                            phone:true,
                        }                                  
                },
                student:{
                    id:true, 
                    user:{
                        firstName:true,
                        email:true,
                        phone:true,
                    }               
                }
                },
                where:{
                    professorID:req.tokenData.userId
                }
                
            });
            res.json(appointments).status(200);
    
        }

}