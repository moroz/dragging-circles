import { ID } from "./common";

export enum Role {
  Admin = "ADMIN",
  Regular = "REGULAR"
}

export interface User {
  id: ID;
  email: string;
  role: Role;
}
