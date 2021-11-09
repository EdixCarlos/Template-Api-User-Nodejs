import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";
const userSchema = new Schema(
  {
    user: {
      type: String,
      unique: true,
      required: true
    },
    pwd: {
        type: String,
        required: true
      },
    name: {
      type: String,
    },
    last_name: {
        type: String,
      },
      birthday: {
        type: String,
      },  
      status: {
        type: String,
      }, 
      gener: {
        type: String,
      }, 
      date_register: {
        type: String,
      }, 
      date_update: {
        type: String,
      },
      roles: [
        {
          ref: "Roles",
          type: Schema.Types.ObjectId
        }
      ]
      
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
userSchema.statics.encryptPassword = async (pwd)=>{
  const salt = await bcrypt.genSalt(5)
  return await bcrypt.hash(pwd,salt)
}
userSchema.statics.comparePassword = async (pwd, receivedPassword)=>{
  return await bcrypt.compare(pwd,receivedPassword)
}


export default model("Users", userSchema);