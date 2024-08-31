import { connectDb } from "@/lib/dbConfig";
import Category from "@/models/categorySchema";
import Product from "@/models/productSchema";
import User from "@/models/userSchema";
import { Types } from "mongoose";
import { NextResponse } from "next/server";

export const GET =async ( request:Request) =>{


  try {

      await connectDb();

  
      const products = await Product.find()
      // const products = await Product.find(filter).sort({createdAt:"asc"})

      return new NextResponse(
        JSON.stringify({products}),{status:200}
      )
  } catch (error:any) {
    return new NextResponse ("Error in fetching products: " + error.message,{ status:400})
  }
}

// create product
export const POST = async (request: Request) => {

  try {
    
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");
 
  
  const body = await request.json();
  const {
    name,
    description,
    category,
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
    
   
    await connectDb();

    const user = await User.findById(userId);

    if (!user) {
        return new NextResponse (
            JSON.stringify({message:"User not found"}),
            {status:404}
        )
    }

    

    const newProduct = new  Product({
      name,
      description,
      category,
      price,
      images,
      stock,
      sold,
      user: new Types.ObjectId(user),
 
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