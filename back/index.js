const express = require('express')
const app = express()
const port = 3000;
const csv = require('node-csv').createParser();
const sha1 = require('sha1');

const multer  = require('multer')
const upload = multer({ dest: 'fotos/' })
var cors = require('cors')

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const mongodb = require('mongodb'); // incluiu essa linha

const url_mongo = "mongodb+srv://<user>:<pass>@cluster0.9qxoixq.mongodb.net/?retryWrites=true&w=majority";

const conexao = new mongodb.MongoClient(url_mongo);
const estoque = conexao.db("sysexp").collection("estoque");

//Importando módulo ObjectId
const ObjectId = mongodb.ObjectId;

//CRUD
//Create
//Read
//Update
//Delete

app.post("/entradas", function(req, res){

});

app.get("/entradas", function(req,res){
    csv.parseFile("estoque.csv", function(erro, valores){
        res.json(valores);
    })
});

//route
app.get("/estoque", async function(req, res){
    const resultado = await estoque.find({}).toArray();
    //res.send("Oi");
    res.json(resultado);
});

app.get("/estoque-csv", async function(req, res){
    
    const resultado = await estoque.find({}).toArray();
    
    var arquivocsv = "id,nota,destino,produto,quantidade\n";

    resultado.forEach(function(item) {
        arquivocsv += item._id + "," + item.nota + "," + item.destino + ","
                   + item.produto + "," + item.quantidade + "\n";
    });

    res.append("content-type", "text/csv");
    res.send(arquivocsv);

});

//route dynamic
app.get("/estoque/:id", async function(req, res){
    
    const id = new ObjectId( req.params.id );

    //const resultado = await estoque.find({_id: id}).toArray();
    const resultado = await estoque.findOne({_id: id});
    res.json(resultado);

});

//Cadastra novo Item
app.post("/estoque-add", upload.single("fotos"), async function(req, res){

    res.json(req.file);

    const resultado = await estoque.insertOne(req.body);
    const origem = req.get("Referer");
    res.redirect(origem);

});

//Altera Item
app.post("/estoque-up/", async function(req, res){

    const codigo = new ObjectId( req.body.codigo );

    const dados = {
        $set: {
            nota: req.body.nota,
            produto: req.body.produto,
            quantidade: req.body.quantidade,
            produto: req.body.produto
        }
    };
    const resultado = await estoque.updateOne({_id: codigo}, dados);
    const origem = req.get("Referer");
    res.redirect(origem);

});


//Deleta Item
app.get("/estoque-del/:id", async function(req, res){

    const id = new ObjectId( req.params.id );
    const resultado = await estoque.deleteOne({_id: id});
    //res.json(resultado);
    const origem = req.get("Referer");
    res.redirect(origem);
    
});

app.post("/login", async function(req,res){

    var usuario = req.body.email;
    var senha = req.body.senha;

    var hash = sha1(senha);

    const usuarios = conexao.db("sysexp").collection("usuarios");

    var logado = await usuarios.findOneAndUpdate(
        {_id: usuario, senha: hash},
        {$currentDate: {ultimoLogin: true}}
    );

    if(logado.value != null){
        res.send({status: "ok"});
    } else {
        res.send({status: "erro", "mensagem": "Usuário ou senha não encontrados"});
    }

});

app.listen(port, () => {
    console.log(`Rodando o servidor na porta  ${port}`)
});