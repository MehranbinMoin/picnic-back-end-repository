const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const logger = require('morgan');

const picnicJwtRouter = require('./controllers/picnic-jwt')
const authRouter = require('./controllers/auth')
const userRouter = require('./controllers/users')
const basketsRouter = require('./controllers/baskets')

mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

app.use(cors());
app.use(express.json());
app.use(logger('dev'));

app.use('/auth', authRouter)
app.use('/users', userRouter)
app.use('/baskets', basketsRouter)
app.use('/picnic-jwt', picnicJwtRouter)

app.listen(3001, () => {
  console.log('The express app is ready!');
});