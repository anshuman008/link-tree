import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { signIn } from "next-auth/react";
import { CreateAccount } from "@/app/ServerActions/Links";

export const authOptions: NextAuthOptions = {
        providers: [
          GoogleProvider({
              clientId: process.env.GOOGLE_CLIENT_ID ?? "",
              clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? ""
            }),
        ],
        callbacks:{
          async signIn({user,account,profile,email}){
            if(user){
              await CreateAccount(user.email || "",user.name || "");
            }

            return true;
       },
        }
}