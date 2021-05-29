import { Request, Response } from 'express';
import { SettingsService } from '../services/SettingsService';

export class SettingsController {
  async create(req: Request, res: Response): Promise<Response> {
    const { chat, username } = req.body;

    try {
      const service = new SettingsService();
      const settings = await service.create({ chat, username });
      return res.json(settings);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }
}
