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
      className="flex flex-col gap-2"
    >
      {label && (
        <label
          className="font-medium text-gray-700 text-sm"
        >
          {label}
        </label>
      )}

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
        styles={{
          control: (baseStyles) => ({
            ...baseStyles,
            borderColor: '#d1d5db',
            borderRadius: '0.5rem',
            padding: '0.375rem',
            fontSize: '1rem',
            transition: 'all 0.2s',
            boxShadow: 'none',
            '&:hover': {
              borderColor: '#9ca3af',
            },
            '&:focus': {
              outline: 'none',
              borderColor: '#3b82f6',
            }
          }),
          option: (baseStyles, state) => ({
            ...baseStyles,
            backgroundColor: state.isSelected ? '#3b82f6' : state.isFocused ? '#eff6ff' : undefined,
            color: state.isSelected ? 'white' : '#1f2937',
            padding: '0.75rem 1rem',
            fontSize: '0.95rem',
            cursor: 'pointer',
          }),
          input: (baseStyles) => ({
            ...baseStyles,
            fontSize: '0.95rem',
          })
        }}
      />
    </div>
  );
}

export default SearchSelect;