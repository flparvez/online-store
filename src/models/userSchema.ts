import { Schema,model,models } from "mongoose";

const userSchema = new Schema(
  
  {
  username: { type: String, required: true,unique: true},
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'manager', 'customer'], default: 'customer' },

  orders: [{ type: Schema.Types.ObjectId, ref: 'Order' }],

},
{timestamps: true,

}

);

const User = models.User || model("User",userSchema)


export default User;
