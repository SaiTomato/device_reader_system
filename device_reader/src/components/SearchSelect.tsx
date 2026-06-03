import Select from "react-select";

type SearchSelectProps = {

  value: string;

  options: string[];

  placeholder: string;

  onChange: (value: string) => void;

};

function SearchSelect({

  value,

  options,

  placeholder,

  onChange

}: SearchSelectProps) {

  return (

    <Select

      placeholder={placeholder}

      isClearable

      isSearchable

      options={

        options.map(item => ({

          value: item,

          label: item

        }))

      }

      value={

        value

          ? {

              value,

              label: value

            }

          : null

      }

      onChange={(selected) =>

        onChange(

          selected?.value || ""

        )

      }

    />

  );

}

export default SearchSelect;