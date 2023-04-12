import { UseFormRegister, Control } from "react-hook-form";
import { CurrencyMaskedInput } from "./CurrencyMaskedInput";

interface InputProps {
  inputName: string;
  error?: string;
  control?: Control<any>;
  register: UseFormRegister<any>;
}

export function Input({ inputName, error, register, control }: InputProps) {
  return (
    <>
      <label htmlFor={inputName}>{inputName}:</label>
      {inputName === "preco" ? (
        <CurrencyMaskedInput control={control} />
      ) : (
        <input type='text' id={inputName} {...register(inputName)} />
      )}
      {error && <p>{error}</p>}
    </>
  );
}
