import { useNavigation } from "@remix-run/react";
import { useState } from "react";
import DefaultSpinner from "~/components/layout/DefaultSpinner";






export default function NucleiPrimaryButton({ text, onClick }: { text: string, onClick: React.MouseEventHandler<HTMLButtonElement> }) {

    const [clicked, setClicked] = useState(false);

    let navigation = useNavigation();


    return (
        <button disabled={clicked} onClick={(e) => {
            setClicked(true);
            onClick(e);
            setClicked(false);
        }} className="bg-primary-base min-w-max text-white hover:bg-primary-dark transition-all rounded-lg p-3">
            {navigation.state == "idle" ? text : <DefaultSpinner />}
        </button>
    )
}