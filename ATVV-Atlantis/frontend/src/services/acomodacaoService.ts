const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

export type AcomodacaoDTO = {
  id?: number;
  nome: string;
  camaCasal: number;
  camaSolteiro: number;
  climatizacao: boolean;
  garagem: number;
  suite: number;
}

export async function listarAcomodacoes(): Promise<AcomodacaoDTO[]> {
  const res = await fetch(`${API_BASE}/acomodacoes`)
  if (!res.ok) throw new Error('Erro ao listar acomodações.')
  return res.json()
}

export async function criarAcomodacao(data: AcomodacaoDTO) {
  const res = await fetch(`${API_BASE}/acomodacoes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error('Erro ao criar acomodação.')
  return res.json()
}

export async function buscarAcomodacao(id: number) {
  const res = await fetch(`${API_BASE}/acomodacoes/${id}`)
  if (!res.ok) throw new Error('Acomodação não encontrada.')
  return res.json()
}

export async function atualizarAcomodacao(id: number, data: AcomodacaoDTO) {
  const res = await fetch(`${API_BASE}/acomodacoes/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error('Erro ao atualizar acomodação.')
  return res.json()
}

export async function excluirAcomodacao(id: number) {
  const res = await fetch(`${API_BASE}/acomodacoes/${id}`, { method: 'DELETE' })
  if (!res.ok) throw new Error('Erro ao excluir acomodação.')
  return
}