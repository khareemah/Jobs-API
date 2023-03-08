require('express-async-errors');
require('dotenv').config();

const express = require('express');
const app = express();
const authRouter = require('./routers/auth');
const jobRouter = require('./routers/jobs');
const connectDB = require('./db/connect');
const notFoundMiddleware = require('./middleware/notfound');
const errorHandlerMiddleware = require('./middleware/error-handler');
const authMiddleware = require('./middleware/auth');
const cors = require('cors');
const helmet = require('helmet');
const xss = require('xss-clean');
const rateLimiter = require();
// const

app.use(express.json());
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/jobs', authMiddleware, jobRouter);
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);
app.use(cors);
app.use(helmet);
app.use(xss);
app.set('trust proxy', 1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  })
);

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
