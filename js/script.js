function validarForm(){
    var mercadoria = document.getElementById("mercadoria").value;
    if(mercadoria == ""){
        var divMercadoria = document.getElementById("divMercadoria");
        divMercadoria.innerHTML = "Preencha o nome da mercadoria";
    }
    
    var valor = document.getElementById("valor").value;
    if(valor == ""){
        var divValor = document.getElementById("divValor");
        divValor.innerHTML = "Preencha o valor"
    }
}

function convert(){
    var valor = document.getElementById("valor").value;
    var valorFormatado = Intl.NumberFormat('pt-br', {style: 'currency', currency: 'BRL'}).format(valor);
    valorFormatado.innerHTML = document.getElementById("valor").value;
    console.log(valorFormatado);
}

