import type { MouseEventHandler } from "react";






export default function TransparentButton({ className, onClick, text, variant, submit, size }: { onClick: MouseEventHandler<HTMLButtonElement>, text?: string | JSX.Element, submit?: boolean, size?: "small" | "full", variant?: string, className: string }) {
    return (<button type={submit ? "submit" : "button"} className={`z-0 ${size == "full" ? 'w-full' : 'w-[200px]'}  self-center whitespace-nowrap rounded-lg bg-transparent border-2 border-white text-white p-4 text-${variant == "light" ? 'white' : 'black'} transition-all`.concat(className)} onClick={onClick} >{text}</button>)



}