import React from 'react'
import ExportIcon from '~/assets/images/exportIcon.svg'




export default function ExportButton({onClick} : {onClick? : React.MouseEventHandler<HTMLButtonElement>}) {


    return (
        <button onClick={onClick ? onClick : () => {
            alert("No click handler implemented")
        }} className="bg-primary-light hover:opacity-70 transition-all min-w-fit rounded-lg p-3 text-primary-base space-x-2 flex flex-row items-center">
            <img src={ExportIcon} alt="filter_icon" className='h-6'></img>
            <span>Export</span>
        </button>
    )


}