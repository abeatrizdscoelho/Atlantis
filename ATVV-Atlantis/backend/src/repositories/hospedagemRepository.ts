import prisma from "../../prisma/client";

export const hospedagemRepository = {
  listar: () =>
    prisma.hospedagem.findMany({
      orderBy: { id: "asc" },
      include: { cliente: true, acomodacao: true },
    }),

  buscar: (id: number) =>
    prisma.hospedagem.findUnique({
      where: { id },
      include: { cliente: true, acomodacao: true },
    }),

  criar: (data: any) =>
    prisma.hospedagem.create({
      data,
    }),

  atualizar: (id: number, data: any) =>
    prisma.hospedagem.update({
      where: { id },
      data,
    }),

  excluir: (id: number) =>
    prisma.hospedagem.delete({
      where: { id },
    }),

  checkIn: (id: number) =>
    prisma.hospedagem.update({
      where: { id, dataCheckIn: null },
      data: { dataCheckIn: new Date() },
    }),

  checkOut: (id: number) =>
    prisma.hospedagem.update({
      where: {
        id,
        dataCheckIn: { not: null },
        dataCheckOut: null,
      },
      data: { dataCheckOut: new Date() },
    }),
}
