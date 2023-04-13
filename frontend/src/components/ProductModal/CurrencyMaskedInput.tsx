import MaskedInput from "react-text-mask";
import { Controller, Control } from "react-hook-form";
import { createNumberMask } from "text-mask-addons";
import { productFormSchema } from "./productFormSchema";
import { InputHTMLAttributes } from "react";

interface CurrencyMaskedInputProps extends InputHTMLAttributes<HTMLInputElement> {
  control: Control<any>;
}

export function CurrencyMaskedInput({ control, ...props }: CurrencyMaskedInputProps) {
  const currencyMask = createNumberMask({
    prefix: "R$ ",
    includeThousandsSeparator: true,
    thousandsSeparatorSymbol: ".",
    allowDecimal: true,
    decimalSymbol: ",",
    decimalLimit: 2,
    integerLimit: 10,
    allowNegative: false,
    allowleadingZero: false,
  });

  return (
    <Controller
      name='preco'
      control={control}
      rules={{ validate: (value) => productFormSchema.safeParse(value).success }}
      render={({ field: { onChange, onBlur, value } }) => (
        <MaskedInput
          mask={currencyMask}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          onBlur={onBlur}
          placeholder='R$ 0,00'
          {...props}
        />
      )}
    />
  );
}
