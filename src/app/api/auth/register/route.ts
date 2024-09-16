
import { connectDb } from "@/lib/dbConfig";
import User from "@/models/userSchema";
import bcryptjs from 'bcryptjs'

import { Types } from "mongoose";
import { NextResponse } from "next/server";


connectDb();

export async function POST(request:Request){
    try {
     const reqBody =  await request.json()

const {username,email,password,role} = reqBody

// validation

const user = await User.findOne({email})
if (user) {
    return NextResponse.json({error:"user already exist"},{status:400})
}
const salt = await bcryptjs.genSalt(10);

const hashedPassword = await bcryptjs.hash(password,salt)

const newUser = new User({
    username,
    email,
    role,
    password:hashedPassword
})

const savedUser = await newUser.save()

console.log(savedUser)


return NextResponse.json({
    message:"User Registration Succesfully",
    success:true,
    savedUser
})

    } catch (error:any) {
        return NextResponse.json({error:error.message},{status:500})
    }
}