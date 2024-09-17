'use Server'
import UserServices from "@/services/UserServices";



export const CreateAccount = async(email:string,name:string) => {
 
    if(!email || !name){
        console.log('wrong credentoals!!')
        return;
       }

   try{
       const userServices = new UserServices();
    
       const isUser = await userServices.findUser(email);
       
        if(isUser){
            console.log('user already exist!!');
            return;
        }
    
        const responce = await userServices.createUser(name,email);
        
        console.log('user created!!',responce);
    
   }catch(e){
    console.log("getting error while creating account:",e)
   }
}



export const AddLinks = async (email: string, title: string, url: string, description?: string) => {
    try {
      const userServices = new UserServices();
  
      const res = await userServices.addUrl(email, title, url, description);
  
      // Check if validation failed
      if (!res.success) {
        console.log('Validation failed:', res.errors);
        return {
          success: false,
          message: 'Validation failed',
          errors: res.errors // Return this to the user
        };
      }
  
      console.log('Link added successfully!', res);
      return res;
  
    } catch (e) {
      console.log('Error while adding links!!', e);
      return {
        success: false,
        message: 'Error occurred while adding the link'
      };
    }
  };
