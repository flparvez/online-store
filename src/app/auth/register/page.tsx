"use client"
import React from 'react'
import { useForm, SubmitHandler } from "react-hook-form";

import { Label } from '@/components/ui/label';
import { Input } from "@/components/ui/input";

import { cn } from "@/lib/utils";

import { useRegisterUserMutation } from "@/store/services/UserApi";
import { useRouter } from "next/navigation";
import Link from "next/link";



type Inputs = {
    username: string;
    email: any;
    password: string;
    
  };
const Register = () => {

  const [registerUser] = useRegisterUserMutation();
  const router = useRouter()

  // Form validation and submission logic goes here
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<Inputs>();







  // console.log(watch("description")); 
  // watch input value by passing the name of it


  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const newUser= await registerUser(data).unwrap();
    if (newUser) {
      
      alert("Acount Created successfully")
       router.push('/')
     }else{
      alert("User Create Failed")
     }
    }
  return (
    <div>
     
      <div className="max-w-md sm:max-w-[90%]  w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
    
      <h2 className='text-center text-3xl'>Create Account</h2>
<form className="my-8" onSubmit={handleSubmit(onSubmit)}> 

  <LabelInputContainer className="mb-4 ">
    <Label htmlFor="username"> Your Name</Label>
    <Input {...register("username", { required: true })} id="name" placeholder="Enter Your Name" type="text" />
    </LabelInputContainer>

  <LabelInputContainer className="mb-4 ">
    <Label htmlFor="email"> Your email</Label>
    <Input {...register("email", { required: true })} id="email" placeholder="Enter Your email" type="email" />
    </LabelInputContainer>

<LabelInputContainer className="mb-4 ">
    <Label htmlFor="password"> Your password</Label>
    <Input {...register("password", { required: true })} id="password" placeholder="Enter Your password" type="password" />
    </LabelInputContainer>



    

    

  <button
    className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
    type="submit"
  >
    Create Account &rarr;
    <BottomGradient />
  </button>
<br />
<p>I have already account</p>
  <h2 className="text-center relative group/btn from-zinc-900 to-zinc-900  block dark:bg-zinc-800 w-full text-black rounded-md  font-medium "> <Link href='/auth/login'> Login Now</Link> </h2> 
  
  
</form>
</div>
  
    </div>
  )
}

export default Register



const BottomGradient = () => {
return (
  <>
    <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
    <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
  </>
);
};

const LabelInputContainer = ({
children,
className,
}: {
children: React.ReactNode;
className?: string;
}) => {
return (
  <div className={cn("flex flex-col space-y-2 w-full", className)}>
    {children}
  </div>
);
};