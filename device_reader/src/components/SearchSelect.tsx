import Select from "react-select";

type SearchSelectProps = {

  label?: string;

  value: string;

  options: string[];

  placeholder: string;

  onChange: (value: string) => void;

  isClearable?: boolean;

  isDisabled?: boolean;

};

function SearchSelect({

  label,

  value,

  options,

  placeholder,

  onChange

}: SearchSelectProps) {
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

        value={value? {value,label: value}: null}

        onChange={(selected) =>

          onChange(

            selected?.value || ""

          )

        }
      />
    </div>
  );
}

export default SearchSelect;