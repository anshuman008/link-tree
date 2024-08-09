import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import React from "react";

const NavBar = () => {
  return (
    <div className="h-20 bg-gray-800 flex justify-between px-24 text-white text-xl font-bold">
      <div className="h-full flex justify-center items-center">Logo</div>

      <SignedOut>
        <SignInButton  />
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </div>
  );
};

export default NavBar;
