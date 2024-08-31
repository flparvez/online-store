

import { NextResponse,NextRequest } from "next/server";

import { getDataFromToken } from "@/lib/getDataFromToken";
import { connectDb } from "@/lib/dbConfig";
import User from "@/models/userSchema";

connectDb();

export async function GET(request:NextRequest){

    try {
        const userId = await getDataFromToken(request);
        const user = await User.findOne({_id: userId}).select("-password");
        return NextResponse.json({
            message: "User found",
            data: user
        })
    } catch (error:any) {
        return NextResponse.json({error: error.message}, {status: 400});
    }

}