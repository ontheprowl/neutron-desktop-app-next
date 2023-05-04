import { ContractDataStore } from '~/stores/ContractStores';
import { ContractSidePanelStages, DeliverableStatus } from '~/models/contracts';
import { primaryGradientDark } from '~/utils/neutron-theme-extensions';
import MilestoneStepper from '../milestones/MilestoneStepper';
import { NotSubmittedStatus, DeliverableStatusGenerator } from '../layout/Statuses';
import { useState } from 'react';
import { useLoaderData } from '@remix-run/react';
import MobileNavbarPadding from '../layout/MobileNavbarPadding';
import DisputesChatComponent from '../disputes/DisputesChatComponent';
import { AnimatePresence, motion } from 'framer-motion';
import { useList } from 'react-firebase-hooks/database'
import { formatDateToReadableString } from '~/utils/utils';
import { clientRef, db } from '~/firebase/neutron-config.client';


function generateDeliverables(milestones: { [key: string]: any }) {
    let deliverablesArray = []
    for (const [key, value] of Object.entries(milestones)) {
        const deliverable = { ...value }
        if (deliverable.name == 'Advance') continue
        if (key == "workMilestones") {
            const milestonesIterator: [string, { [x: string]: any }][] = Object.entries(value);
            for (const [milestoneNumber, milestone] of milestonesIterator) {
                // deliverablesArray.push(
                //     <div className="flex flex-row p-3 font-gilroy-medium space-x-20 w-full items-center justify-between">
                //         {/* <img src={iconForDeliverableType(Number(milestone.submissionFormat))}
                //             className="mr-3 h-7 " alt="progressLineActive">
                //         </img> */}
                //         <h2 className='text-center w-[200px] '>{milestone.name}</h2>
                //         <p className="text-center w-[200px] whitespace-nowrap ">{milestone.description}</p>
                //         <p className="text-center w-[200px] "> {formatDateToReadableString(new Date(milestone.date).getTime(), false, true)}</p>
                //         <div className="flex flex-row  w-[300px] items-center justify-center space-x-8">
                //             {milestone?.status ? DeliverableStatusGenerator(milestone.status) : <NotSubmittedStatus></NotSubmittedStatus>}
                //             {milestone?.status && milestone?.status != DeliverableStatus.SubmittedExternally ?
                //                 <a href={milestone.submissionPath} target="_blank" rel="noreferrer" key={milestone.name} >
                //                     <svg className="border-2 border-transparent hover:bg-bg-secondary-dark transition-all active:ring-white active:ring-2 rounded-full w-10 h-10 p-1" width="16" height="20" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                //                         <path d="M9.66634 1.89111V5.33323C9.66634 5.79994 9.66634 6.0333 9.75717 6.21156C9.83706 6.36836 9.96455 6.49584 10.1213 6.57574C10.2996 6.66656 10.533 6.66656 10.9997 6.66656H14.4418M5.49967 12.4998L7.99967 14.9998M7.99967 14.9998L10.4997 12.4998M7.99967 14.9998L7.99967 9.99984M9.66634 1.6665H5.33301C3.93288 1.6665 3.23281 1.6665 2.69803 1.93899C2.22763 2.17867 1.84517 2.56112 1.60549 3.03153C1.33301 3.56631 1.33301 4.26637 1.33301 5.6665V14.3332C1.33301 15.7333 1.33301 16.4334 1.60549 16.9681C1.84517 17.4386 2.22763 17.821 2.69803 18.0607C3.23281 18.3332 3.93288 18.3332 5.33301 18.3332H10.6663C12.0665 18.3332 12.7665 18.3332 13.3013 18.0607C13.7717 17.821 14.1542 17.4386 14.3939 16.9681C14.6663 16.4334 14.6663 15.7333 14.6663 14.3332V6.6665L9.66634 1.6665Z" stroke="white" stroke-width="1.67" stroke-linecap="round" stroke-linejoin="round" />
                //                     </svg>
                //                 </a> : <></>
                //             }
                //         </div>
                //     </div>
                //     // <a key={deliverable.name} href={deliverable.submissionPath ? deliverable.submissionPath : "#"}>
                //     //     <div className="flex flex-row m-5 space-x-2 w-auto items-center justify-between">
                //     //         <img src={iconForDeliverableType(Number(deliverable.submissionFormat))}
                //     //             className="mr-3 h-7 " alt="progressLineActive">
                //     //         </img>
                //     //         <h2>{deliverable.name}</h2>
                //     //         <p>{deliverable.description}</p>
                //     //         <NotSubmittedStatus></NotSubmittedStatus>
                //     //     </div>
                //     // </a>


                // )
                deliverablesArray.push(
                    <tr key={milestoneNumber} className={`border-b border-gray-400 dark:bg-gray-800 dark:border-gray-700 transition-all hover:bg-bg-primary-dark hover:bg-opacity-50 hover:border-accent-dark hover:drop-shadow-md dark:hover:bg-gray-600`}>

                        <td scope="row" className=" p-2 font-medium text-center text-[12px] text-white dark:text-white whitespace-nowrap">
                            {milestone.name}
                        </td>
                        <td scope="row" className=" p-2 text-center text-white text-[12px] ">
                            {milestone.description}
                        </td>
                        <td scope="row" className=" p-2 text-center text-white text-[12px]">
                            {formatDateToReadableString(milestone.date?.seconds ? new Date(milestone.date?.seconds * 1000).getTime() : new Date(milestone.date).getTime(), false, true)}
                        </td>
                        <td scope="row" className=" p-2 text-center flex flex-row text-white  justify-center ">
                            {milestone?.status ? DeliverableStatusGenerator(milestone.status) : <NotSubmittedStatus></NotSubmittedStatus>}

                        </td>
                        <td scope="row" className=" p-2 text-center text-white flex-grow-0">
                            {milestone?.status && milestone?.status != DeliverableStatus.SubmittedExternally ?
                                <a href={milestone.submissionPath} target="_self" rel="noreferrer" key={milestone.name} >
                                    <svg className="border-2 border-transparent hover:bg-bg-secondary-dark self-center transition-all active:ring-white active:ring-2 rounded-full w-10 h-10 p-1" width="16" height="20" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M9.66634 1.89111V5.33323C9.66634 5.79994 9.66634 6.0333 9.75717 6.21156C9.83706 6.36836 9.96455 6.49584 10.1213 6.57574C10.2996 6.66656 10.533 6.66656 10.9997 6.66656H14.4418M5.49967 12.4998L7.99967 14.9998M7.99967 14.9998L10.4997 12.4998M7.99967 14.9998L7.99967 9.99984M9.66634 1.6665H5.33301C3.93288 1.6665 3.23281 1.6665 2.69803 1.93899C2.22763 2.17867 1.84517 2.56112 1.60549 3.03153C1.33301 3.56631 1.33301 4.26637 1.33301 5.6665V14.3332C1.33301 15.7333 1.33301 16.4334 1.60549 16.9681C1.84517 17.4386 2.22763 17.821 2.69803 18.0607C3.23281 18.3332 3.93288 18.3332 5.33301 18.3332H10.6663C12.0665 18.3332 12.7665 18.3332 13.3013 18.0607C13.7717 17.821 14.1542 17.4386 14.3939 16.9681C14.6663 16.4334 14.6663 15.7333 14.6663 14.3332V6.6665L9.66634 1.6665Z" stroke="white" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </a> : <div className="bg-transparent"></div>
                            }
                        </td>


                    </tr>)
            }
        }

    }
    return deliverablesArray
}

