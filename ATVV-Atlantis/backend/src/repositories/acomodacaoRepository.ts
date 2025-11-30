import prisma from '../../prisma/client';

export const acomodacaoRepository = {
  findAll() {
    return prisma.acomodacao.findMany({ orderBy: { id: 'asc' } })
  },

  findById(id: number) {
    return prisma.acomodacao.findUnique({ where: { id } })
  },

  create(data: any) {
    return prisma.acomodacao.create({ data })
  },

  update(id: number, data: any) {
    return prisma.acomodacao.update({ where: { id }, data })
  },

  delete(id: number) {
    return prisma.acomodacao.delete({ where: { id } })
  }
}
