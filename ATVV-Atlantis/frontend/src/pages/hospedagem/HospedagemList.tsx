import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import { FaCalendarPlus, FaCalendarCheck, FaEdit } from 'react-icons/fa';
import { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import { listarHospedagens, realizarCheckIn, realizarCheckOut } from "../../services/hospedagemService";
import StatusActionButton from "../../components/ui/StatusActionButton";

export default function Hospedagens() {
    const [hospedagens, setHospedagens] = useState<any[]>([]);
    const totalRegistros = hospedagens.length;
    const hospedagensAtivas = hospedagens.filter(h => h.status === 'Ativa');

    const loadHospedagens = async () => {
        try {
            const data = await listarHospedagens()
            setHospedagens(data)
        } catch (err) {
            console.error(err)
            toast.error("Erro ao carregar a lista de hospedagens.")
        }
    }

    useEffect(() => {
        loadHospedagens()
    }, [])

    const handleStatusAction = async (id: number, action: 'CHECK_IN' | 'CHECK_OUT') => {
        const actionText = action === 'CHECK_IN' ? 'Check-in' : 'Check-out';

        try {
            if (action === 'CHECK_IN') {
                await realizarCheckIn(id)
            } else {
                await realizarCheckOut(id)
            }

            toast.success(`${actionText} da hospedagem ${id} realizado com sucesso!`)
            await loadHospedagens()
        } catch (err: any) {
            console.error(err)
            toast.error(err.message || `Erro ao realizar ${actionText.toLowerCase()}.`)
        }
    }

    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-gray-50 pb-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
                    <div className="flex justify-between items-center mb-10 border-b pb-4">
                        <h1 className="text-3xl font-bold text-gray-900 flex items-center">
                            <FaCalendarCheck className="mr-3 text-teal-600" />
                            Módulo de Hospedagens
                        </h1>
                        <a href="/hospedagens/create" className="inline-flex items-center bg-teal-600 text-white font-medium py-2 px-4 rounded-xl hover:bg-teal-700 transition duration-300 shadow-lg"
                        >
                            <FaCalendarPlus className="mr-2" />
                            Nova Hospedagem
                        </a>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                        <div className="bg-white p-4 rounded-xl shadow-md text-center border-l-4 border-teal-500">
                            <p className="text-3xl font-bold text-gray-900">{hospedagensAtivas.length}</p>
                            <p className="text-sm text-gray-500">Hospedagens Ativas</p>
                        </div>
                        <div className="bg-white p-4 rounded-xl shadow-md text-center border-l-4 border-gray-400">
                            <p className="text-3xl font-bold text-gray-900">{totalRegistros}</p>
                            <p className="text-sm text-gray-500">Total de Registros</p>
                        </div>
                    </div>
                    <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cliente (Tipo)</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acomodação</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Check-in Previsto</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Realizar Check-in</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Editar</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {hospedagens.map((hospedagem) => (
                                    <tr key={hospedagem.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{hospedagem.id}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            <span className={`inline-flex text-xs leading-5 font-semibold rounded-full mr-2 ${hospedagem.clienteType === 'Titular' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>
                                                {hospedagem.clienteType.charAt(0)}
                                            </span>
                                            {hospedagem.clienteNome}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {hospedagem.acomodacaoNome}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {new Date(hospedagem.checkIn).toLocaleDateString('pt-BR')}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${hospedagem.status === 'Ativa' ? 'bg-yellow-100 text-yellow-800' : hospedagem.status === 'Concluída' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                                                {hospedagem.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-left text-sm flex items-center space-x-2">
                                            <StatusActionButton
                                                itemId={hospedagem.id}
                                                statusAtual={hospedagem.status}
                                                onAction={handleStatusAction}
                                            />
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-center text-sm">
                                            <a
                                                href={`/hospedagens/edit/${hospedagem.id}`}
                                                title="Editar Hospedagem"
                                                className="text-teal-600 hover:text-teal-700 rounded-full hover:bg-blue-50 transition duration-150 ease-in-out"
                                            >
                                                <FaEdit className="w-5 h-5" />
                                            </a>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    )
}
