
import EditIcon from '~/assets/images/editIcon.svg'




export default function EditButton({ onClick, active }: { onClick?: React.MouseEventHandler<HTMLButtonElement>, active?: boolean }) {


    return (
        <button type='button' onClick={onClick ? onClick : () => {
            alert("No click handler implemented")
        }} className="bg-primary-light font-gilroy-medium hover:opacity-70 transition-all min-w-fit rounded-lg p-3 text-primary-base space-x-2 flex flex-row items-center">
            <img src={EditIcon} alt="edit_icon" className='h-6'></img>
            <span>{active?'Discard':'Edit'}</span>
        </button>
    )

}