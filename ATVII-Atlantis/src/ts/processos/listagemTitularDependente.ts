import Processo from "../abstracoes/processo";
import Armazem from "../dominio/armazem";
import ImpressorCliente from "../impressores/impressorCliente";
import Cliente from "../modelos/cliente";

export default class ListagemTitularDeDependente extends Processo {
    private clientes: Cliente[]
    constructor() {
        super()
        this.clientes = Armazem.InstanciaUnica.Clientes
    }

    processar(): void {
        let dependentes: Cliente[] = []
        this.clientes.forEach(c => dependentes.push(...c.Dependentes))
        console.log('Dependentes cadastrados:')
        dependentes.forEach((d, i) => {
            console.log(`${i + 1} - ${d.Nome}`)
        })

        let indice = this.entrada.receberNumero('Escolha o dependente (digite um número):') - 1
        let dependente = dependentes[indice]

        if (dependente) {
            if (dependente.Titular) {
                console.log(`Titular de ${dependente.Nome}:`)
                let impressor = new ImpressorCliente(dependente.Titular)
                console.log(impressor.imprimir())
            } else {
                console.log(`O dependente ${dependente.Nome} não possui um Titular.`)
            }
        } else {
            console.log('Dependente inválido.')
        }
    }
}
