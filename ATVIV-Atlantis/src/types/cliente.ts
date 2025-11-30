export interface Cliente {
    id: number;
    nome: string;
    tipo: 'Titular' | 'Dependente';
    doc: string;
    nascimento: string;
    telefone?: string;
    endereco?: { rua: string; cidade: string; cep: string; };
    titularId?: number;
    status: 'Ativo' | 'Inativo';
    dependentes?: Cliente[];
}

export interface Endereco {
    cep: string;
    rua: string;
    numero: string;
    bairro: string;
    cidade: string;
    estado: string;
    complemento: string;
}

export interface ClienteFormData {
    nome: string;
    nomeSocial: string;
    nascimento: string;
    doc: string;
    telefone: string;
    endereco: Endereco;
    titularId: number | '';
    clienteType: 'Titular' | 'Dependente';
}

export interface TitularMock {
    id: number;
    nome: string;
}
