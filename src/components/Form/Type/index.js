import React from 'react'
import propTypes from 'prop-types'


export default function Input({error, name, onChange, placeholder, labelName, inputClassName, value, type}) {
    return (
        <div className="flex flex-col mb-4">
            {
                labelName && (
                    <label htmlFor={name} className={['text-md mb-1', error?.name?.message ? 'text-red-600' : 'text-gray-900'].join(" ")}>
                        {labelName}
                    </label>
                )
            }
            <input type={type} name={name} onChange={onChange} className={['bg-white focus:outline-none border px-4 w-full py-3 rounded', error?.name?.message ? 'border-red-500 text-red-600' : 'focus:border-teal-500 border-gray-600 text-gray-900', inputClassName].join(" ")} value={value} placeholder={placeholder ?? 'Please change placeholder'}/>

            <span className="text-red-600 pt-2">{error?.name?.message}</span>
        </div>
    )
}
// Create Smart Component

Input.propTypes = {
    error: propTypes.string, 
    name: propTypes.string.isRequired, 
    onChange: propTypes.func.isRequired,
    value: propTypes.oneOfType([propTypes.string, propTypes.number]).isRequired,
    placeholder: propTypes.string, 
    labelName: propTypes.string, 
    inputClassName: propTypes.string,
    type: propTypes.oneOf(['text', 'email', 'password'])
}