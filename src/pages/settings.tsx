// import AppLayout from "@/components/layout/AppLayout";
// import SettingsLayout from "@/components/layout/SettingsLayout";
// import { SessionContext } from "@/lib/context/SessionContext";
// import Link from "next/link";
// import { useRouter } from "next/router";
// import { useContext } from "react";




// export default function SettingsPage() {

//     const context = useContext(SessionContext);

//     const { pathname } = useRouter();


//     return (
//         <div className=" h-full flex flex-col space-y-4">
//             <div className="flex flex-row justify-between">
//                 <div id="page_title" className="flex flex-col">
//                     <h1 className="text-lg">Settings</h1>
//                     <span className="text-neutral-base text-sm font-gilroy-medium"> Home - Settings</span>
//                 </div>
//             </div>

//             <div id="settings_tabs" className=" flex flex-row font-gilroy-medium text-base space-x-6">
//                 <Link href="/settings/tally" className={`transition-all text-neutral-dark py-3 border-b-2 hover:opacity-70 ${pathname.includes('Tally') ? 'text-primary-base border-primary-base font-bold' : 'border-transparent '}`}>Tally</Link>
//                 <Link href="billing" className={`transition-all text-neutral-dark py-3 border-b-2 hover:opacity-70 ${pathname.includes('billing') ? 'text-primary-base border-primary-base font-bold' : 'border-transparent '}`}>Billing</Link>
//                 <Link href="integrations" className={`transition-all text-neutral-dark py-3 border-b-2 hover:opacity-70 ${pathname.includes('integrations') ? 'text-primary-base border-primary-base font-bold' : 'border-transparent '}`}>Integrations</Link>
//                 <Link href="permissions" className={`transition-all text-neutral-dark py-3 border-b-2 hover:opacity-70 ${pathname.includes('permissions') ? 'text-primary-base border-primary-base font-bold' : 'border-transparent '}`}>Permissions</Link>

//             </div>

//             <div id="settings_panel" className="h-full overflow-y-scroll">
//                 hi
//             </div>


//         </div >
//     )
// }

// SettingsPage.getLayout = function getLayout(page) {
//     return (
//         <AppLayout>
//             <SettingsLayout>
//                 {page}
//             </SettingsLayout>

//         </AppLayout>
//     )
// }



