import { createContext, useContext, useState, ReactNode, useEffect, useRef } from "react";
import { Id, toast } from "react-toastify";

import { useProductsContext } from "../ProductsContext";

const ToastContext = createContext({});

export function useToastContext() {
  return useContext(ToastContext);
}

export const ToastContextProvider = ({ children }: { children: ReactNode }) => {
  const { loading, success, error } = useProductsContext();

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
      toast(error, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        type: "error",
      });
    }
  }, [error]);

  useEffect(() => {
    if (success) {
      toast(success, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        type: "success",
      });
    }
  }, [success]);

  return <ToastContext.Provider value={{}}>{children}</ToastContext.Provider>;
};
