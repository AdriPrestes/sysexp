
$(document).ready(function(){

    //trava se o usuario não estiver logado
    var usuario = sessionStorage.getItem("usuario");
    if(usuario == null){
        location.href = "login.html";
    }

    //atualiza data e hora
    function exibeData()
    {
        console.log("altera data");
        var dia = new Date();
        var mes = dia.getMonth() + 1;
        var dataFormatada = dia.getDate() + "/" + mes + "/" + dia.getFullYear() + " " 
                + dia.getHours() + ":" + dia.getMinutes() + ":" + dia.getSeconds();
    
        //equivalente ao innerHTML
        $("#data-hora").html(dataFormatada);
    
    }

    setInterval(exibeData, 500);

    //deslogar
    $("#btn-logout").click(function(){
        sessionStorage.clear();
        location.href = "login.html";
    });


});

