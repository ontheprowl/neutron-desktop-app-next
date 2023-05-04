
import { useState } from 'react'
import DisconnectIcon from '~/assets/images/disconnectIcon.svg'




export default function DisconnectButton({ onClick, submit }: { onClick?: React.MouseEventHandler<HTMLButtonElement>, submit?: boolean }) {

    const [clicked, setClicked] = useState(false);

    return (
        <button type={submit ? 'submit' : 'button'} onClick={onClick ? (e) => { setClicked(true); onClick(e); setClicked(false); } : submit ? () => { setClicked(true); } : () => {
            alert("No click handler implemented")
        }} className="bg-error-light font-gilroy-medium hover:opacity-70 transition-all min-w-fit rounded-lg p-3 text-error-dark space-x-2 flex flex-row items-center">
            <img src={DisconnectIcon} alt="save_icon" className='h-6'></img>
            <span>Disconnect</span>
        </button>
    )

}