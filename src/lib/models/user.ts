import { User } from "firebase/auth";

export type UserState = {
  invoices: number;
  customers: number;
  name?: string;
  id?: string;
  profileUrl?: string;
  defaultTestMode?:boolean;
  email: string;
  // user?:User;
};
export const DEFAULT_USER_STATE: UserState = {
  invoices: 0,
  customers: 0,
  name: "",
  email: "",
  defaultTestMode:true
};

export type Password = {
  hash: string;
};

export type Beneficiary = {
  beneId: string;
  name: string;
  email: string;
  phone: string;
  bankAccount: string;
  ifsc: string;
  address1: string;
  city: string;
  state: string;
  pincode: string;
};
