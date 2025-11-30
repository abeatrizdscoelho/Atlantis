export interface HospedagemFormData {
    clienteId: number | '';
    acomodacaoId: number | '';
    checkInDate: string;
    checkOutDate: string;
}

export interface Hospedagem {
    id: number;
    clienteNome: string;
    clienteTipo: 'Titular' | 'Dependente';
    acomodacaoNome: string;
    checkIn: string;
    status: 'Ativa' | 'Concluída' | 'Cancelada';
}