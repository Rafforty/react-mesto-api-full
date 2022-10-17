const router = require('express').Router();
const userRouter = require('./users');
const cardRouter = require('./cards');
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/NotFoundError404');
const { login, createUser } = require('../controllers/users');
const { validationSignUp, validationSignIn } = require('../middlewares/validation');

router.post('/signin', validationSignIn, login);
router.post('/signup', validationSignUp, createUser);

router.use(auth);
router.use('/users', userRouter);
router.use('/cards', cardRouter);

router.use((req, res, next) => {
  next(new NotFoundError('Маршрут не найден'));
});

module.exports = router;
