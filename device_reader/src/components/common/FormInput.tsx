import { useId, useState } from "react";
import type {
  InputHTMLAttributes,
  CompositionEvent,
  ChangeEvent,
  FocusEvent,
} from "react";

//　入力格式
type InputFormat =
  | "halfWidthNumber"           // 半角数字
  | "halfWidthAlphaNum"         // 半角英数字
  | "cjkAlphaNum"               // 中日英数字（符号除く）
  | "halfWidthAlphaNumSymbol";  // 半角英数字（符号含む）

const FORMAT_PATTERNS: Record<InputFormat, RegExp> = {
  halfWidthNumber: /[^0-9]/g,
  halfWidthAlphaNum: /[^a-zA-Z0-9]/g,
  cjkAlphaNum: /[^a-zA-Z0-9\u4e00-\u9fff\u3040-\u309f\u30a0-\u30ff]/g,
  halfWidthAlphaNumSymbol: /[^a-zA-Z0-9\-_./]/g,
};

//　IMEの組み合わせ入力配慮
const COMPOSITION_SENSITIVE_FORMATS: InputFormat[] = ["cjkAlphaNum"];

interface Props
extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange">{
  label: string;
  format?: InputFormat;
  error?: string;
  validate?: (value: string) => string | undefined; // Focus失った時の検証関数，return error or undefined
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
}

function FormInput({
  label,
  className = "",
  format,
  error,
  validate,
  onChange,
  onBlur,
  ...props
}: Props){
  const inputId = useId();
  const [internalError, setInternalError] = useState<string | undefined>();

  const displayError = error ?? internalError;

  const applyFormat = (value: string): string => {
    if (!format) return value;
    return value.replace(FORMAT_PATTERNS[format], "");
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    // 入力中はフィルタリングしない
    const isComposing = (e.nativeEvent as InputEvent).isComposing;
    if (format && COMPOSITION_SENSITIVE_FORMATS.includes(format) && isComposing) {
      onChange?.(e);
      return;
    }

    const filtered = applyFormat(e.target.value);
    if (filtered !== e.target.value) {
      e.target.value = filtered;
    }
    //　前のエラー表示を消す、Focus失ったら再び検証を行う
    if (internalError) setInternalError(undefined);
    onChange?.(e);
  };

  const handleCompositionEnd = (e: CompositionEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    const filtered = applyFormat(target.value);
    if (filtered !== target.value) {
      target.value = filtered;
      // 手動でonChangeを一回実働，フィルタした値を外部stateとsyncする
      const event = {
        ...e,
        target,
        currentTarget: target,
      } as unknown as ChangeEvent<HTMLInputElement>;
      onChange?.(event);
    }
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    if (validate) {
      setInternalError(validate(e.target.value));
    }
    onBlur?.(e);
  };

  return (
    <div className="flex flex-col gap-2">

      <label htmlFor={inputId} className="font-medium text-gray-700 text-sm">
        {label}
        {props.required && <span className="text-red-500 ml-1">*</span>}
      </label>

      <input
        id={inputId}
        className={`
          border
          ${displayError ? "border-red-400" : "border-gray-300"}
          rounded-lg
          px-4
          py-2.5
          text-base
          transition-colors
          duration-200

          bg-white
          text-gray-900
          placeholder-gray-400

          focus:outline-none
          focus:ring-2
          focus:ring-blue-500
          focus:ring-offset-0
          focus:border-transparent

          disabled:bg-gray-100
          disabled:text-gray-500
          disabled:cursor-not-allowed

          ${className}
        `}
        onChange={handleChange}
        onCompositionEnd={handleCompositionEnd}
        onBlur={handleBlur}
        {...props}
      />

      {displayError &&(
        <span className="text-xs text-red-500">{displayError}</span>
      )}
    </div>
  );
}

export default FormInput;