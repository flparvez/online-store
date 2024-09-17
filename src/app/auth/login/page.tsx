"use client";
import Link from "next/link";
import React, {useEffect} from "react";
import {useRouter} from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";





export default function LoginPage() {
    const router = useRouter();
    const [user, setUser] = React.useState({
        email: "",
        password: "",
       
    })
    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);


    const onLogin = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/auth/login", user);
         if (!response) {
            alert("Login failed");
         }
            toast.success("Login success");
            router.push("/");
        } catch (error:any) {
            console.log("Login failed", error.message);
            toast.error(error.message);
        } finally{
        setLoading(false);
        }
    }

    useEffect(() => {
        if(user.email.length > 0 && user.password.length > 0) {
            setButtonDisabled(false);
        } else{
            setButtonDisabled(true);
        }
    }, [user]);

    return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1>{loading ? "Processing" : "Login"}</h1>
        <hr />
        <div className="mb-4">
        <label htmlFor="CustomerName" className="block text-sm font-medium text-gray-700">Email <span className='text-red-600'>*</span></label>
        <input
          type="email"
          id="email"
         
          value={user.email}
          onChange={(e) => setUser({...user, email: e.target.value})}
          placeholder="email"
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          required
        />
      </div>
             <div className="mb-4">
        <label htmlFor="CustomerName" className="block text-sm font-medium text-gray-700">Password <span className='text-red-600'>*</span></label>
        <input
           id="password"
           type="password"
           value={user.password}
           onChange={(e) => setUser({...user, password: e.target.value})}
           placeholder="password"
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          required
        />
      </div>
        
      
            <button
            onClick={onLogin}
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600">Login here</button>
            <Link href="/auth/register">Visit Signup page</Link>
        </div>
    )

}