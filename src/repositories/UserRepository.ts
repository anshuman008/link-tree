import UserModel, { User } from "@/models/User";
import connectDB from "@/config/db";




export default class UserRepository{
   private userModel 

   constructor(){
    connectDB();
    this.userModel = UserModel;
   }




  //  links:Url[]
   async createUser(profilepicture:string,username:string,email:string,bio:string):Promise<User>{
    return await this.userModel.create({username,email,profilepicture,bio});
   }

   async findUser(email:string){
    return await this.userModel.findOne({email}).lean();
   }

  async addLink(email:string,link:Object){
    return await this.userModel.findOneAndUpdate({email},{$push:{links:link}},{new:true})
  }

}