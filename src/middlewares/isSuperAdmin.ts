import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { TokenDecoded } from "../types";

const isSuperAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (req.token.role !== "super_admin") {
    return res.json("You do not have the necessary credentials");
  }

  next();
};

// const isSuperAdmin = (req: Request, res: Response, next: NextFunction) => {
//   try {
//     if (!req.headers.authorization) {
//       return res.json(
//         {
//           message: 'AUTH_REQUIRED'
//         }
//       )
//     }

//     const token = req.headers.authorization.split(' ')[1];

//     if (!token) {
//       return res.json(
//         {
//           message: 'AUTH_REQUIRED'
//         }
//       )
//     }
    
//     const tokenDecoded = jwt.verify(token, "secreto") as TokenDecoded

//     req.token = tokenDecoded

    
    
//     next()
//   } catch (error) {
//     return res.json({
//       error: "Not auth"
//     })
//   }
// }


export { isSuperAdmin };