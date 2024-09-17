import UserRepository from "@/repositories/UserRepository";
import { url } from "inspector";
import { string, z } from "zod";

const linkValidation = z.object({
  title: z
    .string({ message: "title is required!!" })
    .trim()
    .min(5, "atleast 5 chareacters needed")
    .max(10, "max lenth is 10"),
  url: z.string({ message: "url is required!!" }),
  description: z.string({ message: "description is required" }).optional(),
});

export default class {
  private userRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async createUser(username: string, emial: string) {
    await this.userRepository.createUser(username, emial);

    return "user Created!!";
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

      linkValidation.parse(newLink);
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
