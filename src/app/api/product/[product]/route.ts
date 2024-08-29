import { connectDb } from "@/lib/dbConfig";
import Category from "@/models/categorySchema";
import Product from "@/models/productSchema";
import User from "@/models/userSchema";
import { Types } from "mongoose";
import { NextResponse } from "next/server";

//  get single product
export const GET = async (request:Request,context: { params:any}) =>{
const productId = context.params.product;
// console.log(productId)
try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    const categoryId = searchParams.get("categoryId");

    // check userId and categoryId
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
    if (!productId || !Types.ObjectId.isValid(productId!)) {
        return new NextResponse(
            JSON.stringify({message:"Inavlid or missing ProductId"}),
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
  
  const product = await Product.findOne({
    _id:productId,
    user: userId,
    category: categoryId
  })

  if (!product) {

    return new NextResponse (
        JSON.stringify({message:"Category not found or does not exist"}),
        {status:404});

  }

  return new NextResponse(
    JSON.stringify({message:"Product fetched successfully",product}),{status:200}
  )
} catch (error:any) {
    return new NextResponse("Product Fetched Error: " + error.message,{status:400})
}
}

// edit single product
export const PATCH =async (request:Request,context: { params:any})  =>{

    try {
        const { searchParams } = new URL(request.url);
        const userId = searchParams.get("userId");
        const categoryId = searchParams.get("categoryId");
        
    } catch (error:any) {
        return new NextResponse("Product Edit Failed",{status:400})
    }
}