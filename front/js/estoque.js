$(document).ready(function(){

console.log("clicou");

var url = "http://localhost:3000/estoque";

$("#listagem").empty();

    $.getJSON(url, function(dados){
        //console.log(dados);

        dados.forEach(function(item, index){
            var linha = "<tr>";

            linha += "<td>" + index + "</td>";
            linha += "<td>" + item.nota + "</td>";
            linha += "<td>" + item.produto + "</td>";
            linha += "<td>" + item.quantidade + "</td>";
            linha += "<td>" + item.destino + "</td>";
            linha += "<td>";
            linha += "<a href='http://localhost:3000/estoque-del/" + item._id + "' class='btn btn-danger btn-sm'>X</a>";
            linha += "<button codigo='"+ item._id +"' class='btn-editar btn btn-primary btn-sm'>E</button>";
            linha += "</td>";

            linha += "</tr>";

            $("#listagem").append(linha);

        });

        //abrir modal
        $(".btn-editar").click(function(){

            console.log(this);

            const id = $(this).attr("codigo");
            const modalEditar = new bootstrap.Modal("#modal-editar");
            modalEditar.show();


            $.getJSON(url+"/"+id, function (dados) {
                
                $("#codigo").val(dados._id);
                $("#nota").val(dados.nota);
                $("#produto").val(dados.produto);
                $("#quantidade").val(dados.quantidade);
                $("#destino").val(dados.destino);
            });
        });
        //fim btn-carregar


    });

    //salvar alteracoes
    $("#btn-salvar").click(function(){

        $("#form-editar").submit();

    });//fim btn-salvar


});