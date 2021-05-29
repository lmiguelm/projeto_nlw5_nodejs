import { Router } from 'express';

import { MessagesController } from '../controllers/MessagesController';

export const messagesRoutes = Router();

const messages = new MessagesController();

messagesRoutes.post('/messages', messages.create);
messagesRoutes.get('/messages/:userId', messages.showByUser);
