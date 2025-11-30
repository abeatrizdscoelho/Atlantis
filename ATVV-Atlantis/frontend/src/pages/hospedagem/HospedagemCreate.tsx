import React, { useEffect, useState } from 'react';
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import { toast } from 'react-toastify';
import { criarHospedagem } from '../../services/hospedagemService';
import { listarClientes } from '../../services/clienteService';
import { listarAcomodacoes } from '../../services/acomodacaoService';
import { mapFormToCreatePayload } from '../../utils/hospedagemMapper';
import { type HospedagemFormData } from '../../types/hospedagem';
import HospedagemForm from '../../components/features/hospedagem/HospedagemForm';

export default function HospedagemCreate() {
    const [clientes, setClientes] = useState<any[]>([]);
    const [acomodacoes, setAcomodacoes] = useState<any[]>([]);
    const [formData, setFormData] = useState<HospedagemFormData>({
        clienteId: '',
        acomodacaoId: '',
        checkIn: new Date().toISOString().split('T')[0],
        checkOut: '',
        dataCheckIn: '',
        dataCheckOut: '',
    })

    useEffect(() => {
        (async () => {
            setClientes(await listarClientes())
            setAcomodacoes(await listarAcomodacoes())
        })()
    }, [])

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
        const { name, value, type } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'number' || name.includes('Id') ? Number(value) : value,
        }))
    }

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.clienteId || !formData.acomodacaoId || !formData.checkIn || !formData.checkOut) {
            toast.error("Preencha todos os campos obrigatórios!");
            return;
        }

        try {
            const payload = mapFormToCreatePayload(formData)
            await criarHospedagem(payload)
            toast.success(`Hospedagem cadastrada com sucesso!`)
            setFormData({ clienteId: '', acomodacaoId: '', checkIn: '', checkOut: '', dataCheckIn: '', dataCheckOut: ''})
        } catch (err: any) {
            console.error(err)
            toast.error(err.message || 'Erro ao cadastrar hospedagem.')
        }
    }

    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-gray-50 pb-20">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
                    <div className="mb-10 border-b pb-4">
                        <h1 className="text-3xl font-bold text-gray-900 text-center">
                            Iniciar Nova Hospedagem
                        </h1>
                        <p className="text-center text-gray-500 mt-1">
                            Selecione o cliente e a acomodação para iniciar a reserva.
                        </p>
                    </div>
                    <form onSubmit={handleSave} className="bg-white shadow-2xl rounded-2xl p-8 lg:p-10">
                        <HospedagemForm
                            formData={formData}
                            clientes={clientes}
                            acomodacoes={acomodacoes}
                            handleChange={handleChange}
                            isEditing={false}
                        />
                        <div className="pt-6 border-t flex justify-end">
                            <button type="submit" className="bg-teal-600 text-white font-bold py-3 px-10 rounded-xl hover:bg-teal-700 transition duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                            >
                                Confirmar Hospedagem
                            </button>
                        </div>
                    </form>
                </div>
            </main>
            <Footer />
        </>
    )
}