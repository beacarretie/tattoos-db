import { Seeder } from "./seeder";
import { Role } from "../../models/Role";
import { UserRoles } from "../../constants/UserRoles";

export class RoleSeeder extends Seeder{
    protected async generate(): Promise<void> {
        const roles: Partial<Role>[] = [
            UserRoles.ADMIN,
            UserRoles.PROFESSOR,
            UserRoles.STUDENT
        ];
        await Role.save(roles);
    }
}