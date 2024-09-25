import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { signIn } from "next-auth/react";
import { AddUserName, CreateAccount, findUser } from "@/app/ServerActions/Links";
import { User } from "lucide-react";
import { getServerSession } from "next-auth";
import connectDB from "@/config/db";
import UserModel from "@/models/User";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      // If the user doesn't exist, create a new account
      await CreateAccount(user.email || "", user.name || "", user.image || "");
      // await AddUserName(user.email || "", "surya kumar yadav")
      // Sign-in process is allowed to continue, and redirection can be handled on the client side
      return true;
    },

    // async redirect({ url, baseUrl }) {

    //      const session = await getServerSession();
    //      await connectDB();

    //    const res = UserModel.findOne({email:session?.user?.email})

    //     console.log(res,'here is the user broooo');

    //     if(!res){
    //       return "/username"
    //     }

    //   return "/dashboard";
    // },
  },
};

