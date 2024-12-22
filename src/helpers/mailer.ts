import User from "@/models/userModal";
import nodemailer from "nodemailer"
import bcryptjs from"bcryptjs"
export const sendEmail = async ({email, emailType , userId} : any) => {

    try{

      // making a token 
      const hashedToken = await bcryptjs.hash(userId.toString(),10);

       //TODO configure mail for usage 
         if(emailType == "VERIFY"){
            const updatedUser = await User.findByIdAndUpdate(userId,{
              $set:{
                verifyToken:hashedToken,
                verifyTokenExpiry:new Date(Date.now() + 3600000)
              }
              
         })
         
         }else if(emailType == "RESET"){
            await User.findByIdAndUpdate(userId,{
              $set:{forgotPasswordToken:hashedToken, 
                forgetPasswordTokenExpiry:new Date(Date.now()+3600000)
              }
            }
              
            )
         }

       
         const  transporter = nodemailer.createTransport({
          host: "sandbox.smtp.mailtrap.io",
          port: 2525,
          auth: {
            user: "0c6201bb591942",
            pass: "209ce0b39b7557"
          }
        });

          const mailOption = {
            from: 'akshayrathod000001@gmail.com', // sender address
            to: email, // list of receivers
            subject: emailType === 'VERIFY' ? "Verify your email" : 
            "Reset your password", // Subject line
            
            html: `<p>Click here <a href="${process.env.DOMAIN}"> here </a> to 
            ${emailType === "VERIFY" ? "verify your email" :
             "reset your password" }
             or copy and paste the link below the browser.
             <br>
             </br>
             ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
             </p>`, // html body
          }

          const mailResponse = await transporter.sendMail(mailOption)

          return mailResponse
    } catch(error:any){
        throw new Error(error.message)
    }

}