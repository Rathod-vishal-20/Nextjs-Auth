
import mongoose  from "mongoose";


const userSchema = new mongoose.Schema({
    username:{
        type:String,
        requiired:[true, "Please provide a username"],
        unique:true

    },
    email:{
        type:String,
        required:[true, "Please provide an email"],
        unique:true
    },
    password:{
        type:String,
        requiired:[true, "Please provide password"]
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    forgotPasswordToken:String,
    forgetPasswordTokenExpiry:Date,
    verifyToken:String,
    verifyTokenExpiry:Date
}) 

const User = mongoose.model.users ||  mongoose.model("users", userSchema)

export default User