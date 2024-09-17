import { NextResponse } from "next/server";
import UserServices from "@/services/UserServices";


export async function GET() {
  const userFinder = new UserServices();

  const responce = await userFinder.findUser("anshu@gmail.com");
  return NextResponse.json({ user: responce });
}

export async function POST() {

  const userService = new UserServices();


  const responce = await userService.addUrl(
    "code.anshu@gmail.com",
    "no hujhljk",
    "https://www.porn.com",
    "this ois dec"
  );

  return NextResponse.json({ res: responce });
}
