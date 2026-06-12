import type {
  ReactNode
} from "react";

interface Props {

  title: string;

  children: ReactNode;

  onClose: () => void;

}

function BaseModal({

  title,

  children,

  onClose

}: Props){

  return (

    <div
      className="
        fixed
        inset-0
        bg-black/40
        flex
        items-center
        justify-center
        z-50
        p-4
        sm:p-6
      "
      onClick={onClose}
    >

      <div

        className="
          bg-white
          p-6
          sm:p-8
          rounded-lg
          w-full
          max-w-2xl
          max-h-[90vh]
          overflow-y-auto
          shadow-xl
          border border-gray-200
        "

        onClick={(e) =>
          e.stopPropagation()
        }

      >

        <div
          className="
            flex
            justify-between
            items-center
            mb-6
          "
        >

          <h2
            className="
              text-2xl
              font-bold
              text-gray-900
            "
          >
            {title}
          </h2>

          <button
            onClick={onClose}
            className="
              text-gray-400
              hover:text-gray-600
              text-2xl
              leading-none
              transition-colors
              duration-200
            "
          >
            ✕
          </button>

        </div>

        {children}

      </div>

    </div>

  );

}

export default BaseModal;