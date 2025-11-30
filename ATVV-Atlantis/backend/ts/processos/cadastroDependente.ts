import Processo from "../abstracoes/processo";
import Armazem from "../dominio/armazem";
import Cliente from "../modelos/cliente";
import CadastrarDocumentosCliente from "./cadastroDocumentosCliente";

export default class CadastroDependente extends Processo {
    processar(): void {
        console.log('Iniciado o cadastro de um novo dependente...')

        let armazem = Armazem.InstanciaUnica
        let nomeTitular = this.entrada.receberTexto('Informe o nome completo do titular:')
        let titular = armazem.Clientes.find(cliente => cliente.Nome === nomeTitular)

        if (titular) {
            let nome = this.entrada.receberTexto('Qual o nome do dependente?')
            let nomeSocial = this.entrada.receberTexto('Qual o nome social do dependente?')
            let dataNascimento = this.entrada.receberData('Qual a data de nascimento do dependente?')
            let dependente = new Cliente(nome, nomeSocial, dataNascimento)

            this.processo = new CadastrarDocumentosCliente(dependente)
            this.processo.processar()

            armazem.Clientes.push(dependente)
            titular.adicionarDependente(dependente)
            console.log('Dependente cadastrado com sucesso!')

        } else {
            console.log('Titular não encontrado.')
        }
        console.log('Finalizando o cadastro do dependente...')
    }
}