var express = require('express');
var http = require('http');
var bodyParser = require('body-parser');


var app = express();
app.use(express.static('./publico'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.post('/score', urlencodedParser, function (req, res) {
    if (!req.body)
        return res.sendStatus(500)

    var retorno = { sucesso : true, pontos : req.body.pontos }
    res.json(retorno);
})


http.createServer(app)
.listen(3000, function () {
    console.log('servidor está no ar');
});