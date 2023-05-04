
import EditIcon from '~/assets/images/editIcon.svg'
import DeleteIcon from '~/assets/images/deleteIcon.svg';



export default function EditButton({ onClick, active }: { onClick?: React.MouseEventHandler<HTMLButtonElement>, active?: boolean }) {


    return (
        <button type='button' onClick={onClick ? onClick : () => {
            alert("No click handler implemented")
        }} className={` ${active ? 'text-error-dark bg-error-light' : 'bg-primary-light text-primary-base '} hover:opacity-70 font-gilroy-medium transition-all min-w-fit rounded-lg p-3 space-x-2 flex flex-row items-center`}>
            <img src={active ? DeleteIcon : EditIcon} alt="edit_icon" className='h-6'></img>
            <span>{active ? 'Discard' : 'Edit'}</span>
        </button>
    )

}