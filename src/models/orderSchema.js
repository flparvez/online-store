import { Schema, model, models } from "mongoose";


const orderSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String },
    phone: { type: Number, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    slug: {
      type: String,
      unique: true,   // Slug should be unique
    },
 user: { type: Schema.Types.ObjectId, ref: 'User', required: true },

 products: [],  // Array of product details

    total: { type: Number},

    status: { type: String, enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'], default: 'pending' },

    transaction: { type: String, required: true },
  },
  { timestamps: true }
);

// Pre-save hook to generate slug from name

const Order = models.Order || model("Order", orderSchema);

export default Order;
