import {connect} from "@/dbConfig/dbConfig"
import User from "@/models/userModal"
import { NextRequest, NextResponse } from "next/server"

connect()

export async function POST (request: NextRequest){
    try{
        const reqBody = await request.json();
        const {token} = reqBody;
        console.log(token);

             // Validate token presence
             if (!token) {
                return NextResponse.json(
                    { error: "Token is required" },
                    { status: 400 }
                );
            }
        const user =await User.findOne({verifyToken: token,
            verifyTokenExpiry:{$gt:Date.now()}
        })

        if(!user){
            return NextResponse.json(
                {error:"invalid or expires token "},
            {status:400})
        }

        user.isVerified=true
        user.verifyToken=undefined
        user.verifyTokenExpiry=undefined

        await user.save();

        return NextResponse.json(
            {message:"Email verified successfully",
                success:true
            },
            {status:200}
        )

    }catch(error : any){
        return NextResponse.json(
            {error:error.message},
            {status:500}
        )
    }
}