import mongoose, { Schema, Document } from "mongoose";



export interface Url extends Document{
    title: string,
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
    }
})

export interface User extends Document{
    username: string,
    email:string,
    links:Url[]
}

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true,'please provide the username']
    },
    email:{
        type:String,
        required:[true,'please provide the email'],
        unique:[true,'email should be unique']
    },
    links:[linkSchema]
},{timestamps:true})





const UserModel = mongoose.models.User as mongoose.Model<User> || mongoose.model<User>('User',userSchema);

export default UserModel

