import { Request, Response } from "express";
import { clienteService } from "../services/clienteService";

export const listClientes = async (req: Request, res: Response) => {
  try {
    const clientes = await clienteService.listarClientes()
    res.json(clientes)
  } catch (err) {
    res.status(500).json({ message: "Erro ao listar clientes." })
  }
}

export const getCliente = async (req: Request, res: Response) => {
  const id = Number(req.params.id)

  try {
    const cliente = await clienteService.buscarCliente(id)
    if (!cliente)
      return res.status(404).json({ message: "Cliente não encontrado." })
    res.json(cliente)
  } catch {
    res.status(500).json({ message: "Erro ao buscar cliente." })
  }
}

export const createCliente = async (req: Request, res: Response) => {
  try {
    const cliente = await clienteService.criarCliente(req.body)
    res.status(201).json(cliente)
  } catch (err) {
    res.status(500).json({ message: "Erro ao criar cliente." })
  }
}

export const updateCliente = async (req: Request, res: Response) => {
  const id = Number(req.params.id)

  try {
    const cliente = await clienteService.atualizarCliente(id, req.body)
    res.json(cliente)
  } catch {
    res.status(500).json({ message: "Erro ao atualizar cliente." })
  }
}

export const toggleStatusCliente = async (req: Request, res: Response) => {
  const id = Number(req.params.id)

  try {
    const atualizado = await clienteService.alterarStatus(id)

    if (!atualizado)
      return res.status(404).json({ message: "Cliente não encontrado." })
    res.json(atualizado)
  } catch {
    res.status(500).json({ message: "Erro ao alterar status." })
  }
}
