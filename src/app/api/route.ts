import { NextResponse } from "next/server";
import connectDB from "@/config/db";
import { currentUser } from "@clerk/nextjs/server";
import UserServices from "@/services/UserServices";
import { title } from "process";
export async function GET(){
      const userFinder = new UserServices();

      const responce = await userFinder.findUser("anshu@gmail.com");
      return NextResponse.json({user:responce});
}


export async function POST(){
    const user = await currentUser();

    const userService = new UserServices();
    const responce = await userService.addUrl("anshuchampion@gmail.com","whatsapp","https://www.whatsapp.com");

      return NextResponse.json({res:responce});
}