import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import { toast } from 'react-toastify';
import ClienteForm from '../../components/features/cliente/ClienteForm';
import { atualizarCliente, buscarCliente, listarClientes } from '../../services/clienteService';
import { mapClienteToForm, mapFormToUpdatePayload } from '../../utils/clienteMapper';
import type { ClienteFormData, Titular } from '../../types/cliente';

export default function ClienteUpdate() {
    const { id } = useParams<{ id: string }>();
    const clienteId = Number(id);
    const navigate = useNavigate();
    const [titulares, setTitulares] = useState<Titular[]>([]);
    const [formData, setFormData] = useState<ClienteFormData | null>(null);

    useEffect(() => {
        (async () => {
            const cliente = await buscarCliente(clienteId)
            if (!cliente) return
            setFormData(mapClienteToForm(cliente))
            const all = await listarClientes()
            setTitulares(all.filter((c: any) => c.clienteType === "Titular"))
        })()
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

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData) return;

        try {
            const payload = mapFormToUpdatePayload(formData)
            await atualizarCliente(clienteId, payload)
            toast.success("Cliente atualizado!")
            setTimeout(() => {
                navigate("/clientes")
            }, 1500)
        } catch (err: any) {
            console.error(err)
            toast.error(err.message || "Erro ao atualizar cliente.")
        }
    }

    if (!formData) return;

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
                            titulares={titulares}
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