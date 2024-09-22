import UserRepository from "@/repositories/UserRepository";
import { url } from "inspector";
import { string, z } from "zod";


export default class {
  private userRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async createUser(profilepicture:string,username:string,bio:string,email:string) {
    const res = await this.userRepository.createUser(profilepicture, username,email,bio);
    return res;
  }

  async findUser(email: string) {
    const user = await this.userRepository.findUser(email);

    return user;
  }

  async addUrl(
    email: string,
    title: string,
    url: string,
    description?: string
  ) {
    try {
      const newLink = { title: title, url: url, description: description };

      const newData = await this.userRepository.addLink(email, newLink);

      return newData;
    } catch (e) {
      if (e instanceof z.ZodError) {
        // If it's a Zod validation error, format it into a readable message
        return {
          success: false,
          errors: e.errors.map((err) => ({
            field: err.path[0],
            message: err.message,
          })),
        };
      }

      console.error("An error occurred:", e);
      return {
        success: false,
        message: "Something went wrong while adding the link",
      };
    }
  }
}
