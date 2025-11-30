import React from 'react';
import { FaUserTag, FaIdCard, FaMapMarkerAlt, FaPhone } from 'react-icons/fa';
import type { ClienteFormData, Titular } from '../../../types/cliente';

interface ClienteFormProps {
    formData: ClienteFormData;
    titulares: Titular[];
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    setClienteType: (type: 'Titular' | 'Dependente') => void; 
    isEditing: boolean;
}

const EnderecoFields: React.FC<{ formData: ClienteFormData, handleChange: ClienteFormProps['handleChange'] }> = 
({ formData, handleChange }) => (
    <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input 
                type="text" 
                name="endereco.cep" 
                placeholder="CEP *" 
                value={formData.endereco.cep} 
                onChange={handleChange} 
                className="p-3 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500 transition duration-150" 
                required 
            />
            <input 
                type="text" 
                name="endereco.rua" 
                placeholder="Rua *" 
                value={formData.endereco.rua} 
                onChange={handleChange} 
                className="p-3 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500 transition duration-150 md:col-span-2" 
                required 
            />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <input 
                type="text" 
                name="endereco.numero" 
                placeholder="Número *" 
                value={formData.endereco.numero} 
                onChange={handleChange} 
                className="p-3 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500 transition duration-150" 
                required 
            />
            <input 
                type="text" 
                name="endereco.bairro" 
                placeholder="Bairro *" 
                value={formData.endereco.bairro} 
                onChange={handleChange} 
                className="p-3 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500 transition duration-150" 
                required 
            />
            <input 
                type="text" 
                name="endereco.cidade" 
                placeholder="Cidade *" 
                value={formData.endereco.cidade} 
                onChange={handleChange} 
                className="p-3 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500 transition duration-150" 
                required 
            />
            <input 
                type="text" 
                name="endereco.estado" 
                placeholder="Estado *" 
                value={formData.endereco.estado} 
                onChange={handleChange} 
                className="p-3 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500 transition duration-150" 
                required 
            />
        </div>
        <div>
            <input 
                type="text" 
                name="endereco.complemento" 
                placeholder="Complemento (Opcional)" 
                value={formData.endereco.complemento} 
                onChange={handleChange} 
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500 transition duration-150" 
            />
        </div>
    </div>
);

const ClienteForm: React.FC<ClienteFormProps> = ({ formData, titulares, handleChange, setClienteType, isEditing }) => {
    return (
        <>
            {!isEditing && (
                <div className="mb-8 p-4 border-l-4 border-teal-500 bg-teal-50 rounded-md">
                    <label className="block text-lg font-medium text-gray-800 mb-3">
                        Tipo de Cadastro:
                    </label>
                    <div className="flex space-x-6">
                        <button type="button" onClick={() => setClienteType('Titular')}
                            className={`py-2 px-5 rounded-full font-semibold transition-all duration-200 
                                ${formData.clienteType === 'Titular'
                                    ? 'bg-teal-600 text-white shadow-lg'
                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                }`}
                        >
                            Titular
                        </button>
                        <button type="button" onClick={() => setClienteType('Dependente')}
                            className={`py-2 px-5 rounded-full font-semibold transition-all duration-200 ${formData.clienteType === 'Dependente'
                                    ? 'bg-teal-600 text-white shadow-lg'
                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                }`}
                        >
                            Dependente
                        </button>
                    </div>
                </div>
            )}
            {formData.clienteType === 'Dependente' && (
                <div className="mb-8">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">
                        <FaUserTag className="inline-block mr-2 text-teal-600" /> Vínculo do Titular *
                    </h2>
                    <select 
                        name="titularId"
                        value={formData.titularId} 
                        onChange={handleChange}
                        className="w-full p-3 border border-red-400 rounded-lg focus:ring-teal-500 focus:border-teal-500 bg-red-50 text-red-800 transition duration-150"
                        required
                        disabled={isEditing} 
                    >
                        <option value="" disabled>Selecione o Titular responsável</option>
                        {titulares.map(titular => (
                            <option key={titular.id} value={titular.id}>
                                {titular.nome}
                            </option>
                        ))}
                    </select>
                    <p className="mt-1 text-sm text-red-600">{isEditing ? "O titular não pode ser alterado após o cadastro inicial." : "Campo obrigatório para Dependentes."}</p>
                </div>
            )}
            <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">
                <FaIdCard className="inline-block mr-2 text-teal-600" /> Dados Pessoais
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <input type="text" name="nome" placeholder="Nome Completo *" value={formData.nome} onChange={handleChange} className="p-3 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500 transition duration-150" required />
                <input type="text" name="nomeSocial" placeholder="Nome Social (Opcional)" value={formData.nomeSocial} onChange={handleChange} className="p-3 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500 transition duration-150" />
                <input type="date" name="nascimento" placeholder="Data de Nascimento *" value={formData.nascimento} onChange={handleChange} className="p-3 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500 transition duration-150" required />
                <input type="text" name="doc" placeholder="Documento (RG/CPF/Passaporte) *" value={formData.doc} onChange={handleChange} className="p-3 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500 transition duration-150" required />
            </div>
            {formData.clienteType === 'Titular' && (
                <div className="transition-opacity duration-500 opacity-100">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2 mt-8">
                        <FaPhone className="inline-block mr-2 text-teal-600" /> Informações de Contato
                    </h2>
                    <div className="mb-6">
                        <input 
                            type="tel" 
                            name="telefone" 
                            placeholder="Telefone *" 
                            value={formData.telefone} 
                            onChange={handleChange} 
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500 transition duration-150" 
                            required={formData.clienteType === 'Titular'}
                        />
                    </div>
                    <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2 mt-8">
                        <FaMapMarkerAlt className="inline-block mr-2 text-teal-600" /> Endereço
                    </h2>
                    <EnderecoFields formData={formData} handleChange={handleChange} />
                </div>
            )}
        </>
    )
}

export default ClienteForm;