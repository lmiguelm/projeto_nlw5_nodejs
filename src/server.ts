import 'reflect-metadata';

import { config } from 'dotenv';
config();

import connection from './database';
connection();

import { routes } from './routes';

import express from 'express';
const app = express();
app.use(express.json());
app.use(routes);

app.get('/', (_, res) => {
  return res.json({ message: 'Hello NLW 05' });
});

app.listen(process.env.PORT, () => {
  console.log(`Server running at port ${process.env.PORT}`);
});
