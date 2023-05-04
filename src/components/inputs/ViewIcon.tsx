import { MouseEventHandler } from "react";




export default function ViewIcon({onClick, className} :{ onClick: MouseEventHandler<HTMLButtonElement>, className: string}) {

    return (<button onClick={onClick} className={className}>
        <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_823_626)">
                <path d="M0.833374 10.6637C0.833374 10.6637 4.16671 3.99707 10 3.99707C15.8334 3.99707 19.1667 10.6637 19.1667 10.6637C19.1667 10.6637 15.8334 17.3304 10 17.3304C4.16671 17.3304 0.833374 10.6637 0.833374 10.6637Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M10 13.1641C11.3807 13.1641 12.5 12.0448 12.5 10.6641C12.5 9.28335 11.3807 8.16406 10 8.16406C8.61929 8.16406 7.5 9.28335 7.5 10.6641C7.5 12.0448 8.61929 13.1641 10 13.1641Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </g>
            <defs>
                <clipPath id="clip0_823_626">
                    <rect width="20" height="20" fill="white" transform="translate(0 0.664062)" />
                </clipPath>
            </defs>
        </svg>
    </button>
    )
}