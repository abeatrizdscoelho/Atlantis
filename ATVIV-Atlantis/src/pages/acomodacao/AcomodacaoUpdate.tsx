import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AcomodacaoForm from '../../components/features/acomodacao/AcomodacaoForm';
import type { Acomodacao } from '../../types/acomodacao';

const acomodacoes: Acomodacao[] = [
    {
        id: 0,
        nome: "Solteiro Simples",
        camaCasal: 0, camaSolteiro: 1, climatizacao: true, garagem: 0, suite: 1
    },
    {
        id: 1,
        nome: "Solteiro Mais",
        camaCasal: 1, camaSolteiro: 0, climatizacao: true, garagem: 1, suite: 1
    },
    {
        id: 2,
        nome: "Casal Simples",
        camaCasal: 1, camaSolteiro: 0, climatizacao: true, garagem: 1, suite: 1
    },
    {
        id: 3,
        nome: "Família Simples",
        camaCasal: 1, camaSolteiro: 2, climatizacao: true, garagem: 1, suite: 1
    },
    {
        id: 4,
        nome: "Família Mais",
        camaCasal: 1, camaSolteiro: 5, climatizacao: true, garagem: 2, suite: 2
    },
    {
        id: 5,
        nome: "Família Super",
        camaCasal: 2, camaSolteiro: 6, climatizacao: true, garagem: 2, suite: 3
    }
]

export default function AcomodacaoUpdate() {
    const { id } = useParams<{ id: string }>();
    const acomodacaoId = Number(id);
    const [formData, setFormData] = useState<Omit<Acomodacao, 'id'> & { id: number }>({
        id: acomodacaoId,
        nome: '',
        camaCasal: 0,
        camaSolteiro: 0,
        climatizacao: false, 
        garagem: 0,
        suite: 0
    })
    const [acomodacaoExiste, setAcomodacaoExiste] = useState(false);

    useEffect(() => {
        const dadosExistentes = acomodacoes.find(a => a.id === acomodacaoId)

        if (dadosExistentes) {
            setFormData(dadosExistentes)
            setAcomodacaoExiste(true)
        } else {
            setAcomodacaoExiste(false)
        }
    }, [acomodacaoId])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'number' ? Number(value) : value,
        }))
    }

    const handleClimatizacaoToggle = () => {
        setFormData(prev => ({
            ...prev,
            climatizacao: !prev.climatizacao,
        }))
    }

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!formData.nome) {
            toast.error("O nome da acomodação é obrigatório!")
            return;
        }

        console.log(`Dados da Acomodação ${formData.id} atualizados:`, formData);
        
        toast.success(`Acomodação "${formData.nome}" atualizada com sucesso!`)
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
                        <p className="text-center text-gray-500 mt-1">
                            Modifique as características e salve as alterações.
                        </p>
                    </div>

                    <form onSubmit={handleSave} className="bg-white shadow-2xl rounded-2xl p-8 lg:p-10">
                        
                        <AcomodacaoForm
                            formData={formData}
                            handleChange={handleChange}
                            handleClimatizacaoToggle={handleClimatizacaoToggle}
                        />

                        <div className="pt-6 border-t flex justify-end">
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