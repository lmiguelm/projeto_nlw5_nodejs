import { Request, response, Response } from 'express';
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

  async findByUsername(req: Request, res: Response): Promise<Response> {
    const { username } = req.params;

    const service = new SettingsService();
    const settings = await service.findByUsername(username);

    return res.json(settings);
  }

  async update(req: Request, res: Response): Promise<Response> {
    const { username } = req.params;
    const { chat } = req.body;

    const service = new SettingsService();
    const settings = await service.update(username, chat);

    return res.json(settings);
  }
}
