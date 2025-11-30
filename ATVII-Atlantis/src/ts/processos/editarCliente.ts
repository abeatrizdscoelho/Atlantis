import Processo from "../abstracoes/processo";
import Armazem from "../dominio/armazem";
import { TipoDocumento } from "../enumeracoes/TipoDocumento";
import ImpressorClienteResumo from "../impressores/impressorClienteResumo";
import Cliente from "../modelos/cliente";
import CadastroCpf from "./cadastroCpf";
import CadastroEnderecoTitular from "./cadastroEnderecoTitular";
import CadastroPassaporte from "./cadastroPassaporte";
import CadastroRg from "./cadastroRg";

export default class EditarCliente extends Processo {
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

        let indice = this.entrada.receberNumero('Escolha o cliente que deseja editar (digite um número):') - 1
        let cliente = this.clientes[indice]

        if (cliente) {
            let novoNome = this.entrada.receberTexto('Digite o novo nome do cliente:')
            let novoNomeSocial = this.entrada.receberTexto('Digite o novo nome social do cliente:')
            let novaDataNascimento = this.entrada.receberData('Digite a nova data de nascimento do cliente:')
            cliente.Nome = novoNome
            cliente.NomeSocial = novoNomeSocial
            cliente.DataNascimento = novaDataNascimento

            if (cliente.Documentos.length > 0) {
                let editarDocumentos = this.entrada.receberTexto('Deseja editar os documentos? (S/N):')
                if (editarDocumentos.toUpperCase() === 'S') {
                    cliente.Documentos.forEach((doc, i) =>
                        console.log(`${i + 1} - ${doc.Tipo}: ${doc.Numero}`)
                    )
                    let docIndice = this.entrada.receberNumero('Escolha o documento:') - 1
                    let documento = cliente.Documentos[docIndice];
                    if (documento) {
                        if (documento.Tipo === TipoDocumento.RG) {
                            this.processo = new CadastroRg(cliente)
                        } else if (documento.Tipo === TipoDocumento.CPF) {
                            this.processo = new CadastroCpf(cliente)
                        } else if (documento.Tipo === TipoDocumento.Passaporte) {
                            this.processo = new CadastroPassaporte(cliente)
                        }
                        this.processo.processar()
                    } else {
                        console.log('Documento inválido.')
                    }
                }
            }

            if (!cliente.Titular) {
                let editarTelefones = this.entrada.receberTexto('Deseja editar os telefones? (S/N):')
                if (editarTelefones.toUpperCase() === 'S') {
                    cliente.Telefones.forEach((tel, i) =>
                        console.log(`${i + 1} - (${tel.Ddd}) ${tel.Numero}`)
                    )
                    let telIndice = this.entrada.receberNumero('Escolha o telefone:') - 1
                    let telefone = cliente.Telefones[telIndice]
                    if (telefone) {
                        let novoDdd = this.entrada.receberTexto('Digite o novo DDD:')
                        if (novoDdd) telefone['ddd'] = novoDdd;
                        let novoNumero = this.entrada.receberTexto('Digite o novo número:')
                        if (novoNumero) telefone['numero'] = novoNumero
                    } else {
                        console.log('Telefone inválido.')
                    }
                }

                let editarEndereco = this.entrada.receberTexto('Deseja editar o endereço? (S/N):')
                if (editarEndereco.toUpperCase() === 'S') {
                    this.processo = new CadastroEnderecoTitular(cliente)
                    this.processo.processar()
                }

            } else {
                console.log('\n(O cliente selecionado é um dependente, então herda endereço e telefones do titular.)')
            }

            console.log('Cliente editado com sucesso!')

        } else {
            console.log('Cliente inválido.')
        }
    }
}