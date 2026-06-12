import type {
  TextareaHTMLAttributes
} from "react";

interface Props
extends TextareaHTMLAttributes<HTMLTextAreaElement>{

  label: string;

}

function TextareaInput({

  label,

  className = "",

  ...props

}: Props){

  return (
 

    <div className="flex flex-col gap-2">

      <label className="font-medium text-gray-700 text-sm">

        {label}

      </label>

      <textarea

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

          resize-vertical
          min-h-24

          ${className}
        `}

        {...props}

      />

    </div>


  );

}

export default TextareaInput;