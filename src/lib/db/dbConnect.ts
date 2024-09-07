import mongoose from "mongoose";

type ConnectionObject={
    isConnected?:number
}

const connection:ConnectionObject={}

const dbConnect=async():Promise<void>=>{
    if(connection.isConnected){
        console.log("DB is already connected");
        return;
    }
    try {
        const db=await mongoose.connect(process.env.MONGODB_URI || '',{})
        connection.isConnected=db.connections[0].readyState
    } catch (error) {
        console.log({message:"Failed to connect DB", error})
        process.exit()        
    }
}

export default dbConnect