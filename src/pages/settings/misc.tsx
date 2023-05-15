import AppLayout from "@/components/layout/AppLayout";
import SettingsLayout from "@/components/layout/SettingsLayout";
import { SessionContext } from "@/lib/context/SessionContext";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext } from "react";




export default function MiscSettingsPage() {

    const context = useContext(SessionContext);

    const { pathname } = useRouter();


    return (
        <div className=" h-full flex flex-col space-y-4">
            misc
        </div>
    )
}

MiscSettingsPage.getLayout = function getLayout(page) {
    return (
        <AppLayout>
            <SettingsLayout>
                {page}
            </SettingsLayout>

        </AppLayout>
    )
}



