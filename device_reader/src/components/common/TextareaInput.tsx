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

    <div className="flex flex-col gap-1">

      <label>

        {label}

      </label>

      <textarea

        className={`
          border
          rounded
          px-3
          py-2

          ${className}
        `}

        {...props}

      />

    </div>

  );

}

export default TextareaInput;