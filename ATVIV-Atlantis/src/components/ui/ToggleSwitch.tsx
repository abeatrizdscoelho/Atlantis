import React from 'react';

interface ToggleSwitchProps {
    checked: boolean;
    onChange: () => void;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ checked, onChange }) => (
    <label className="flex items-center cursor-pointer">
        <div className="relative">
            <input type="checkbox" className="sr-only" checked={checked} onChange={onChange} />
            <div className={`block w-14 h-8 rounded-full ${checked ? 'bg-teal-600' : 'bg-gray-300'}`}></div>
            <div className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform duration-300 ease-in-out ${checked ? 'translate-x-6' : 'translate-x-0'}`}></div>
        </div>
        <div className="ml-3 text-gray-700 font-medium">
            {checked ? 'Climatização ATIVA' : 'Climatização INATIVA'}
        </div>
    </label>
)

export default ToggleSwitch;