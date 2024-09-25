"use client"
import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";
import PrimaryButton from "./Button";
const NavBar = () => {

  const session = useSession();

  return (
    <div className="h-20 bg-gray-800 flex justify-between px-24 text-white text-xl font-bold">
      <div className="h-full flex justify-center items-center">Logo</div>

       <div className="h-full flex justify-center items-center">{session?.data?.user ? <PrimaryButton children= "SignOut" onClick={() => signOut()}/> : 
        <PrimaryButton children="SignIn" onClick={()=>signIn("google",{callbackUrl:"http://localhost:3000/username"})} />
        }</div>
    </div>
  );
};

export default NavBar;
