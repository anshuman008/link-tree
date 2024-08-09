import UserRepository from "@/repositories/UserRepository"
import { use } from "react";



export default class{
 private userRepository

 constructor(){
    this.userRepository = new UserRepository();
 }


 async createUser(username:string,emial:string){
  await this.userRepository.createUser(username,emial);

    return "user Created!!";
 }

 async findUser(email:string){
    const user = await this.userRepository.findUser(email);

    return user;
 }

 async addUrl(email:string,url:string,title:string){
      const newLink = {title:title,url:url};

      const newData = await this.userRepository.addLink(email,newLink);

      return newData;
 }



}