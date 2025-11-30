import Impressor from "../interfaces/impressor"
import Cliente from "../modelos/cliente"

export default class ImpressorClienteResumo implements Impressor {
    private cliente: Cliente
    constructor(cliente: Cliente) {
        this.cliente = cliente
    }

    // Imprime só o nome do Cliente Titular e o Dependente 
    imprimir(): string {
        const tipo = this.cliente.Titular ? "Dependente" : "Titular"
        return `Nome: ${this.cliente.Nome} (${tipo})`
    }
}