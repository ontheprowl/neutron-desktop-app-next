import { useLoaderData, useNavigate } from "@remix-run/react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { injectStyle } from "react-toastify/dist/inject-style";
import { ContractSidePanelStages } from "~/models/contracts";
import { ContractDataStore } from "~/stores/ContractStores";
import IconDisputesChat from '~/assets/images/ChatPurple.svg'
import IconMilestones from '~/assets/images/atomPurple.svg'
import { primaryGradientDark } from "~/utils/neutron-theme-extensions";
import ContractEditScreen from "../contracts/ContractEditScreen";
import ContractOverview from "../contracts/ContractOverview";

import ExpandArrowButton from "../inputs/ExpandArrowButton";
import Accordion from "../layout/Accordion";



export default function ContractViewMobileUI() {


    const stage = ContractDataStore.useState(s => s.viewStage);

    const sidePanelStage = ContractDataStore.useState(s => s.sidePanelStage);
    let navigate = useNavigate();

    useEffect(() => {
        injectStyle();
    })

    const [expanded, setExpanded] = useState(false);

    const data = useLoaderData();
    const contractData = data.contract;
    const currentUser = data.metadata
    const overviewStages = [<ContractOverview published={contractData?.isPublished == "true"} key={0} ></ContractOverview>, <ContractEditScreen viewMode key={1} ></ContractEditScreen>]


    function generateMilestoneStats(milestones: { [x: string]: any }) {
        if (!milestones || Object.keys(milestones).length == 0) {
            return <h1 className="text-white pl-2 pr-3"> No milestones </h1>
        }

        const workMilestonesCount = milestones?.workMilestones ? Object.keys(milestones?.workMilestones).length : 0;
        const denominator = workMilestonesCount;
        return (<h1 className="prose prose-lg text-white text-right"> <span className="text-purple-400">{contractData.completedMilestones ? contractData.completedMilestones : '0'}</span>/{denominator}</h1>);
    };



    return (
        <div className='flex flex-col sm:hidden h-full'>
            <button onClick={() => {
                navigate(`/${currentUser.displayName}/dashboard`);
            }} className="ml-5 mt-12 transition-all ring-1 ring-transparent hover:bg-bg-secondary-dark p-1 w-8 active:opacity-60   rounded-full hover:ring-purple-400">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18 6L6 18M6 6L18 18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </button>
            <div className="flex flex-col justify-start mb-4 mt-8 space-y-2">
                <h1 className={`text-white text-[25px] text-left font-gilroy-black ml-6 `}> {contractData.projectName}</h1>
                <h2 className="text-white text-[16px] text-left font-gilroy-medium ml-6"> {contractData.clientName}</h2>
            </div>
            {/* <div className="hidden sm:flex sm:flex-row w-full border-2 border-purple-600">
        <div className='flex flex-row m-6 mb-3 justify-between w-full space-x-10 border-2 border-accent-dark '>
            <div className="flex flex-col">
                <article className="prose ">
                    <h2 className="text-white font-gilroy-bold text-[24px]">Welcome {currentUser?.email}</h2>
                    <p className="text-white font-gilroy-regular text-[12px]">{formatDateToReadableString()}</p>
                </article>
            </div>
            <div className="flex items-center w-[692px] ">
                <label htmlFor="simple-search" className="sr-only">Search</label>
                <div className="relative w-full ">
                    <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                        <svg className="w-5 h-5 text-white dark:text-black" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
                    </div>
                    <input type="text" id="simple-search" className="p-5 bg-bg-primary-dark border border-gray-300 text-gray-900 text-sm rounded-lg placeholder-white block w-full pl-10  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white " placeholder="Search through contracts" required />

                </div>
            </div>
        </div>
    </div> */}
            <div className="flex flex-col bg-bg-primary-dark p-2 h-full  mb-0 space-y-2 justify-between">

                <div id="contract-buttons-section" className=" w-full flex flex-row space-x-3 p-2 justify-start mt-5 ">

                    <div className="flex flex-row basis-1/2 justify-center " >
                        <button onClick={() => {
                            ContractDataStore.update(s => {
                                s.viewStage == 1 ? s.viewStage = 0 : s.viewStage = 1;
                            })
                        }} className={` p-4 text-center ${primaryGradientDark} sm:w-full text-white basis-1/2 prose prose-md transition-all rounded-full active:border-white whitespace-nowrap hover:bg-white`}>{`${stage == 1 ? 'Back To Overview' : 'Open Contract'}`}</button>
                    </div>



                    <div className="flex flex-row basis-1/2  w-full justify-evenly space-x-2">
                        <a href={contractData.attachment && contractData.attachment != "null" ? contractData.attachment : '#'} className=" max-h-fit hover:bg-bg-secondary-dark bg-white transition-all active:bg-bg-secondary-dark  hover:border-purple-400 p-5 w-[12vw] basis-1/3 rounded-full">
                            <div className="flex flex-row space-x-8  text-white items-center">
                                <svg width="24" height="28" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9.66634 1.89111V5.33323C9.66634 5.79994 9.66634 6.0333 9.75717 6.21156C9.83706 6.36836 9.96455 6.49584 10.1213 6.57574C10.2996 6.66656 10.533 6.66656 10.9997 6.66656H14.4418M5.49967 12.4998L7.99967 14.9998M7.99967 14.9998L10.4997 12.4998M7.99967 14.9998L7.99967 9.99984M9.66634 1.6665H5.33301C3.93288 1.6665 3.23281 1.6665 2.69803 1.93899C2.22763 2.17867 1.84517 2.56112 1.60549 3.03153C1.33301 3.56631 1.33301 4.26637 1.33301 5.6665V14.3332C1.33301 15.7333 1.33301 16.4334 1.60549 16.9681C1.84517 17.4386 2.22763 17.821 2.69803 18.0607C3.23281 18.3332 3.93288 18.3332 5.33301 18.3332H10.6663C12.0665 18.3332 12.7665 18.3332 13.3013 18.0607C13.7717 17.821 14.1542 17.4386 14.3939 16.9681C14.6663 16.4334 14.6663 15.7333 14.6663 14.3332V6.6665L9.66634 1.6665Z" stroke="#765AD1" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                        </a>
                        <button onClick={() => {

                            ContractDataStore.update(s => {
                                s.sidePanelStage == ContractSidePanelStages.MilestonesPanel ? s.sidePanelStage = ContractSidePanelStages.ChatsPanel : s.sidePanelStage = ContractSidePanelStages.MilestonesPanel;
                            })
                        }} className="w-[12vw] basis-1/3  bg-white p-1 rounded-full transition-all "  >
                            <div className="transition-all  flex flex-row justify-center  rounded-xl">
                                {/* <h1 className="prose prose-sm text-white font-gilroy-bold text-[14px] whitespace-nowrap">
                                    {sidePanelStage == ContractSidePanelStages.MilestonesPanel ? 'View Contract Chat' : ' View Contract Milestones'}
                                </h1> */}
                                <img src={sidePanelStage === ContractSidePanelStages.MilestonesPanel ? IconDisputesChat : IconMilestones} alt="Disputes Chat Icon"></img>
                            </div>
                        </button>
                        <button onClick={() => {
                            if (navigator.share) {
                                navigator.share({
                                    title: `${contractData.projectName}`,
                                    text: 'Check out this Neutron contract!',
                                    url: window.location.href,
                                })
                                    .then(() => console.log('Successful share'))
                                    .catch((error) => console.log('Error sharing', error));
                            }
                        }} className={`bg-white pl-[5vw] rounded-full w-[12vw] basis-1/3 hover:bg-white transition-all `}>
                            <svg width="20" height="22" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6.59 12.51L13.42 16.49M13.41 5.51L6.59 9.49M19 4C19 5.65685 17.6569 7 16 7C14.3431 7 13 5.65685 13 4C13 2.34315 14.3431 1 16 1C17.6569 1 19 2.34315 19 4ZM7 11C7 12.6569 5.65685 14 4 14C2.34315 14 1 12.6569 1 11C1 9.34315 2.34315 8 4 8C5.65685 8 7 9.34315 7 11ZM19 18C19 19.6569 17.6569 21 16 21C14.3431 21 13 19.6569 13 18C13 16.3431 14.3431 15 16 15C17.6569 15 19 16.3431 19 18Z" stroke="#765AD1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>

                        </button>





                    </div>


                </div>
                <div className="flex flex-col p-2 space-y-2">
                    <div className='flex flex-row justify-between w-full'>
                        <Accordion className={`w-full transition-all h-full rounded-xl  justify-between  items-center`} expanded={expanded} setExpanded={setExpanded} label={
                            <div className={`flex flex-row ${primaryGradientDark} w-full   transition-all h-full rounded-xl  justify-between p-4 items-center`} >
                                <div className="flex flex-col text-left ml-4">
                                    <h2 className='prose prose-md text-white font-gilroy-medium'>Total Funds</h2>
                                    <h1 className="prose prose-lg text-white text-left font-gilroy-black text-[24px]"> {contractData.contractValue}</h1>
                                </div>
                                <div className="flex flex-col justify-between">
                                    <ExpandArrowButton onClick={() => {
                                        setExpanded(!expanded)
                                    }} expanded={expanded}></ExpandArrowButton>
                                </div>
                            </div>} content={<div className="bg-bg-secondary-dark rounded-b-xl mx-2 ">
                                <div className={`flex flex-row bg-bg-secondary-dark transition-all  w-full h-full rounded-full justify-between p-4 items-center`}>
                                    <h2 className='prose prose-md text-white'>Released Funds</h2>
                                    <h1 className="prose prose-lg text-white text-right"> ₹{contractData?.releasedFunds ? contractData?.releasedFunds : '0'}</h1>
                                </div>
                                <div className={`flex flex-row bg-bg-secondary-dark transition-all  w-full h-full rounded-full justify-between p-4 items-center`}>
                                    <h2 className='prose prose-md text-white'>Milestones</h2>
                                    {generateMilestoneStats(contractData?.isPublished == "true" ? contractData?.milestones : contractData?.milestonesProcessed)}
                                </div>
                            </div>} ></Accordion>

                        {/*  */}
                    </div>


                    {/* <div id="contract-buttons-section" className="hidden sm:flex sm:flex-col space-y-3 w-auto pr-6 pl-2 items-center ">
            <div className="flex flex-row space-x-4">
                <button onClick={() => {
                    ContractDataStore.update(s => {
                        s.viewStage == 1 ? s.viewStage = 0 : s.viewStage = 1;
                    })
                }} className={`transition-all p-4  border-2 text-center bg-[#E6E0FA] sm:w-full text-[#765AD1] prose prose-md rounded-lg active:border-white whitespace-nowrap border-transparent hover:border-purple-400`}>{`${stage == 1 ? 'Back To Overview' : 'Open Contract'}`}</button>
                <FormButton onClick={() => {

                }} text="Share Deliverables" ></FormButton>
            </div>
            <div className="flex flex-row space-x-4 w-full">
                <button className={`${primaryGradientDark} p-0.5 rounded-xl w-full`}>
                    <div className="bg-bg-primary-dark border-2 h-full flex flex-row justify-center items-center border-transparent rounded-xl">
                        <span>Hello</span>
                    </div>
                </button>
                <button onClick={() => {

                    ContractDataStore.update(s => {
                        s.sidePanelStage == ContractSidePanelStages.MilestonesPanel ? s.sidePanelStage = ContractSidePanelStages.ChatsPanel : s.sidePanelStage = ContractSidePanelStages.MilestonesPanel;
                    })
                }}  ><div className="transition-all pt-4 pb-4 flex flex-row space-x-2 justify-between border-2 border-white w-48 p-2 rounded-xl">
                        <h1 className="prose prose-sm text-white font-gilroy-bold text-[14px] whitespace-nowrap">
                            {sidePanelStage == ContractSidePanelStages.MilestonesPanel ? 'View Contract Events' : ' View Contract Milestones'}
                        </h1>
                        <img src={sidePanelStage === ContractSidePanelStages.ChatsPanel ? IconDisputesChat : IconMilestones} alt="Disputes Chat Icon"></img>
                    </div>
                </button>
            </div>s

        </div> */}
                </div>
                <AnimatePresence exitBeforeEnter>
                    <motion.div
                        key={stage}
                        animate={{ opacity: 1, x: 0 }}
                        initial={{ opacity: 0, x: 500 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 0.5 }}
                        className="h-full m-3"
                    >
                        {overviewStages[stage]}


                    </motion.div >
                </AnimatePresence>

                {/* Todo - Hide this div on all viewports larger than sm */}

            </div>



            <ToastContainer position="bottom-center"
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                theme="dark"
                limit={1}

                pauseOnFocusLoss
                draggable
                pauseOnHover></ToastContainer>
        </div>)
}