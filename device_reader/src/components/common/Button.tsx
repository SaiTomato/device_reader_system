import type {
  ButtonHTMLAttributes
} from "react";

type Props =
  ButtonHTMLAttributes<
    HTMLButtonElement
  >;

export function PrimaryButton({
  children,
  className = "",
  ...props
}: Props){

  return (

    <button

      className={`
        px-4
        py-2.5
        rounded-lg
        font-medium
        transition-colors
        duration-200

        bg-blue-600
        text-white

        hover:bg-blue-700
        focus:outline-none
        focus:ring-2
        focus:ring-blue-500
        focus:ring-offset-2

        disabled:bg-gray-400
        disabled:cursor-not-allowed
        disabled:ring-0

        ${className}
      `}

      {...props}

    >

      {children}

    </button>

  );

}

export function SecondaryButton({
  children,
  className = "",
  ...props
}: Props){

  return (

    <button

      className={`
        px-4
        py-2.5
        rounded-lg
        font-medium
        transition-colors
        duration-200

        border
        border-gray-300

        bg-white
        text-gray-700

        hover:bg-gray-50
        hover:border-gray-400
        focus:outline-none
        focus:ring-2
        focus:ring-blue-500
        focus:ring-offset-2

        disabled:bg-gray-100
        disabled:text-gray-400
        disabled:border-gray-200
        disabled:cursor-not-allowed
        disabled:ring-0

        ${className}
      `}

      {...props}

    >

      {children}

    </button>

  );

}

export function DangerButton({
  children,
  className = "",
  ...props
}: Props){

  return (

    <button

      className={`
        px-4
        py-2.5
        rounded-lg
        font-medium
        transition-colors
        duration-200

        bg-red-600
        text-white

        hover:bg-red-700
        focus:outline-none
        focus:ring-2
        focus:ring-red-500
        focus:ring-offset-2

        disabled:bg-gray-400
        disabled:cursor-not-allowed
        disabled:ring-0

        ${className}
      `}

      {...props}

    >

      {children}

    </button>

  );

}