import TallyIntegrationComponent from "@/components/integrations/TallyIntegrationComponent";
import AppLayout from "@/components/layout/AppLayout";
import SettingsLayout from "@/components/layout/SettingsLayout";
import { SessionContext } from "@/lib/context/SessionContext";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext } from "react";
import { FormProvider, useForm } from "react-hook-form";




export default function TallySettingsPage() {

    const context = useContext(SessionContext);

    const tallySettingsForm = useForm();

    const { pathname } = useRouter();


    return (
        <div className=" h-full flex flex-col space-y-4">
            <div className="text-secondary-text font-gilroy-regular"> Configure your Tally connection here</div>
            <FormProvider {...tallySettingsForm}>
                <TallyIntegrationComponent />
            </FormProvider>
        </div >
    )
}

TallySettingsPage.getLayout = function getLayout(page) {
    return (
        <AppLayout>
            <SettingsLayout>
                {page}
            </SettingsLayout>

        </AppLayout>
    )
}



