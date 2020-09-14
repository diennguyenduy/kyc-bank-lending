var express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cors = require('cors');
const checkJWT = require('./middlewares/check-jwt');
var app = express();

require('dotenv').config();

// mongoose.connect(
//   process.env.MONGODB_URI,
//   { useUnifiedTopology: true, useNewUrlParser: true },
//   (error) => {
//     if (error) console.log(error);
//   }
// );
// mongoose.set('useCreateIndex', true);

app.set('view engine', 'ejs');
app.use(helmet()); // security
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// set up cors to allow us to accept requests from our client
app.use(
  cors({
    origin: '*', // allow to server to accept request from different origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // allow session cookie from browser to pass through
  })
);

const authRoutes = require('./routes/auth');
const formRoutes = require('./routes/form');
const infoRoutes = require('./routes/info');
const actionRoutes = require('./routes/action');
const customerRoutes = require('./routes/customer');
const certificateRoutes = require('./routes/certificate');

// app.use('/auth', authRoutes);
// app.use('/info', infoRoutes);
// app.use('/form', checkJWT, formRoutes);
// app.use('/action', checkJWT, actionRoutes);
// app.use('/customer', checkJWT, customerRoutes);
// app.use('/certificate', checkJWT, certificateRoutes);

app.use('/auth', authRoutes);
app.use('/info', infoRoutes);
app.use('/form', formRoutes);
app.use('/action', actionRoutes);
app.use('/customer', customerRoutes);
app.use('/certificate', certificateRoutes);

app.listen(8080, () => {
  console.log('***********************************');
  console.log('API server listening at localhost:8080');
  console.log('***********************************');
});
module.exports = app;
