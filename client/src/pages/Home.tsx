import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { useSignUp, useSignIn, SignOutButton } from "@clerk/clerk-react";

function Home() {
  const { signUp } = useSignUp();
  const { signIn } = useSignIn();

  useEffect(() => {
    console.log(signIn?.userData);
  }, [signIn]);
  return (
    <>
      <Navbar />
      <SignOutButton />
    </>
  );
}

export default Home;
