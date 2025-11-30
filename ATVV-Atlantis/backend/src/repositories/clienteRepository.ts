import prisma from "../../prisma/client";

export const clienteRepository = {
  listar: () =>
    prisma.cliente.findMany({
      include: { dependentes: true },
    }),

  buscar: (id: number) =>
    prisma.cliente.findUnique({
      where: { id },
      include: { dependentes: true, titular: true },
    }),

  criar: (data: any) =>
    prisma.cliente.create({
      data,
    }),

  atualizar: (id: number, data: any) =>
    prisma.cliente.update({
      where: { id },
      data,
    }),

  atualizarStatus: (id: number, novoStatus: string) =>
    prisma.cliente.update({
      where: { id },
      data: { status: novoStatus },
      include: { dependentes: true, titular: true },
    }),
}
