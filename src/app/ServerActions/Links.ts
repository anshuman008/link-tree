"use server";
import connectDB from "@/config/db";
import UserModel from "@/models/User";
import UserServices from "@/services/UserServices";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { z } from "zod";

const userValidation = z.object({
  profilepicture: z.string({ message: "profile picture is required" }),
  username: z.string({ message: "username is required" }),
  bio: z.string().optional(),
  email: z
    .string({ message: "email is required" })
    .email({ message: "enter a valid email" }),
});

export const CreateAccount = async (
  email: string,
  name: string,
  profilepicture: string
) => {
  try {

    console.log('db is connecting...')
    await connectDB();

    console.log('db is connected...')
    const isUser = await UserModel.find({ email: email });

    if (isUser.length) {
      console.log({ message: "user is already present" }, { status: 400 });
      return;
    }

    const res = await UserModel.create({
      email: email,
      profilepicture: profilepicture,
      name: name,
    });
    console.log("user is created!!", res);

    // return NextResponse.json({ msg: res },{status:200});
  } catch (e) {
    console.log("error while creating an user", e);
    // return NextResponse.json({ error: e });
  }
};

export const AddUserName = async (email: string,username:string) => {
  
  await connectDB();

  const isUsernameExist = await UserModel.find({ username: username });
   
  console.log('im calling from add user name kya boltiiii');
   
  if (isUsernameExist.length) {
    return {msg:"failed",status:400};
  } else {
    const isUsername = await UserModel.findOneAndUpdate(
      { email: email },
      { username: username },
      { new: true }
    );

    return {msg:"success",status:200};
  }
};

export const AddLinks = async (
  email: string,
  title: string,
  url: string,
  description?: string
) => {
  try {
    const userServices = new UserServices();

    const res = await userServices.addUrl(email, title, url, description);

    // Check if validation failed
    if (!res.success) {
      console.log("Validation failed:", res.errors);
      return {
        success: false,
        message: "Validation failed",
        errors: res.errors, // Return this to the user
      };
    }

    console.log("Link added successfully!", res);
    return res;
  } catch (e) {
    console.log("Error while adding links!!", e);
    return {
      success: false,
      message: "Error occurred while adding the link",
    };
  }
};

export const findUser = async (email: string) => {
  await connectDB();

  const res = await UserModel.findOne({ email: email });

  if (res?.username) {
    return ({ msg: "username is there" , status: 400 });
  }

  return ({ msg: "username is not here" , status: 200 });
};
