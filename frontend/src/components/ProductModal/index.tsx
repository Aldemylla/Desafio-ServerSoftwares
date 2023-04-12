import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProductFormProps, productFormSchema } from "./productFormSchema";
import { Input } from "./Input";
import { useProductsContext } from "@/contexts/ProductsContext";

interface ProductModalProps {
  open: boolean;
}

export function ProductModal({ open }: ProductModalProps) {
  const { addProduct } = useProductsContext();
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductFormProps>({
    mode: "all",
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      codigo: "",
      descricao: "",
      preco: 0,
    },
  });

  const handleForm = async (data: ProductFormProps) => {
    const response = await fetch(`${process.env.BASE_URL}/products`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status === 201) {
      addProduct(data);
    }
  };

  return open ? (
    <div role='dialog' aria-labelledby='modal-title' aria-modal='true'>
      <header>
        <h2 id='modal-title'>Cadastrar produto</h2>
        <button>X</button>
      </header>

      <form onSubmit={handleSubmit(handleForm)}>
        <Input inputName='codigo' error={errors.codigo?.message} register={register} />
        <Input inputName='descricao' error={errors.descricao?.message} register={register} />
        <Input
          inputName='preco'
          error={errors.preco?.message}
          register={register}
          control={control}
        />

        <button type='submit'>Cadastrar</button>
      </form>
    </div>
  ) : null;
}
