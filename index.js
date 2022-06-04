const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

const helloworldRouter = require('./src/routes/helloworld.route');

app.get('/', (req, res) => {
    res.json({'message': 'ok'});
});

app.use('/helloworld', helloworldRouter);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`);
});