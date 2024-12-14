import mongoose from "mongoose"

export async function connect(){
    try{
        mongoose.connect(process.env.MONGO_URI!)
        const connection = mongoose.connection

        connection.on('connection', () => {
            console.log("MongoDb connected successfully")
        })

        connection.on('error', (err) => {
            console.log("Mongodb connection error, please make sure db is set up"+err)
            process.exit();
        })
    } catch(error){
        console.log("Something went wrong while  connecing to Db")
        console.log(error)
    }
}