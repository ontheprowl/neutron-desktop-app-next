import type { Auth } from "firebase/auth";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { fbAuth } from "./firebase-config";




export const login = ( email: string, pass: string) => {
  signInWithEmailAndPassword(fbAuth, email, pass);
};
export const logout = () => {
  signOut(fbAuth);
};
