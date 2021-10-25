var path = require('path');
var express = require('express');
var app = express();

app.use(express.static(path.resolve(__dirname, 'build')));
app.get('*', (req, res) => {
    //var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
});

console.log('Web Server is serving on port 8000..')
var server = app.listen(8000)
