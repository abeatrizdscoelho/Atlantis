const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

export type ClienteDTO = {
  id?: number 
  nome: string
  nomeSocial: string | null
  nascimento: Date
  doc: string
  telefone: string | null
  cep: string | null
  rua: string | null
  numero: string | null
  bairro: string | null
  cidade: string | null
  estado: string | null
  complemento: string | null
  clienteType: 'Titular' | 'Dependente'
  titularId: number | null
}

export async function listarClientes() {
  const res = await fetch(`${API_BASE}/clientes`)
  if (!res.ok) throw new Error('Erro ao listar clientes.')
  return res.json()
}

export async function criarCliente(data: any) {
  const res = await fetch(`${API_BASE}/clientes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Erro ao criar cliente.')
  return res.json()
}

export async function buscarCliente(id: number) {
  const res = await fetch(`${API_BASE}/clientes/${id}`)
  if (!res.ok) throw new Error('Cliente não encontrado.')
  return res.json()
}

export async function atualizarCliente(id: number, data: any) {
  const res = await fetch(`${API_BASE}/clientes/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Erro ao atualizar cliente.')
  return res.json()
}

export async function alterarStatusCliente(id: number) {
  const res = await fetch(`${API_BASE}/clientes/status/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' }
  });
  if (!res.ok) throw new Error('Erro ao alterar status do cliente.')
  return res.json()
}