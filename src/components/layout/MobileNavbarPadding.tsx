



export default function MobileNavbarPadding({ size }: { size?: "large" }) {

    return (<div className={`h-${size == "large" ? '40' : '20'} w-auto sm:hidden`}></div>)
}