const express = require('express');
const logger = require('morgan');
const cors = require('cors');
require('dotenv').config();
const authRouter = require('./routes/api/auth');
const contactsRouter = require('./routes/api/contacts');

const app = express();
const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.options('*', cors());
app.use(
  cors({
    origin: 'https://marvelous-bunny-daf51a.netlify.app',
    credentials: true,
  }),
);
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
