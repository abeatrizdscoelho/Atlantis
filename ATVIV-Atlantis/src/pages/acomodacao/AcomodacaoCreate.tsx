import React, { useState } from 'react';
import Navbar from "../../components/layout/Navbar"; 
import Footer from "../../components/layout/Footer"; 
import { toast } from 'react-toastify'; 
import AcomodacaoForm from '../../components/features/acomodacao/AcomodacaoForm';
import type { AcomodacaoFormData } from '../../types/acomodacao';

export default function AcomodacaoCreate() {
    const [formData, setFormData] = useState<AcomodacaoFormData>({
        nome: '',
        camaCasal: 0,
        camaSolteiro: 0,
        climatizacao: true, 
        garagem: 0,
        suite: 0
    })

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
        
        console.log("Dados da Acomodação:", formData);
        toast.success(`Acomodação "${formData.nome}" cadastrada com sucesso!`)
        setFormData({ nome: '', camaCasal: 0, camaSolteiro: 0, climatizacao: true, garagem: 0, suite: 0 })
    }

    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-gray-50 pb-20">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
                    <div className="mb-10 border-b pb-4">
                        <h1 className="text-3xl font-bold text-gray-900 text-center">
                            Cadastrar Nova Acomodação
                        </h1>
                        <p className="text-center text-gray-500 mt-1">
                            Defina o nome e as características da acomodação.
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
                                Cadastrar Acomodação
                            </button>
                        </div>
                    </form>
                </div>
            </main>
            <Footer />
        </>
    )
}