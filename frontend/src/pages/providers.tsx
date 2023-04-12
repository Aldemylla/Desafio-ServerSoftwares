import { ReactNode } from "react";

import { ProductsContextProvider } from "@/contexts/ProductsContext";

export default function Providers({ children }: { children: ReactNode }) {
  return <ProductsContextProvider>{children}</ProductsContextProvider>;
}
