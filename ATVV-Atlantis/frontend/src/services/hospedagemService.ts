const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

export type HospedagemDTO = {
  clienteId: number;
  acomodacaoId: number;
  checkIn: Date;
  checkOut: Date;
  dataCheckIn?: Date;
  dataCheckOut?: Date;
}

export async function listarHospedagens(): Promise<HospedagemDTO[]> {
  const res = await fetch(`${API_BASE}/hospedagens`)
  if (!res.ok) throw new Error('Erro ao listar hospedagens.')
  return res.json()
}

export async function criarHospedagem(data: HospedagemDTO) {
  const res = await fetch(`${API_BASE}/hospedagens`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error('Erro ao criar hospedagem.')
  return res.json()
}

export async function buscarHospedagem(id: number) {
  const res = await fetch(`${API_BASE}/hospedagens/${id}`)
  if (!res.ok) throw new Error('Hospedagem não encontrada.')
  return res.json()
}

export async function atualizarHospedagem(id: number, data: HospedagemDTO) {
  const res = await fetch(`${API_BASE}/hospedagens/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error('Erro ao atualizar hospedagem.')
  return res.json()
}

export async function excluirHospedagem(id: number) {
  const res = await fetch(`${API_BASE}/hospedagens/${id}`, { method: 'DELETE' })
  if (!res.ok) throw new Error('Erro ao excluir hospedagem.')
  return
}

export async function realizarCheckIn(id: number) {
  const res = await fetch(`${API_BASE}/hospedagens/${id}/checkin`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
  });
  if (!res.ok) throw new Error('Erro ao realizar check-in.')
  return res.json()
}

export async function realizarCheckOut(id: number) {
  const res = await fetch(`${API_BASE}/hospedagens/${id}/checkout`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
  });
  if (!res.ok) throw new Error('Erro ao realizar check-out.')
  return res.json()
}
