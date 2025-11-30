import Impressor from "../interfaces/impressor";
import Hospedagem from "../modelos/hospedagem";

export default class ImpressorHospedagem implements Impressor {
    private hospedagem: Hospedagem

    constructor(hospedagem: Hospedagem) {
        this.hospedagem = hospedagem
    }

    imprimir(): string {
        const clienteNome = this.hospedagem.Cliente.Nome; 
        const acomodacaoNome = this.hospedagem.Acomodacao?.NomeAcomadacao; 
        return `| Cliente: ${clienteNome}\n` +
            `| Acomodação: ${acomodacaoNome}\n`;
    }
}