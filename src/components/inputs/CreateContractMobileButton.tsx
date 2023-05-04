
export default function CreateContractMobileButton({ className, selected }: { className: string, selected?: boolean }) {




    return (
        <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.75 5V19M5.75 12H19.75" stroke={selected ? "#D7A1FB" : "#D0D5DD"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )

}