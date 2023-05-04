import { useLocation } from "@remix-run/react";
import { motion } from "framer-motion";
import { SetStateAction, useEffect, useState } from "react";





export default function NucleiToggle({ onToggle, control }: {  control?: boolean, onToggle: React.MouseEventHandler<HTMLDivElement> }) {


    return (
        <div onClick={onToggle} className={`transition-all flex flex-start p-1 w-14 h-8 bg-bg-primary-dark cursor-pointer rounded-full   whitespace-nowrap ${control && 'place-content-end'} ${control ? 'bg-primary-base' : 'bg-gray-400'} `}>

            <div
                className={ " transition-all flex items-center justify-center p-3 w-5 h-5 rounded-full bg-white"}
            >
                <input type="checkbox" className='hidden' value={control ? 'true' : 'false'}  ></input>
            </div>
        </div>
    )

}