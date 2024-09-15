import { connectDb } from "@/lib/dbConfig";
import User from "@/models/userSchema";
import { Types } from "mongoose";
import { NextResponse } from "next/server";

const ObjectId = require("mongoose").Types.ObjectId;
export const GET = async () => {
  try {
    await connectDb();
    const users = await User.find();
    return new NextResponse(JSON.stringify(users), { status: 200 });
  } catch (error: any) {
    return new NextResponse("Error in fetching users" + error.measseage, {
      status: 404,
    });
  }
};
