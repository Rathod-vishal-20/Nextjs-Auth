import {connect} from "@/dbConfig/dbConfig"
import { getDataFromToken } from "@/helpers/getDataFromToken";
import User from "@/models/userModal"
import { NextResponse,NextRequest } from "next/server"
connect();

export async function POST(request:NextRequest){
    // extract 
    const userId=await getDataFromToken(request)
    const user = await User.findOne({_id:userId}).select("-password")

    // if there is no user 
    if(!user){
        return NextResponse.json({
            message:"Token is invalid or expires",
            success:false
        },
    {status:400

    })
    }

    return NextResponse.json({
        message:"User found",
        data:user
    })


}