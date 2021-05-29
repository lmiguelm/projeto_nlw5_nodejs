import { Request, Response } from 'express';

import { UserService } from '../services/UserService';

export class UserController {
  async create(req: Request, res: Response): Promise<Response> {
    const { email } = req.body;

    const service = new UserService();
    const user = await service.create(email);

    return res.json(user);
  }
}
