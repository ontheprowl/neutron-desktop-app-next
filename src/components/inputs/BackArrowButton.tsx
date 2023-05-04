

import type { MouseEventHandler } from "react";




export default function BackArrowButton({ onClick, className }: { onClick: MouseEventHandler<HTMLButtonElement>, className: string }) {

    return (<button onClick={onClick} className={className}>
        <svg width="27" height="28" viewBox="0 0 27 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_982_754)">
                <path d="M19.1615 5.23629L17.2865 3.36133L6.64844 13.9994L17.2865 24.6375L19.1615 22.7625L10.4117 13.9994L19.1615 5.23629Z" fill="white" />
            </g>
            <defs>
                <clipPath id="clip0_982_754">
                    <rect width="26.5952" height="26.5952" fill="white" transform="translate(0 0.702148)" />
                </clipPath>
            </defs>
        </svg>

    </button>
    )
}

