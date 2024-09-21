import { NextRequest, NextResponse } from "next/server";
import UserServices from "@/services/UserServices";
import { z } from "zod";
import connectDB from "@/config/db";
import UserModel from "@/models/User";
//  profilepicture:string,
//  username: string,
//  bio?:string,
//  email:string,

const userValidation = z.object({
  profilepicture: z.string({message: "profile picture is required"}),
  username: z.string({message: "username is required"}),
  bio: z.string().optional(),
  email: z.string({message:"email is required"}).email({message:"enter a valid email"}),
});

const linkValidation = z.object({
  title: z
    .string({ message: "title is required!!" })
    .trim()
    .min(5, "atleast 5 chareacters needed")
    .max(10, "max lenth is 10"),
  url: z.string({ message: "url is required!!" }),
  description: z.string({ message: "description is required" }).optional(),
});

export async function POST(req: NextRequest) {
  try {
    
    const userService = new UserServices();
    const { user } = await req.json();
    

    // userValidation.parse(user);

    await connectDB();
  
    const isUser = await UserModel.find({username : user.username});

    if(isUser){
      return NextResponse.json({message:"username is already present"},{status:400});
    }

    const res = await UserModel.create(user) ;

    return NextResponse.json({ msg: res });
  } catch (e) {
    return NextResponse.json({ error: e });
  }
}

// export async function GET() {
//   const userFinder = new UserServices();

//   const responce = await userFinder.findUser("anshu@gmail.com");
//   return NextResponse.json({ user: responce });
// }

// export async function POST() {

//   const userService = new UserServices();

//   const responce = await userService.addUrl(
//     "code.anshu@gmail.com",
//     "no hujhljk",
//     "https://www.porn.com",
//     "this ois dec"
//   );

//   return NextResponse.json({ res: responce });
// }
