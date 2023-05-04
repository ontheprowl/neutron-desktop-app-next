import { useFormContext } from "react-hook-form"
import type { Contract } from "~/models/contracts";
import { scroller } from 'react-scroll';
import GenericContractTemplate from '~/components/contracts/GenericContractTemplate';
import TransparentButton from "../inputs/TransparentButton";
import FormButton from "../inputs/FormButton";
import { useFetcher, useLoaderData, useParams, useTransition } from "@remix-run/react";
import { ContractDataStore } from "~/stores/ContractStores";
import type { NeutronEvent } from "~/models/events";
import { ContractEvent } from "~/models/events";
import { returnUserUIDAndUsername } from "~/utils/utils";
import DefaultSpinner from "../layout/DefaultSpinner";
import type { Transition } from "@remix-run/react/transition";
import { useState } from "react";
import NeutronModal from "../layout/NeutronModal";





export default function ContractEditScreen({ viewMode, editMode }: { viewMode?: boolean, editMode?: boolean }) {
    const loaderData = useLoaderData();
    const { username } = useParams();

    const creator = ContractDataStore.useState(s => s.creator);
    let data: Contract = loaderData.contract;
    let events: NeutronEvent[] = loaderData.contractEvents;
    const users = loaderData.users;

    const [signModal, setSignModal] = useState(false);

    const publishContractStates = (transition: Transition) => {
        const isPublished = transition.submission?.formData.get('isPublished');
        if (isPublished === "true") {
            switch (fetcher.state) {
                case "idle":
                    return (<span> Publish Contract</span>);
                case "submitting":
                    return (<span>Publishing Contract</span>);
                case "loading":
                    return (<DefaultSpinner></DefaultSpinner>);
            }
        }
        else {
            return (<span>Publish Contract</span>)
        }

    }

    const draftContractStates = (transition: Transition) => {
        const isPublished = transition.submission?.formData.get('isPublished');

        if (isPublished != "true") {
            switch (fetcher.state) {
                case "idle":
                    return (<span> Save as Draft</span>);
                case "submitting":
                    return (<span>Drafting Contract</span>);
                case "loading":
                    return (<DefaultSpinner></DefaultSpinner>);
            }
        }
        else {
            return (<span>Save as Draft</span>)
        }

    }
    const transition = useTransition();
    const formMethods = useFormContext();

    let metadata = loaderData.metadata;

    const status = ContractDataStore.useState(s => s.status)
    let fetcher = useFetcher();

    return (
        <div className="flex flex-col-reverse sm:flex-row space-y-5 sm:space-x-10 justify-start">
            <div className="bg-white h-[90vh]  sm:h-auto w-auto sm:basis-2/3 ring-1 ring-bg-secondary-dark  bg-opacity-90">
                <GenericContractTemplate viewMode={viewMode}></GenericContractTemplate>
            </div>
            <div className="flex flex-col-reverse sm:flex-col h-auto w-full sm:basis-1/3 ">

                <div className="flex flex-col space-y-3  items-center sm:flex-row sm:w-full sm:space-x-3 m-5 sm:justify-between">
                    {/** TODO: ADD NECESSARY DATA GATHERING FOR SIGNING LOGIC HERE, THEN MIGRATE SIGNING API SUBMISSIONS TO ANOTHER LOCATION */}
                    {viewMode && events[events.length - 1] && events[events.length - 1].event == ContractEvent.ContractPublished && metadata?.email == data.providerEmail ?
                        <button onClick={() => { setSignModal(true) }} className=' p-4 text-center bg-[#E6E0FA] sm:w-full text-[#765AD1] basis-1/2 prose prose-md transition-all rounded-lg active:border-white whitespace-nowrap hover:bg-white'>{`Sign as the Service Provider`}</button> : <></>}
                    {viewMode && events[events.length - 1] && events[events.length - 1].event == ContractEvent.ContractPendingSignByClient && data.clientEmail && metadata?.email == data.clientEmail ? <button onClick={() => { setSignModal(true) }} className=' p-4 text-center bg-[#E6E0FA] sm:w-full text-[#765AD1] basis-1/2 prose prose-md transition-all rounded-lg active:border-white whitespace-nowrap hover:bg-white'>{`Sign as the Client`}</button> : <></>}


                    <div className="flex flex-col space-y-2 w-full">
                        {/* {!viewMode && <div className="flex flex-row space-x-4 items-center">
                            <AccentedToggle variant="neutron-purple" name={'isPublished'} onToggle={() => {
                                ContractDataStore.update(s => {
                                    if (s.status == ContractStatus.Draft) {
                                        s.status = ContractStatus.Published
                                    } else {
                                        s.status = ContractStatus.Draft;
                                    }
                                }
                                )
                            }}></AccentedToggle>
                            <div className="flex flex-col text-white">
                                <h1 className="font-gilroy-bold text-[18px]">Draft / Publish</h1>
                                <p className="font-gilroy-regular text-[14px] text-gray-300"> Do you wish to publish this contract ?</p>
                            </div>


                        </div>} */}
                        {!viewMode &&
                            <div className="flex flex-row space-x-4 sm:space-y-0 sm:space-x-6 w-full">
                                <FormButton submit={true} text={publishContractStates(transition)} ></FormButton>
                                <TransparentButton variant="light" text={draftContractStates(transition)} onClick={(e) => {
                                    let data: {
                                        [x: string]: any;
                                    } = { ...formMethods.getValues(), isPublished: false };
                                    const formdata = new FormData();

                                    //TODO: Creator specific contract 
                                    // if (creator == ContractCreator.IndividualServiceProvider) {
                                    //     console.log("Creator is the service Provider ");
                                    //     data = { ...data, providerEmail: metadata?.email, providerName: metadata?.firstName + ' ' + metadata?.lastName, creator: metadata?.email }
                                    //     console.dir(data)

                                    // }
                                    // else {
                                    //     console.log("The creator is the client ");
                                    //     data = { ...data, clientEmail: metadata?.email, clientName: metadata?.firstName + ' ' + metadata?.lastName, creator: metadata?.email }
                                    //     console.dir(data)


                                    // }
                                    const clientAdditionalDetails = returnUserUIDAndUsername(data.clientEmail, users);
                                    const providerAdditionalDetails = returnUserUIDAndUsername(data.providerEmail, users);
                                    data = { ...data, clientID: clientAdditionalDetails.uid, providerID: providerAdditionalDetails.uid, clientUsername: clientAdditionalDetails.username, providerUsername: providerAdditionalDetails.username, viewers: JSON.stringify([providerAdditionalDetails.uid, clientAdditionalDetails.uid]) };

                                    for (const [key, value] of Object.entries(data)) {
                                        if (key.includes('attachment') && typeof value != "string") {

                                            data[key] = value.item(0)
                                        }

                                        if (key.includes('milestonesProcessed')) {
                                            // for (const [milestoneKey,milestone] of Object.entries(value.workMilestones)) {
                                            //     milestone.attachment = milestone.attachment.item(0);
                                            // }
                                            data[key] = JSON.stringify(value)

                                        }

                                        if (key === 'milestones') {
                                            data[key] = JSON.stringify(value);
                                        }

                                        formdata.append(key, data[key]);

                                    }


                                    fetcher.submit(formdata, { method: "post", encType: 'multipart/form-data' });


                                }} className="w-full  rounded-lg bg-accent-dark text-white transition-all border-2 border-white hover:border-accent-dark outline-none focus:ring-1 focus:ring-white hover:bg-bg-primary-dark"
                                />
                            </div>}
                    </div>


                </div>
                <div className={` border-2 border-purple-400 rounded-xl sm:m-5 mt-2`}>

                    <div className="flex flex-col m-5">
                        {!viewMode &&
                            <div className="mt-5">
                                <h1 className="prose prose-lg text-white mb-2"> Edit Contract</h1>
                                <div className="flex flex-col mt-3 w-full space-y-4">
                                    <button type="button" onClick={() => {
                                        ContractDataStore.update(s => {
                                            s.stage = 0;
                                        })
                                    }} className={`transition-all p-3 border-2 border-white text-left text-white prose prose-md rounded-lg active:bg-bg-secondary-dark active:border-accent-dark border-transparent hover:border-2 bg-bg-primary-dark hover:border-accent-dark`}>Client Information </button>
                                    <button type="button" onClick={() => {
                                        ContractDataStore.update(s => {
                                            s.stage = 1;
                                        })
                                    }} className={`transition-all p-3 border-2 border-white text-left text-white prose prose-md rounded-lg active:bg-bg-secondary-dark active:border-accent-dark border-transparent hover:border-2 bg-bg-primary-dark hover:border-accent-dark`}>Scope of Work </button>
                                    <button type="button" onClick={() => {
                                        ContractDataStore.update(s => {
                                            s.stage = 2;
                                        })
                                    }} className={`transition-all p-3 border-2 border-white text-left text-white prose prose-md rounded-lg active:bg-bg-secondary-dark active:border-accent-dark border-transparent hover:border-2 bg-bg-primary-dark hover:border-accent-dark`}>Payment and Milestones </button>
                                </div>
                            </div>}
                        <div className="flex flex-col">
                            <h1 className="prose prose-lg text-white mt-3 mb-2"> Contract Shortcuts</h1>
                            <div className="flex flex-col mt-3 w-full space-y-4">
                                <button type="button" onClick={() => {
                                    scroller.scrollTo('scope-of-work', { containerId: 'contract-container' });

                                }} className={`transition-all p-3 border-2 border-white text-left text-white prose prose-md rounded-lg active:bg-bg-secondary-dark active:border-accent-dark border-transparent hover:border-2 bg-bg-primary-dark hover:border-accent-dark`}>Exhibit A - Scope of Work</button>
                                <button type="button" onClick={() => {
                                    scroller.scrollTo('exhibit-b', { containerId: 'contract-container' });

                                }} className={`transition-all p-3 border-2 border-white text-left text-white prose prose-md rounded-lg active:bg-bg-secondary-dark active:border-accent-dark border-transparent hover:border-2 bg-bg-primary-dark hover:border-accent-dark`}>Exhibit B - Payment and Milestones</button>
                                <button type="button" onClick={() => {
                                    scroller.scrollTo('dispute-resolution', { containerId: 'contract-container' });

                                }} className={`transition-all p-3 border-2 border-white text-left text-white prose prose-md rounded-lg active:bg-bg-secondary-dark active:border-accent-dark border-transparent hover:border-2 bg-bg-primary-dark hover:border-accent-dark`}>Clause 26 - Dispute Resolution</button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            {signModal && <NeutronModal toggleModalFunction={setSignModal} heading={<span className="text-black"> You are about to sign this contract. Are you sure you want to proceed? </span>} body={<span className="text-red-800"> This operation cannot be undone</span>} onReject={() => { setSignModal(false) }} onConfirm={metadata?.email == data.clientEmail ? () => {
                if (data.clientEmail && data.clientID) {
                    const form = new FormData();
                    form.append('email', data.clientEmail);
                    form.append('isClient', 'true');
                    form.append('id', data.clientID);
                    form.append('viewers', JSON.stringify(data.viewers));

                    fetcher.submit(form, { action: `/${username}/sign/${data.id}`, method: 'post' });
                }

            } : () => {
                if (data.providerEmail && data.providerID) {
                    const form = new FormData();
                    form.append('email', data.providerEmail);
                    form.append('id', data.providerID);
                    form.append('viewers', JSON.stringify(data.viewers));
                    fetcher.submit(form, { action: `/${username}/sign/${data.id}`, method: 'post' });
                }

            }} />}

        </div>)
}