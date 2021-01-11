import express from 'express';

const app = express();

const PORT = 4001 || process.env.PORT;

app.use('/', (req, res) => {
  res.json({
    message: 'A simple boostrap express application.',
  });
});

app.listen(PORT, () => {
  console.log(`App is running on PORT ${PORT}`);
});
