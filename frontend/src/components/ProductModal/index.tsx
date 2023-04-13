import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { ProductFormProps, productFormSchema } from "./productFormSchema";
import { Input } from "./Input";
import { useProductsContext } from "@/contexts/ProductsContext";

export function ProductModal() {
  const {
    addProduct,
    updateProduct,
    productToUpdate,
    productFormModalOpened,
    setProductFormModalOpened,
  } = useProductsContext();
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
    } else {
      reset({
        codigo: "",
        descricao: "",
        preco: 0,
      });
    }
  }, [productToUpdate]);

  const handleForm = async (product: ProductFormProps) => {
    if (productAction === "Cadastrar") {
      addProduct(product);
    } else if (productAction === "Editar") {
      updateProduct(product);
    }
  };

  function closeModal() {
    setProductFormModalOpened(false);
  }

  return productFormModalOpened ? (
    <div role='dialog' aria-labelledby='modal-title' aria-modal='true'>
      <header>
        <h2 id='modal-title'>{productAction} produto</h2>
        <button onClick={closeModal}>X</button>
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
