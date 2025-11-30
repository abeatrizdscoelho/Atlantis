import { useParams } from 'react-router-dom';
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import { FaUser, FaIdCard, FaMapMarkerAlt, FaUserTag, FaEdit } from "react-icons/fa";
import { useEffect, useState } from 'react';
import { buscarCliente, alterarStatusCliente } from '../../services/clienteService';
import ToggleSwitchStatus from '../../components/ui/ToggleSwitchStatus';
import { toast } from 'react-toastify';
import type { Cliente } from '../../types/cliente';

export default function ClienteRead() {
    const { id } = useParams<{ id: string }>();
    const [cliente, setCliente] = useState<Cliente | null>(null);
    const [titularVinculado, setTitularVinculado] = useState<any>(null);

    useEffect(() => {
        (async () => {
            const data: Cliente = await buscarCliente(Number(id))
            setCliente(data)
            if (data.titularId) {
                const titular = await buscarCliente(data.titularId)
                setTitularVinculado(titular)
            }
        })()
    }, [id])

    const handleToggleStatus = async () => {
        if (!cliente) return;

        try {
            const updatedClient = await alterarStatusCliente(cliente.id)
            setCliente(updatedClient)
            toast.success(`Status do cliente alterado para ${updatedClient.status}.`)
        } catch (error) {
            toast.error("Falha ao atualizar o status. Tente novamente.")
        }
    }

    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-gray-50 pb-20">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
                    <div className="flex justify-between items-start mb-10 border-b pb-4">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 flex items-center">
                                <FaUser className="mr-3 text-teal-600" />
                                Detalhes do Cliente: <span className="text-teal-600 ml-2">{cliente?.nome}</span>
                            </h1>
                            <div className="mt-4">
                                <ToggleSwitchStatus
                                    checked={cliente?.status === 'Ativo'}
                                    onChange={handleToggleStatus}
                                    checkedText="Status: ATIVO"
                                    uncheckedText="Status: INATIVO"
                                    colorClass="bg-green-600"
                                />
                            </div>
                        </div>
                        <div className="flex space-x-3 mt-2">
                            <a href={`/cliente/edit/${cliente?.id}`}
                                type="button"
                                className="inline-flex items-center bg-teal-500 text-white font-medium py-2 px-4 rounded-xl hover:bg-teal-600 transition duration-300 shadow-md"
                            >
                                <FaEdit className="mr-2" /> Editar
                            </a>
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
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${cliente?.clienteType === 'Titular' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>
                                                {cliente?.clienteType}
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
                            {cliente?.clienteType === 'Titular' && cliente.cep && cliente.telefone && (
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
                                            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">{cliente.rua}, {cliente.cidade} - CEP: {cliente.cep}</dd>
                                        </div>
                                    </dl>
                                </div>
                            )}
                            {cliente?.clienteType === 'Dependente' && titularVinculado && (
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
                                        <a href={`/cliente/${titularVinculado.id}`} className="text-teal-600 hover:text-teal-800 mt-1 inline-block">Ver Titular</a>
                                    </div>
                                </div>
                            )}
                        </div>
                        {cliente?.clienteType === 'Titular' && (
                            <div className="lg:col-span-1">
                                <div className="bg-white shadow-xl rounded-2xl p-6 h-full border-t-4 border-pink-600">
                                    <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                                        <FaUserTag className="mr-2 text-pink-600" />
                                        Dependentes ({cliente.dependentes?.length || 0})
                                    </h2>
                                    {cliente.dependentes && cliente.dependentes.length > 0 ? (
                                        <ul className="space-y-3">
                                            {cliente.dependentes.map((dep: any) => (
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