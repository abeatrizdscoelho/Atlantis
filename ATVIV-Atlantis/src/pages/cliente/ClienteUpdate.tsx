import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from "../../components/layout/Navbar"; 
import Footer from "../../components/layout/Footer"; 
import { toast } from 'react-toastify';  
import ClienteForm from '../../components/features/cliente/ClienteForm';
import type { ClienteFormData } from '../../types/cliente';

const mockTitulares = [
    { id: 1, nome: "Gerson Penha (Titular)" },
    { id: 2, nome: "Eduardo Sakaue (Titular)" },
    { id: 103, nome: "Giuliano Bertoti (Titular)" },
]

const mockClientes: (ClienteFormData & { id: number })[] = [
    {
        id: 1, nome: "Gerson Penha", nomeSocial: "", clienteType: "Titular", doc: "123.456.789-00", nascimento: "1980-05-15",
        telefone: "(11) 99876-5432", titularId: '',
        endereco: { cep: "01000-000", rua: "Rua das Palmeiras", numero: "100", bairro: "Centro", cidade: "São Paulo", estado: "SP", complemento: "Apto 1A" }
    },
    {
        id: 2, nome: "Eduardo Sakaue", nomeSocial: "Sakaue", clienteType: "Dependente", doc: "987.654.321-00", nascimento: "1985-08-20",
        telefone: "", titularId: 1,
        endereco: { cep: "", rua: "", numero: "", bairro: "", cidade: "", estado: "", complemento: "" } 
    },
]

export default function ClienteUpdate() {
    const { id } = useParams<{ id: string }>();
    const clienteId = Number(id);
    const [formData, setFormData] = useState<ClienteFormData | null>(null);
    const [clienteExiste, setClienteExiste] = useState(false);

    useEffect(() => {
        const dadosExistentes = mockClientes.find(c => c.id === clienteId);

        if (dadosExistentes) {
            const { id, ...data } = dadosExistentes
            setFormData(data)
            setClienteExiste(true)
        } else {
            setClienteExiste(false)
        }
    }, [clienteId])

    const setClienteType = (type: 'Titular' | 'Dependente') => {
        toast.info(`O tipo de cliente (${type}) não pode ser alterado após o cadastro.`)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        if (!formData) return;

        if (name.includes('endereco.')) {
            const addressField = name.split('.')[1] as keyof ClienteFormData['endereco'];
            setFormData(prev => ({
                ...prev!,
                endereco: {
                    ...prev!.endereco,
                    [addressField]: value,
                },
            }))
        } else {
            setFormData(prev => ({
                ...prev!,
                [name]: value,
            }))
        }
    }

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData) return;
        
        console.log(`Dados do Cliente ${clienteId} atualizados:`, formData);
        
        toast.success(`Cliente "${formData.nome}" (${formData.clienteType}) atualizado com sucesso!`)
    }
    
    if (!clienteExiste || !formData) return;

    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-gray-50 pb-20">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
                    <div className="mb-10 border-b pb-4">
                        <h1 className="text-3xl font-bold text-gray-900 text-center">
                            Editar Cliente: <span className="text-teal-600">{formData.nome}</span>
                        </h1>
                    </div>
                    <form onSubmit={handleSave} className="bg-white shadow-2xl rounded-2xl p-8 lg:p-10">
                        <ClienteForm
                            formData={formData}
                            mockTitulares={mockTitulares}
                            handleChange={handleChange}
                            setClienteType={setClienteType}
                            isEditing={true} 
                        />
                        <div className="mt-10 pt-6 border-t flex justify-end">
                            <button type="submit" className="bg-teal-600 text-white font-bold py-3 px-10 rounded-xl hover:bg-teal-700 transition duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                            >
                                Salvar Alterações
                            </button>
                        </div>
                    </form>
                </div>
            </main>
            <Footer />
        </>
    )
}