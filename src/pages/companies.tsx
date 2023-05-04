import AppLayout from "@/components/layout/AppLayout";
import DefaultSpinner from "@/components/layout/DefaultSpinner";
import { TallyCompanyDetails } from "@/lib/models/tally";
import { http, invoke } from "@tauri-apps/api"
import { L } from "@tauri-apps/api/event-2a9960e7";

import { ReactElement, JSXElementConstructor, ReactFragment, ReactPortal, useEffect, useState } from "react";
import { useQuery } from "react-query";




export default function CompaniesPage() {


    const [companies, setCompanies] = useState<Array<TallyCompanyDetails>>([]);
    const [refresh, setRefresh] = useState(false);
    const [selected, setSelected] = useState(0)
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
    console.log(companies)

    console.log(selected)
    return (

        <div className="bg-white rounded-xl px-8 shadow-lg w-full h-screen flex flex-col space-y-4 p-4">
            <h1 className="font-gilroy-bold text-2xl">My Companies</h1>
            <div className="flex flex-row justify-end w-full">
                <button onClick={() => {
                    setRefresh(!refresh);
                }} className="text-white bg-primary-base transition-all hover:bg-primary-dark rounded-xl p-3 ">Refresh</button>
            </div>
            <ul className={`flex flex-col h-full w-1/3 ${companies.length > 0 ? 'justify-start items-start' : 'justify-center items-center'} space-y-6 `}
            >
                {companies.length > 0 ? companies.map((company, index) => {
                    return <li onClick={(e) => {
                        setSelected(index)
                    }} className={`border-2  ${selected === index ? 'border-primary-dark scale-105' : 'border-transparent active:border-primary-base focus:border-primary-base'}    cursor-pointer  hover:border-l-accent-dark font-gilroy-bold rounded-xl bg-primary-light  p-4 transition-colors w-full border-black h-40  overflow-hidden`} key={company?.COMPANYGUID}>
                        <div className="flex flex-row h-full justify-between space-x-4">
                            <div className="flex flex-col justify-between space-y-4">
                                <div className="flex flex-col space-y-1">
                                    <span> {company?.COMPANY}</span>
                                    <span className="text-secondary-text text-xs ">{company?.COMPANYFORMALNAME}</span>
                                </div>
                                <div className="flex flex-col text-sm font-gilroy-medium space-y-1">
                                    <span>{company?.COMPANYEMAIL}</span>
                                    <span>{company?.COMPANYWEBSITE}</span>

                                </div>

                            </div>
                            <div className="flex flex-col items-end justify-between  space-y-4">
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

CompaniesPage.getLayout = function getLayout(page: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | null | undefined) {
    return (
        <AppLayout>
            {page}
        </AppLayout>
    )
}
