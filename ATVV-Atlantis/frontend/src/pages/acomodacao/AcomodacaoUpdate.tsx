import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AcomodacaoForm from '../../components/features/acomodacao/AcomodacaoForm';
import { buscarAcomodacao, atualizarAcomodacao, excluirAcomodacao } from '../../services/acomodacaoService';
import { FaTrashAlt } from 'react-icons/fa';
import ConfirmationModal from '../../components/ui/ConfirmationModal';
import { mapFormToUpdatePayload } from '../../utils/acomodacaoMapper';

export default function AcomodacaoUpdate() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const acomodacaoId = Number(id);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [formData, setFormData] = useState({
        nome: "",
        camaCasal: 0,
        camaSolteiro: 0,
        climatizacao: false,
        garagem: 0,
        suite: 0
    })

    useEffect(() => {
        async function load() {
            try {
                const dados = await buscarAcomodacao(acomodacaoId)
                setFormData(dados)
            } catch (err) {
                console.error("Erro ao carregar dados da acomodação:", err)
                toast.error("Erro ao carregar dados para edição.")
            }
        }
        load()
    }, [acomodacaoId])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: type === "number" ? Number(value) : value
        }))
    }

    const handleClimatizacaoToggle = () => {
        setFormData(prev => ({
            ...prev,
            climatizacao: !prev.climatizacao
        }))
    }

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.nome) {
            toast.error("O nome da acomodação é obrigatório!")
            return;
        }

        try {
            const payload = mapFormToUpdatePayload(formData)
            await atualizarAcomodacao(acomodacaoId, payload)
            toast.success("Acomodação atualizada com sucesso!")
            setTimeout(() => {
                navigate("/acomodacoes")
            }, 1500)
        } catch (err) {
            console.error(err)
            toast.error("Erro ao atualizar acomodação.")
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
            await excluirAcomodacao(acomodacaoId)
            toast.success("Acomodação excluída com sucesso!")
            navigate("/acomodacoes")
        } catch (err) {
            console.error(err)
            toast.error("Erro ao excluir acomodação!")
        }
    }

    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-gray-50 pb-20">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
                    <div className="mb-10 border-b pb-4">
                        <h1 className="text-3xl font-bold text-gray-900 text-center">
                            Editar Acomodação: <span className="text-teal-600">{formData.nome}</span>
                        </h1>
                    </div>
                    <form onSubmit={handleSave} className="bg-white shadow-2xl rounded-2xl p-8 lg:p-10">
                        <AcomodacaoForm
                            formData={formData}
                            handleChange={handleChange}
                            handleClimatizacaoToggle={handleClimatizacaoToggle}
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
                    titulo={`Excluir Acomodação: ${formData.nome}`}
                    mensagem={`Tem certeza que deseja EXCLUIR permanentemente a acomodação "${formData.nome}"?`}
                    onConfirm={handleConfirmDelete}
                    onCancel={handleCancelDelete} 
                    confirmText="Sim, Excluir" 
                />
            )}
        </>
    )
}