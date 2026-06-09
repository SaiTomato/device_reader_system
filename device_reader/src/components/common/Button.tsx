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
        py-2
        rounded

        bg-blue-600
        text-white

        hover:bg-blue-700

        disabled:bg-gray-400
        disabled:cursor-not-allowed

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
        py-2
        rounded

        border

        bg-white
        text-gray-700

        hover:bg-gray-100

        disabled:bg-gray-200

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
        py-2
        rounded

        bg-red-600
        text-white

        hover:bg-red-700

        disabled:bg-gray-400

        ${className}
      `}

      {...props}

    >

      {children}

    </button>

  );

}