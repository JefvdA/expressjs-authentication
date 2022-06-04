const express = require('express');
const app = express();
const port = 3000;

const helloworldRouter = require('./src/routes/helloworld.route');

app.get('/', (req, res) => {
    res.json({'message': 'ok'});
});

app.use('/helloworld', helloworldRouter);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`);
});