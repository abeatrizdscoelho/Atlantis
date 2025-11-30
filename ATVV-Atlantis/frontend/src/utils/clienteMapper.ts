import type { ClienteDTO } from "../services/clienteService";
import type { Cliente, ClienteFormData } from "../types/cliente";

export function mapClienteToForm(cliente: Cliente): ClienteFormData {
  return {
    nome: cliente.nome,
    nomeSocial: cliente.nomeSocial || '',
    nascimento: cliente.nascimento.split('T')[0],
    doc: cliente.doc,
    telefone: cliente.telefone || '',
    endereco: {
      cep: cliente.cep || '',
      rua: cliente.rua || '',
      numero: cliente.numero || '',
      bairro: cliente.bairro || '',
      cidade: cliente.cidade || '',
      estado: cliente.estado || '',
      complemento: cliente.complemento || '',
    },
    clienteType: cliente.clienteType,
    titularId: cliente.titularId || '',
  }
}

export function mapFormToCreatePayload(form: ClienteFormData): ClienteDTO {
  const titularFields = form.clienteType === 'Titular' ? {
    telefone: form.telefone,
    cep: form.endereco.cep,
    rua: form.endereco.rua,
    numero: form.endereco.numero,
    bairro: form.endereco.bairro,
    cidade: form.endereco.cidade,
    estado: form.endereco.estado,
    complemento: form.endereco.complemento,
  } : {
    telefone: null,
    cep: null,
    rua: null,
    numero: null,
    bairro: null,
    cidade: null,
    estado: null,
    complemento: null,
  }

  return {
    nome: form.nome,
    nomeSocial: form.nomeSocial || null,
    nascimento: new Date(form.nascimento),
    doc: form.doc,
    clienteType: form.clienteType,
    titularId: form.clienteType === 'Dependente' ? form.titularId as number : null,
    ...titularFields
  }
}

export function mapFormToUpdatePayload(form: ClienteFormData): ClienteDTO {
    return mapFormToCreatePayload(form);
}
