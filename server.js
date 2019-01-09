var express = require('express')
var serveStatic = require('serve-static')

var app = express()
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(serveStatic('content'))
app.listen(5000, function () {
    console.log('FINT content server started!');
})