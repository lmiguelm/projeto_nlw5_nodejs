import { config } from 'dotenv';
config();

import express from 'express';
const app = express();

app.get('/', (_, res) => {
  return res.json({ message: 'Hello NLW 05' });
});

app.listen(process.env.PORT, () => {
  console.log(`Server running at port ${process.env.PORT}`);
});
