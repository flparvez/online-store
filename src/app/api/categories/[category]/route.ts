import { connectDb } from "@/lib/dbConfig";
import Category from "@/models/categorySchema";
import User from "@/models/userSchema";
import { Types } from "mongoose";
import { NextResponse } from "next/server";

//  PATCH request

export const PATCH  = async (request:  Request,context: {params:any })=>{
    const categoryId = context.params.category;


    try {
        
const body= await request.json();
const {title,description,image} = body;

const { searchParams } = new URL(request.url);
const userId = searchParams.get("userId");
// console.log(userId)

if (!userId || !Types.ObjectId.isValid(userId!)) {
return new NextResponse(
    JSON.stringify({message:"Inavlid or missing userId"}),
    {status:400}
)
}

if (!categoryId || !Types.ObjectId.isValid(categoryId!)) {
    return new NextResponse(
        JSON.stringify({message:"Inavlid or missing CategoryId"}),
        {status:400}
    )
}

await connectDb();
const user = await User.findById(userId);

if (!user) {
    return new NextResponse (
        JSON.stringify({message:"User not found"}),
        {status:404}
    )
}
const category = await Category.findOne({_id:categoryId,user:userId});

if (!category) {
    return new NextResponse (
        JSON.stringify({message:"Category not found"}),
        {status:404}
    )
}

const updatedCategory = await Category.findByIdAndUpdate(
categoryId,
{title,description,image},
{new:true}
);

return new NextResponse(JSON.stringify({message:"Category updated successfully",updatedCategory}),{status:200})


    } catch (error:any) {
        return new NextResponse("Error In Updateing Category" + error.message,{
            status:500,
        })
    }
}


export const DELETE =async (request:Request, context: {params :any})=>{
    const categoryId = context.params.category;
try {
    const { searchParams } = new URL(request.url);
const userId = searchParams.get("userId");
if (!userId || !Types.ObjectId.isValid(userId!)) {
    return new NextResponse(
        JSON.stringify({message:"Inavlid or missing userId"}),
        {status:400}
    )
    }
    
    if (!categoryId || !Types.ObjectId.isValid(categoryId!)) {
        return new NextResponse(
            JSON.stringify({message:"Inavlid or missing CategoryId"}),
            {status:400}
        )
    }

    await connectDb();

    const user = await User.findById(userId);

    if (!user) {
        return new NextResponse (
            JSON.stringify({message:"User not found"}),
            {status:404}
        )
    }
    const category = await Category.findOne({_id:categoryId,user:userId});
    
    if (!category) {
        return new NextResponse (
            JSON.stringify({message:"Category not found or does not exist"}),
            {status:404}
        )
    }
    
    await Category.findByIdAndDelete(categoryId)

    return new NextResponse(JSON.stringify({message:"Category deleted successfully"}),{status:200})

} catch (error:any) {
    return new NextResponse("Category deleted error"+error.message,{status:400})
}

}