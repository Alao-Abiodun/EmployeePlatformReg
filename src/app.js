import express from 'express';

import dotenv from 'dotenv';
dotenv.config();

import db from './db';
db;

import userRoutes from './routes/user.route';

const app = express();
const { PORT } = process.env;

app.use(express.json());

const port = PORT || 4001;

app.get('/', (req, res) => {
  res.json({
    message: 'A simple boostrap express application.',
  });
});

app.use('/api', userRoutes);

app.listen(port, () => {
  console.log(`App is running on PORT ${port}`);
});
