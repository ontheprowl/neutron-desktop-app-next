
import FilterIcon from '~/assets/images/filterIcon.svg'




export default function FilterButton({ onClick }: { onClick?: React.MouseEventHandler<HTMLButtonElement> }) {


    return (
        <button onClick={onClick?onClick : ()=>{
            alert("No click handler implemented")
        }} className="bg-primary-light hover:opacity-70 transition-all min-w-fit rounded-lg p-3 text-primary-base space-x-2 flex flex-row items-center">
            <img src={FilterIcon} alt="filter_icon" className='h-6'></img>
            <span>Filter</span>
        </button>
    )

}