export interface Acomodacao {
    id: number;
    nome: string;
    camaCasal: number;
    camaSolteiro: number;
    climatizacao: boolean;
    garagem: number;
    suite: number;
}

export interface AcomodacaoFormData {
    nome: string;
    camaCasal: number;
    camaSolteiro: number;
    climatizacao: boolean;
    garagem: number;
    suite: number;
}
