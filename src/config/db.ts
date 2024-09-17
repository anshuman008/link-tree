import mongoose from 'mongoose'
import magoose from 'mongoose'


type connectionObject = {
     isConnected?:number
}

let connection:connectionObject = {};

const connectDB = async () =>{


     if(connection.isConnected){
          console.log("Db is already connected!!");
          return 
     }

     try{
        const db = await mongoose.connect(process.env.MONGODBURI as string);
        connection.isConnected = db.connections[0].readyState;
        console.log("Db connected Sucessfully!!");
     }catch(error){
          console.log(error)
     }
}

export default connectDB;