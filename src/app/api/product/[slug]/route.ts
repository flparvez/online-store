import { connectDb } from "@/lib/dbConfig";
import Category from "@/models/categorySchema";
import Product from "@/models/productSchema";
import User from "@/models/userSchema";
import { Types } from "mongoose";
import { NextResponse } from "next/server";

//  get single product By Slug
export const GET = async (request:Request,context: { params:any}) =>{
    const productSlug = context.params.slug;
    console.log(productSlug)
    try {
    
      
    
        // check userId and productId
    
    
        if (!productSlug ) {
            return new NextResponse(
                JSON.stringify({message:"Inavlid or missing slug"}),
                {status:400}
            )
        }
    
        await connectDb();
     
    
    
      
      const product = await Product.findOne({
        slug:productSlug,
     
    
      })
    
      if (!product) {
    
        return new NextResponse (
            JSON.stringify({message:"Product not found or does not exist"}),
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
    const productId = context.params.product;
    try {
        const body = await request.json();
        const {
            name,
            description,
            category,
            price,
            images,
            stock,
            sold,
            video,
            tags,
        } = body;
        const { searchParams } = new URL(request.url);
        const userId = searchParams.get("userId");
        


        
  // check userId and categoryId
  if (!userId || !Types.ObjectId.isValid(userId!)) {
    return new NextResponse(
        JSON.stringify({message:"Inavlid or missing userId"}),
        {status:400}
    )
    }
    

    if (!productId || !Types.ObjectId.isValid(productId!)) {
        return new NextResponse(
            JSON.stringify({message:"Inavlid or missing productId"}),
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

  const product = await Product.findOne({_id:productId,user:userId})

if (!product) {
    return new NextResponse (
        JSON.stringify({message:"Product not found"}),
        {status:404}
    ) }
const updatedProduct = await Product.findByIdAndUpdate(
    productId,
    {
        name,
        description,
        category,
        price,
        images,
        stock,
        sold,
        video,
        tags,
    },
    { new: true }
  
)

return new NextResponse(
    JSON.stringify({message:"Product updated successfully",product:updatedProduct}),{status:200}
  
)
  
    } catch (error:any) {
        return new NextResponse("Product Edit Failed",{status:400})
    }
}

//  DELETE PRODUCT

export const DELETE =async (request:Request,context: { params:any}) => {
    const productId = context.params.product;

    try {
   
    const { searchParams } = new URL(request.url);
        const userId = searchParams.get("userId");
 


        
  // check userId and categoryId
  if (!userId || !Types.ObjectId.isValid(userId!)) {
    return new NextResponse(
        JSON.stringify({message:"Inavlid or missing userId"}),
        {status:400}
    )
    }
    
 
    if (!productId || !Types.ObjectId.isValid(productId!)) {
        return new NextResponse(
            JSON.stringify({message:"Inavlid or missing productId"}),
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
  
    const product = await Product.findOne({_id:productId,user:userId})

    // if (!product) {
    //     return new NextResponse (
    //         JSON.stringify({message:"Product not found"}),
    //         {status:404}
    //     ) }

        await Product.findByIdAndDelete(productId)
        return new NextResponse(JSON.stringify({message:"Product deleted successfully"}), {status:200});

 
} catch (error:any) {
    return new NextResponse("Product Delete Failed",{status:400})
}
} 