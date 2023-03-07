require('express-async-errors');
require('dotenv').config();

const express = require('express');
const app = express();
const authRouter = require('./routers/auth');
const notFoundMiddleware = require('./middleware/notfound');
const connectDB = require('./db/connect');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.use(express.json());
app.use('/api/v1/auth', authRouter);
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const PORT = process.env.PORT || 3000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
