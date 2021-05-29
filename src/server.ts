import 'reflect-metadata';

import { config } from 'dotenv';
config();

import connection from './database';
connection();

import express from 'express';
const app = express();

import { settingsRoutes } from './routes/settings.routes';
import { userRoutes } from './routes/user.routes';
import { messagesRoutes } from './routes/messages.routes';

app.use(express.json());
app.use(settingsRoutes);
app.use(userRoutes);
app.use(messagesRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server running at port ${process.env.PORT}`);
});
