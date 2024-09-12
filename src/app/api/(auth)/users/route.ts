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

// export const POST = async (request: Request) => {
//   try {
//     const body = await request.json();
//     await connectDb();

//     const newUser = new User(body);

//     await newUser.save();

//     return new NextResponse(
//       JSON.stringify({ meseage: "User created succesfully", newUser }),
//       { status: 200 }
//     );
//   } catch (error: any) {
//     return new NextResponse("Error in fetching users" + error.measseage, {
//       status: 404,
//     });
//   }
// };

// export const PATCH = async (request: Request) => {
//   try {
//     const body = await request.json();
//     const { userid, newUsername } = body;

//     await connectDb();

//     if (!userid || !newUsername) {
//       return new NextResponse(JSON.stringify({ measeage: "User not found" }), {
//         status: 404,
//       });
//     }

//     if (!Types.ObjectId.isValid(userid)) {
//       return new NextResponse(JSON.stringify({ measeage: "Invalid user id" }), {
//         status: 404,
//       });
//     }

//     const updatedUser = await User.findOneAndUpdate(
//       { _id: new ObjectId(userid) },
//       { username: newUsername },
//       { new: true }
//     );

//     if (!updatedUser) {
//       return new NextResponse(
//         JSON.stringify({ measeage: "User Not found in database" }),
//         { status: 404 }
//       );
//     }

//     return new NextResponse(
//       JSON.stringify({ measeage: "Updated user", user: updatedUser }),
//       { status: 200 }
//     );
//   } catch (error: any) {
//     return new NextResponse("user Not found" + error.measseage, {
//       status: 500,
//     });
//   }
// };

// export const DELETE = async (request: Request) => {
//   try {
//     const { searchParams } = new URL(request.url);
//     const userId = searchParams.get("userId");
//     if (!userId) {
//       return new NextResponse(JSON.stringify({ measeage: "Id not found" }), {
//         status: 404,
//       });

//     }

//     if (!Types.ObjectId.isValid(userId)) {
//         return new NextResponse(JSON.stringify({ measeage: "Invalid User Id" }), {status:400})
//     }

//     await connectDb();
//     const deletedUser = await User.findByIdAndDelete(
//         new Types.ObjectId(userId)
//     );
//     if (!deletedUser) {
//         return new NextResponse(
//             JSON.stringify({ measeage: "User not found in database" }),
//             { status: 404 }
//         )
//     }

//     return new NextResponse(
//         JSON.stringify({ measeage: "Deleted user", user: deletedUser }),
//         { status: 200 }
//     );
//   } catch (error: any) {}
// };
