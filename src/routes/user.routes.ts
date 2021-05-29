import { Router } from 'express';
import { UserController } from '../controllers/UserController';

export const userRoutes = Router();

const users = new UserController();

userRoutes.post('/users', users.create);
