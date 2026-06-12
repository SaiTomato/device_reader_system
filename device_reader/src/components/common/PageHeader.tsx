interface Props {

  title: string;

  subtitle?: string;

}

function PageHeader({

  title,

  subtitle

}: Props){

  return (

    <div
      className="mb-8 sm:mb-10"
    >

      <h1
        className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight"
      >
        {title}
      </h1>

      {
        subtitle && (

          <p
            className="text-base sm:text-lg text-gray-600 mt-2"
          >
            {subtitle}
          </p>

        )
      }

    </div>

  );

}

export default PageHeader;