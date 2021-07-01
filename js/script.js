//criar objeto com respectivos valores "tipo" "mercadoria" "valor"
class Transacoes{
    constructor(tipo, mercadoria, valor){
        this.tipo = tipo
        this.mercadoria = mercadoria
        this.valor = valor
    }

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
function carregarTabelaTotal(){
    let transacoes = Array();
    // chamar a classe recuperarDadosTabela(), para recuperar os dados salvos no localStorage
    transacoes = bd.recuperarDadosTabela();
    // chamar o id referente ao tbody da tabela
    t = 0
    var totalArray = []
    var totalNumber = []
    var totalVenda = 0
    var totalCompra = 0
    
    for(; t < transacoes.length; t++){
        if(transacoes[t].tipo == "Venda"){
        totalArray = [transacoes[t].valor.replace(/\D/g, '')]
        totalNumber = Number.parseFloat(totalArray)
        totalVenda += totalNumber
        }  
    }
    for(i = 0; i < transacoes.length; i++){
        if(transacoes[i].tipo == "Compra"){
        totalArray = [transacoes[i].valor.replace(/\D/g, '')]
        totalNumber = Number.parseFloat(totalArray)
        totalCompra += totalNumber
        }  
    }
    total = totalVenda - totalCompra
}
function carregarTotal(){
    carregarTabelaTotal()
    var recebeTotal = document.getElementById("recebeTotal")
    recebeTotal.innerHTML = "R$ " + total
}
