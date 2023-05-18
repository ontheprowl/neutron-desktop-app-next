/* eslint-disable */
import NucleiTextInput from "../inputs/fields/NucleiTextInput";
import { useContext, useEffect, useState } from "react";
import { injectStyle } from "react-toastify/dist/inject-style";
import { useFormContext, useWatch } from "react-hook-form";
import DefaultSpinner from "../layout/DefaultSpinner";
import { emitToast } from "../toasts/NeutronToastContainer";
import { useRouter } from "next/router";
import { invoke } from "@tauri-apps/api/tauri";
import { doc, updateDoc } from "firebase/firestore";
import { fbFirestore } from "@/lib/firebase/firebase-config";
import { SessionContext } from "@/lib/context/SessionContext";



export default function TallyIntegrationComponent() {


    const { control, setValue } = useFormContext();

    const { metadata, businessData } = useContext(SessionContext);

    console.log(businessData)

    const tallyPort = useWatch({ control, name: 'tally_port', defaultValue: businessData?.creds?.port });
    const tallyHostname = useWatch({ control, name: 'tally_host', defaultValue: businessData?.creds?.hostname });

    const router = useRouter()

    const [loading, setLoading] = useState(false)


    return (<div>
        <NucleiTextInput name="tally_port" label="Tally Port" defaultValue={businessData?.creds?.port} placeholder='By default, Tally uses port 9000 to talk to other applications' type="text"></NucleiTextInput>
        <NucleiTextInput name="tally_host" label="Tally Host" defaultValue={businessData?.creds?.hostname} placeholder='Please enter your public IP Address here' type="text"></NucleiTextInput>
        <button type="submit" className="bg-primary-base hover:bg-primary-dark active:opacity-80 text-white min-h-max p-4 min-w-[200px] rounded-xl" onClick={() => {
            setLoading(true)
            const form: { [x: string]: any } = {}
            form['tally_port'] = tallyPort
            form['tally_host'] = tallyHostname
            console.log(form)
            invoke('ping', { host: tallyHostname, port: tallyPort }).then((data: { [x: string]: any }) => {
                setLoading(false);
                if (data?.status == 0) {
                    updateDoc(doc(fbFirestore, `businesses/${metadata?.businessID}`), { integration: 'tally', creds: { hostname: tallyHostname, port: tallyPort } }).then(() => {
                        emitToast("Connection Successful", "Your Tally connection details have been saved", "success");
                    })
                } else {
                    emitToast("Connection Unsuccessful", "Please check the values entered for the Hostname and Port", "error")

                }
            })

        }}>{loading ? <DefaultSpinner></DefaultSpinner> : 'Test & Save Connection'}</button>
    </div>)
}