import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "../Button";
import { ProductFormProps, productFormSchema } from "./productFormSchema";
import { Input } from "./Input";
import { useProductsContext } from "@/contexts/ProductsContext";

import styles from "@/styles/ProductModal.module.scss";
import Image from "next/image";

export function ProductModal() {
  const {
    addProduct,
    updateProduct,
    productToUpdate,
    setProductToUpdate,
    productFormModalOpened,
    setProductFormModalOpened,
    loading,
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
  }, [productToUpdate, productFormModalOpened]);

  function closeModal() {
    setProductToUpdate(null);

    if (!loading) {
      setProductFormModalOpened(false);
    }
  }

  const handleForm = async (product: ProductFormProps) => {
    if (productAction === "Cadastrar") {
      await addProduct(product);
      closeModal();
    } else if (productAction === "Editar") {
      await updateProduct(product);
      closeModal();
    }
  };

  return productFormModalOpened ? (
    <div className={styles.backdrop} onClick={closeModal} role='presentation'>
      <div
        className={styles.container}
        role='dialog'
        aria-labelledby='modal-title'
        aria-modal='true'
        onClick={(e) => e.stopPropagation()}>
        <header className={styles.header}>
          <h2 className={styles.title} id='modal-title'>
            {productAction} produto
          </h2>
          <button className={styles.close} onClick={closeModal}>
            <Image src={"/icons/close.svg"} alt='fechar' width={25} height={25} />
          </button>
        </header>
        <form className={styles.form} onSubmit={handleSubmit(handleForm)}>
          <Input
            label='Código'
            inputName='codigo'
            error={errors.codigo?.message}
            register={register}
          />
          <Input
            label='Descrição'
            inputName='descricao'
            error={errors.descricao?.message}
            register={register}
          />
          <Input
            label='Preço'
            inputName='preco'
            error={errors.preco?.message}
            register={register}
            control={control}
          />
          {productToUpdate && <p>Data de cadastro: {String(productToUpdate.data_cadastro)}</p>}
          <Button type='submit'>{productAction}</Button>
        </form>
      </div>
    </div>
  ) : null;
}
