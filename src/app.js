import express from 'express';

import dotenv from 'dotenv';
dotenv.config();

import db from './db';
db;

const app = express();
const { PORT } = process.env;

const port = PORT || 4001;

app.use('/', (req, res) => {
  res.json({
    message: 'A simple boostrap express application.',
  });
});

app.listen(port, () => {
  console.log(`App is running on PORT ${port}`);
});
