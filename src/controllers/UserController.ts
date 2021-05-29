import { Request, Response } from 'express';

import { UsersService } from '../services/UsersService';

export class UserController {
  async create(req: Request, res: Response): Promise<Response> {
    const { email } = req.body;

    const service = new UsersService();
    const user = await service.create(email);

    return res.json(user);
  }
}
