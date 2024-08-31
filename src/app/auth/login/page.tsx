"use client";
import React, { use, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useLoginUserMutation } from "@/store/services/UserApi";



function Login() {
  const [loginUser] = useLoginUserMutation();
  const router = useRouter();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await loginUser(user).unwrap();
      console.log(response);
      toast.success("Login Successfully");
      // router.push("/profile");
      router.push("/");
    } catch (error: any) {
      console.log("Login failed", error);
      toast.error(error.message);
    }
  };

  return (
    <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-black">
      <h2 className="font-bold text-xl text-center text-neutral-200">
        Login Account
      </h2>
      <p className=" text-sm max-w-sm mt-2 text-center text-neutral-300">
        {loading ? "processing" : "Login Success"}
      </p>
      <div className="text-white bg-black flex flex-col items-center justify-center  min-h-screen py-2">
        <LabelInputContainer className="mb-4">
          <Label htmlFor="">Email</Label>
          <Input
            value={user.email}
            id="email"
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            placeholder="projectmayhem@fc.com"
            type="email"
            required
          />
        </LabelInputContainer>

        <LabelInputContainer className="mb-4">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            placeholder="••••••••"
            type="password"
            required
          />
        </LabelInputContainer>

        <button
          onClick={onLogin}
          className="bg-gradient-to-br relative group/btn from-zinc-900 to-zinc-900  block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          type="submit"
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default Login;

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col  space-y-2 w-full", className)}>
      {children}
    </div>
  );
};