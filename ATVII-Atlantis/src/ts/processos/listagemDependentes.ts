import Processo from "../abstracoes/processo"
import Armazem from "../dominio/armazem"
import ImpressorCliente from "../impressores/impressorCliente"
import ImpressorClienteResumo from "../impressores/impressorClienteResumo"
import Cliente from "../modelos/cliente"

export default class ListagemDependentesDeTitular extends Processo {
    private clientes: Cliente[]
    constructor() {
        super()
        this.clientes = Armazem.InstanciaUnica.Clientes
    }

    processar(): void {
        console.log('Clientes titulares cadastrados:')
        this.clientes.forEach((c, i) => {
            if (!c.Titular) {
                const impressor = new ImpressorClienteResumo(c)
                console.log(`${i + 1} - ${impressor.imprimir()}\n`)
            }
        })

        let indice = this.entrada.receberNumero('Escolha o titular (digite um número):') - 1
        let titular = this.clientes[indice]

        if (titular) {
            console.log('Dependentes cadastrados:')
            if (titular.Dependentes.length > 0) {
                titular.Dependentes.forEach(dep => {
                    let impressor = new ImpressorCliente(dep)
                    console.log(impressor.imprimir())
                })
            } else {
                console.log(`O titular ${titular.Nome} não possui dependentes.`)
            }
        } else {
            console.log('Titular inválido.')
        }
    }   
} 
