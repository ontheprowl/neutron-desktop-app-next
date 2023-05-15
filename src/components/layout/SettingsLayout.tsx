


import AppLayout from "@/components/layout/AppLayout";
import { SessionContext } from "@/lib/context/SessionContext";
import Link from "next/link";
import { useRouter } from "next/router";
import { ReactNode, useContext } from "react";




export default function SettingsLayout({ children }: { children: ReactNode }) {

    const context = useContext(SessionContext);

    const { pathname } = useRouter();


    return (
        <div className=" h-full flex flex-col space-y-4">
            <div className="flex flex-row justify-between">
                <div id="page_title" className="flex flex-col">
                    <h1 className="text-lg">Settings</h1>
                    <span className="text-neutral-base text-sm font-gilroy-medium"> Home - Settings</span>
                </div>
            </div>

            <div id="settings_tabs" className=" flex flex-row font-gilroy-medium text-base space-x-6">
                <Link href="/settings/tally" scroll={false} className={`transition-all text-neutral-dark py-3 border-b-2 hover:opacity-70 ${pathname.includes('tally') ? 'text-primary-base border-primary-base font-bold' : 'border-transparent '}`}>Tally</Link>
                <Link href="/settings/sync" scroll={false} className={`transition-all text-neutral-dark py-3 border-b-2 hover:opacity-70 ${pathname.includes('sync') ? 'text-primary-base border-primary-base font-bold' : 'border-transparent '}`}>Sync</Link>
                <Link href="/settings/misc" scroll={false} className={`transition-all text-neutral-dark py-3 border-b-2 hover:opacity-70 ${pathname.includes('misc') ? 'text-primary-base border-primary-base font-bold' : 'border-transparent '}`}>Misc</Link>
            </div>

            <div id="settings_panel" className="h-full overflow-y-scroll">
                {children}
            </div>


        </div >
    )
}





