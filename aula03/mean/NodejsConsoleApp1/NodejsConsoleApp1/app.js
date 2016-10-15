var http = require('http');
var express = require('express');
var engine = require('ejs-mate');

var app = express();
app.engine('ejs', engine);
app.use(express.static('./public'));
app.set('view engine', 'ejs');
app.set('views', './views');

var MongoClient = require('mongodb').MongoClient;
var db = null;

MongoClient.connect('mongodb://127.0.0.1/test', function (erro, instancia) {
    if (erro)
        console.log("Erro ao estabelecer uma conexão com o db: " + erro);
    else {
        db = instancia;
        http.createServer(app).listen(3000, function () {
            console.log('servidor express esta aqui');
        });
    }
});

app.get('/jogos/no-mans-sky', function (req, res) {
    var modelo = {
        "nome": "No man's sky"
    };
    res.render('jogos', modelo);
});

var listaJogos = [
    { _id: 1, nome: 'Guitar Hero' },
    { _id: 2, nome: 'Forza Horizon' },
    { _id: 3, nome: 'Halo' }
];

app.get('/jogos', function (req, res) {
    //var modelo = {
    //    "listaJogos": listaJogos
    //};
    //res.render('jogos', modelo);
    db.collection("jogos")
        .find()
        .toArray(function (erro, jogos) {
            if (!erro)
                res.render("jogos", { "listaJogos": jogos });
            else
                res.status(500);
        });
});

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
    else
        res.status(404)
            .send('Código de jogo não encontrado');
});

app.get('/novo', function (req, res) {
    res.render("novo");
});
//http.createServer(app).listen(3000, function () {
//    console.log('servidor express esta aqui');
//});

//http.createServer(function (req, res) {
//    res.writeHead(200, { 'Content-Type': 'text/plain' });
//    res.end('Hello World\n');
//}).listen(3000);