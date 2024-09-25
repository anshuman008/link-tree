import mongoose from 'mongoose'
import magoose from 'mongoose'


type connectionObject = {
     isConnected?:number
}

let connection:connectionObject = {};

const connectDB = async () =>{

     // console.log('db request is coming!!!');

     if(connection.isConnected){
          console.log("Db is already connected!!");
          return 
     }

     try{

          // console.log('im in try block before connecting...')

          // console.log(process.env.MONGODBURI,'connecting there ...')
        const db = await mongoose.connect(process.env.MONGODBURI as string);

     //    console.log('db connect ho gyaaa...')
        connection.isConnected = db.connections[0].readyState;
        console.log("Db connected Sucessfully!!");
     }catch(error){
          console.log(error)
     }
}

export default connectDB;