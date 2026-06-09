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
        bg-black/50
        flex
        items-center
        justify-center
        z-50
      "
      onClick={onClose}
    >

      <div

        className="
          bg-white
          p-6
          rounded
          w-150
          max-w-[90vw]
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
            mb-4
          "
        >

          <h2
            className="
              text-xl
              font-bold
            "
          >
            {title}
          </h2>

          <button
            onClick={onClose}
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