import MaskedInput from "react-text-mask";
import { Controller, Control } from "react-hook-form";
import { createNumberMask } from "text-mask-addons";
import { productFormSchema } from "./productFormSchema";
import { ChangeEventHandler, InputHTMLAttributes } from "react";

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

  function formatValue(value: string, onChange: (...event: any[]) => void) {
    let formattedValue = value;
    const comma = ",";
    const splittedValue = formattedValue.split(comma);

    if (formattedValue && splittedValue) {
      const checkValueNotHaveUnit = splittedValue[0] === "R$ ";
      const checkValueNotHaveDecimals = !splittedValue[1];
      const checkValueHaveOneDecimal = splittedValue[1]?.length === 1;

      if (checkValueNotHaveUnit) {
        formattedValue = splittedValue[0] + "0" + comma + splittedValue[1];
      }

      if (checkValueNotHaveDecimals) {
        formattedValue = formattedValue + comma + "00";
      }

      if (checkValueHaveOneDecimal) {
        formattedValue = formattedValue + "0";
      }
    }

    onChange(formattedValue);
  }

  return (
    <Controller
      name='preco'
      control={control}
      rules={{ validate: (value) => productFormSchema.safeParse(value).success }}
      render={({ field: { onChange, onBlur, value } }) => (
        <MaskedInput
          mask={currencyMask}
          value={value}
          onChange={onChange}
          onBlur={(event) => {
            formatValue(event.target.value, onChange);
            return onBlur();
          }}
          placeholder='R$ 0,00'
          {...props}
        />
      )}
    />
  );
}
