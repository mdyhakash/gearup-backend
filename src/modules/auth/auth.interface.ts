import { Role } from "../../../generated/prisma/enums";

export interface IAuthUser {
  name: string;
  email: string;
  password: string;
  role: Role;
  profilePhoto?: string;
  bio?: string;
}
export interface IUpdateProfile {
  name?: string;
  phone?: string | null;
  address?: string | null;
  bio?: string | null;
  profilePhoto?: string | null;
}
