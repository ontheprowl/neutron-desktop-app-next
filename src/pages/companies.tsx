import AppLayout from "@/components/layout/AppLayout";
import DefaultSpinner from "@/components/layout/DefaultSpinner";
import { SessionContext } from "@/lib/context/SessionContext";
import { TallyCompanyDetails } from "@/lib/models/tally";

import { ReactElement, JSXElementConstructor, ReactFragment, ReactPortal, useEffect, useState, useContext } from "react";




export default function CompaniesPage() {


    const {metadata, businessData} = useContext(SessionContext)  ;

    const [companies, setCompanies] = useState<Array<TallyCompanyDetails>>([]);
    const [refresh, setRefresh] = useState(false);
    const [selected, setSelected] = useState(0)
    useEffect(() => {
        if(businessData?.creds?.companies){
            setCompanies(businessData?.creds?.companies);
        } 
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
            <ul className={`flex flex-col h-full w-1/3 ${companies.length > 0 ? 'justify-start items-start' : 'justify-center items-center w-full'}  space-y-6 `}
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
                }) : "No previously synced companies"}
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
