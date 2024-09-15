import { connectDb } from "@/lib/dbConfig";
import Order from "@/models/orderSchema";

import Product from "@/models/productSchema";
import User from "@/models/userSchema";
import { Types } from "mongoose";
import { NextResponse } from "next/server";
import slugify from "slugify"; // Add this import at the top


// get all orders
export const GET =async ( request:Request) =>{


  try {

      await connectDb();

  
      const orders = await Order.find()
      // const products = await Product.find(filter).sort({createdAt:"asc"})

      return new NextResponse(
        JSON.stringify({orders}),{status:200}
      )
  } catch (error:any) {
    return new NextResponse ("Error in fetching orders: " + error.message,{ status:400})
  }
}

// create order



export const POST = async (request: Request) => {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    const body = await request.json();
    const {
      
      name,
      email,
      phone,
      address,
      city,
      products,
      total,
      status,
      transaction,
    } = body;

    // Check userId and categoryId
    if (!userId || !Types.ObjectId.isValid(userId!)) {
      return new NextResponse(
        JSON.stringify({ message: "Invalid or missing userId" }),
        { status: 400 }
      );
    }

    await connectDb();

    const user = await User.findById(userId);

    if (!user) {
      return new NextResponse(
        JSON.stringify({ message: "User not found" }),
        { status: 404 }
      );
    }

    // Manually generate the slug
    const slug = slugify(name, { lower: true, strict: true });

    const newOrder = new Product({
      name,
      // user:, connection with user
      slug, // Set the slug manually here
      email,
      phone,
      address,
      city,
      products,
      total,
      status,
      transaction,
      user: new Types.ObjectId(user),
    });

    await newOrder.save();

    return new NextResponse(
      JSON.stringify({
        message: "Order created successfully",
        product: newOrder,
      }),
      { status: 200 }
    );
  } catch (error: any) {
    return new NextResponse(
      JSON.stringify("Order Creation Errors: " + error.message),
      { status: 400 }
    );
  }
};