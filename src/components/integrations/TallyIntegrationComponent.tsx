import { useFetcher, useTransition } from "@remix-run/react";
import NucleiTextInput from "../inputs/fields/NucleiTextInput";
import { useEffect } from "react";
import { emitToast } from "~/utils/toasts/NeutronToastContainer";
import { injectStyle } from "react-toastify/dist/inject-style";
import { useFormContext, useWatch } from "react-hook-form";
import DefaultSpinner from "../layout/DefaultSpinner";
import { OnboardingDataStore } from "~/stores/OnboardingDataStore";



export default function TallyIntegrationComponent() {


    const fetcher = useFetcher();

    const { control, setValue } = useFormContext();

    const tallyPort = useWatch({ control, name: 'tally_port', defaultValue: '9000' });
    const tallyHostname = useWatch({ control, name: 'tally_host', defaultValue: 'localhost' });


    useEffect(() => {
        console.log("DATA:")
        console.dir(fetcher.data)
        if (fetcher.data && fetcher.state == "loading") {
            if (fetcher.data['status'] == '1') {
                setValue('creds', {
                    tally_port: tallyPort,
                    tally_host: tallyHostname
                });
                setValue('integration', 'tally');
                OnboardingDataStore.update((s) => {
                    s.credsReceived = true
                })
                emitToast("Tally Connection successful", null, "success")
            } else {
                emitToast("Tally Connection unsuccessful", "Please check the values entered for the Hostname and Port", "error")
            }

        }
    }, [fetcher])


    return (<div>
        <NucleiTextInput name="tally_port" label="Port" defaultValue={tallyPort} placeholder='By default, Tally uses port 9000 to talk to other applications' type="text"></NucleiTextInput>
        <NucleiTextInput name="tally_host" label="Hostname" defaultValue={tallyHostname} placeholder='Please enter your public IP Address here' type="text"></NucleiTextInput>
        <button type="button" className="bg-primary-base text-white min-h-max p-4 min-w-[200px] rounded-xl" onClick={() => {

            const form = new FormData();
            form.append('tally_port', tallyPort)
            form.append('tally_host', tallyHostname)
            fetcher.submit(form, { method: "post", action: '/integrations/tally/test?upload=false' })
        }}>{fetcher.state != "idle" ? <DefaultSpinner></DefaultSpinner> : 'Test Connection'}</button>
    </div>)
}