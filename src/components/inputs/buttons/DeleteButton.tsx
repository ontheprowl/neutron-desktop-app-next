
import DeleteIcon from "~/assets/images/deleteIcon.svg";



export default function DeleteButton({ onClick, text }: { onClick?: React.MouseEventHandler<HTMLButtonElement>, text?: string }) {

    return (<button type="button" onClick={onClick ? onClick : () => {
        alert("No click handler implemented")
    }} className="bg-error-light hover:opacity-70 font-gilroy-medium transition-all rounded-lg p-3 min-w-fit text-error-dark space-x-2 flex flex-row items-center">
        <img src={DeleteIcon} alt="filter_icon" className='h-6'></img>
        <span>{text ? text : 'Delete'}</span>
    </button>)
}




