import { AppStore } from "~/stores/UIStore";
import { secondaryGradient } from "~/utils/neutron-theme-extensions";
import { formatDateToReadableString } from "~/utils/utils";
import HomeButtonMobile from '~/components/HomeButtonMobile'
import WalletButton from '~/components/WalletButton'
import CalendarButton from '~/components/CalendarButton'
import ContractsButton from '~/components/ContractsButton'



import { useNavigate } from "@remix-run/react";
import { useEffect, useMemo } from 'react'
import CreateContractMobileButton from "../inputs/CreateContractMobileButton";
import DisputesButton from "../DisputesButton";
import LogoutButton from "../LogoutButton";
import { ContractDataStore } from "~/stores/ContractStores";
import { DEFAULT_USER_STATE } from "~/models/user";
import HomeButton from "../HomeButton";
import { DEFAULT_CONTRACT_STATE } from "~/models/contracts";



export default function BottomNav() {


    let tab = AppStore.useState((s) => s.selectedTab);

    let navigate = useNavigate();

    // * Artifically stagger the rest of contract state with a timeout 
    useEffect(() => {
        setTimeout(() => {
            ContractDataStore.replace(DEFAULT_CONTRACT_STATE);
        }, 1000);
    }, [navigate])

    return (
        <div className="flex flex-row w-full p-3 px-5 justify-between bg-[#202020] space-x-12   shadow-lg sm:hidden">

            <div
                className={`transition-all flex flex-col align-middle text-[14px] focus:opacity-50  active:opacity-60 `}
                onClick={() => {
                    AppStore.update(s => {
                        s.selectedTab = "Home"
                    })
                    navigate("dashboard")

                }}
            >
                <div className=" flex flex-row justify-center">
                    <HomeButton selected={tab === "Home"} />
                </div>
                <h1 className={`transition-all ${tab === "Home" ? 'text-purple-400' : 'text-white'}`}>Home</h1>
            </div>


            <div
                className="focus:opacity-50 whitespace-nowrap text-[14px]  active:opacity-60"
                onClick={() => {
                    AppStore.update(s => {
                        s.selectedTab = "Create Contract"
                    })
                    navigate("contracts/create")

                }}>
                <div className=" flex flex-row justify-center">
                    <CreateContractMobileButton selected={tab === "Create Contract"} className={``}
                    ></CreateContractMobileButton>
                </div>


                <h1 className={`transition-all ${tab === "Create Contract" ? 'text-purple-400' : 'text-white'}`}>Add Contract</h1>

            </div>

            <div
                className={`transition-all flex flex-col align-middle text-[14px] focus:opacity-50  active:opacity-60`}

                onClick={() => {
                    AppStore.update(s => {
                        s.selectedTab = "Disputes"
                    })
                    navigate("disputes")

                }}
            >
                <div className="flex flex-row justify-center">
                    <DisputesButton selected={tab === "Disputes"} />

                </div>

                <h1 className={`transition-all ${tab === "Disputes" ? 'text-purple-400' : 'text-white'}`}>Disputes</h1>

            </div>


        </div >
    )
}