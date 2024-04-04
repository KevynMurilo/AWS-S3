import { Request, Response } from "express";
import { DeleteService } from "../services/DeleteService";

class DeleteController {
  async execute(req: Request, res: Response) {
    const { filename } = req.params;

    if (!filename) {
      return res.status(400).send('Filename not provided.');
    }

    const deleteService = new DeleteService();

    try {
      const result = await deleteService.execute(filename);
      if (result === 'File not found') {
        return res.status(404).send('File not found');
      }
      return res.send('File deleted successfully');
    } catch (error) {
      console.error('Error deleting file:', error);
      return res.status(500).send('Error deleting file.');
    }
  }
}

export { DeleteController };
