import { useEffect, useState } from "react";

function BackToTopButton() {

  const [visible, setVisible] =
    useState(false);

  useEffect(() => {

    const handleScroll = () => {

      setVisible(
        window.scrollY > 300
      );

    };

    window.addEventListener(
      "scroll",
      handleScroll
    );

    return () => {

      window.removeEventListener(
        "scroll",
        handleScroll
      );

    };

  }, []);

  if(!visible){

    return null;

  }

  return (

    <button

      className="
        fixed
        bottom-8
        right-8

        bg-linear-to-br
        from-blue-600
        to-blue-700
        text-white

        px-3
        py-3

        rounded-full
        shadow-lg

        z-50

        transition-all
        duration-300
        hover:shadow-xl
        hover:from-blue-700
        hover:to-blue-800

        flex
        items-center
        justify-center

        w-12
        h-12

        focus:outline-none
        focus:ring-2
        focus:ring-blue-500
        focus:ring-offset-2
      "

      onClick={() => {

        window.scrollTo({

          top: 0,

          behavior: "smooth"

        });

      }}

      aria-label="トップに戻る"

    >

      ↑

    </button>

  );

}

export default BackToTopButton;