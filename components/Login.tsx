"use client";

import { signIn } from "next-auth/react";
import { Image } from "next/image";

function Login() {
  return (
    <div>
      <Image scr="" width={300} height={300} alt="logo" />
      <button>Sign In to use ChatGPT</button>
    </div>
  );
}

export default Login;
