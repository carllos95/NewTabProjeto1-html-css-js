//criar objeto com respectivos valores "tipo" "mercadoria" "valor"
class Transacoes{
    constructor(tipo, mercadoria, valor){
        this.tipo = tipo
        this.mercadoria = mercadoria
        this.valor = valor
    }
    // função para a validação dos campos
    validarDados(){
        for (let i in this) {
           if(this[i] === undefined || this[i] === "" || this[i] === null){
                return false;
           }
        }
        return true;
    }
}
// class responsavel por gravar os dados no localstorage, através de um construtor
// onde é setado um id inicial (id = 0). A verficação ocorre nessa variavel id, fazendo com que exista um ID para cada
// novo dado que é adicionado ao localStorage.
// claa Bd, comporta a classe gravar() e a classe getProximoId(), recuperarDadosTabela()
class Bd{
    constructor(){
        let id = localStorage.getItem('id');

        if(id === null){
            localStorage.setItem('id', 0)
        }
    }

    //getItem = verificar/pegar se o objeto já existe no localStorage
    getProximoId(){
        let proximoId = localStorage.getItem('id');
        return parseInt(proximoId) + 1
    }
    
    //setItem = gravar o objeto no localStorage "gravar(t = seletor da variavel)"
    gravar(t){
        let id = this.getProximoId()

        localStorage.setItem(id, JSON.stringify(t))
        localStorage.setItem('id', id)
    }
    // recuperar os dados que estão salvos no localStorage, por meio dos IDs
    recuperarDadosTabela(){

        //array de transações
        let transacoes = Array()

        let id = localStorage.getItem('id');

        //recuperar os dados de cada campo que tenha um respectivo id no localStorage
        for(let i = 1; i <= id; i++){
            //recuperar respectivos dados
            let transacao = JSON.parse(localStorage.getItem(i));

            transacoes.push(transacao)
        }
        return transacoes;
    }
}
// variavel global chamando a class Bd
let bd = new Bd();
//buscar Values dos campos select e input, por meio do ID - cadastrar transacoes
function cadastrarTransacoes(){
    let tipo = document.getElementById('tipo');
    let mercadoria = document.getElementById('mercadoria');
    let valor = document.getElementById('valor');
    //chamar a classe/construtor referenciando os IDs dos campos/valores
    let transacoes = new Transacoes(
        tipo.value, 
        mercadoria.value, 
        valor.value
    )
    // metodo para validação do formulario
    if(transacoes.validarDados()){
        //função para gravar as transações no localStorage
        bd.gravar(transacoes);
        alert('Cadastrado com sucesso!')
        carregarTabela()
    }
    else{
        alert('Preencha os campos corretamente!')
    }
}
// função responsavel por carregar os dados que estão armazenados no localStorage
function carregarTabela(){
    let transacoes = Array();
    // chamar a classe recuperarDadosTabela(), para recuperar os dados salvos no localStorage
    transacoes = bd.recuperarDadosTabela();
    // chamar o id referente ao tbody da tabela
    var listarTabela = document.getElementById('listarTabela')
    listarTabela.innerHTML = transacoes.map((tr)=>{
        if(tr.tipo != "Venda"){
        return `<tr>
            <td class='symbol-table-config'>-</td>
            <td class='align-text-left'>`+ tr.mercadoria +`</td>
            <td class='align-text-right'>R$ `+ tr.valor +`</td>
            </tr>
            <tr>
            <td colspan='3' class='border-between-row'></td>
            </tr>`
        }
        else{
            return `<tr>
            <td class='symbol-table-config'>+</td>
            <td class='align-text-left'>`+ tr.mercadoria +`</td>
            <td class='align-text-right'>R$ `+ tr.valor +`</td>
            </tr>
            <tr>
            <td colspan='3' class='border-between-row'></td>
            </tr>`
        }
    }).join('')  
}
var total = 0
// função para carregar o total da tabela, referente a posição do item dentro do array
function carregarTabelaTotal(){
    let transacoes = Array();
    // chamar a classe recuperarDadosTabela(), para recuperar os dados salvos no localStorage
    transacoes = bd.recuperarDadosTabela();
    // chamar o id referente ao tbody da tabela
    t = 0
    var totalArrayVenda = []
    var totalNumberVenda = []

    var totalNumberCompra = []
    var totalArrayCompra = []

    var totalVenda = 0
    var totalCompra = 0
    for(i = 0; i < transacoes.length; i++){
        if(transacoes[i].tipo == "Compra"){
        totalArrayCompra = [transacoes[i].valor.replace(/\D/g, '')]
        totalNumberCompra = Number.parseFloat(totalArrayCompra)
        totalCompra += totalNumberCompra
        }  
    }
    for(; t < transacoes.length; t++){
        if(transacoes[t].tipo == "Venda"){
        totalArrayVenda = [transacoes[t].valor.replace(/\D/g, '')]
        totalNumberVenda = Number.parseFloat(totalArrayVenda)
        totalVenda += totalNumberVenda
        }  
    }
    total = totalVenda - totalCompra
}
// função para carregar o total da tabela
function carregarTotal(){
    carregarTabelaTotal()
    var recebeTotal = document.getElementById("recebeTotal")
    formatarMoeda()
    var lucroPrejuizo = document.getElementById("lucroPrejuizo")
    recebeTotal.innerHTML = "R$ " + totalFormatado
    // se o total for maior que zero, será lucro
    if(total > 0){
        lucroPrejuizo.innerHTML = "[Lucro]"
    }
    // se o total for menor que zero, será prejuizo
    else if(total < 0){
        lucroPrejuizo.innerHTML = "[Prejuizo]"
    }
    // se for neutro, ele deixará em branco
    else{
        lucroPrejuizo.innerHTML = ""
    }
}
// função para formatação da mascara total, que será exibida no campo total da tabela
function formatarMoeda(){
    totalFormatado = total;
    totalFormatado = totalFormatado + '';
    totalFormatado = parseInt(totalFormatado.replace(/[\D]+/g, ''));
    totalFormatado = totalFormatado + '';
    totalFormatado = totalFormatado.replace(/([0-9]{2})$/g, ",$1");
    if (totalFormatado.length > 6) {
        totalFormatado = totalFormatado.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");
    }
}
//função para deletar todos os dados do local storage
function deletarTudo(){
    localStorage.clear();
    alert("Registro Excluidos");
    carregarTabela();
    carregarTotal();
}