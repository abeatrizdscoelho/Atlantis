import Processo from "../abstracoes/processo";
import Cliente from "../modelos/cliente";
import Telefone from "../modelos/telefone";

export default class CadastroTelefonesTitular extends Processo {
    private cliente: Cliente
    constructor(cliente: Cliente) {
        super()
        this.cliente = cliente
        this.execucao = true
    }
    
    processar(): void {
        console.log('Iniciando o cadastro de telefones...')
        while (this.execucao) {
            let ddd = this.entrada.receberTexto('Digite o DDD:')
            let numero = this.entrada.receberTexto('Digite o número do telefone:')

            let telefone = new Telefone(ddd, numero)
            this.cliente.Telefones.push(telefone)

            let adicionarOutroTelefone = this.entrada.receberTexto('Deseja adicionar outro telefone? (S/N):')
            if (adicionarOutroTelefone.toUpperCase() !== 'S') {
                this.execucao = false
            } 
        }
    }
}