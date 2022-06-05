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
)

// DB Connection
db.mongoose.connect(dbConfig.url, dbConfig.options)
.then(() => console.log('DB Connected'))
.catch(err => console.log(err));

// Test route
app.get('/api', (req, res) => {
  res.json({'message': 'ok'});
});

// Import routes
const helloworldRouter = require('./src/routes/helloworld.route');

// Use routes
app.use('/api/helloworld', helloworldRouter);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`);
});