function generateDeliverablesForMobile(milestones: { [key: string]: any }) {
    let deliverablesArray = []
    for (const [key, value] of Object.entries(milestones)) {
        const deliverable = { ...value }
        if (deliverable.name == 'Advance') continue
        if (key == "workMilestones") {
            const milestonesIterator: [string, { [x: string]: any }][] = Object.entries(value);

            for (const [milestoneNumber, milestone] of milestonesIterator) {
                // deliverablesArray.push(
                //     <div className="flex flex-row p-3 font-gilroy-medium space-x-20 w-full items-center justify-between">
                //         {/* <img src={iconForDeliverableType(Number(milestone.submissionFormat))}
                //             className="mr-3 h-7 " alt="progressLineActive">
                //         </img> */}
                //         <h2 className='text-center w-[200px] '>{milestone.name}</h2>
                //         <p className="text-center w-[200px] whitespace-nowrap ">{milestone.description}</p>
                //         <p className="text-center w-[200px] "> {formatDateToReadableString(new Date(milestone.date).getTime(), false, true)}</p>
                //         <div className="flex flex-row  w-[300px] items-center justify-center space-x-8">
                //             {milestone?.status ? DeliverableStatusGenerator(milestone.status) : <NotSubmittedStatus></NotSubmittedStatus>}
                //             {milestone?.status && milestone?.status != DeliverableStatus.SubmittedExternally ?
                //                 <a href={milestone.submissionPath} target="_blank" rel="noreferrer" key={milestone.name} >
                //                     <svg className="border-2 border-transparent hover:bg-bg-secondary-dark transition-all active:ring-white active:ring-2 rounded-full w-10 h-10 p-1" width="16" height="20" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                //                         <path d="M9.66634 1.89111V5.33323C9.66634 5.79994 9.66634 6.0333 9.75717 6.21156C9.83706 6.36836 9.96455 6.49584 10.1213 6.57574C10.2996 6.66656 10.533 6.66656 10.9997 6.66656H14.4418M5.49967 12.4998L7.99967 14.9998M7.99967 14.9998L10.4997 12.4998M7.99967 14.9998L7.99967 9.99984M9.66634 1.6665H5.33301C3.93288 1.6665 3.23281 1.6665 2.69803 1.93899C2.22763 2.17867 1.84517 2.56112 1.60549 3.03153C1.33301 3.56631 1.33301 4.26637 1.33301 5.6665V14.3332C1.33301 15.7333 1.33301 16.4334 1.60549 16.9681C1.84517 17.4386 2.22763 17.821 2.69803 18.0607C3.23281 18.3332 3.93288 18.3332 5.33301 18.3332H10.6663C12.0665 18.3332 12.7665 18.3332 13.3013 18.0607C13.7717 17.821 14.1542 17.4386 14.3939 16.9681C14.6663 16.4334 14.6663 15.7333 14.6663 14.3332V6.6665L9.66634 1.6665Z" stroke="white" stroke-width="1.67" stroke-linecap="round" stroke-linejoin="round" />
                //                     </svg>
                //                 </a> : <></>
                //             }
                //         </div>
                //     </div>
                //     // <a key={deliverable.name} href={deliverable.submissionPath ? deliverable.submissionPath : "#"}>
                //     //     <div className="flex flex-row m-5 space-x-2 w-auto items-center justify-between">
                //     //         <img src={iconForDeliverableType(Number(deliverable.submissionFormat))}
                //     //             className="mr-3 h-7 " alt="progressLineActive">
                //     //         </img>
                //     //         <h2>{deliverable.name}</h2>
                //     //         <p>{deliverable.description}</p>
                //     //         <NotSubmittedStatus></NotSubmittedStatus>
                //     //     </div>
                //     // </a>


                // )
                deliverablesArray.push(
                    <div key={milestoneNumber} className={`border-b p-2 border-t border-gray-400 dark:bg-gray-800 dark:border-gray-700 transition-all hover:bg-bg-primary-dark hover:bg-opacity-50 hover:border-accent-dark rounded-xl dark:hover:bg-gray-600`}>
                        <div className='flex flex-row justify-between items-center'>
                            <div className=" p-2 font-medium text-left text-[16px] text-white dark:text-white whitespace-nowrap">
                                {milestone.name}
                            </div>
                            <div className=" p-2 text-center text-white text-[14px] font-gilroy-medium">
                                {formatDateToReadableString(milestone.date?.seconds ? new Date(milestone.date?.seconds * 1000).getTime() : new Date(milestone.date).getTime(), false, true)}
                            </div>
                        </div>


                        <div className=" p-2 text-justify text-white font-gilroy-medium text-[14px] ">
                            {milestone.description}
                        </div>


                        <div className=" p-2 text-center text-white flex flex-row justify-between items-center space-x-6">
                            {milestone?.status ? DeliverableStatusGenerator(milestone.status) : <NotSubmittedStatus></NotSubmittedStatus>}

                            {milestone?.status && milestone?.status != DeliverableStatus.SubmittedExternally ?
                                <a href={milestone.submissionPath} target="_blank" rel="noreferrer" key={milestone.name} >
                                    <svg className="border-2 border-transparent hover:bg-bg-secondary-dark self-center transition-all active:ring-white active:ring-2 rounded-full w-10 h-10 p-1" width="16" height="20" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M9.66634 1.89111V5.33323C9.66634 5.79994 9.66634 6.0333 9.75717 6.21156C9.83706 6.36836 9.96455 6.49584 10.1213 6.57574C10.2996 6.66656 10.533 6.66656 10.9997 6.66656H14.4418M5.49967 12.4998L7.99967 14.9998M7.99967 14.9998L10.4997 12.4998M7.99967 14.9998L7.99967 9.99984M9.66634 1.6665H5.33301C3.93288 1.6665 3.23281 1.6665 2.69803 1.93899C2.22763 2.17867 1.84517 2.56112 1.60549 3.03153C1.33301 3.56631 1.33301 4.26637 1.33301 5.6665V14.3332C1.33301 15.7333 1.33301 16.4334 1.60549 16.9681C1.84517 17.4386 2.22763 17.821 2.69803 18.0607C3.23281 18.3332 3.93288 18.3332 5.33301 18.3332H10.6663C12.0665 18.3332 12.7665 18.3332 13.3013 18.0607C13.7717 17.821 14.1542 17.4386 14.3939 16.9681C14.6663 16.4334 14.6663 15.7333 14.6663 14.3332V6.6665L9.66634 1.6665Z" stroke="white" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </a> : <div className="bg-transparent"></div>
                            }
                        </div>


                    </div>)
            }
        }

    }
    return deliverablesArray
}


