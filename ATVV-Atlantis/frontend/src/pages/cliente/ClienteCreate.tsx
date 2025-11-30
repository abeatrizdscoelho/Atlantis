import React, { useEffect, useState } from 'react';
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import { toast } from 'react-toastify';
import ClienteForm from '../../components/features/cliente/ClienteForm';
import { criarCliente, listarClientes } from '../../services/clienteService';
import { mapFormToCreatePayload } from '../../utils/clienteMapper';
import type { ClienteFormData } from '../../types/cliente';

const initialFormData: ClienteFormData = {
    nome: '',
    nomeSocial: '',
    nascimento: '',
    doc: '',
    telefone: '',
    endereco: { cep: '', rua: '', numero: '', bairro: '', cidade: '', estado: '', complemento: '' },
    titularId: '',
    clienteType: 'Titular',
}

export default function ClienteCreate() {
    const [titulares, setTitulares] = useState([]);
    const [formData, setFormData] = useState<ClienteFormData>(initialFormData);

    useEffect(() => {
        (async () => {
            const data = await listarClientes()
            const apenasTitulares = data.filter((c: any) => c.clienteType === "Titular")
            setTitulares(apenasTitulares)
        })()
    }, [])

    const setClienteType = (type: 'Titular' | 'Dependente') => {
        setFormData(prev => ({
            ...prev,
            clienteType: type,
            titularId: type === 'Titular' ? '' : prev.titularId,
        }))
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        if (name.includes('endereco.')) {
            const addressField = name.split('.')[1] as keyof ClienteFormData['endereco'];
            setFormData(prev => ({
                ...prev,
                endereco: {
                    ...prev.endereco,
                    [addressField]: value,
                },
            }))
        } else if (name === 'titularId') {
            setFormData(prev => ({
                ...prev,
                titularId: Number(value),
            }))
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value,
            }))
        }
    }

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.nome || !formData.nascimento || !formData.doc) {
            toast.error("Preencha todos os dados obrigatórios.")
            return;
        }

        if (formData.clienteType === 'Dependente' && !formData.titularId) {
            toast.error("Selecione o titular.")
            return;
        }

        try {
            const payload = mapFormToCreatePayload(formData)
            await criarCliente(payload)
            toast.success(`Cliente ${formData.nome} cadastrado!`)
            setFormData(initialFormData)
        } catch (err: any) {
            console.error(err)
            toast.error(err.message || 'Erro ao cadastrar cliente.')
        }
    }

    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-gray-50 pb-20">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
                    <div className="mb-10 border-b pb-4">
                        <h1 className="text-3xl font-bold text-gray-900 text-center">
                            Cadastrar Novo Cliente
                        </h1>
                        <p className="text-center text-gray-500 mt-1">
                            Defina o tipo de cliente (Titular ou Dependente) e preencha os dados.
                        </p>
                    </div>
                    <form onSubmit={handleSave} className="bg-white shadow-2xl rounded-2xl p-8 lg:p-10">
                        <ClienteForm
                            formData={formData}
                            titulares={titulares}
                            handleChange={handleChange}
                            setClienteType={setClienteType}
                            isEditing={false}
                        />
                        <div className="pt-6 border-t flex justify-end">
                            <button type="submit" className="bg-teal-600 text-white font-bold py-3 px-10 rounded-xl hover:bg-teal-700 transition duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                            >
                                Cadastrar {formData.clienteType}
                            </button>
                        </div>
                    </form>
                </div>
            </main>
            <Footer />
        </>
    )
}