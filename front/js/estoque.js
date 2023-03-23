$(document).ready(function(){

    //click carregar
    $("#btn-carregar").click(function(){
        console.log("clicou");

        var url = "http://localhost:3000/estoque";
        
        $("#listagem").empty();

        $.getJSON(url, function(dados){
            //console.log(dados);

            dados.forEach(function(item, index){
                var linha = "<tr>";

                linha += "<td>" + index + "</td>";
                linha += "<td>" + item.nota_fiscal + "</td>";
                linha += "<td>" + item.produto + "</td>";
                linha += "<td>" + item.quantidade + "</td>";
                linha += "<td>" + item.destino + "</td>";

                linha += "</tr>";

                $("#listagem").append(linha);

            });


        });

    }); // fim btn carregar

});