// * 12/12/22 - Component is unstable due to gradual move of Contract Event and Contract Chat Message processing to client side
export default function ContractOverview({ published }: { published?: boolean }) {

    const loaderData = useLoaderData();
    let data = ContractDataStore.useState();
    let events, from, to;

    const stage = ContractDataStore.useState(s => s.sidePanelStage);

    const [expanded, setExpanded] = useState(true);



    if (loaderData) {
        data = loaderData.contract;
        events = loaderData.contractEvents;

        from = loaderData.from;
        to = loaderData.to;
    }



    const sidePanelStages = [<MilestoneStepper key={0} ></MilestoneStepper>,
    <DisputesChatComponent disableMessage={'This is a preview of the contract chat'} disabled={!published} key={1} id={data.id} from={from} to={to} customKey={data.id}></DisputesChatComponent>
    ]

    const milestones = published ? data.milestones : data.milestonesProcessed;



    return <>
        <div className="flex flex-col w-auto h-auto justify-between">
            {/*
Escrow section
*/}
            {/* <div className="hidden sm:flex sm:flex-row h-14 space-x-5 mb-6 sm:justify-between">
                <div className='flex flex-row space-x-3'>
                    <div className={`flex flex-row ${primaryGradientDark} w-72 h-full rounded-lg justify-between p-3 items-center`}>
                        <h2 className='prose prose-md text-white'>Total Funds</h2>
                        <h1 className="prose prose-lg text-white text-right"> {data.contractValue}</h1>
                    </div>
                    <div className={`flex flex-row bg-bg-primary-dark border-2 border-solid border-accent-dark w-72 h-full rounded-lg justify-between p-3 items-center`}>
                        <h2 className='prose prose-md text-white'>Released Funds</h2>
                        <h1 className="prose prose-lg text-white text-right"> {data.releasedFunds}</h1>
                    </div>
                    <div className={`flex flex-row bg-bg-primary-dark border-2 border-solid border-accent-dark w-72 h-full rounded-lg justify-between p-3 items-center`}>
                        <h2 className='prose prose-md text-white'>Milestones</h2>
                        <h1 className="prose prose-lg text-white text-right"> <span className="text-purple-400">{data.completedMilestones ? data.completedMilestones : '0'}</span>/{Object.keys(data.milestones?.workMilestones).length}</h1>
                    </div>
                </div>


                <div className="hidden sm:flex sm:flex-row space-x-5 w-auto pr-6 pl-2 items-center ">
                    <TransparentButton onClick={() => {
                        ContractDataStore.update(s => {
                            s.viewStage == 1 ? s.viewStage = 0 : s.viewStage = 1;
                        })
                    }} variant="light" text={`${stage == 1 ? 'Back To Overview' : 'Open Contract'}`} className={`transition-all border-2 text-center sm:w-full text-white prose prose-md rounded-lg active:border-accent-dark whitespace-nowrap   bg-bg-secondary-dark active:bg-bg-secondary-dark  border-transparent hover:border-2  hover:border-accent-dark"}`}></TransparentButton>
                    <FormButton onClick={() => {

                    }} text="Share Deliverables" className="border-2 border-accent-dark"></FormButton>

                    <button onClick={() => {
                        ContractDataStore.update(s => {
                            s.sidePanelStage == ContractSidePanelStages.MilestonesPanel ? s.sidePanelStage = ContractSidePanelStages.ChatsPanel : s.sidePanelStage = ContractSidePanelStages.MilestonesPanel;
                        })
                    }}  ><img src={IconDisputesChat} className="h-20 w-20 " alt="Disputes Chat Icon"></img></button>
                </div>
            </div> */}
            <div className="flex flex-col-reverse sm:flex-row w-auto h-full ">
                <div id="contract-details" className="sm:flex sm:flex-col p-3 sm:p-0 sm:basis-2/3 sm:w-[800px] h-auto justify-start rounded-lg sm:bg-bg-primary-dark text-white">

                    <div className='bg-bg-secondary-dark sm:bg-bg-primary-dark rounded-xl sm:rounded-none p-4 sm:p-0 mb-5 sm:mb-0'>
                        <div className="flex flex-row mb-5 justify-start font-gilroy-bold text-[20px]">
                            <h2>Project Details</h2>
                        </div>
                        <div className="w-full break-normal sm:h-72 p-1 sm:hover:ring-2 sm:hover:ring-white transition-all  rounded-lg sm:border-2 sm:border-solid border-gray-400 mb-4 font-gilroy-regular">
                            {data.description}
                        </div>
                    </div>

                    <div className='bg-bg-secondary-dark sm:hidden rounded-xl sm:rounded-none p-4 sm:p-0 mb-5 sm:mb-0'>
                        <div className="flex flex-row justify-start mb-5 font-gilroy-bold text-[20px]">
                            <h2>Deliverables</h2>
                        </div>
                        <div className="flex flex-col sm:hidden w-full h-auto justify-between space-y-6 transition-all border-gray-400 rounded-xl text-white">
                            {/* <div className="flex flex-row sm:p-3 space-x-4 sm:space-x-20 w-full items-center justify-between">
                            {/* <img src={iconForDeliverableType(Number(milestone.submissionFormat))}
                            className="mr-3 h-7 " alt="progressLineActive">
                        </img> }
                            <h2 className='text-center w-1/4 sm:w-[200px] '> Name </h2>
                            <p className="text-center w-1/4 sm:w-[200px] whitespace-nowrap "> Description </p>
                            <p className="text-center w-1/4 sm:w-[200px] "> Due Date </p>
                            <div className="flex flex-row  w-1/4 sm:w-[300px] items-center justify-start space-x-8">
                                Status
                            </div>
                        </div> */}
                            {generateDeliverablesForMobile(milestones)}
                        </div>
                    </div>
                    <div className="hidden sm:flex flex-row sm:justify-start justify-center mb-5 font-gilroy-bold text-[20px]">
                        <h2>Deliverables</h2>
                    </div>
                    <div className={`bg-[#202020] hidden sm:block p-3 rounded-xl border-2 border-solid border-purple-400 h-1/2 overflow-y-scroll`}>
                        <table className=" w-full h-auto text-sm text-left text-gray-500 dark:text-gray-400">

                            <tbody>
                                <tr className={` border-b dark:bg-gray-800 dark:border-gray-700 transition-all  hover:bg-opacity-50 hover:drop-shadow-md dark:hover:bg-gray-600`}>

                                    <th scope="row" className="px-6 py-4 font-medium text-center text-white dark:text-white whitespace-nowrap">
                                        Name
                                    </th>
                                    <th scope="row" className="px-6 py-4 font-medium text-center text-white dark:text-white whitespace-nowrap">
                                        Description
                                    </th>
                                    <th scope="row" className="px-6 py-4 font-medium text-center text-white dark:text-white whitespace-nowrap">
                                        Due Date
                                    </th>
                                    <th scope="row" className="px-6 py-4 font-medium text-center text-white dark:text-white whitespace-nowrap">
                                        Status
                                    </th>
                                    <th scope="row" className="px-6 py-4 font-medium text-center text-white dark:text-white whitespace-nowrap">
                                        Actions
                                    </th>
                                </tr>
                                {generateDeliverables(milestones)}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div id="contract-side-panel-section" className="flex border-2 border-purple-400 sm:border-0 flex-col m-4 sm:basis-1/3 sm:w-auto w-auto sm:m-0 sm:ml-5 sm:h-auto  sm:max-h-screen  justify-start bg-bg-secondary-dark  border-solid rounded-xl  text-white">
                    <div
                        className="flex flex-row m-5 justify-between items-center">
                        <h2 className={`prose prose-lg text-transparent bg-clip-text ${primaryGradientDark} `}>{stage == ContractSidePanelStages.ChatsPanel ? 'Contract Chat' : 'Contract Events'}</h2>
                        {/* <div onClick={() => {
                            var pageHTML = document.getElementById('paper_trail')?.innerHTML;

                            if (pageHTML) {
                                var tempEl = document.createElement('a');

                                tempEl.href = 'data:attachment/text,' + encodeURI(pageHTML);
                                tempEl.target = '_blank';
                                tempEl.download = `contract_ID_${data.id}.html`;
                                tempEl.click();
                            }

                        }} className="border-2 border-transparent hover:border-purple-400 hover:opacity-75 p-3 cursor-pointer rounded-xl transition-all">Export </div> */}
                        {/* <p className=" prose prose-sm text-white">{data.status === ContractStatus.Draft?<ContractDraftedStatus></ContractDraftedStatus>: <ContractPublishedStatus></ContractPublishedStatus>}</p> */}
                        {/* <ExpandArrowButton expanded={expanded}></ExpandArrowButton> */}
                    </div>

                    <AnimatePresence exitBeforeEnter>
                        <motion.div
                            key={stage}
                            animate={{ opacity: 1, x: 0 }}
                            initial={{ opacity: 0, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            transition={{ duration: 0.5 }}
                            className="h-[550px]  m-2 p-3 mt-0 "
                        >
                            {sidePanelStages[stage]}

                        </motion.div >
                    </AnimatePresence>
                </div>

            </div>
        </div>
        <MobileNavbarPadding size="large"></MobileNavbarPadding>
        {/*
Milestones section
*/}
        {/*
Deliverables section
*/}

    </>

}

// function iconForDeliverableType(format: DeliverableFormat): string | undefined {
//     console.dir(`FORMAT IS : ${format}`)
//     switch (format) {

//         case DeliverableFormat.JPEG || DeliverableFormat.MP4:
//             return IconMedia
//         case DeliverableFormat.PDF:
//             return IconPDF
//         case DeliverableFormat.ZIP:
//             return IconZIP
//         default:
//             return IconGeneric


//     }
// }
