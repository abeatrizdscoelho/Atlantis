import React from 'react';

interface StatusToggleSwitchProps {
    checked: boolean;
    onChange: () => void;
    checkedText: string;
    uncheckedText: string;
    colorClass?: string;
}

const ToggleSwitchStatus: React.FC<StatusToggleSwitchProps> = ({
    checked,
    onChange,
    checkedText,
    uncheckedText,
    colorClass = 'bg-teal-600'
}) => (
    <label className="flex items-center cursor-pointer">
        <div className="relative">

            <input
                type="checkbox"
                className="sr-only"
                checked={checked}
                onChange={onChange}
            />

            <div className={`block w-14 h-8 rounded-full ${checked ? colorClass : 'bg-gray-300'}`}></div>

            <div className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform duration-300 ease-in-out ${checked ? 'translate-x-6' : 'translate-x-0'}`}></div>
        </div>

        <div className="ml-3 text-gray-700 font-medium whitespace-nowrap">
            {checked ? checkedText : uncheckedText}
        </div>
    </label>
)

export default ToggleSwitchStatus;