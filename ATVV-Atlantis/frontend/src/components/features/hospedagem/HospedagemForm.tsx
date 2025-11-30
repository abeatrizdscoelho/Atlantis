import React from 'react';
import { FaClock, FaHome, FaUserTag } from 'react-icons/fa';
import { type HospedagemFormData } from '../../../types/hospedagem';
import { type Acomodacao } from '../../../types/acomodacao'; 
import { type Cliente } from '../../../types/cliente';

interface HospedagemFormProps {
    formData: HospedagemFormData;
    clientes: Cliente[]; 
    acomodacoes: Acomodacao[]; 
    handleChange: (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => void;
    isEditing: boolean;
}

export default function HospedagemForm({ formData, clientes, acomodacoes, handleChange, isEditing,
}: HospedagemFormProps) {
    return (
        <>
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
                    disabled={isEditing} 
                >
                    <option value="" disabled>Selecione o Cliente</option>
                    {clientes.map(cliente => (
                        <option key={cliente.id} value={cliente.id}>
                            {cliente.nome}
                        </option>
                    ))}
                </select>
                {isEditing && (
                    <p className="mt-1 text-sm text-red-500">
                        O cliente de uma hospedagem ativa não pode ser alterado.
                    </p>
                )}
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
                    {acomodacoes.map(acomodacao => (
                        <option key={acomodacao.id} value={acomodacao.id}>
                            {acomodacao.nome} 
                        </option>
                    ))}
                </select>
                <p className="mt-1 text-sm text-gray-500">Acomodações ocupadas não devem ser listadas na criação.</p>
            </div>            
            <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2 mt-8 flex items-center">
                <FaClock className="mr-2 text-teal-600" /> Datas da Reserva *
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                <div>
                    <label htmlFor="checkIn" className="block text-sm font-medium text-gray-700 mb-2">Check-in</label>
                    <input
                        type="date"
                        id="checkIn"
                        name="checkIn"
                        value={formData.checkIn}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500 transition duration-150"
                        required
                        disabled={isEditing}
                    />
                </div>
                <div>
                    <label htmlFor="checkOut" className="block text-sm font-medium text-gray-700 mb-2">Check-out (Previsão)</label>
                    <input
                        type="date"
                        id="checkOut"
                        name="checkOut"
                        value={formData.checkOut}
                        onChange={handleChange}
                        min={formData.checkIn}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500 transition duration-150"
                        required
                    />
                </div>
            </div>
        </>
    )
}
