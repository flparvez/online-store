
import { connectDb } from "@/lib/dbConfig";
import { NextResponse } from "next/server";


connectDb();

export async function GET(request:Request){
try {
    
const response =NextResponse.json({
    message:"Logout Successfully",
    success:true
})


response.cookies.set("token","",{
    httpOnly:true,
    expires: new Date(0)
})

return response 


}catch (error:any) {
        return NextResponse.json({error:error.message},{status:500})
    }
}