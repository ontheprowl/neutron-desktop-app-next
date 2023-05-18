/* eslint-disable */

import DashboardIcon from "@/components/inputs/DashboardIcon";
import { fbAuth, fbFirestore } from "@/lib/firebase/firebase-config"
import { useRouter } from "next/router";
import Image from 'next/image'
import { ReactNode, useEffect, useState } from "react"
import { useAuthState, useSignOut } from "react-firebase-hooks/auth"
import { useDocumentData } from "react-firebase-hooks/firestore"

import LogoutButton from "@/components/LogoutButton";
import SettingsButton from "@/components/SettingsButton";
import InvoicesIcon from "@/components/inputs/InvoicesIcon";
import WorkflowIcon from "@/components/inputs/WorkflowIcon";
import NeutronModal from "@/components/layout/NeutronModal";
import { doc } from "firebase/firestore";
import { logout } from "@/lib/firebase/firebase-utils";

import { getVersion } from '@tauri-apps/api/app';
import { invoke } from "@tauri-apps/api/tauri";
import {  TallyLicenseInfo } from "@/lib/models/tally";
import { SessionContext } from "@/lib/context/SessionContext";
// import {s}'tauri-plugin-autostart-api';




export default function AppLayout({ children }: { children: ReactNode }) {

    // To toggle autostart

    useEffect(() => {
        import('tauri-plugin-autostart-api').then(async (autostart) => {

            if (!(await autostart.isEnabled())) {
                autostart.enable();
            }
        });
    })




    const [user, loading, error] = useAuthState(fbAuth)

    const { pathname, push } = useRouter();
    const [licenseInfo, setLicenseInfo] = useState<TallyLicenseInfo>();





    const pushWithoutScroll = (url: string) => {
        push(url, undefined, { scroll: false })
    }

    const [version, setVersion] = useState('')

    useEffect(() => {
        getVersion().then(setVersion)
    }, [])

    useEffect(() => {
        import("tauri-plugin-store-api").then(({ Store }) => {
            const store = new Store(".settings.dat");

            store.set("license-info", licenseInfo);
            store.entries().then(console.log)
        })


    }, [licenseInfo])



    const [signOut] = useSignOut(fbAuth);

    const [logoutConfirmationModal, setLogoutConfirmationModal] = useState(false);

    const [userMetadata, loadingMetadata, metadataError] = useDocumentData(doc(fbFirestore, `metadata/${user?.uid}`));
    const [businessData, loadingBusiness, businessError, snapshot] = useDocumentData(doc(fbFirestore, `businesses/${userMetadata?.businessID}`));


    useEffect(() => {
        if (!user) {
            push('/')
        }
    }, [user])


    // * Check Tally Connection State and Obtain License Info
    useEffect(() => {
        console.log("CHECKING TALLY CONNECTION");
        invoke('ping', { host: businessData?.creds?.hostname ? businessData?.creds?.hostname : 'localhost', port: businessData?.creds?.port ? businessData?.creds?.port : '9000' }).then((data: { [x: string]: any }) => {
            console.log(data);
            if (data?.status == 0) {
                setLicenseInfo(data?.data?.ENVELOPE?.LICENSEINFO);
            } else {
                setLicenseInfo(undefined);

            }
        })
    }, [pathname])


    const currView: Array<string> = []



    return (
        <div className={`flex font-gilroy-bold h-auto w-full flex-col bg-white sm:border-0 border-transparent`}>

            <div id="top_nav" className="h-16 flex flex-row space-x-10 items-center justify-between p-3 py-12">
                <div className="flex flex-col items-center space-y-2 px-5 w-2/12 max-w-3xl">
                    <Image src="/icon_black.svg" width="100" height="100" className="w-40" alt="Icon" />
                    <h1 className="text-xl">Companion App</h1>
                </div>



                {licenseInfo ?
                    <div className="flex flex-row items-center space-x-3">
                        <div className="p-2 rounded-full w-1 bg-success-base animate-none"></div>
                        <span className="text-success-base text-lg font-gilroy-regular">Tally Connected</span>
                    </div>
                    : <div className="flex flex-row items-center space-x-3">
                        <div className="p-2 rounded-full w-1 bg-error-base animate-none"></div>
                        <span className="text-error-base text-lg font-gilroy-regular">Tally Not Connected</span>
                    </div>}


                <div className="flex flex-col space-y-2 text-right">
                    <span>Welcome {businessData?.business_name}</span>
                    <span className="font-gilroy-medium text-neutral-base text-sm">{userMetadata?.name}</span>
                </div>

            </div>
            <div className="flex flex-row space-x-10 shadow-inner bg-[#FBFAFF] px-4 py-6">
                <aside className=" px-1 hidden shadow-lg bg-white rounded-lg sm:h-screen sm:flex sm:w-52" aria-label="Sidebar">
                    <div className=" h-auto flex flex-col items-center justify-between rounded p-3  bg-bg-primary-dark  dark:bg-gray-800">

                        <div className="w-full place-items-center text-black ">

                            <ul className={`mt-5 w-full  space-y-6`}>
                                <li className=" transition-all  rounded-lg w-full">
                                    <button
                                        onClick={() => {

                                            pushWithoutScroll('/companies')



                                        }}
                                        className={`rounded-lg transition-all w-full flex flex-row align-middle p-2  border-2 border-transparent active:border-primary-base  hover:border-primary-base  sm:space-x-4 ${pathname.includes('companies') ? 'bg-primary-base text-white' : `text-black`}
                    `}
                                    >
                                        <DashboardIcon selected={pathname.includes('companies')} />

                                        <h1 className="text-[18px]">Companies</h1>
                                    </button>
                                </li>


                                <li className=" transition-all rounded-lg">
                                    <button

                                        onClick={() => {

                                            // TODO: Add logic on disputes parent layout page to redirect to /disputeID of the first active dispute
                                            pushWithoutScroll('/add_company')


                                        }}
                                        className={`rounded-lg transition-all flex border-2 border-transparent active:border-primary-base  hover:border-primary-base w-full flex-row align-middle p-2  sm:space-x-4 ${pathname.includes('add_company') ? 'bg-primary-base text-white' : `text-black`}
                    `}
                                    >
                                        <WorkflowIcon selected={pathname.includes('add_company')} />
                                        <h1 className="text-[18px] whitespace-nowrap">Add Company</h1>

                                    </button>
                                </li>
                                <li className=" transition-all rounded-lg">
                                    <button

                                        onClick={() => {

                                            // TODO: Add logic on disputes parent layout page to redirect to /disputeID of the first active dispute

                                            pushWithoutScroll('/vouchers')


                                        }}
                                        className={`rounded-lg transition-all flex border-2 border-transparent active:border-primary-base  hover:border-primary-base w-full flex-row align-middle p-2 sm:space-x-4 ${pathname.includes('vouchers') ? 'bg-primary-base text-white' : `text-black`}
                    `}
                                    >
                                        <InvoicesIcon selected={pathname.includes('vouchers')} />
                                        <h1 className="text-[18px]">Vouchers</h1>

                                    </button>
                                </li>
                                {/* <li className=" transition-all rounded-lg">
                        <button

                            onClick={() => {

                                // TODO: Add logic on disputes parent layout page to redirect to /disputeID of the first active dispute
                                push('customers')


                            }}
                            className={`rounded-lg transition-all flex border-2 border-transparent active:border-primary-base  hover:border-primary-base w-full flex-row align-middle p-2 sm:space-x-4 ${pathname.includes('customers') && !pathname.includes('workflows') ? 'bg-primary-base text-white' : `text-black`}
                    `}
                        >
                            <CustomersIcon selected={pathname.includes('customers') && !pathname.includes('workflows')} />
                            <h1 className="text-[18px]">Customers</h1>

                        </button>
                    </li> */}

                                <li className=" transition-all rounded-lg">
                                    <button onClick={() => {
                                        pushWithoutScroll('/settings/tally')

                                    }}
                                        className={`rounded-lg transition-all flex flex-row align-middle p-2 w-full border-2 border-transparent active:border-primary-base hover:border-primary-base  sm:space-x-4 ${pathname.includes('settings') ? 'bg-primary-base text-white' : `text-black`}
                     `}
                                    >
                                        <SettingsButton selected={pathname.includes('settings')} />
                                        <h1 className="text-[18px]">Settings</h1>

                                    </button>
                                </li>
                                <li className=" transition-all rounded-lg">
                                    <button onClick={() => {
                                        setLogoutConfirmationModal(!logoutConfirmationModal);
                                    }}
                                        className={`rounded-lg transition-all flex flex-row align-middle p-2 w-full border-2 border-transparent active:border-primary-base  hover:border-primary-base  sm:space-x-4 ${logoutConfirmationModal ? 'bg-primary-base text-white' : `text-black`}
                     `}
                                    >
                                        <LogoutButton></LogoutButton>
                                        <h1 className="text-[18px]">Logout</h1>
                                    </button>
                                </li>


                            </ul>
                        </div>
                        <div className="flex flex-row w-full items-start font-gilroy-regular text-secondary-text">{version}</div>


                    </div>
                </aside>
                <div className={`flex flex-col w-full  h-full sm:h-auto relative flex-grow`} >
                    <div
                        id="content-window"
                        className="h-screen overflow-y-scroll w-auto sm:rounded-sm  transition-height "
                    >
                        <SessionContext.Provider value={{ metadata: userMetadata, businessData: businessData }}>
                            {children}
                        </SessionContext.Provider>
                    </div>
                    {/* <div className="bottom-0 sm:hidden left-0 fixed w-full z-50 h-auto">
            <BottomNav></BottomNav>
        </div> */}

                </div >


            </div>
            {logoutConfirmationModal && <NeutronModal onConfirm={() => {
                logout()
            }} heading={<h1> You are about to log out of the Neutron app </h1>} body={<p> Are you sure you want to proceed?</p>} toggleModalFunction={setLogoutConfirmationModal}></NeutronModal>}
        </div >

    );

}