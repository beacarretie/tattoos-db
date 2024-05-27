import { Request, Response } from "express";
import { Professor } from "../models/Professor";
import { UserRoles } from "../constants/UserRoles";
import { User } from "../models/User";


export const professorController = {
    async getAll(req:Request,res:Response){
        try{
            const page = Number(req.query.page) ||1;
            const limit = Number(req.query.limit) || 10;

            const professors = await Professor.findAndCount(
                {   
                    relations:{
                        user:true
                    },
                    
                    select:{
                        user:{
                            firstName:true,
                            email:true,
                            phone:true,
                        },
                    }
                }
            );
            res.json(professors);

        }catch(error){
            res.status(500).json({message:"Something went wrong"});
        }
    },

    async create(req:Request,res:Response){
        try{
            const {firstName, email, password, phone,style,area} = req.body;

            if(!firstName || !email || !password || !phone){
                res.status(400).json({message:"Failed to create professor"});
                return;
            }

            const userExists = await User.findOne({where:{email:email}});

            if(userExists){
                res.status(400).json({message:"Email already in use"});
                return;
            }

            const user = User.create({
                firstName:firstName,
                email:email,
                password:password,
                phone:phone,
                role:UserRoles.PROFESSOR
            });

            await User.save(user);

            const professor = Professor.create({
                style:style,
                area:area,
                user:user
            });

            await Professor.save(professor);

            res.status(201).json({message:"Professor created succesfully"});


        }catch(error){}
    },

}