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
        bottom-6
        right-6

        bg-blue-600
        text-white

        px-4
        py-2

        rounded-full
        shadow-lg

        z-50
      "

      onClick={() => {

        window.scrollTo({

          top: 0,

          behavior: "smooth"

        });

      }}

    >

      ↑

    </button>

  );

}

export default BackToTopButton;