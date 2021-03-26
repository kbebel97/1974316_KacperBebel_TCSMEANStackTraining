import { contact } from "./contact.model";

export interface user{
  id : number;
  username: string;
  password: string;
  contact_details : Array<contact>;
}
