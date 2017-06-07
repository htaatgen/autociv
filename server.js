/**
 * Created by Salami on 7-6-2017.
 */

var express = require('express');
var app = express();

app.use(express.static(__dirname));


app.get('/', function (req, res) {
    res.sendFile('/index.html');
})

app.listen(process.env.PORT ||3000, function () {
    console.log('WS server listening on port 3000')
})
