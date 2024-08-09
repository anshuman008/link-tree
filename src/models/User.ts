import mongoose, { Schema } from "mongoose";
import { title } from "process";


export interface Url extends Document{
    title: string,
    url:string
}

const linkSchema: Schema<Url> = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    url:{
        type:String,
        required:true
    }
})


const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    links:[linkSchema]
},{timestamps:true})


export interface User extends Document{
    username: string,
    email:string,
    links:Url[]
}


const UserModel = mongoose.models.User as mongoose.Model<User> || mongoose.model<User>('User',userSchema);

export default UserModel

