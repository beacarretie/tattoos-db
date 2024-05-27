import { Role } from "../models/Role"
export const UserRoles: Record<string, Role> = {
    ADMIN:  {id:1,name:"admin"}  as Role,
    PROFESSOR: {id:2,name:"professor"} as Role,
    STUDENT: {id:3,name:"student"} as Role
}