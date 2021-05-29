import 'reflect-metadata';

import { config } from 'dotenv';
config();

import path from 'path';

import connection from './database';
connection();

import express from 'express';
const app = express();

import { createServer } from 'http';
import { Server, Socket } from 'socket.io';

export const http = createServer(app); // criando protocolo http
export const io = new Server(http); // criando protocolo ws

import { settingsRoutes } from './routes/settings.routes';
import { userRoutes } from './routes/user.routes';
import { messagesRoutes } from './routes/messages.routes';

app.use(express.json());

// utilizar html no node.js
app.use(express.static(path.join(__dirname, '..', 'public')));
app.set('views', path.join(__dirname, '..', 'public'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(settingsRoutes);
app.use(userRoutes);
app.use(messagesRoutes);

app.get('/client', (_, res) => {
  return res.render('html/client.html');
});

app.get('/admin', (_, res) => {
  return res.render('html/admin.html');
});

io.on('connection', (socket: Socket) => {
  console.log(`connected: ${socket.id}`);
});
