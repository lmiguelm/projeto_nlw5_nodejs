import { Request, Response } from 'express';
import { MessagesService } from '../services/MessagesService';

export class MessagesController {
  async create(req: Request, res: Response): Promise<Response> {
    const { adminId, text, userId } = req.body;

    const service = new MessagesService();
    const settings = await service.create({ adminId, text, userId });
    return res.json(settings);
  }

  async showByUser(req: Request, res: Response): Promise<Response> {
    const { userId } = req.params;

    const service = new MessagesService();
    const messages = await service.listByUser(userId);

    return res.json(messages);
  }
}
