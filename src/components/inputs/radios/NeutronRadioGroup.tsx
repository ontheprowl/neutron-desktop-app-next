import type { ReactNode} from "react";
import React, { useState } from "react";
import { StateContext } from "~/utils/contexts/StateContext";




export default function NeutronRadioGroup({ children }: { children: ReactNode[] }) {

    const [selectedButton, setSelectedButton] = useState<number>(0)

    return (
        <StateContext.Provider value={{ getter: selectedButton, setter: setSelectedButton }}>
            {children}
        </StateContext.Provider>)
}