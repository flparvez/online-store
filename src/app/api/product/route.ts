import { connectDb } from "@/lib/dbConfig";
import Category from "@/models/categorySchema";
import Product from "@/models/productSchema";
import User from "@/models/userSchema";
import { Types } from "mongoose";
import { NextResponse } from "next/server";

export const GET =async ( request:Request) =>{


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
    
      const filter:any ={
        user: new Types.ObjectId(user),
        category : new Types.ObjectId(category)
      } 

      const products = await Product.find(filter);

      return new NextResponse(
        JSON.stringify({message:"Product fetch succesfully",products}),{status:200}
      )
  } catch (error:any) {
    return new NextResponse ("Error in fetching products: " + error.message,{ status:400})
  }
}

export const POST = async (request: Request) => {

  try {
    
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");
  const categoryId = searchParams.get("categoryId");
  
  const body = await request.json();
  const {
    name,
    description,
    price,
    images,
    stock,
    sold
  } = body;

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
  
    const newProduct = new  Product({
      name,
      description,
      price,
      images,
      stock,
      sold,
      user: new Types.ObjectId(user),
      category: new Types.ObjectId(category)
    })
 await newProduct.save();
  
  return new NextResponse(
    JSON.stringify({message:"Product created successfully",product:newProduct}),{status:200}
  )

  } catch (error:any) {
    return new NextResponse(
      JSON.stringify("Product Created Errors: " + error.message),{status:400}
    )
  }
}