import { hospedagemRepository } from "../repositories/hospedagemRepository";

const calcularStatus = (hospedagem: any): string => {
  if (hospedagem.dataCheckOut) return "Concluída";
  if (hospedagem.dataCheckIn) return "Ativa";
  return "Pendente";
}

export const hospedagemService = {
  listarHospedagens: async () => {
    const hospedagens = await hospedagemRepository.listar()

    return hospedagens.map((h) => ({
      id: h.id,
      clienteNome: h.cliente.nome,
      clienteType: h.cliente.clienteType,
      acomodacaoNome: h.acomodacao.nome,
      checkIn: h.checkIn,
      dataCheckIn: h.dataCheckIn,
      dataCheckOut: h.dataCheckOut,
      status: calcularStatus(h),
    }))
  },

  buscarHospedagem: async (id: number) => {
    const hospedagem = await hospedagemRepository.buscar(id)
    if (!hospedagem) return null;

    return {
      ...hospedagem,
      clienteNome: hospedagem.cliente.nome,
      acomodacaoNome: hospedagem.acomodacao.nome,
      status: calcularStatus(hospedagem),
    };
  },

  criarHospedagem: (data: any) => {
    return hospedagemRepository.criar(data)
  },

  atualizarHospedagem: (id: number, data: any) => {
    return hospedagemRepository.atualizar(id, data)
  },

  excluirHospedagem: (id: number) => {
    return hospedagemRepository.excluir(id)
  },

  checkIn: (id: number) => {
    return hospedagemRepository.checkIn(id)
  },

  checkOut: (id: number) => {
    return hospedagemRepository.checkOut(id)
  },
}
