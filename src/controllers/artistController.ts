import { Request, Response } from "express";
import { Artist } from "../models/Artist";
import { UserRoles } from "../constants/UserRoles";
import { User } from "../models/User";


export const artistController = {
    async getAll(req:Request,res:Response){
        try{
            const page = Number(req.query.page) ||1;
            const limit = Number(req.query.limit) || 10;

            const artists = await Artist.findAndCount(
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
            res.json(artists);

        }catch(error){
            res.status(500).json({message:"Something went wrong"});
        }
    },

}