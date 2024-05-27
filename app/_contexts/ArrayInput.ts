import { createContext, Dispatch, SetStateAction } from "react";

interface ArrayInputContextType {
  arrayInput: Array<number>;
  setArrayInput: Dispatch<SetStateAction<Array<number>>>;
}

const ArrayInputContext = createContext<ArrayInputContextType | null>(null);

export default ArrayInputContext;
