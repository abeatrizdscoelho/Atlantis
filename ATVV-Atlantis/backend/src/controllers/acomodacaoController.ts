import { Request, Response } from "express";
import { acomodacaoService } from "../services/acomodacaoService";

export const listAcomodacoes = async (req: Request, res: Response) => {
  try {
    const acomodacoes = await acomodacaoService.listar()
    res.json(acomodacoes)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Erro ao listar acomodações." })
  }
}

export const getAcomodacao = async (req: Request, res: Response) => {
  const { id } = req.params

  try {
    const acomodacao = await acomodacaoService.buscar(Number(id))
    if (!acomodacao)
      return res.status(404).json({ message: "Acomodação não encontrada." })
    res.json(acomodacao)
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erro ao buscar acomodação." })
  }
}

export const createAcomodacao = async (req: Request, res: Response) => {
  try {
    const nova = await acomodacaoService.criar(req.body)
    res.status(201).json(nova)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Erro ao criar acomodação." })
  }
}

export const updateAcomodacao = async (req: Request, res: Response) => {
  const { id } = req.params

  try {
    const atualizada = await acomodacaoService.atualizar(Number(id), req.body)
    res.json(atualizada)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Erro ao atualizar acomodação." })
  }
}

export const deleteAcomodacao = async (req: Request, res: Response) => {
  const { id } = req.params

  try {
    await acomodacaoService.excluir(Number(id))
    res.status(204).send()
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Erro ao excluir acomodação." })
  }
}
