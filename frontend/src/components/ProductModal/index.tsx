import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProductFormProps, productFormSchema } from "./productFormSchema";
import { Input } from "./Input";
import { useProductsContext } from "@/contexts/ProductsContext";
import { Product } from "@/types/Product";
import { useEffect } from "react";

interface ProductModalProps {
  open: boolean;
  product?: Product;
}

export function ProductModal({ open }: ProductModalProps) {
  const { addProduct, updateProduct, productToUpdate } = useProductsContext();
  const productAction = !!productToUpdate ? "Editar" : "Cadastrar";
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProductFormProps>({
    mode: "all",
    resolver: zodResolver(productFormSchema),
  });

  useEffect(() => {
    if (productToUpdate) {
      reset(productToUpdate);
    }
  }, [productToUpdate]);

  const handleForm = async (product: ProductFormProps) => {
    if (productAction === "Cadastrar") {
      addProduct(product);
    } else if (productAction === "Editar") {
      updateProduct(product);
    }
  };

  return open || !!productToUpdate ? (
    <div role='dialog' aria-labelledby='modal-title' aria-modal='true'>
      <header>
        <h2 id='modal-title'>{productAction} produto</h2>
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
        {productToUpdate && <p>Data de cadastro: {String(productToUpdate.data_cadastro)}</p>}

        <button type='submit'>{productAction}</button>
      </form>
    </div>
  ) : null;
}
