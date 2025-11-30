import React, { useState } from 'react';
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import { toast } from 'react-toastify';
import { FaClock, FaHome, FaUserTag } from 'react-icons/fa';
import type { HospedagemFormData } from '../../types/hospedagem';

const mockClientes = [
    { id: 1, nome: "Gerson Penha (Titular)", tipo: "Titular" },
    { id: 2, nome: "Diogo Branquinho (Dependente)", tipo: "Dependente" },
    { id: 3, nome: "Eduardo Sakaue (Titular)", tipo: "Titular" },
]

const mockAcomodacoes = [
    { id: 101, nome: "Casal Simples", capacidade: 2 },
    { id: 102, nome: "Familia Simples", capacidade: 4 },
    { id: 103, nome: "Familia Super", capacidade: 8 },
    { id: 104, nome: "Solteiro Simples", capacidade: 1 },
]

export default function HospedagemCreate() {
    const [formData, setFormData] = useState<HospedagemFormData>({
        clienteId: '',
        acomodacaoId: '',
        checkInDate: new Date().toISOString().split('T')[0],
        checkOutDate: '',
    })

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
        const { name, value, type } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'number' || name.includes('Id') ? Number(value) : value,
        }))
    }

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.clienteId || !formData.acomodacaoId || !formData.checkInDate || !formData.checkOutDate) {
            toast.error('Por favor, preencha todos os campos obrigatórios (Cliente, Acomodação e Datas).')
            return;
        }

        if (new Date(formData.checkOutDate) <= new Date(formData.checkInDate)) {
            toast.error('A data de Check-out deve ser posterior à data de Check-in.')
            return;
        }

        const clienteSelecionado = mockClientes.find(c => c.id === formData.clienteId);
        const acomodacaoSelecionada = mockAcomodacoes.find(a => a.id === formData.acomodacaoId);

        console.log("Dados da Nova Hospedagem:", formData);

        toast.success(`Hospedagem de ${clienteSelecionado?.nome} na ${acomodacaoSelecionada?.nome}`)

        setFormData({
            clienteId: '',
            acomodacaoId: '',
            checkInDate: new Date().toISOString().split('T')[0],
            checkOutDate: '',
        })
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
                        <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2 flex items-center">
                            <FaUserTag className="mr-2 text-teal-600" /> Cliente Hospedado *
                        </h2>
                        <div className="mb-8">
                            <select
                                id="clienteId"
                                name="clienteId"
                                value={formData.clienteId}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500 transition duration-150"
                                required
                            >
                                <option value="" disabled>Selecione o Cliente</option>
                                {mockClientes.map(cliente => (
                                    <option key={cliente.id} value={cliente.id}>
                                        {cliente.nome}
                                    </option>
                                ))}
                            </select>
                            <p className="mt-1 text-sm text-gray-500">
                                Apenas clientes que não estão atualmente em uma hospedagem ativa devem aparecer aqui.
                            </p>
                        </div>
                        <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2 mt-8 flex items-center">
                            <FaHome className="mr-2 text-teal-600" /> Acomodação Destino *
                        </h2>
                        <div className="mb-8">
                            <select
                                id="acomodacaoId"
                                name="acomodacaoId"
                                value={formData.acomodacaoId}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500 transition duration-150"
                                required
                            >
                                <option value="" disabled>Selecione a Acomodação</option>
                                {mockAcomodacoes.map(acomodacao => (
                                    <option key={acomodacao.id} value={acomodacao.id}>
                                        {acomodacao.nome} (Capacidade: {acomodacao.capacidade})
                                    </option>
                                ))}
                            </select>
                            <p className="mt-1 text-sm text-gray-500">Acomodações ocupadas não devem ser listadas.</p>
                        </div>
                        <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2 mt-8 flex items-center">
                            <FaClock className="mr-2 text-teal-600" /> Datas da Reserva *
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                            <div>
                                <label htmlFor="checkInDate" className="block text-sm font-medium text-gray-700 mb-2">Check-in</label>
                                <input
                                    type="date"
                                    id="checkInDate"
                                    name="checkInDate"
                                    value={formData.checkInDate}
                                    onChange={handleChange}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500 transition duration-150"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="checkOutDate" className="block text-sm font-medium text-gray-700 mb-2">Check-out</label>
                                <input
                                    type="date"
                                    id="checkOutDate"
                                    name="checkOutDate"
                                    value={formData.checkOutDate}
                                    onChange={handleChange}
                                    min={formData.checkInDate}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500 transition duration-150"
                                    required
                                />
                            </div>
                        </div>
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