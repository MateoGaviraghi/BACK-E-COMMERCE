import { SetMetadata } from "@nestjs/common";
import { Role } from "src/Auth/roles.enum";

export const Roles = (...roles: Role[]) => SetMetadata('roles', roles) 