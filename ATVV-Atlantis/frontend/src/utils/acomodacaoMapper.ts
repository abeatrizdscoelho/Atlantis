import type { AcomodacaoDTO } from "../services/acomodacaoService"
import type { Acomodacao, AcomodacaoFormData } from "../types/acomodacao"

export function mapAcomodacaoToForm(acomodacao: Acomodacao): AcomodacaoFormData {
    return {
        nome: acomodacao.nome,
        camaCasal: acomodacao.camaCasal,
        camaSolteiro: acomodacao.camaSolteiro,
        climatizacao: acomodacao.climatizacao,
        garagem: acomodacao.garagem,
        suite: acomodacao.suite
    }
}

export function mapFormToCreatePayload(form: AcomodacaoFormData): AcomodacaoDTO {
    return {
        nome: form.nome,
        camaCasal: form.camaCasal,
        camaSolteiro: form.camaSolteiro,
        climatizacao: form.climatizacao,
        garagem: form.garagem,
        suite: form.suite
    }
}

export function mapFormToUpdatePayload(form: AcomodacaoFormData): AcomodacaoDTO {
    return {
        nome: form.nome,
        camaCasal: form.camaCasal,
        camaSolteiro: form.camaSolteiro,
        climatizacao: form.climatizacao,
        garagem: form.garagem,
        suite: form.suite
    }
}
