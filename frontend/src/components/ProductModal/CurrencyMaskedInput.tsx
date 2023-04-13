import MaskedInput from "react-text-mask";
import { Controller } from "react-hook-form";
import { createNumberMask } from "text-mask-addons";
import { productFormSchema } from "./productFormSchema";

export function CurrencyMaskedInput(props: any) {
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
      control={props.control}
      rules={{ validate: (value) => productFormSchema.safeParse(value).success }}
      render={({ field: { onChange, onBlur, value } }) => (
        <MaskedInput
          mask={currencyMask}
          value={value}
          onChange={(event) => onChange(+event.target.value.replace(/[^\d]/g, ""))}
          onBlur={onBlur}
          placeholder='R$ 0,00'
          {...props}
        />
      )}
    />
  );
}
