const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const app = express();
const port = 3000;

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
mongoose.connect(dbConfig.url, dbConfig.options)
.then(() => console.log('DB Connected'))
.catch(err => console.log(err));

const helloworldRouter = require('./src/routes/helloworld.route');

app.get('/api', (req, res) => {
    res.json({'message': 'ok'});
});

app.use('/api/helloworld', helloworldRouter);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`);
});