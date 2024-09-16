import { connectDb } from "@/lib/dbConfig";
import Order from "@/models/orderSchema";
import User from "@/models/userSchema";

import { NextResponse } from "next/server";

//  get single order By id
export const GET = async (request:Request,context: { params:any}) =>{
    const id = context.params.id;
    console.log(id)
    try {
    
      
    
        // check userId and productId
    
    
        if (!id ) {
            return new NextResponse(
                JSON.stringify({message:"Inavlid or missing Id"}),
                {status:400}
            )
        }
    
        await connectDb();
     
    
    
      
      const order = await Order.findById(id)
    
      if (!order) {
    
        return new NextResponse (
            JSON.stringify({message:"Order not found or does not exist"}),
            {status:404});
    
      }
    
      return new NextResponse(
        JSON.stringify({message:"Order fetched successfully",order}),{status:200}
      )
    } catch (error:any) {
        return new NextResponse("Order Fetched Error: " + error.message,{status:400})
    }
    }


    // edit order info
    
    // export const PATCH = async (request: Request, context: { params: any }) => {
    //     const productSlug = context.params.slug;
      
    //     try {
    //       const body = await request.json();
    //       const {
    //         name,
    //         description,
    //         category,
    //         price,
    //         images,
    //         stock,
    //         sold,
    //         video,
    //         tags,
    //       } = body;
      
    //       const { searchParams } = new URL(request.url);
    //       const userId = searchParams.get("userId");
      
    //       // Check for valid userId and productSlug
    //       if (!userId || !Types.ObjectId.isValid(userId)) {
    //         return new NextResponse(
    //           JSON.stringify({ message: "Invalid or missing userId" }),
    //           { status: 400 }
    //         );
    //       }
      
    //       if (!productSlug) {
    //         return new NextResponse(
    //           JSON.stringify({ message: "Missing product slug" }),
    //           { status: 400 }
    //         );
    //       }
      
    //       await connectDb();
      
    //       // Validate User
    //       const user = await User.findById(userId);
    //       if (!user) {
    //         return new NextResponse(
    //           JSON.stringify({ message: "User not found" }),
    //           { status: 404 }
    //         );
    //       }
      
    //       // Find the product by slug and userId
    //       const product = await Product.findOne({ slug: productSlug, user: userId });
    //       if (!product) {
    //         return new NextResponse(
    //           JSON.stringify({ message: "Product not found" }),
    //           { status: 404 }
    //         );
    //       }
      
    //       // Update the product using findOneAndUpdate
    //       const updatedProduct = await Product.findOneAndUpdate(
    //         { slug: productSlug, user: userId },
    //         {
    //           name,
    //           description,
    //           category,
    //           price,
    //           images,
    //           stock,
    //           sold,
    //           video,
    //           tags,
    //         },
    //         { new: true } // Return the updated document
    //       );
      
    //       if (!updatedProduct) {
    //         return new NextResponse(
    //           JSON.stringify({ message: "Failed to update product" }),
    //           { status: 500 }
    //         );
    //       }
      
    //       return new NextResponse(
    //         JSON.stringify({ message: "Product updated successfully", product: updatedProduct }),
    //         { status: 200 }
    //       );
    //     } catch (error) {
    //       console.error("Error updating product:", error);
    //       return new NextResponse(
    //         JSON.stringify({ message: "An error occurred", error }),
    //         { status: 500 }
    //       );
    //     }
    //   };



//  DELETE PRODUCT

export const DELETE = async (request: Request, context: { params: any }) => {
  const id = context.params.id;

  try {
      const { searchParams } = new URL(request.url);
      const userId = searchParams.get("userId");

      // Check userId and slug
      if (!id ) {
          return new NextResponse(
              JSON.stringify({ message: "Invalid or missing userId" }),
              { status: 400 }
          );
      }
    // Check userId and slug
      if (!userId ) {
          return new NextResponse(
              JSON.stringify({ message: "Invalid or missing adminid" }),
              { status: 400 }
          );
      }

      if (!id) {
          return new NextResponse(
              JSON.stringify({ message: "Invalid or missing id" }),
              { status: 400 }
          );
      }

    //   Check Admin
     if (!userId) {
          return new NextResponse(
              JSON.stringify({ message: "Your Are Not Login" }),
              { status: 400 }
          );
      }
      const user = await User.findById(userId);
      if (!user) {
        return new NextResponse(JSON.stringify({ message: "User not found" }), { status: 404 });
      }

      if (user.role !== "admin") {
        return new NextResponse(JSON.stringify({ message: "Your Are Not Admin" }), { status: 403 });
      }
      await connectDb();

      const result = await Order.findByIdAndDelete(id)

      if (!result) {
          return new NextResponse(
              JSON.stringify({ message: "Order not found or already deleted" }),
              { status: 404 }
          );
      }

      return new NextResponse(
          JSON.stringify({ message: "Order deleted successfully" }),
          { status: 200 }
      );

  } catch (error: any) {
      return new NextResponse(
          JSON.stringify({ message: "Order delete failed", error: error.message }),
          { status: 400 }
      );
  }
};