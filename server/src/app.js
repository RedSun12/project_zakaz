require('dotenv').config();
const cors = require('cors');
const apiRouter = require('./routers/api.router');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');

const express = require('express');

const app = express();
const { PORT } = process.env;

const corsConfig = {
  origin: ['http://localhost:5173'],
  credentials: true,
};

app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors(corsConfig));

app.use('/api/v1', apiRouter);

app.listen(PORT, () => {
  console.log(`Server started at ${PORT} port`);
});
