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
      className="
        flex
        flex-col
        gap-1
      "
    >

      <label
        className="
          font-medium
        "
      >
        {label}
      </label>

      <input

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

export default FormInput;