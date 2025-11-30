import React from 'react';
import { FaBed, FaCar, FaToilet, FaThermometerHalf, FaDoorClosed } from 'react-icons/fa'; 
import ToggleSwitch from '../../ui/ToggleSwitchStatus';
import type { AcomodacaoFormData } from '../../../types/acomodacao';

interface AcomodacaoFormProps {
    formData: AcomodacaoFormData
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    handleClimatizacaoToggle: () => void;
}

const AcomodacaoForm: React.FC<AcomodacaoFormProps> = ({ formData, handleChange, handleClimatizacaoToggle }) => {
    return (
        <>
            <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">
                Detalhes Principais
            </h2>
            <div className="mb-8">
                <label htmlFor="NomeAcomodacao" className="block text-sm font-medium text-gray-700 mb-2">
                    Nome da Acomodação *
                </label>
                <div className="relative">
                    <FaDoorClosed className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                    <input
                        type="text"
                        id="NomeAcomodacao"
                        name="nome"
                        placeholder="Ex: Casal Simples, Família Super"
                        value={formData.nome}
                        onChange={handleChange}
                        className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500 transition duration-150"
                        required
                    />
                </div>
            </div>

            <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2 mt-8">
                Capacidade e Recursos
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="flex flex-col">
                    <label htmlFor="CamaCasal" className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                        <FaBed className="mr-2 text-teal-600" /> Camas de Casal
                    </label>
                    <input
                        type="number"
                        id="CamaCasal"
                        name="camaCasal"
                        value={formData.camaCasal}
                        onChange={handleChange}
                        min="0"
                        className="p-3 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500 transition duration-150"
                    />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="CamaSolteiro" className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                        <FaBed className="mr-2 text-teal-600" /> Camas de Solteiro
                    </label>
                    <input
                        type="number"
                        id="CamaSolteiro"
                        name="camaSolteiro"
                        value={formData.camaSolteiro}
                        onChange={handleChange}
                        min="0"
                        className="p-3 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500 transition duration-150"
                    />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="Suite" className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                        <FaToilet className="mr-2 text-teal-600" /> Número de Suítes
                    </label>
                    <input
                        type="number"
                        id="Suite"
                        name="suite"
                        value={formData.suite}
                        onChange={handleChange}
                        min="0"
                        className="p-3 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500 transition duration-150"
                    />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="Garagem" className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                        <FaCar className="mr-2 text-teal-600" /> Vagas de Garagem
                    </label>
                    <input
                        type="number"
                        id="Garagem"
                        name="garagem"
                        value={formData.garagem}
                        onChange={handleChange}
                        min="0"
                        className="p-3 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500 transition duration-150"
                    />
                </div>
            </div>

            <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2 mt-8">
                Outras Comodidades
            </h2>
            <div className="mb-10 flex items-center space-x-4 p-4 border rounded-xl bg-gray-50">
                <FaThermometerHalf className="h-6 w-6 text-teal-600" />
                <ToggleSwitch 
                checked={formData.climatizacao} 
                onChange={handleClimatizacaoToggle} 
                checkedText='ATIVO'
                uncheckedText='INATIVO'
                colorClass="bg-teal-600"
                />
            </div>
        </>
    )
}

export default AcomodacaoForm;