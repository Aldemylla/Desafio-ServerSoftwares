import { UseFormRegister, Control } from "react-hook-form";
import { CurrencyMaskedInput } from "./CurrencyMaskedInput";

import styles from "@/styles/Input.module.scss";

interface InputProps {
  label: string;
  inputName: string;
  error?: string;
  control?: Control<any>;
  register: UseFormRegister<any>;
}

export function Input({ label, inputName, error, register, control }: InputProps) {
  return (
    <div className={styles.container}>
      <label className={styles.label} htmlFor={inputName}>
        {label}:
      </label>
      {inputName === "preco" ? (
        <CurrencyMaskedInput className={styles.input} control={control} />
      ) : (
        <input className={styles.input} type='text' id={inputName} {...register(inputName)} />
      )}
      <p className={styles.error}>{error}</p>
    </div>
  );
}
