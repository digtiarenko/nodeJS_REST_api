const express = require('express');
const logger = require('morgan');
// const cors = require('cors');
require('dotenv').config();
const authRouter = require('./routes/api/auth');
const contactsRouter = require('./routes/api/contacts');

const app = express();
const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));

app.use(function (req, res, next) {
  // res.header("Access-Control-Allow-Origin", "*");
  const allowedOrigins = [
    'http://localhost:3004',
    'http://gamebrag.onrender.com',
  ];
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization',
  );
  res.header('Access-Control-Allow-credentials', true);
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, UPDATE');
  next();
});

// app.options('*', cors());
// app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.use('/contacts', contactsRouter);
app.use('/users', authRouter);

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

app.use((err, req, res, next) => {
  const { status = 500, message = 'server Error' } = err;
  res.status(status).json({ message });
});

module.exports = app;
