import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import { FaCalendarPlus, FaCalendarCheck } from 'react-icons/fa';
import type { Hospedagem } from "../../types/hospedagem";

const mockHospedagens: Hospedagem[] = [
    {
        id: 1001,
        clienteNome: "Gerson Penha",
        clienteTipo: 'Titular',
        acomodacaoNome: "Familia Simples",
        checkIn: "2025-11-20",
        status: "Ativa",
    },
    {
        id: 1002,
        clienteNome: "Eduardo Sakaue",
        clienteTipo: 'Titular',
        acomodacaoNome: "Casal Simples",
        checkIn: "2025-11-15",
        status: "Ativa",
    },
    {
        id: 1003,
        clienteNome: "Diogo Branquinho",
        clienteTipo: 'Dependente',
        acomodacaoNome: "Familia Super",
        checkIn: "2025-11-01",
        status: "Concluída",
    },
]

export default function Hospedagens() {
    const hospedagensAtivas = mockHospedagens.filter(h => h.status === 'Ativa');
    const totalRegistros = mockHospedagens.length;

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
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Check-in</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-3"></th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {mockHospedagens.map((hospedagem) => (
                                    <tr key={hospedagem.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{hospedagem.id}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            <span className={`inline-flex text-xs leading-5 font-semibold rounded-full mr-2 ${hospedagem.clienteTipo === 'Titular' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>
                                                {hospedagem.clienteTipo.charAt(0)}
                                            </span>
                                            {hospedagem.clienteNome}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {hospedagem.acomodacaoNome}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {hospedagem.checkIn}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${hospedagem.status === 'Ativa' ? 'bg-yellow-100 text-yellow-800' : hospedagem.status === 'Concluída' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                                {hospedagem.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            {hospedagem.status === 'Ativa' ? (
                                                <a href={`/hospedagens/${hospedagem.id}/checkout`} className="text-red-600 hover:text-red-900">
                                                    Check-out
                                                </a>
                                            ) : (
                                                <span className="text-gray-400">Finalizada</span>
                                            )}
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