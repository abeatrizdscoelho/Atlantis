interface Endereco {
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

export interface Cliente {
    id: number;
    nome: string;
    nomeSocial: string | null;
    nascimento: string; 
    doc: string;
    telefone: string | null; 
    status: 'Ativo' | 'Inativo';
    
    cep: string | null; 
    rua: string | null;
    numero: string | null;
    bairro: string | null;
    cidade: string | null;
    estado: string | null;
    complemento: string | null;

    clienteType: 'Titular' | 'Dependente';
    titularId: number | null;
    
    dependentes?: Cliente[];
}

export interface Titular {
    id: number;
    nome: string;
}
