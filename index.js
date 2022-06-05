const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);


// DB Connection
const mongoose = require('mongoose');
const db = require('./src/config/db.config');
mongoose.connect(db.url, db.options)
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