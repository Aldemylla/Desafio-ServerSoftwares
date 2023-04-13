import { createContext, useContext, useState, ReactNode, useEffect, useRef } from "react";
import { Id, toast } from "react-toastify";

import { useProductsContext } from "../ProductsContext";

const ToastContext = createContext({});

export function useToastContext() {
  return useContext(ToastContext);
}

export const ToastContextProvider = ({ children }: { children: ReactNode }) => {
  const { loading, error } = useProductsContext();

  const toastId = useRef<null | Id>(null);
  const [timerToToast, setTimerToToast] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (loading) {
      const timer = setTimeout(() => {
        const id = toast.loading("Carregando...", { autoClose: false });
        toastId.current = id;
      }, 500);

      setTimerToToast(timer);
    } else {
      toast.dismiss(toastId.current ?? 0);
      if (timerToToast) clearTimeout(timerToToast);
    }
  }, [loading]);

  useEffect(() => {
    if (error) {
      console.error(error);
    }
  }, [error]);

  return <ToastContext.Provider value={{}}>{children}</ToastContext.Provider>;
};
