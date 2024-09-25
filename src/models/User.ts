import mongoose, { Schema, Document } from "mongoose";


export interface Url extends Document{
    title: string,
    clicks:number
    url:string,
    description?:string
}

const linkSchema: Schema<Url> = new mongoose.Schema({
    title:{
        type:String,
        required:[true,'title is requried']
    },
    url:{
        type:String,
        required:[true,'url is requred']
    },
    description:{
        type:String
    },
    clicks:{
        type:Number,
        default:0
    }
})

export interface User extends Document{
    profilepicture:string,
    username: string,
    bio?:string,
    email:string,
    name:string,
    views: number,
    links:Url[]
}


const userSchema: Schema<User> = new mongoose.Schema({      
   profilepicture:{
    type:String,
    required:true
   },
   username:{
    type:String,
    unique:true,
   },
   name:{
    type:String,
   },
   bio:{
    type:String
   },
   views:{
    type:Number,
    default:0,
   },
   email:{
    type:String,
    unique:true,
    required:true
   },
   links: [linkSchema]

},{timestamps:true})



const UserModel = mongoose.models.User as mongoose.Model<User> || mongoose.model<User>('User',userSchema);

export default UserModel

