import Processo from "../abstracoes/processo";
import Armazem from "../dominio/armazem";
import Cliente from "../modelos/cliente";
import ImpressorClienteResumo from "../impressores/impressorClienteResumo";
import ListagemAcomodacoes from "./listagemAcomodacoes";
import Hospedagem from "../modelos/hospedagem";

export default class CadastroHospedagem extends Processo {
    private clientes: Cliente[];
    constructor() {
        super();
        this.clientes = Armazem.InstanciaUnica.Clientes.filter(c => !c.Titular);
        this.execucao = true
    }

    processar(): void {
        console.log("Iniciando o cadastro de hospedagem...");

        console.log("\nClientes disponíveis para hospedagem:");
        this.clientes.forEach((cliente, index) => {
            const impressor = new ImpressorClienteResumo(cliente);
            console.log(`${index + 1} - ${impressor.imprimir()}`);
        });

        const indiceCliente = this.entrada.receberNumero("\nDigite o número do cliente: ");
        const clienteEscolhido = this.clientes[indiceCliente - 1];

        if (!clienteEscolhido) {
            console.log("Cliente inválido!");
            return;
        }

        const hospedado = Armazem.InstanciaUnica.Hospedagem.some(h => h.Cliente === clienteEscolhido)
        if (hospedado) {
            console.log(`${clienteEscolhido.Nome} já está hospedado!`);
            return;
        }

        console.log("\nAcomodações disponíveis:");
        const listagemAcomodacoes = new ListagemAcomodacoes();
        listagemAcomodacoes.processar();

        const acomodacoesDisponiveis = Armazem.InstanciaUnica.Acomodacoes;

        const indiceAcomodacao = this.entrada.receberNumero("\nDigite o número da acomodação: ");
        const acomodacaoEscolhida = acomodacoesDisponiveis[indiceAcomodacao - 1];

        if (!acomodacaoEscolhida) {
            console.log("Acomodação inválida!");
            return;
        }

        const hospedagem = new Hospedagem(clienteEscolhido, acomodacaoEscolhida);
        Armazem.InstanciaUnica.Hospedagem.push(hospedagem);
            
        console.log(`${clienteEscolhido.Nome} foi hospedado na ${acomodacaoEscolhida.NomeAcomadacao} com sucesso!`);
    }
}
