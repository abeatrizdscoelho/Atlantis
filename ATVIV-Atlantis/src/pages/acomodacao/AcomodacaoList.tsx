import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import { FaPlus, FaHome, FaBed, FaCar, FaToilet, FaThermometerHalf } from 'react-icons/fa';
import type { AcomodacaoFormData } from "../../types/acomodacao";

const acomodacoes: AcomodacaoFormData[] = [
    {
        nome: "Solteiro Simples",
        camaCasal: 0, camaSolteiro: 1, climatizacao: true, garagem: 0, suite: 1
    },
    {
        nome: "Solteiro Mais",
        camaCasal: 1, camaSolteiro: 0, climatizacao: true, garagem: 1, suite: 1
    },
    {
        nome: "Casal Simples",
        camaCasal: 1, camaSolteiro: 0, climatizacao: true, garagem: 1, suite: 1
    },
    {
        nome: "Família Simples",
        camaCasal: 1, camaSolteiro: 2, climatizacao: true, garagem: 1, suite: 1
    },
    {
        nome: "Família Mais",
        camaCasal: 1, camaSolteiro: 5, climatizacao: true, garagem: 2, suite: 2
    },
    {
        nome: "Família Super",
        camaCasal: 2, camaSolteiro: 6, climatizacao: true, garagem: 2, suite: 3
    }
]

export default function Acomodacoes() {

    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-gray-50 pb-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
                    <div className="flex justify-between items-center mb-10 border-b pb-4">
                        <h1 className="text-3xl font-bold text-gray-900 flex items-center">
                            <FaHome className="mr-3 text-teal-600" />
                            Módulo de Acomodações
                        </h1>
                        <a href="/acomodacoes/create" className="inline-flex items-center bg-teal-600 text-white font-medium py-2 px-4 rounded-xl hover:bg-teal-700 transition duration-300 shadow-lg"
                        >
                            <FaPlus className="mr-2" />
                            Nova Acomodação
                        </a>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {acomodacoes.map((acomodacao, index) => (
                            <div key={index} className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 p-6 flex flex-col justify-between">
                                <div className="mb-4 pb-3 border-b border-gray-100">
                                    <h2 className="text-2xl font-extrabold text-gray-900">
                                        {acomodacao.nome}
                                    </h2>
                                    <p className="text-sm text-gray-500 mt-1">
                                        Capacidade máxima: {acomodacao.camaCasal * 2 + acomodacao.camaSolteiro} pessoas
                                    </p>
                                </div>

                                <div className="space-y-3 grow mb-6">
                                    <div className="flex items-center text-gray-700">
                                        <FaBed className="h-5 w-5 mr-3 text-teal-500" />
                                        <span>
                                            <strong>{acomodacao.camaCasal}</strong> Cama de Casal, <strong>{acomodacao.camaSolteiro}</strong> Cama de Solteiro
                                        </span>
                                    </div>

                                    <div className="flex items-center text-gray-700">
                                        <FaToilet className="h-5 w-5 mr-3 text-teal-500" />
                                        <span>
                                            <strong>{acomodacao.suite}</strong> Suíte(s)
                                        </span>
                                    </div>

                                    <div className="flex items-center text-gray-700">
                                        <FaThermometerHalf className="h-5 w-5 mr-3 text-teal-500" />
                                        <span>
                                            Climatização: <strong>{acomodacao.climatizacao ? 'Sim' : 'Não'}</strong>
                                        </span>
                                    </div>

                                    <div className="flex items-center text-gray-700">
                                        <FaCar className="h-5 w-5 mr-3 text-teal-500" />
                                        <span>
                                            Garagem: <strong>{acomodacao.garagem} Vaga(s)</strong>
                                        </span>
                                    </div>
                                </div>

                                <div className="pt-4 border-t border-gray-100">
                                    <a href={`/acomodacoes/${index}`} 
                                        className="w-full text-center inline-block bg-teal-50 text-teal-700 font-medium py-2 rounded-lg hover:bg-teal-100 transition duration-200"
                                    >
                                        Ver Detalhes/Editar
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
            <Footer />
        </>
    )
}