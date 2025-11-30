import { Request, Response } from "express";
import { hospedagemService } from "../services/hospedagemService";

export const listHospedagens = async (req: Request, res: Response) => {
  try {
    const hospedagens = await hospedagemService.listarHospedagens()
    res.json(hospedagens)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Erro ao listar hospedagens." })
  }
}

export const getHospedagem = async (req: Request, res: Response) => {
  const id = Number(req.params.id)

  try {
    const hospedagem = await hospedagemService.buscarHospedagem(id)
    if (!hospedagem)
      return res.status(404).json({ message: "Hospedagem não encontrada." })
    res.json(hospedagem)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Erro ao buscar hospedagem." })
  }
}

export const createHospedagem = async (req: Request, res: Response) => {
  try {
    const nova = await hospedagemService.criarHospedagem(req.body)
    res.status(201).json(nova)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Erro ao criar hospedagem." })
  }
}

export const updateHospedagem = async (req: Request, res: Response) => {
  const id = Number(req.params.id)

  try {
    const atualizada = await hospedagemService.atualizarHospedagem(id, req.body)
    res.json(atualizada)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Erro ao atualizar hospedagem." })
  }
}

export const deleteHospedagem = async (req: Request, res: Response) => {
  const id = Number(req.params.id)

  try {
    await hospedagemService.excluirHospedagem(id)
    res.status(204).send()
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Erro ao excluir a hospedagem." })
  }
}

export const checkInHospedagem = async (req: Request, res: Response) => {
  const id = Number(req.params.id)

  try {
    const updated = await hospedagemService.checkIn(id)
    res.json(updated)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Erro ao realizar check-in." })
  }
}

export const checkOutHospedagem = async (req: Request, res: Response) => {
  const id = Number(req.params.id)

  try {
    const updated = await hospedagemService.checkOut(id)
    res.json(updated)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Erro ao realizar check-out." })
  }
}
