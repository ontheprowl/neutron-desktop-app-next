
import { useState } from 'react'
import SaveIcon from '~/assets/images/saveIcon.svg'




export default function SaveButton({ onClick, submit }: { onClick?: React.MouseEventHandler<HTMLButtonElement>, submit?: boolean }) {

    const [clicked, setClicked] = useState(false);

    return (
        <button type={submit ? 'submit' : 'button'} onClick={onClick ? (e) => { setClicked(true); onClick(e); setClicked(false); } : submit ? () => { setClicked(true); } : () => {
            alert("No click handler implemented")
        }} className="bg-success-light font-gilroy-medium hover:opacity-70 transition-all min-w-fit rounded-lg p-3 text-success-dark space-x-2 flex flex-row items-center">
            <img src={SaveIcon} alt="save_icon" className='h-6'></img>
            <span>Save</span>
        </button>
    )

}