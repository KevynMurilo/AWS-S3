import { Request, Response } from "express";
import { GetService } from "../services/GetService";

class GetController{
  async execute(req: Request, res: Response){
    const getService = new GetService(); 

    try {
      const files = await getService.execute(); 

      if(files.length === 0){
        return res.status(200).send('No video available');
      }

      return res.json(files); 
    } catch (error) {
      console.error('Error listing files:', error);
      return res.status(500).send('Error listing files.');
    }
  }
}

export { GetController };