export interface HospedagemFormData {
    clienteId: number | '';
    acomodacaoId: number | '';
    checkIn: string;
    checkOut: string;
    dataCheckIn: string | null;
    dataCheckOut: string | null;
}

export interface Hospedagem {
    id: number;
    clienteId: number;
    acomodacaoId: number;
    checkIn: string;
    checkOut: string;
    dataCheckIn: string | null;
    dataCheckOut: string | null;
    status: 'Ativa' | 'Concluída' | 'Pendente' | 'Cancelada';
    clienteNome: string;
    clienteType: 'Titular' | 'Dependente' | string;
    acomodacaoNome: string;
}
