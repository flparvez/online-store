
import bcryptjs from 'bcryptjs'
import { NextResponse } from "next/server";
import jwt from 'jsonwebtoken'
import { connectDb } from '@/lib/dbConfig';
import User from '@/models/userSchema';

connectDb();

export async function POST(request:Request){

try {


const reqBody =  await request.json()

const {email,password} = reqBody

const user = await User.findOne({email})
if (!user) {
    return NextResponse.json({error:"User Does Not Exist"},{status:400})
}

// console.log("user Exist")
const validPassword = await  bcryptjs.compare(password,user.password)
if (!validPassword) {
     return NextResponse.json({error:"Invalid Password"},{status:400})
}

const tokenData = {
    id:user._id,
    username:user.username,
    email:user.email
}
  const token = await jwt.sign(tokenData,process.env.TOKEN_SECRET!,{expiresIn: '2d'})

 const response = NextResponse.json({
    message:"Logged In Success",
    success:true
})

  response.cookies.set("token",token,{
    httpOnly:true
  })

  return response
}catch (error:any) {
        return NextResponse.json({error:error.message},{status:500})
    }
}