import { useLoaderData, useNavigate, useSubmit } from "@remix-run/react";
import { useEffect, useState } from "react";
import { injectStyle } from "react-toastify/dist/inject-style";
import type { Contract} from "~/models/contracts";
import { ContractCreationStages, ContractStatus } from "~/models/contracts";
import { ContractDataStore } from "~/stores/ContractStores";
import { primaryGradientDark } from "~/utils/neutron-theme-extensions";
import { formatDateToReadableString } from "~/utils/utils";
import ContractZeroState from "../contracts/ContractZeroState";
import PlaceholderDP from '~/assets/images/kartik.png'

import DeleteIcon from "../inputs/DeleteIcon";
import EditIcon from "../inputs/EditIcon";
import ViewIcon from "../inputs/ViewIcon";
import MobileNavbarPadding from "../layout/MobileNavbarPadding";
import NeutronModal from "../layout/NeutronModal";
import { ContractDraftedStatus, ContractPublishedStatus } from "../layout/Statuses";
import BackArrow from '~/assets/images/BackArrow.svg'
import ForwardArrow from '~/assets/images/ForwardArrow.svg'
import { AnimatePresence, motion, useViewportScroll } from "framer-motion";



export default function DashboardMobileUI() {

    const { scrollYProgress, scrollY } = useViewportScroll();

    const [scrollPosition, setScrollPosition] = useState(scrollYProgress.get());
    const [contractFilter, setContractFilter] = useState('');
    const [currentContract, setCurrentContract] = useState(-1);
    const [deleteConfirmationModal, setDeleteConfirmationModal] = useState(false);

    const submit = useSubmit();

    useEffect(() => {
        injectStyle();
        return scrollYProgress.onChange((latest) => {
            setScrollPosition(latest);
        })
    })

    const userData: { contracts: Contract[], disputes: any[], metadata: any, ownerUsername: string } = useLoaderData();

    const contracts = userData.contracts;




    const generateContractsList = () => {
        return (<ul className=" mt-1 space-y-4 max-h-[95vh] h-full overflow-y-scroll p-2 rounded-xl bg-bg-primary-dark snap-y snap-mandatory transition-all">
            {contracts.filter((value) => value.projectName?.includes(contractFilter)).map((contract: Contract, index: number) => {
                return (<li onClick={() => {
                    setCurrentContract(index)
                }} key={contract.id} className={`snap-center bg-bg-secondary-dark border-2 ${currentContract == index ? 'border-purple-400' : 'border-white'}  h-auto rounded-xl active:border-purple-400 focus:border-purple-400 dark:bg-gray-800 dark:border-gray-700 transition-all active:bg-bg-primary-dark focus:bg-bg-primary-dark flex flex-col justify-between`}>

                    <div className="flex flex-col justify-between p-4 space-y-2">
                        <div className="flex flex-row space-y-2">
                            <h2 className="prose prose-md text-[18px] text-white">
                                {contract.projectName}
                            </h2>

                        </div>
                        <div className="flex flex-row   justify-between">
                            <h3 className="prose prose-sm text-gray-300">{contract.clientName}</h3>
                            <h4 className="prose prose-sm text-gray-300">{contract?.endDate}</h4>
                        </div>
                        <div className="flex flex-row space-x-5  justify-between">
                            <h2 className="prose prose-md text-white">
                                {contract.contractValue}
                            </h2>
                            <span className="w-full flex flex-row justify-end">
                                {contract?.status == ContractStatus.Draft ? <ContractDraftedStatus></ContractDraftedStatus> : <ContractPublishedStatus></ContractPublishedStatus>}
                            </span>
                        </div>
                        <div className={` p-3 justify-evenly  w-full space-x-2  ${currentContract == index ? 'flex flex-row' : 'hidden'}`}>

                            {contract.status === ContractStatus.Draft && <EditIcon onClick={() => {
                                navigate(`/${currentUserData?.displayName}/contracts/edit/${contract.id}`)
                            }} className={'rounded-full border-2 border-transparent bg-transparent hover:bg-accent-dark transition-all  p-2'}></EditIcon>}
                            <ViewIcon onClick={() => {
                                navigate(`/${currentUserData?.displayName}/contracts/${contract.id}`)
                            }} className={'rounded-full border-2 border-transparent bg-transparent hover:bg-accent-dark transition-all  p-2'}></ViewIcon>
                            {contract.status === ContractStatus.Draft && <DeleteIcon onClick={() => {
                                setDeleteConfirmationModal(!deleteConfirmationModal);
                            }} className={'rounded-full border-2 border-transparent bg-transparent hover:bg-accent-dark transition-all  p-2'}></DeleteIcon>}
                            {/* <ChatIcon onClick={function (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
                                                    throw new Error('Function not implemented.');
                                                }} className={'rounded-full border-2 border-transparent bg-transparent hover:bg-accent-dark transition-all  p-2'}></ChatIcon> */}
                        </div>

                    </div>




                </li>)
            })
            }
        </ul >)
    }
    // let protectedFunds = 0;
    // userData.contracts.forEach((contract) => {
    //     protectedFunds += Number.parseInt(contract?.contractValue?.replace('₹'));
    // })

    const currentUserData = userData.metadata;

    const [statIndex, setStatIndex] = useState(0);

    const fundStats: JSX.Element[] = [
        <div key={0}>
            <motion.h1 className="font-gilroy-bold text-[14px]">Funds In Escrow</motion.h1>
            <motion.h2 className="font-gilroy-black text-[20px]">₹{currentUserData.funds.escrowedFunds ? currentUserData.funds.escrowedFunds : '0'}</motion.h2>
        </div>,
        <div key={1}>
            <motion.h1 className="font-gilroy-bold text-[14px]">Disbursed Funds</motion.h1>
            <motion.h2 className="font-gilroy-black text-[20px]">₹{currentUserData.funds.disbursedFunds ? currentUserData.funds.disbursedFunds : '0'}</motion.h2>
        </div>,
        <div key={2}>
            <motion.h1 className="font-gilroy-bold text-[14px]">Disputed Funds </motion.h1>
            <motion.h2 className="font-gilroy-black text-[20px]">₹{currentUserData.funds.disputedFunds ? currentUserData.funds.disputedFunds : '0'}</motion.h2>
        </div>,
        <div key={3}>
            <motion.h1 className="font-gilroy-bold text-[14px]">Received Funds</motion.h1>
            <motion.h2 className="font-gilroy-black text-[20px]">₹{currentUserData.funds.receivedFunds ? currentUserData.funds.receivedFunds : '0'}</motion.h2>
        </div>];



    let navigate = useNavigate();


    return (
        <div className={`flex flex-col sm:hidden space-y-3 h-full mt-12  text-center bg-transparent`}>
            <div className={`flex flex-row justify-between transition-all ${scrollPosition > 0.45 ? `sticky py-5 pt-8 top-0 h-[115px] mt-0 ${primaryGradientDark}` : ''} z-30 `}>
                <div className="flex flex-col">
                    <h1 className={`text-white ${scrollPosition > 0.45 ? 'text-[25px]' : 'text-[25px] '} text-left font-gilroy-black ml-6`}> {scrollPosition > 0.45 ? 'Contracts' : `Welcome, ${currentUserData?.displayName}`}</h1>
                    <h2 className="text-white text-[16px] text-left font-gilroy-regular ml-6 mb-3">{scrollPosition > 0.45 ? 'Track and manage your contracts' : formatDateToReadableString(new Date().getTime(), false, true)}</h2>
                </div>
                <div className="flex flex-col justify-center mr-6">
                    <img onClick={() => {
                        navigate(`/${currentUserData.displayName}/profile`)
                    }} alt="profile" src={currentUserData.photoURL ? currentUserData.photoURL : PlaceholderDP} className="h-10 w-10  bg-[#e5e5e5] object-fill cursor-pointer hover:opacity-50 hover:ring-1 outline-none transition-all hover:ring-[#8364E8] border-solid border-black rounded-full self-center"></img>
                </div>


            </div>


            <motion.div className={` w-auto m-6 rounded-xl p-1  ${primaryGradientDark} z-10 translate-y-10`}>
                <div className=" h-40 rounded-xl bg-bg-primary-dark text-white">
                    <div className="flex flex-col space-y-2 pt-6">
                        <div className="flex flex-row justify-between space-x-4 pt-6">
                            <button className={`text-white hover:opacity-60 ${statIndex > 0 ? 'visible' : 'invisible'} transition-all flex flex-row justify-center items-center basis-1/5 `} onClick={() => {
                                setStatIndex(statIndex - 1);
                            }}><img alt="Back Arrow" src={BackArrow} /></button>
                            <AnimatePresence exitBeforeEnter>


                                <motion.div 
                                    key={statIndex}
                                    animate={{ opacity: 1, x: 0 }}
                                    initial={{ opacity: 0, x: 20 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    onTap={() => {
                                        statIndex < 3 ? setStatIndex(statIndex + 1) : setStatIndex(0);
                                    }}
                                    transition={{ duration: 0.5 }} className="flex basis-3/5 flex-col text-center hover:opacity-50">
                                    {fundStats[statIndex]}
                                </motion.div>


                            </AnimatePresence>
                            <button className={`text-white hover:opacity-60 ${statIndex < 2 ? 'visible' : 'invisible'} basis-1/5 flex flex-row justify-center items-center transition-all`} onClick={() => {
                                setStatIndex(statIndex + 1);
                            }}><img src={ForwardArrow} alt="Forward Arrow" /></button>
                        </div>


                        <p className="font-gilroy-medium text-[14px]"> ({currentUserData.contracts} Active Contract{currentUserData.contracts != 1 ? 's' : ''})</p>
                    </div>

                </div>
            </motion.div>
            <div id="main-dash-section" className=' bg-bg-primary-dark h-full z-0 translate-y-[-40px] pt-32 p-8 flex flex-col'>
                <motion.button
                    className={`w-full rounded-full p-3  h-14 self-start text-left  ${primaryGradientDark} active:bg-amber-300 outline-none focus:ring-1 focus:ring-white focus:border-white hover:border-white hover:ring-white text-white transition-all`}
                    onClick={() => {
                        ContractDataStore.update((s) => { s.stage = ContractCreationStages.ClientInformation });
                        navigate(`/${currentUserData?.displayName}/contracts/create`)
                    }}

                >
                    <div className='flex flex-row space-x-2 justify-center items-center'>
                        <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10.4993 4.16602V15.8327M4.66602 9.99935H16.3327" stroke="white" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <h1 className=''>Add Contract</h1>

                    </div>

                </motion.button>

                {/*  Everything above this point should fade out as the user scrolls */}
                {/* <div className="flex flex-row sm:hidden font-gilroy-black m-3 w-auto rounded-xl">
                    <button
                        className={`w-full rounded-lg ${contractsTab ? primaryGradientDark : 'bg-bg-primary-dark'}  p-3 text-white transition-all`}
                        onClick={() => {
                            setContractsTab(!contractsTab)

                        }}
                    >
                        Contracts
                    </button>
                    <button
                        className={`w-full rounded-lg ${!contractsTab ? 'bg-purple-400' : 'bg-bg-primary-dark'} p-3 text-white transition-all `}
                        onClick={() => {
                            setContractsTab(!contractsTab)
                        }}
                    >
                        Disputes
                    </button>
                </div> */}
                <div className="flex flex-col sm:hidden mt-10 bg-bg-primary-dark text-white rounded-xl">
                    <div className="flex flex-row bg-[#4d4d4d] h-10 mb-5 space-x-4 p-2 w-full border-2 border-gray-500 rounded-lg">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M17.5 17.5L14.5834 14.5833M16.6667 9.58333C16.6667 13.4954 13.4954 16.6667 9.58333 16.6667C5.67132 16.6667 2.5 13.4954 2.5 9.58333C2.5 5.67132 5.67132 2.5 9.58333 2.5C13.4954 2.5 16.6667 5.67132 16.6667 9.58333Z" stroke="#BCBCBC" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>

                        <input type="text" placeholder="Search" onChange={(e) => {
                            setContractFilter(e.target.value);
                        }} className="w-full bg-[#4d4d4d] border-0 text-white placeholder:text-white focus:border-transparent outline-none " />

                    </div>
                    <div className={`${contracts.length > 0 ? 'h-[55vh]' : 'h-auto'}`}>
                        {contracts.length > 0 ? generateContractsList() : <ContractZeroState></ContractZeroState>}

                    </div>


                </div>

                {/* {deleteConfirmationModal && <NeutronModal onConfirm={(e) => {

                    let data = new FormData();
                    if (contractSelectedForDeletion.id) {
                        data.append('id', contractSelectedForDeletion.id);
                        submit(data,
                            { method: 'post' });
                    }

                }} body={<p className="text-red-600">You're about to delete a contract</p>} toggleModalFunction={setDeleteConfirmationModal}></NeutronModal>} */}
                <MobileNavbarPadding></MobileNavbarPadding>

            </div>
            {deleteConfirmationModal && <NeutronModal onConfirm={(e) => {

                let data = new FormData();
                if (contracts[currentContract].id) {
                    data.append('id', contracts[currentContract].id);
                    submit(data,
                        { method: 'post' });
                }

            }} body={<p className="text-red-600">You're about to delete a contract</p>} toggleModalFunction={setDeleteConfirmationModal}></NeutronModal>}

        </div >)
}