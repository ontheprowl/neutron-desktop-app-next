
import { DocumentData } from "firebase/firestore";
import { createContext } from "react";



export const SessionContext = createContext<{ metadata: DocumentData | undefined, businessData: DocumentData | undefined }>({
    metadata: {},
    businessData: {}
}) 