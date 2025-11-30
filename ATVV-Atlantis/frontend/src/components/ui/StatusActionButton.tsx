import React from 'react';
import { FaCheckCircle, FaTimesCircle, FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';

interface StatusActionButtonProps {
    statusAtual: string; 
    itemId: number;
    onAction: (id: number, action: 'CHECK_IN' | 'CHECK_OUT') => void; 
}

const StatusActionButton: React.FC<StatusActionButtonProps> = ({ statusAtual, itemId, onAction }) => {
    let buttonText: string;
    let buttonClass: string;
    let IconComponent: React.ElementType;
    let isDisabled = false;
    let actionType: 'CHECK_IN' | 'CHECK_OUT' | null = null; 

    if (statusAtual === 'Ativa') {
        buttonText = 'Finalizar Hospedagem'; 
        buttonClass = 'bg-red-500 hover:bg-red-600';
        IconComponent = FaSignOutAlt;
        actionType = 'CHECK_OUT';
    } else if (statusAtual === 'Pendente') { 
        buttonText = 'Realizar Check-in'; 
        buttonClass = 'bg-teal-600 hover:bg-teal-700';
        IconComponent = FaSignInAlt;
        actionType = 'CHECK_IN';
    } else if (statusAtual === 'Concluída') {
        buttonText = 'Concluída';
        buttonClass = 'bg-gray-400 cursor-not-allowed';
        IconComponent = FaCheckCircle;
        isDisabled = true;
    } else {
        buttonText = 'Ação Indisponível'; 
        buttonClass = 'bg-gray-400 cursor-not-allowed';
        IconComponent = FaTimesCircle;
        isDisabled = true;
    } 

    return (
        <button 
            type="button" 
            className={`inline-flex items-center text-white font-medium py-2 px-4 rounded-xl transition duration-300 shadow-md text-sm ${buttonClass} ${isDisabled ? 'opacity-60' : ''}`}
            onClick={() => {
                if (!isDisabled && actionType) {
                    onAction(itemId, actionType); 
                }
            }}
            disabled={isDisabled}
        >
            <IconComponent className="mr-2" />
            {buttonText}
        </button>
    );
};

export default StatusActionButton;