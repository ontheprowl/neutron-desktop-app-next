import type { MouseEventHandler } from "react";




export default function AddButton({ onClick, className }: { onClick: MouseEventHandler<HTMLButtonElement>, className: string }) {

    return (<button onClick={onClick} className={className}><svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M14.0001 8.75C14.4834 8.75 14.8751 9.14176 14.8751 9.625V13.125H18.3751C18.8583 13.125 19.2501 13.5168 19.2501 14C19.2501 14.4832 18.8583 14.875 18.3751 14.875H14.8751V18.375C14.8751 18.8582 14.4834 19.25 14.0001 19.25C13.5169 19.25 13.1251 18.8582 13.1251 18.375V14.875H9.62512C9.14188 14.875 8.75012 14.4832 8.75012 14C8.75012 13.5168 9.14188 13.125 9.62512 13.125H13.1251V9.625C13.1251 9.14176 13.5169 8.75 14.0001 8.75ZM3.50012 14C3.50012 8.20101 8.20113 3.5 14.0001 3.5C19.7991 3.5 24.5001 8.20101 24.5001 14C24.5001 19.799 19.7991 24.5 14.0001 24.5C8.20113 24.5 3.50012 19.799 3.50012 14ZM14.0001 5.25C9.16764 5.25 5.25012 9.16751 5.25012 14C5.25012 18.8324 9.16764 22.75 14.0001 22.75C18.8326 22.75 22.7501 18.8324 22.7501 14C22.7501 9.16751 18.8326 5.25 14.0001 5.25Z" fill="white" />
    </svg></button>
    );
}