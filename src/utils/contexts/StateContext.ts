import { createContext } from "react";




export const StateContext = createContext<{ getter?: any, setter?: React.Dispatch<React.SetStateAction<any>> }>({})
