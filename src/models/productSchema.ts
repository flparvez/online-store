import { Schema, model,models } from "mongoose";

const ProductSchema = new Schema(
  {
    name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: {type:String,require:true},
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  images: [{ type: String }],
  stock: { type: Number, required: true,default:0 },
  sold: { type: Number, default: 0 },

  },
  {timestamps:true}
)

const Product = models.Product || model("Product",ProductSchema)

export default Product;