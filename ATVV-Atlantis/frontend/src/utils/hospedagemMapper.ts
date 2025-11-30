import type { HospedagemDTO } from "../services/hospedagemService"
import type { Hospedagem, HospedagemFormData } from "../types/hospedagem"

export function mapHospedagemToForm(hospedagem: Hospedagem): HospedagemFormData {
    return {
        clienteId: hospedagem.clienteId,
        acomodacaoId: hospedagem.acomodacaoId,
        checkIn: hospedagem.checkIn,
        checkOut: hospedagem.checkOut,
        dataCheckIn: hospedagem.dataCheckIn,
        dataCheckOut: hospedagem.dataCheckOut
    }
}

export function mapFormToCreatePayload(form: HospedagemFormData): HospedagemDTO {
    return {
        clienteId: form.clienteId as number,
        acomodacaoId: form.acomodacaoId as number,
        checkIn: new Date(form.checkIn),
        checkOut: new Date(form.checkOut),
    }
}

export function mapFormToUpdatePayload(form: HospedagemFormData): HospedagemDTO {
    return {
        clienteId: form.clienteId as number,
        acomodacaoId: form.acomodacaoId as number,
        checkIn: new Date(form.checkIn),
        checkOut: new Date(form.checkOut),
    }
}
