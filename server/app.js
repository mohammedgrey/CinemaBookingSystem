const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const compression = require('compression');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const userRouter = require('./routes/userRoutes');
const roomRouter = require('./routes/roomRoutes');
const movieRouter = require('./routes/movieRoutes');
const reservationRouter = require('./routes/reservationRoutes');

const app = express();

// 1) MIDDLEWARES
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
//to get cookies
app.use(cookieParser());
// to allow cross origin domains
app.use(
  cors({
    credentials: true,
    origin: ['http://localhost:3000', 'https://cinemamoviesbooking.web.app']
  })
);
app.options('*', cors());

app.use(express.json());
app.use(express.static(`${__dirname}/public`));

// app.use(express.static(path.resolve('./public')));

app.use(compression());

// app.use(require('body-parser').json());
// app.use(require('body-parser').urlencoded({ extended: true }));

//test middleware for development
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  console.log('cookies', req.cookies);
  console.log('method', req.method);
  console.log('base url', req.baseUrl);
  console.log('original url', req.originalUrl);
  console.log(req.originalUrl.split('/'));
  next();
});

// 3) ROUTES

app.use('/api/v1/users', userRouter);
app.use('/api/v1/rooms', roomRouter);
app.use('/api/v1/movies', movieRouter);
app.use('/api/v1/reservations', reservationRouter);
// app.use('/api/v1', (req, res, next) => {
//   res.json({ message: 'welcome to the server' });
// });
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
