const express = require('express');
const cookieSession = require('cookie-session');
const app = express();
const port = 3000;

const db = require('./src/models');
const dbConfig = require('./src/config/db.config');
const authConfig = require('./src/config/auth.config');

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(
  cookieSession({
    name: 'chat-app-session',
    secret: authConfig.cookieSecret,
    httpOnly: true,
  })
);
app.use(function(req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, Content-Type, Accept"
  );
  next();
});

// DB Connection
db.mongoose.connect(dbConfig.url, dbConfig.options)
.then(() => console.log('DB Connected'))
.catch(err => console.log(err));

db.init();

// Test route
app.get('/api', (req, res) => {
  res.json({'message': 'ok'});
});

// Import routes
const helloworldRouter = require('./src/routes/helloworld.routes');
const authRouter = require('./src/routes/auth.routes');
const testRouter = require('./src/routes/test.routes');

// Use routes
app.use('/api/helloworld', helloworldRouter);
app.use('/api/auth', authRouter);
app.use('/api/test', testRouter);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`);
});