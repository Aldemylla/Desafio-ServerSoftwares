import zod from "zod";

export const productFormSchema = zod.object({
  codigo: zod
    .string()
    .nonempty("O código é obrigatório")
    .min(5, "Insira mais de 5 caracteres")
    .max(30, "O número máximo de caracteres é 30"),
  descricao: zod
    .string()
    .nonempty("A descrição é obrigatória")
    .min(5, "Insira mais de 5 caracteres")
    .max(50, "O número máximo de caracteres é 50"),
  preco: zod.string().refine(
    (value) => {
      const numericValue = Number(value.replace(/[^\d]/g, ""));

      return !isNaN(numericValue) && numericValue > 0;
    },
    { message: "O preço é obrigatório" }
  ),
});

export type ProductFormProps = zod.infer<typeof productFormSchema>;
