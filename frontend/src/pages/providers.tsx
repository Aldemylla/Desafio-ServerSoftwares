import { ReactNode } from "react";

import { ProductsContextProvider } from "@/contexts/ProductsContext";
import { ToastContextProvider } from "@/contexts/ToastContext";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <ProductsContextProvider>
      <ToastContextProvider>{children}</ToastContextProvider>
    </ProductsContextProvider>
  );
}
