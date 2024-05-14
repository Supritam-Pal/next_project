import { verify } from "crypto";
import { create } from "domain";
import mongoose , {Schema , Document} from "mongoose"

export interface Message extends Document{
    content: string;
    createAt: Date
}

const MessageSchema: Schema<Message> = new Schema( {
    content: {
        type: String,
        required: true
    },
    createAt: {
        type: Date,
        required: true,
        default: Date.now
    }
})


export interface User extends Document{
   username: string;
   email: string;
   password: string;
   verifycode: string;
   verifycodeExpiry: Date;
   isVerified: boolean;
   isAcceptingMessage: boolean;
   messages: Message[]
}

const UserSchema: Schema<User> = new Schema({
  username:  {
    type: String,
    required: [true , "Username is required"],
    trim: true,
    unique: true
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    match: [/.+\@.+\..+/,'please select valid email address']
},
  password: {
    type: String,
    required: [true , "Password is required"]
  },
  verifycode: {
    type: String,
    required: [true, "Verycode  is required"],
  },
  verifycodeExpiry: {
    type: Date,
    required: [true, "VerycodeExpiry  is required"],
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  isAcceptingMessage: {
    type: Boolean,
    default: true
  },
  messages: [MessageSchema]

})

const UserModel = (mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>("User" , UserSchema)

export default UserModel;