var express = require('express');
var http = require('http');
var engine = require('ejs-mate');

var app = express();
app.engine('ejs', engine);

app.use(express.static('./public'));
app.set('view engine', 'ejs');
app.set('views', './views');

var listaJogos = [
    { _id: 1, nome: 'GTA V' },
    { _id: 2, nome: 'Batman' },
    { _id: 3, nome: 'Starcraft 2' },
];

app.get('/jogos/:id', function (req, res) {
    var jogo = listaJogos.filter(function (j) {
        return j._id == req.params.id;
    })[0];

    if (jogo) {
        var modelo = {
            "jogo": jogo
        };
        res.render("jogo-detalhe", modelo);
    }
    else {
        res.status(404)
            .send('Código de jogo não encontrado');
    }
});


http.createServer(app).listen(3000, function () {
    console.log('Servidor Express está rodando');
});