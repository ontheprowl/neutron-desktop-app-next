import NucleiCheckBox from "@/components/inputs/fields/NucleiCheckBox";
import AppLayout from "@/components/layout/AppLayout";
import DefaultSpinner from "@/components/layout/DefaultSpinner";
import { SessionContext } from "@/lib/context/SessionContext";
import { TallyCompanyDetails } from "@/lib/models/tally";
import { http, invoke } from "@tauri-apps/api"
import { L } from "@tauri-apps/api/event-2a9960e7";

import { ReactElement, JSXElementConstructor, ReactFragment, ReactPortal, useEffect, useState, useContext } from "react";
import { useQuery } from "react-query";




export default function AddCompany() {


    const { metadata, businessData } = useContext(SessionContext);

    console.log(businessData)

    const [companies, setCompanies] = useState<Array<TallyCompanyDetails>>([]);
    const [selected, setSelected] = useState<Array<boolean>>(new Array(companies.length))
    const [allSelected, setAllSelected] = useState<boolean>(false)

    const [refresh, setRefresh] = useState(false);
    useEffect(() => {
        invoke('get_tally_companies').then((data: { [x: string]: any }) => {
            if (data?.status != "-1") {
                if (Array.isArray(data?.ENVELOPE?.COMPANIES)) {
                    setCompanies(data?.ENVELOPE?.COMPANIES)
                } else {
                    setCompanies([data?.ENVELOPE?.COMPANIES])

                }
            }
        }
        ).catch(console.error)

    }, [refresh])

    return (

        <div className="bg-white rounded-xl px-8 shadow-lg w-full h-screen  flex flex-col space-y-4 p-4">
            <h1 className="font-gilroy-bold text-2xl">Add Company</h1>
            <div className="flex flex-row justify-between w-full">
                <div className=" flex flex-row items-center space-x-4 px-3 w-1/5">
                    <input type="checkbox" onChange={(e) => {
                        if (e.currentTarget.checked) {
                            setAllSelected(true)

                        } else {
                            setAllSelected(false)

                        }
                    }} className="text-primary-base fill-primary-base accent-primary-base rounded-full outline-none" placeholder="" />
                    <span className="font-gilroy-medium text-lg">Select All</span>
                </div>
                <div className=" flex flex-row items-center justify-end space-x-4 px-3 w-2/5">
                    <button onClick={() => {
                        setRefresh(!refresh);
                    }} className="text-white bg-primary-base transition-all hover:bg-primary-dark rounded-xl p-3 ">Refresh</button>
                    <button onClick={() => {
                        selected.forEach((_, index) => {
                            const companyGUID = companies[index]?.COMPANYGUID
                            const companyName = companies[index]?.COMPANY

                            invoke('main_tally_sync', { companyGuid: companyGUID, companyName: companyName }).then(console.dir)

                        })
                    }} className="text-white bg-primary-base whitespace-nowrap transition-all hover:bg-primary-dark rounded-xl p-3 ">Sync Selected Companies</button>
                </div>

            </div>
            <ul className={`flex flex-col h-full overflow-y-scroll snap-y  w-full p-2 px-5 ${companies.length > 0 ? 'justify-start items-start' : 'justify-center items-center'} space-y-6 `}
            >
                {companies.length > 0 ? companies.map((company, index) => {
                    return <li onClick={(e) => {
                        selected[index] = !selected[index]
                        setSelected(prevValue => [...selected])
                    }} className={`border-2 snap-start  ${allSelected || selected[index] === true ? 'border-primary-base scale-105' : 'border-transparent active:border-primary-base focus:border-primary-base'} overflow-x-visible    cursor-pointer  hover:border-l-accent-dark font-gilroy-bold rounded-xl bg-primary-light  p-4 transition-all w-3/5 border-black h-40`} key={company?.COMPANYGUID}>
                        <div className="flex flex-row h-full justify-between space-x-4">
                            <div className="flex flex-col w-1/3 justify-between space-y-4">
                                <div className="flex flex-col space-y-1">
                                    <span> {company?.COMPANY}</span>
                                    <span className="text-secondary-text text-xs ">{company?.COMPANYFORMALNAME}</span>
                                </div>
                                <div className="flex flex-col text-sm font-gilroy-medium space-y-1">
                                    <span>{company?.COMPANYEMAIL}</span>
                                    <span>{company?.COMPANYWEBSITE}</span>

                                </div>

                            </div>
                            <div className=" w-1/6 flex flex-col items-center justify-between space-y-2">
                                {businessData?.organizations?.company?.COMPANYGUID
                                    ?.synced ? <div className="text-success-dark p-1 bg-success-light text-center rounded-lg">SYNCED</div>
                                    : <div className="text-error-dark  p-1 bg-error-light text-center rounded-lg">NOT SYNCED</div>
                                }
                                <div>{company?.CMPVCHALTERID ? company?.CMPVCHALTERID : '0'} Ledgers</div>
                            </div>
                            <div className="flex flex-col items-end justify-between w-1/3  space-y-4">
                                <span className="font-gilroy-medium bg-primary-dark text-white  rounded-lg p-3">From {company?.BOOKSFROM}</span>
                                <div className="flex flex-col items-end">
                                    <span>{company?.STATE}</span>
                                    <span>{company?.COUNTRY}</span>
                                </div>
                            </div>


                        </div>
                    </li>
                }) : "No Companies Found"}
            </ul>
        </div>
    )
}

AddCompany.getLayout = function getLayout(page: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | null | undefined) {
    return (
        <AppLayout>
            {page}
        </AppLayout>
    )
}
