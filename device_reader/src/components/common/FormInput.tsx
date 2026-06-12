import type {
  InputHTMLAttributes
} from "react";

interface Props
extends InputHTMLAttributes<HTMLInputElement>{

  label: string;

}

function FormInput({

  label,

  className = "",

  ...props

}: Props){

  return (

    <div
      className="flex flex-col gap-2"
    >

      <label
        className="font-medium text-gray-700 text-sm"
      >
        {label}
      </label>

      <input

        className={`
          border
          border-gray-300
          rounded-lg
          px-4
          py-2.5
          text-base
          transition-colors
          duration-200

          bg-white
          text-gray-900
          placeholder-gray-400

          focus:outline-none
          focus:ring-2
          focus:ring-blue-500
          focus:ring-offset-0
          focus:border-transparent

          disabled:bg-gray-100
          disabled:text-gray-500
          disabled:cursor-not-allowed

          ${className}
        `}

        {...props}

      />

    </div>

  );

}

export default FormInput;