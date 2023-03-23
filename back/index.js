const express = require('express')
const app = express()
const port = 3000;
const csv = require('node-csv').createParser();

var cors = require('cors')

app.use(cors());

const mongodb = require('mongodb'); // incluiu essa linha

const url_mongo = "mongodb+srv://<user>:<password>@cluster0.9qxoixq.mongodb.net/?retryWrites=true&w=majority";

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

//route dynamic
app.get("/estoque/:id", async function(req, res){
    
    const id = new ObjectId( req.params.id );

    //const resultado = await estoque.find({_id: id}).toArray();
    const resultado = await estoque.findOne({_id: id});
    res.json(resultado);

});


app.listen(port, () => {
    console.log(`Rodando o servidor na porta  ${port}`)
});

/*
var abc = function(){

}
é o mesmo que
var abc = () =>{

}
*/