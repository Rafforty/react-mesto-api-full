const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const userRoutes = require('./routes/users');
const cardRoutes = require('./routes/cards');
const auth = require('./middlewares/auth');
const { validationSignUp, validationSignIn } = require('./middlewares/validation');
const { login, createUser } = require('./controllers/users');
const NotFoundError404 = require('./errors/NotFoundError404');

const { PORT = 3000 } = process.env;
const app = express();

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
  origin: 'https://mesto.frontend.rafforty.nomoredomains.icu',
  // origin: 'http://localhost:3001',
  credentials: true,
}));

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(requestLogger);

app.post('/signin', validationSignIn, login);
app.post('/signup', validationSignUp, createUser);

app.use(auth);
app.use('/', userRoutes);
app.use('/', cardRoutes);
app.use('/', (req, res, next) => {
  next(new NotFoundError404('Страница не найдена.'));
});

app.use(errorLogger);
app.use(errors());
app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({ message: statusCode === 500 ? 'Произошла ошибка сервера' : message });
  next();
});

app.listen(PORT);
