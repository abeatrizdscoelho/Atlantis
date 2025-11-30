import Processo from "../abstracoes/processo";
import Armazem from "../dominio/armazem";
import ImpressorClienteResumo from "../impressores/impressorClienteResumo";
import Cliente from "../modelos/cliente";

export default class ExcluirCliente extends Processo {
    private clientes: Cliente[]
    constructor() {
        super()
        this.clientes = Armazem.InstanciaUnica.Clientes
    }

    processar(): void {
        console.log('Clientes cadastrados:')
        this.clientes.forEach((c, i) => {
            const impressor = new ImpressorClienteResumo(c)
            console.log(`${i + 1} - ${impressor.imprimir()}\n`)
        })

        let indice = this.entrada.receberNumero('Escolha o cliente que deseja remover (digite um número):') - 1
        let cliente = this.clientes[indice]

        if (cliente) {
            if (cliente.Dependentes.length > 0) {
                while (cliente.Dependentes.length > 0) {
                    let dependentes = cliente.Dependentes[0]
                    dependentes.Titular = undefined!
                    cliente.removerDependente(dependentes)
                }
            }
            this.clientes.splice(indice, 1)
            console.log('Cliente excluído com sucesso!')
        } else {
            console.log('Cliente inválido.')
        }
    }
}