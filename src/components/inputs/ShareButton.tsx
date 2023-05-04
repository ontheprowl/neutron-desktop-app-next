import type { MouseEventHandler } from "react";







export default function ShareButton({ onClick, className}: { onClick: MouseEventHandler<HTMLButtonElement>, className?:string}) {

    return (
        <button onClick={onClick} className={className}>
            <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 15V25C5 25.663 5.26339 26.2989 5.73223 26.7678C6.20107 27.2366 6.83696 27.5 7.5 27.5H22.5C23.163 27.5 23.7989 27.2366 24.2678 26.7678C24.7366 26.2989 25 25.663 25 25V15" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M20 7.5L15 2.5L10 7.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M15 2.5V18.75" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        </button>
    )
}