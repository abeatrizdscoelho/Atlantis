import { acomodacaoRepository } from "../repositories/acomodacaoRepository";

export const acomodacaoService = {
  async listar() {
    return await acomodacaoRepository.findAll()
  },

  async buscar(id: number) {
    const acomodacao = await acomodacaoRepository.findById(id)
    if (!acomodacao) throw new Error("NOT_FOUND")
    return acomodacao;
  },

  async criar(data: any) {
    const payload = {
      nome: data.nome,
      camaCasal: Number(data.camaCasal),
      camaSolteiro: Number(data.camaSolteiro),
      climatizacao: Boolean(data.climatizacao),
      garagem: Number(data.garagem),
      suite: Number(data.suite),
    }

    return await acomodacaoRepository.create(payload)
  },

  async atualizar(id: number, data: any) {
    await this.buscar(id)

    const payload = {
      nome: data.nome,
      camaCasal: Number(data.camaCasal),
      camaSolteiro: Number(data.camaSolteiro),
      climatizacao: Boolean(data.climatizacao),
      garagem: Number(data.garagem),
      suite: Number(data.suite),
    }

    return await acomodacaoRepository.update(id, payload)
  },

  async excluir(id: number) {
    await this.buscar(id)
    return await acomodacaoRepository.delete(id)
  }
}
