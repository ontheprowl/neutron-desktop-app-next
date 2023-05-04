import { useFetcher } from "@remix-run/react"
import ConnectButton from "../inputs/buttons/ConnectButton";



export default function ZohoIntegrationComponent({ }) {


    const fetcher = useFetcher();



    return (
        <div className="flex flex-col items-center space-y-4 m-5">
            <h1 className="font-gilroy-bold text-lg">The Zoho Integration requires you to log-in to your Zoho account and grant permissions to Neutron to access your data</h1>
            <ConnectButton text="Authorize Zoho" onClick={() => {
                const form = new FormData();
                form.append('redirect_uri', '/settings/integrations')
                fetcher.submit(form, { method: 'post', action: '/integrations/zoho/consent' })
            }} />
        </div>)


}

