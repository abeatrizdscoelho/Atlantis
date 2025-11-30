import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import { FaUserPlus, FaUsers } from 'react-icons/fa';

export default function Clientes() {

    const clientes = [
        { id: 1, nome: "Gerson Penha", tipo: "Titular", doc: "123.456.789-00", status: "Ativo" },
        { id: 2, nome: "Eduardo Sakaue", tipo: "Titular", doc: "987.654.321-00", status: "Inativo" },
        { id: 3, nome: "Diogo Branquinho", tipo: "Dependente", doc: "111.222.333-00", status: "Ativo" },
    ]

    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-gray-50 pb-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
                    <div className="flex justify-between items-center mb-8 border-b pb-4">
                        <h1 className="text-3xl font-bold text-gray-900 flex items-center">
                            <FaUsers className="mr-3 text-teal-600" />
                            Módulo de Clientes
                        </h1>
                        <a href="/cliente/create"
                            className="inline-flex items-center bg-teal-600 text-white font-medium py-2 px-4 rounded-xl hover:bg-teal-700 transition duration-300 shadow-md"
                        >
                            <FaUserPlus className="mr-2" />
                            Adicionar Cliente
                        </a>
                    </div>
                    <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Documento</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-3"></th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {clientes.map((cliente) => (
                                    <tr key={cliente.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{cliente.nome}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${cliente.tipo === 'Titular' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>
                                                {cliente.tipo}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{cliente.doc}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${cliente.status === 'Ativo' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                                {cliente.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <a href={`/cliente/${cliente.id}`} className="text-teal-600 hover:text-teal-900">
                                                Ver Detalhes
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