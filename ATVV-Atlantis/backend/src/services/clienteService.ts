import { clienteRepository } from "../repositories/clienteRepository";

export const clienteService = {
  listarClientes: () => {
    return clienteRepository.listar()
  },

  buscarCliente: async (id: number) => {
    const cliente = await clienteRepository.buscar(id)
    return cliente;
  },

  criarCliente: (data: any) => {
    return clienteRepository.criar(data)
  },

  atualizarCliente: (id: number, data: any) => {
    return clienteRepository.atualizar(id, data)
  },

  alterarStatus: async (id: number) => {
    const cliente = await clienteRepository.buscar(id)
    if (!cliente) return null;

    const novoStatus = cliente.status === "Ativo" ? "Inativo" : "Ativo";

    return clienteRepository.atualizarStatus(id, novoStatus)
  },
}
