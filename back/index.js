const express = require('express')
const app = express()
const port = 3000;
const csv = require('node-csv').createParser();
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

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});