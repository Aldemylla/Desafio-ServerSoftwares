import { format } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";

export const useFormatDate = (date: Date) => {
  const formattedDate = format(new Date(date), "EEEEEE'., 'd' de 'MMM'. de 'yyyy'", {
    locale: ptBR,
  });

  return formattedDate;
};
