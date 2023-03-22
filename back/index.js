const express = require('express')
const app = express()
const port = 3000;
const csv = require('node-csv').createParser();

const mongodb = require('mongodb'); // incluiu essa linha

const url_mongo = "mongodb+srv://<user>:<pass>@cluster0.9qxoixq.mongodb.net/?retryWrites=true&w=majority";

const conexao = new mongodb.MongoClient(url_mongo);

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
    const estoque = conexao.db("sysexp").collection("estoque");
    const resultado = await estoque.find({}).toArray();
    //res.send("Oi");
    res.json(resultado);
});

//route dynamic
app.get("/estoque/:id", function(req, res){
    //const estoque = conexao.db("sysexp").collection("estoque");
    //const resultado = await estoque.find({}).toArray();
    res.json(req.params);
    //res.json(resultado);
});


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});
