import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import { toast } from 'react-toastify';
import HospedagemForm from '../../components/features/hospedagem/HospedagemForm';
import { atualizarHospedagem, buscarHospedagem, excluirHospedagem } from '../../services/hospedagemService';
import { listarClientes } from '../../services/clienteService';
import { listarAcomodacoes } from '../../services/acomodacaoService';
import { mapHospedagemToForm, mapFormToUpdatePayload } from '../../utils/hospedagemMapper';
import { type HospedagemFormData, type Hospedagem } from '../../types/hospedagem';
import { type Cliente } from '../../types/cliente';
import { type Acomodacao } from '../../types/acomodacao';
import { FaTrashAlt } from 'react-icons/fa';
import ConfirmationModal from '../../components/ui/ConfirmationModal';

export default function HospedagemUpdate() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const hospedagemId = Number(id);
    const [clientes, setClientes] = useState<Cliente[]>([]);
    const [acomodacoes, setAcomodacoes] = useState<Acomodacao[]>([]);
    const [formData, setFormData] = useState<HospedagemFormData | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        async function load() {
            try {
                const hospedagem = await buscarHospedagem(hospedagemId) as Hospedagem
                if (!hospedagem) {
                    toast.error("Hospedagem não encontrada.")
                    return;
                }
                setFormData(mapHospedagemToForm(hospedagem))
                const [allClientes, allAcomodacoes] = await Promise.all([listarClientes(), listarAcomodacoes()])
                setClientes(allClientes as Cliente[])
                setAcomodacoes(allAcomodacoes as Acomodacao[])
            } catch (err) {
                console.error("Erro ao carregar dados da hospedagem:", err)
                toast.error("Erro ao carregar dados para edição.")
            }
        }
        load()
    }, [hospedagemId])

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
        const { name, value, type } = e.target;
        if (!formData) return;

        setFormData(prev => ({
            ...prev!,
            [name]: type === 'number' || name.includes('Id') ? Number(value) : value,
        }))
    }

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData) return;

        try {
            const payload = mapFormToUpdatePayload(formData)
            await atualizarHospedagem(hospedagemId, payload)
            toast.success("Hospedagem atualizada!")
            setTimeout(() => {
                navigate("/hospedagens")
            }, 1500)
        } catch (err: any) {
            console.error(err)
            toast.error(err.message || "Erro ao atualizar hospedagem.")
        }
    }

    const handleDelete = () => {
        setIsModalOpen(true);
    }

    const handleCancelDelete = () => {
        setIsModalOpen(false);
    }

    const handleConfirmDelete = async () => {
        setIsModalOpen(false)
        try {
            await excluirHospedagem(hospedagemId)
            toast.success("Hospedagem excluída com sucesso!")
            navigate("/hospedagens")
        } catch (err) {
            console.error(err)
            toast.error("Erro ao excluir a hospedagem!")
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
                            Editar Hospedagem: <span className="text-teal-600">{hospedagemId}</span>
                        </h1>
                    </div>
                    <form onSubmit={handleSave} className="bg-white shadow-2xl rounded-2xl p-8 lg:p-10">
                        <HospedagemForm
                            formData={formData}
                            clientes={clientes}
                            acomodacoes={acomodacoes}
                            handleChange={handleChange}
                            isEditing={true}
                        />
                        <div className="pt-6 border-t flex justify-between items-center">
                            <button type="button" onClick={handleDelete} className="inline-flex items-center bg-red-500 text-white font-bold py-3 px-6 rounded-xl hover:bg-red-600 transition duration-300 shadow-lg"
                            >
                                <FaTrashAlt className="mr-2" />
                                Excluir
                            </button>
                            <button type="submit" className="bg-teal-600 text-white font-bold py-3 px-10 rounded-xl hover:bg-teal-700 transition duration-300 shadow-lg"
                            >
                                Salvar Alterações
                            </button>
                        </div>
                    </form>
                </div>
            </main>
            <Footer />
            {isModalOpen && (
                <ConfirmationModal
                    titulo={`Excluir Hospedagem`}
                    mensagem={`Tem certeza que deseja EXCLUIR permanentemente a hospedagem?`}
                    onConfirm={handleConfirmDelete}
                    onCancel={handleCancelDelete}
                    confirmText="Sim, Excluir"
                />
            )}
        </>
    )
}
