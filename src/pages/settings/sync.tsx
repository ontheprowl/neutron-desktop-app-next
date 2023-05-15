import NucleiTextInput from "@/components/inputs/fields/NucleiTextInput";
import AppLayout from "@/components/layout/AppLayout";
import SettingsLayout from "@/components/layout/SettingsLayout";
import { SessionContext } from "@/lib/context/SessionContext";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext } from "react";
import { FormProvider, useForm } from "react-hook-form";




export default function SyncSettingsPage() {

    const context = useContext(SessionContext);

    const { pathname } = useRouter();

    const syncSettingsForm = useForm();

    return (
        <div className=" h-full flex flex-col space-y-4">
            <h1 className="text-secondary-text font-gilroy-regular">Options to control how Neutron syncs your Tally Data</h1>
            <FormProvider {...syncSettingsForm}>
                <form onSubmit={syncSettingsForm.handleSubmit(() => {

                })}>
                    <NucleiTextInput type="number" name={"settings.sync_frequency"} label={"Sync Frequency"} placeholder={""} />
                    <NucleiTextInput type="number" name={"settings.deleted_vouchers_frequency"} label={"Deleted Vouchers Sync Frequency"} placeholder={""} />


                    <NucleiTextInput type="number" name={"settings.retries"} label={"Retry Frequency"} placeholder={""} />

                </form>
            </FormProvider >

        </div >
    )
}

SyncSettingsPage.getLayout = function getLayout(page) {
    return (
        <AppLayout>
            <SettingsLayout>
                {page}
            </SettingsLayout>

        </AppLayout>
    )
}



