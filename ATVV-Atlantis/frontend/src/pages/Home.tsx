import Footer from "../components/layout/Footer";
import Navbar from "../components/layout/Navbar";
import { FaUsers, FaHome, FaCalendarCheck } from "react-icons/fa"; 

const features = [
    {
        title: "Clientes",
        desc: "Adicione, visualize e gerencie todos os clientes de forma eficiente.",
        route: "/clientes",
        icon: FaUsers, 
    },
    {
        title: "Acomodações",
        desc: "Confira a lista de acomodações, seus detalhes e realize alterações.",
        route: "/acomodacoes",
        icon: FaHome, 
    },
    {
        title: "Hospedagens",
        desc: "Registre e acompanhe as reservas, check-ins e check-outs.",
        route: "/hospedagens",
        icon: FaCalendarCheck, 
    }
]

export default function Home() {
    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-gray-50 pb-20">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 text-center">                    
                    <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-4 tracking-tight">
                        Sistema <span className="text-teal-600">Atlantis</span>
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-16">
                        Gerencie <strong>clientes</strong>, <strong>acomodações</strong> e <strong>hospedagens</strong> de forma simples, prática e intuitiva.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {features.map((item, index) => (
                            <div className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 p-8 flex flex-col items-center text-center h-full" 
                                key={index}
                            >
                                <div className="p-4 bg-teal-100 rounded-full mb-5">
                                    <item.icon className="text-teal-600" size={32} aria-hidden="true" />
                                </div>        
                                <h2 className="text-2xl font-semibold text-gray-900 mb-3">{item.title}</h2>
                                <p className="text-gray-500 mb-6 grow">{item.desc}</p>
                                <a href={item.route}
                                    className="w-full mt-auto inline-flex items-center justify-center bg-teal-600 text-white font-medium py-3 px-6 rounded-xl hover:bg-teal-700 transition duration-300 shadow-md hover:shadow-lg"
                                >
                                    Acessar Módulo
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
            <Footer />
        </>
    )
}