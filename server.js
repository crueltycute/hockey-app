const express = require('express');
const app = express();
app.use(express.static('.'));

const port = 3000;

app.get('/', function (req, res) {
    res.sendFile('./index.html');
});

app.listen(port, function () {
    console.log('Server started on port ' + port);
});