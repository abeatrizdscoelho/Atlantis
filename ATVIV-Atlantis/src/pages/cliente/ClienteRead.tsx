import { useParams } from 'react-router-dom';
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import { FaUser, FaIdCard, FaMapMarkerAlt, FaUserTag, FaEdit, FaTrash } from "react-icons/fa";
import type { Cliente } from '../../types/cliente';

const mockClientes: Cliente[] = [
    {
        id: 1,
        nome: "Gerson Penha",
        tipo: "Titular",
        doc: "123.456.789-00",
        nascimento: "1980-05-15",
        telefone: "(11) 99876-5432",
        endereco: { rua: "Rua das Palmeiras, 100", cidade: "São Paulo/SP", cep: "01000-000" },
        status: "Ativo",
        dependentes: [
            { id: 2, nome: "Diogo Branquinho", tipo: "Dependente", doc: "987.654.321-00", nascimento: "1985-08-20", titularId: 1, status: "Ativo" },
            { id: 3, nome: "Fernando Massanori", tipo: "Dependente", doc: "111.222.333-00", nascimento: "2010-01-01", titularId: 1, status: "Inativo" },
        ]
    },
    {
        id: 2,
        nome: "Eduardo Sakaue",
        tipo: "Titular",
        doc: "444.555.666-00",
        nascimento: "1995-10-25",
        telefone: "(21) 99111-2222",
        endereco: { rua: "Av. Atlântica, 500", cidade: "Rio de Janeiro/RJ", cep: "22000-000" },
        status: "Ativo",
        dependentes: []
    }
]

export default function ClienteRead() {
    const { id } = useParams<{ id: string }>();
    const clienteId = Number(id);
    const cliente = mockClientes.find(c => c.id === clienteId);

    const titularVinculado = cliente?.tipo === 'Dependente'
        ? mockClientes.find(c => c.id === cliente.titularId)
        : null;

    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-gray-50 pb-20">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
                    <div className="flex justify-between items-center mb-10 border-b pb-4">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 flex items-center">
                                <FaUser className="mr-3 text-teal-600" />
                                Detalhes do Cliente: <span className="text-teal-600 ml-2">{cliente?.nome}</span>
                            </h1>
                            <span className={`px-3 py-1 mt-2 inline-flex text-sm leading-5 font-semibold rounded-full ${cliente?.status === 'Ativo' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                Status: {cliente?.status}
                            </span>
                        </div>
                        <div className="flex space-x-3">
                            <a href={`/cliente/edit/${cliente?.id}`} 
                                type="button"
                                className="inline-flex items-center bg-teal-500 text-white font-medium py-2 px-4 rounded-xl hover:bg-teal-600 transition duration-300 shadow-md"
                            >
                                <FaEdit className="mr-2" /> Editar
                            </a>
                            <button type="button" className="inline-flex items-center bg-red-500 text-white font-medium py-2 px-4 rounded-xl hover:bg-red-600 transition duration-300 shadow-md"
                            >
                                <FaTrash className="mr-2" /> Excluir
                            </button>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 space-y-8">
                            <div className="bg-white shadow-xl rounded-2xl p-6 border-t-4 border-teal-600">
                                <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                                    <FaIdCard className="mr-2 text-teal-600" />
                                    Dados Pessoais
                                </h2>
                                <dl className="divide-y divide-gray-100">
                                    <div className="py-3 sm:py-2 sm:grid sm:grid-cols-3 sm:gap-4">
                                        <dt className="text-sm font-medium text-gray-500">Tipo</dt>
                                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${cliente?.tipo === 'Titular' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>
                                                {cliente?.tipo}
                                            </span>
                                        </dd>
                                    </div>
                                    <div className="py-3 sm:py-2 sm:grid sm:grid-cols-3 sm:gap-4">
                                        <dt className="text-sm font-medium text-gray-500">Documento</dt>
                                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">{cliente?.doc}</dd>
                                    </div>
                                    <div className="py-3 sm:py-2 sm:grid sm:grid-cols-3 sm:gap-4">
                                        <dt className="text-sm font-medium text-gray-500">Data Nasc.</dt>
                                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">{cliente?.nascimento}</dd>
                                    </div>
                                </dl>
                            </div>
                            {cliente?.tipo === 'Titular' && cliente.endereco && cliente.telefone && (
                                <div className="bg-white shadow-xl rounded-2xl p-6 border-t-4 border-blue-600">
                                    <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                                        <FaMapMarkerAlt className="mr-2 text-blue-600" />
                                        Contato e Localização
                                    </h2>
                                    <dl className="divide-y divide-gray-100">
                                        <div className="py-3 sm:py-2 sm:grid sm:grid-cols-3 sm:gap-4">
                                            <dt className="text-sm font-medium text-gray-500 flex items-center"> 
                                                Telefone
                                            </dt>
                                            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">{cliente.telefone}</dd>
                                        </div>
                                        <div className="py-3 sm:py-2 sm:grid sm:grid-cols-3 sm:gap-4">
                                            <dt className="text-sm font-medium text-gray-500">Endereço</dt>
                                            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">{cliente.endereco.rua}, {cliente.endereco.cidade} - CEP: {cliente.endereco.cep}</dd>
                                        </div>
                                    </dl>
                                </div>
                            )}
                            {cliente?.tipo === 'Dependente' && titularVinculado && (
                                <div className="bg-white shadow-xl rounded-2xl p-6 border-t-4 border-green-600">
                                    <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                                        <FaUserTag className="mr-2 text-green-600" />
                                        Vínculo
                                    </h2>
                                    <div className="text-sm">
                                        <p className="text-gray-600">Este cliente é dependente de:</p>
                                        <p className="mt-2 text-lg font-medium text-green-700">
                                            {titularVinculado.nome}
                                        </p>
                                        <a href={`/clientes/${titularVinculado.id}`} className="text-teal-600 hover:text-teal-800 mt-1 inline-block">Ver Titular</a>
                                    </div>
                                </div>
                            )}
                        </div>
                        {cliente?.tipo === 'Titular' && (
                            <div className="lg:col-span-1">
                                <div className="bg-white shadow-xl rounded-2xl p-6 h-full border-t-4 border-pink-600">
                                    <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                                        <FaUserTag className="mr-2 text-pink-600" />
                                        Dependentes ({cliente.dependentes?.length || 0})
                                    </h2>
                                    {cliente.dependentes && cliente.dependentes.length > 0 ? (
                                        <ul className="space-y-3">
                                            {cliente.dependentes.map(dep => (
                                                <li key={dep.id} className="p-3 bg-gray-50 rounded-lg flex justify-between items-center hover:bg-gray-100 transition">
                                                    <div>
                                                        <p className="font-medium text-gray-900">{dep.nome}</p>
                                                        <span className={`text-xs ${dep.status === 'Ativo' ? 'text-green-600' : 'text-red-600'}`}>Status: {dep.status}</span>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p className="text-gray-500">Este titular não possui dependentes cadastrados.</p>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </main>
            <Footer />
        </>
    )
}