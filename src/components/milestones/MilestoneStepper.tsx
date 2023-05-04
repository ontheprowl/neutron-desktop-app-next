import type { Contract, Milestone } from "~/models/contracts";
import { MilestoneStatus } from "~/models/contracts";
import CompletedMilestoneIcon from '~/assets/images/CompletedMilestoneIcon.svg';
import CurrentMilestoneIcon from '~/assets/images/CurrentMilestoneIcon.svg';
import FlagIcon from '~/assets/images/flag.svg'
import { formatDateToReadableString, structurePayinPayload } from "~/utils/utils";
import FormButton from "../inputs/FormButton";
import NeutronModal from "../layout/NeutronModal";
import { motion } from "framer-motion";
import { useFetcher, useLoaderData, useNavigate } from "@remix-run/react";
import type { NeutronEvent } from "~/models/events";
import { ContractEvent, EventType, PaymentEvent } from "~/models/events";
import { useEffect, useState } from "react";
import DefaultSpinner from "../layout/DefaultSpinner";
import RequestRevisionForm from "../disputes/RequestRevisionForm";
import RaiseDisputeForm from "../disputes/RaiseDisputeForm";
import type { Dispute } from "~/models/disputes";
import { generateTextForDisputeType } from "~/utils/utils";
import { DisputeSeverityGenerator } from "../layout/Statuses";
import { generateEventsQuery } from "~/firebase/queries.client";
import { client_onValue } from "~/firebase/neutron-config.client";






export default function MilestoneStepper() {




    // let ENV;
    // if (window != undefined) {
    //     ENV = window.ENV;
    // }

    // 


    const data = useLoaderData();


    let fetcher = useFetcher();
    let paymentFetcher = useFetcher();
    let postPaymentFetcher = useFetcher();

    const { contract, metadata, ownerUsername, node_env } = data as { contract: Contract, metadata: { [x: string]: any }, ownerUsername: string, node_env: string };

    const [gatewayRendered, setGatewayRendered] = useState(false)

    const [targetMilestoneInfo, setTargetMilestoneInfo] = useState<{ milestone: Milestone, milestoneIndex?: string | undefined, nextMilestoneIndex?: string | undefined }>();
    const [approvalModal, setApprovalModal] = useState<boolean>(false);
    const [requestRevisionModal, setRequestRevisionModal] = useState<boolean>(false);
    const [raiseDisputeModal, setRaiseDisputeModal] = useState<boolean>(false);
    const [payinModal, setPayinModal] = useState<boolean>(false);


    //* Events are being loaded using this ad-hoc strategy to support real-time transformations

    const [contractEvents, setContractEvents] = useState<NeutronEvent[]>();

    // const eventsGet = clientGet(query)

    useEffect(() => {
        const messageQuery = generateEventsQuery(EventType.ContractEvent, contract.id);
        return client_onValue(messageQuery, (snapshot) => {
            let result: NeutronEvent[] = []

            const data = snapshot.val();
            console.log(data)
            if (data) {
                for (const [key, value] of Object.entries(data)) {
                    result.push(value)
                }
            }
            setContractEvents(result)
        })


    }, [contract.id])


    useEffect(() => {
        if (paymentFetcher.type == "done" && !gatewayRendered) {
            var script = document.createElement('script');
            script.onload = function (ev) {
                var options = {
                    "key": "rzp_test_m6Y4dhTvMurSLS", //"rzp_live_mZzuHi91dzfZ0s", // Enter the Key ID generated from the Dashboard
                    "amount": paymentFetcher.data.amount_due, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
                    "currency": "INR",
                    "name": "Neutron",
                    "description": "Test Transaction",
                    "order_id": paymentFetcher.data.id,
                    "handler": function (response: any) {
                        console.log("IN THE HANDLER FUNCTION")
                        const form = new FormData();
                        form.append('response', JSON.stringify(response))
                        postPaymentFetcher.submit(form, { method: "post", action: `${ownerUsername}/payment/success/${contract.id}` })
                    },//This is a sample Order ID. Pass the `id` obtained in the response of Step 1

                };
                console.log("FINAL OPTIONS PASSED TO RAZORPAY CLIENT:")
                console.dir(options)
                var rzp1 = new Razorpay(options);
                rzp1.open();
                setGatewayRendered(true)

            };
            script.src = "https://checkout.razorpay.com/v1/checkout.js";
            document.head.appendChild(script);

        }
    }, [paymentFetcher, gatewayRendered])

    const sortedEvents = contractEvents?.sort((a, b) => (a?.timestamp - b?.timestamp))



    return (
        <>
            <motion.div layout id="paper_trail" className="flex flex-col w-auto m-3 max-h-[500px] overflow-y-scroll">

                {/* {sortedEvents[0].event == ContractEvent.ContractSignedByServiceProvider ? <MilestoneStep name={"Contract has been signed by the service provider!"} status={MilestoneStatus.Completed} /> : <MilestoneStep status={MilestoneStatus.Current} name={"Contract has not been signed by the service provider!"} subline={"Current Status"} />}

            {sortedEvents[1].event == ContractEvent.ContractSignedByBoth ? <MilestoneStep name={"Contract has been signed by both parties!"} status={MilestoneStatus.Completed} /> : <><MilestoneStep status={MilestoneStatus.Current} name={"Contract has not been signed by the service provider!"} subline={"Current Status"} /><MilestoneStep status={MilestoneStatus.Current} name={"Contract has not been signed by the client!"} subline={"Current Status"} /></>} */}

                {sortedEvents && sortedEvents?.length > 0 ? generateMilestonesFromEvents(sortedEvents) : <DefaultSpinner></DefaultSpinner>}

            </motion.div>
            {approvalModal && <NeutronModal onConfirm={() => {
                if (targetMilestoneInfo?.milestone) {
                    const form = new FormData();
                    form.append("milestone", JSON.stringify(targetMilestoneInfo.milestone));
                    form.append("contract", JSON.stringify(contract))
                    //TODO : Need to set this flag on the last milestone
                    if (targetMilestoneInfo?.milestone.isLastMilestone) {

                        form.append("isLastMilestone", Boolean(true).toString());
                    }
                    else {
                        form.append("nextMilestoneIndex", JSON.stringify(targetMilestoneInfo?.nextMilestoneIndex));
                    }

                    fetcher.submit(form, { method: "post", action: `${ownerUsername}/approve/${contract.id}`, encType: 'multipart/form-data' })
                }

            }} toggleModalFunction={setApprovalModal} heading={<h1 className="text-black"> You are about to approve a deliverable</h1>} body={<p className="text-black">On approval, this milestone will be marked complete. <br></br><span className="text-red-500 mt-3"> Warning: This operation cannot be undone</span> </p>}></NeutronModal>}
            {requestRevisionModal && <NeutronModal toggleModalFunction={setRequestRevisionModal} heading={<p className={`${contract.revisions && contract.revisions > 0 ? 'text-black' : 'text-red'} font-gilroy-black`}> {contract.revisions && contract.revisions > 0 ?
                <div>
                    <span>You are about to request a revision. </span>
                    <br></br>
                    <br></br>
                    <span>After this revision request, you will have {contract.revisions - 1} revisions that you can request</span>
                </div> : `You can not request any/any further revisions for this contract.`}</p>} body={<div className="text-black" > {contract.revisions && contract.revisions > 0 ? <RequestRevisionForm milestone={targetMilestoneInfo?.milestone} milestoneIndex={targetMilestoneInfo?.milestoneIndex} toggleModalFunction={setRequestRevisionModal}></RequestRevisionForm> : <span className="text-red-600"> If you still feel the quality of work needs to be addressed, please raise a dispute under the Quality of Work category</span>}</div >}></NeutronModal >}
            {raiseDisputeModal && <NeutronModal toggleModalFunction={setRaiseDisputeModal} heading={
                <div className="max-h-fit">
                    <span className=" break-normal">You are about to raise a dispute for this contract. </span>
                    <br></br>
                    <span className="text-red-700 break-none mt-2 text-[14px] leading-tight"> Please only raise a dispute in case revisions can no longer address your concerns.</span>
                </div>} body={
                    <RaiseDisputeForm client={metadata?.email == contract.clientEmail} toggleModalFunction={setRaiseDisputeModal} milestone={targetMilestoneInfo?.milestone} milestoneIndex={targetMilestoneInfo?.milestoneIndex} />
                }></NeutronModal>}
            {
                payinModal && <NeutronModal onConfirm={() => {
                    setGatewayRendered(false)
                    const payload = structurePayinPayload(contract, ownerUsername, metadata, node_env);
                    console.log(payload)
                    const formData = new FormData();
                    formData.append("payload", JSON.stringify(payload))
                    paymentFetcher.submit(formData, { method: 'post', action: `${ownerUsername}/handlers/payment` })
                }} toggleModalFunction={setPayinModal} heading={<p> You will be paying in {contract.contractValue} for this contract </p>} body={<p className="text-black">Are you sure you want to proceed? </p>}></NeutronModal>
            }
        </>)




    function MilestoneStep({ name, subline, index, status, milestone, dispute, nextMilestoneIndex, type, submit, payment, approve, payout }: { name?: string, subline?: string, nextMilestoneIndex?: string, submit?: boolean, approve?: boolean, payment?: boolean, status?: MilestoneStatus, index?: confirmation_number, type?: string, milestone?: Milestone, dispute?: Dispute, payout?: boolean }) {

        const data = useLoaderData();

        let navigate = useNavigate();



        const { contract, metadata } = data;




        const id = crypto.randomUUID();

        if (dispute) {
            return (
                <motion.div className="flex flex-col space-x-3 ml-3  items-center border-2 border-dashed border-red-600 rounded-xl">
                    <div className="flex flex-col self-start m-5 ml-0 w-full space-x-3 space-y-3">
                        <div className="flex flex-row items-center space-x-4 w-full justify-between">
                            <div className="flex flex-row space-x-3 justify-start">
                                <img src={iconForMilestoneStatus(milestone?.status ? milestone?.status : MilestoneStatus.Upcoming)} alt="Neutron Icon" className="h-6 ml-3" />
                                <h1 className="prose text-red-600 whitespace-nowrap font-gilroy-medium prose-lg  uppercase text-[16px]"> {generateTextForDisputeType(dispute.type)}</h1>
                            </div>
                            <div className="pr-4  w-full flex flex-row justify-end">
                                <DisputeSeverityGenerator severity={dispute.severity}></DisputeSeverityGenerator>

                            </div>
                        </div>
                        <h2 className="prose prose-sm break-words text-white ml-1 font-gilroy-regular text-[14px]"> {dispute.description}</h2>

                        <div className="flex flex-col justify-start space-y-3 p-3">
                            <FormButton onClick={() => {
                                navigate(`/${metadata.displayName}/disputes/${dispute.id}`);
                            }} text="Go to Dispute"></FormButton>
                        </div>
                    </div>
                    {/* {approve && metadata.email == contract.clientEmail ?
                        <div className="flex flex-col justify-start space-y-3 p-3">
                            <FormButton onClick={() => {
                                
                                console.dir("MILESTONE GOING TO APPROVAL ACTION :")
                                console.dir(milestone);
                                setTargetMilestoneInfo({ milestone: milestone, nextMilestoneIndex: Number(nextMilestoneIndex) + 1 });
                                setApprovalModal(true);

                            }} text="Approve Deliverable"></FormButton>
                            <FormButton text="Request Revision" onClick={() => {
                                setTargetMilestoneInfo({ milestone: milestone, milestoneIndex: Number.parseInt(nextMilestoneIndex) });
                                setRequestRevisionModal(true);
                            }}></FormButton>
                            <FormButton text="Raise Dispute" onClick={() => {
                                setTargetMilestoneInfo({ milestone: milestone, nextMilestoneIndex: nextMilestoneIndex, milestoneIndex: Number.parseInt(nextMilestoneIndex) });
                                setRaiseDisputeModal(true);
                            }}></FormButton>
                        </div> : <></>
                        // <div className="flex flex-row justify-end">
                        //     <h2 className="prose prose-sm text-white ml-1"> Milestone has been submitted </h2>
                        // </div>
                    }
                    {submit && metadata.email == contract.providerEmail ?
                        <div className="flex flex-row justify-end p-3">
                            {contract.externalDeliverables == "true" ?
                                <div>
                                    <FormButton onClick={() => {
                                        const form = new FormData();
                                        form.append("externallyDelivered", 'true');
                                        form.append("milestone", JSON.stringify(milestone));
                                        if (milestone.isLastMilestone) {
                                            
                                            form.append("isLastMilestone", Boolean(true).toString());
                                            form.append("milestoneIndex", contract.milestones.workMilestones.length - 1);
                                        } else {
                                            form.append("milestoneIndex", nextMilestoneIndex);
                                        }
                                        fetcher.submit(form, { method: "post", encType: 'multipart/form-data' })
                                    }} text=" Mark as Externally Submitted " />
                                </div> :
                                <>
                                    <FormButton onClick={() => {
                                        const deliverableInput = document.getElementById("deliverable-input" + id)
                                        deliverableInput?.click();
                                    }} text="Submit Deliverable"></FormButton>
                                    <input id={"deliverable-input" + id} onChange={(e) => {
                                        if (e?.currentTarget?.files) {
                                            const file = e.currentTarget.files[0];

                                            const form = new FormData();
                                            form.append("deliverableFile", file);
                                            form.append("milestone", JSON.stringify(milestone));
                                            if (milestone.isLastMilestone) {
                                                
                                                form.append("isLastMilestone", Boolean(true).toString());
                                                form.append("milestoneIndex", Object.keys(contract?.milestones?.workMilestones).length - 1);
                                            } else {
                                                form.append("milestoneIndex", nextMilestoneIndex);
                                            }
                                            fetcher.submit(form, { method: "post", encType: 'multipart/form-data' })
                                        }


                                    }} type="file" className="hidden" />
                                </>}

                        </div> : <></>
                        // <div className="flex flex-row justify-end">
                        //     <h2 className="prose prose-sm text-white ml-1"> Milestone has been submitted </h2>
                        // </div>
                    }
                    {payment && metadata.email == contract.clientEmail ? <div className="flex flex-row justify-end p-3">
                        <FormButton onClick={() => {
                            setPayinModal(true);
                        }} text="Pay In "></FormButton>
                    </div> : <div className="flex flex-row justify-end">
                        <h2 className="prose prose-sm text-white ml-1"> </h2>
                    </div>} */}
                </motion.div>)
        }

        return milestone != undefined ?
            <>

                <motion.div className="flex flex-col space-x-3 ml-3 items-center border-2 border-solid border-purple-400 rounded-xl">
                    <div className="flex flex-col self-start m-5 space-x-3 space-y-3">
                        <div className="flex flex-row items-center space-y-1 space-x-3 justify-start">
                            <img src={iconForMilestoneStatus(milestone.status != undefined ? milestone.status : MilestoneStatus.Upcoming)} alt="Neutron Icon" className="h-6 ml-3" />
                            <h1 className="prose text-purple-400 font-gilroy-medium prose-lg  uppercase text-[16px]"> {milestone.name}</h1>
                        </div>
                        <h2 className="prose prose-sm break-words text-white ml-1 font-gilroy-regular text-[14px]"> {milestone.description}</h2>

                    </div>
                    {approve && metadata.email == contract.clientEmail ?
                        <div className="flex flex-col justify-start space-y-3 p-3">
                            <FormButton onClick={() => {
                                setTargetMilestoneInfo({ milestone: milestone, nextMilestoneIndex: Number(nextMilestoneIndex) + 1 });
                                setApprovalModal(true);

                            }} text="Approve Deliverable"></FormButton>
                            <FormButton text="Request Revision" onClick={() => {
                                setTargetMilestoneInfo({ milestone: milestone, milestoneIndex: Number.parseInt(nextMilestoneIndex) });
                                setRequestRevisionModal(true);
                            }}></FormButton>
                            <FormButton text="Raise Dispute" onClick={() => {
                                setTargetMilestoneInfo({ milestone: milestone, nextMilestoneIndex: nextMilestoneIndex, milestoneIndex: Number.parseInt(nextMilestoneIndex) });
                                setRaiseDisputeModal(true);
                            }}></FormButton>
                        </div> : <></>
                        // <div className="flex flex-row justify-end">
                        //     <h2 className="prose prose-sm text-white ml-1"> Milestone has been submitted </h2>
                        // </div>
                    }
                    {submit && metadata.email == contract.providerEmail ?
                        <div className="flex flex-row justify-end p-3">
                            {contract.externalDeliverables == "true" ?
                                <div>
                                    <FormButton onClick={() => {
                                        const form = new FormData();
                                        form.append("externallyDelivered", 'true');
                                        form.append("milestone", JSON.stringify(milestone));
                                        if (milestone.isLastMilestone) {

                                            form.append("isLastMilestone", Boolean(true).toString());
                                            form.append("milestoneIndex", contract.milestones.workMilestones.length - 1);
                                        } else {
                                            form.append("milestoneIndex", nextMilestoneIndex);
                                        }
                                        fetcher.submit(form, { method: "post", encType: 'multipart/form-data' })
                                    }} text=" Mark as Externally Submitted " />
                                </div> :
                                <>
                                    <div className="flex flex-col space-y-4">
                                        <FormButton onClick={() => {
                                            const deliverableInput = document.getElementById("deliverable-input" + id)
                                            deliverableInput?.click();
                                        }} text="Submit Deliverable"></FormButton>
                                        <input id={"deliverable-input" + id} onChange={(e) => {
                                            if (e?.currentTarget?.files) {
                                                const file = e.currentTarget.files[0];

                                                const form = new FormData();
                                                form.append("deliverableFile", file);
                                                form.append("milestone", JSON.stringify(milestone));
                                                if (milestone.isLastMilestone) {

                                                    form.append("isLastMilestone", Boolean(true).toString());
                                                    form.append("milestoneIndex", Object.keys(contract?.milestones?.workMilestones).length - 1);
                                                } else {
                                                    form.append("milestoneIndex", nextMilestoneIndex);
                                                }
                                                form.append('viewers', contract?.viewers);
                                                fetcher.submit(form, { method: "post", encType: 'multipart/form-data' })
                                            }


                                        }} type="file" className="hidden" />
                                        <FormButton onClick={() => {
                                            setTargetMilestoneInfo({ milestone: milestone, nextMilestoneIndex: nextMilestoneIndex, milestoneIndex: Number.parseInt(nextMilestoneIndex) });
                                            setRaiseDisputeModal(true);
                                        }} text="Request Deadline Extension"></FormButton>
                                    </div>

                                </>}

                        </div> : <></>
                        // <div className="flex flex-row justify-end">
                        //     <h2 className="prose prose-sm text-white ml-1"> Milestone has been submitted </h2>
                        // </div>
                    }
                    {payment && metadata.email == contract.clientEmail ? <div className="flex flex-row justify-end p-3">
                        <FormButton onClick={() => {
                            setPayinModal(true);
                        }} text="Pay In "></FormButton>
                    </div> : <div className="flex flex-row justify-end">
                        <h2 className="prose prose-sm text-white ml-1"> </h2>
                    </div>}
                </motion.div>
            </> : <>

                <div className="flex flex-row space-x-5 mb-6
             items-center">
                    <img src={iconForMilestoneStatus(status != undefined ? status : MilestoneStatus.Upcoming)} alt="Neutron Icon" className="h-10 ml-3" />
                    <div className="flex flex-col space-y-0  justify-between font-gilroy-medium">
                        <h1 className="prose prose-lg text-white text-[16px]"> {name}</h1>
                        <h2 className="prose prose-sm text-white text-[12px] font-gilroy-regular"> {subline}</h2>
                    </div>
                </div>
            </>
    }


    function iconForMilestoneStatus(status?: MilestoneStatus): string | undefined {
        switch (status) {
            case MilestoneStatus.Current:
                return CurrentMilestoneIcon
            case MilestoneStatus.Completed:
                return CompletedMilestoneIcon
            case MilestoneStatus.Upcoming:
                return CurrentMilestoneIcon
            case MilestoneStatus.CurrentContractSpecific:
                return FlagIcon
        }
    }

    function generateStepForEvent(event: NeutronEvent, variant = MilestoneStatus.Completed, eventIndex: number): JSX.Element {

        let milestone = event?.payload?.data.queuedMilestone;
        let nextMilestoneIndex = event?.payload?.data.nextMilestoneIndex;


        switch (event?.event) {

            case ContractEvent.ContractDrafted:
                return <MilestoneStep key={event.timestamp} index={eventIndex} status={variant} name={variant == MilestoneStatus.Completed ? `Contract was drafted and then published by ${contract.creator == contract.clientEmail ? contract.clientName : contract.providerName}` : `Contract has been drafted by ${contract.creator == contract.clientEmail ? contract.clientName : contract.providerName}`} subline={variant == MilestoneStatus.Completed ? formatDateToReadableString(event.timestamp, false, true) : 'Current Status'} />

            case ContractEvent.ContractPublished:

                return <MilestoneStep key={event.timestamp} index={eventIndex} status={variant} name={variant == MilestoneStatus.Completed ? `Contract has been signed by ${contract.providerName}` : `Contract has not been signed by ${contract.providerName}`} subline={variant == MilestoneStatus.Completed ? formatDateToReadableString(event.timestamp, false, true) : 'Current Status'} />
            case ContractEvent.ContractPendingSignByClient:

                return <MilestoneStep key={event.timestamp} index={eventIndex} status={variant} name={`Contract is waiting for ${contract.clientName} to sign it`} subline={variant == MilestoneStatus.Completed ? formatDateToReadableString(event.timestamp, false, true) : 'Current Status'} />
            case ContractEvent.ContractSignedByBoth:
                return <MilestoneStep key={event.timestamp} index={eventIndex} status={variant} name={variant == MilestoneStatus.Completed ? "Contract has been signed by both parties" : "Contract has not been signed by the client"} subline={variant == MilestoneStatus.Completed ? formatDateToReadableString(event.timestamp, false, true) : 'Current Status'} />
            case ContractEvent.ContractPayinRequested:
                return (
                    <div key={event.timestamp}>
                        <MilestoneStep index={eventIndex} milestone={variant == MilestoneStatus.Completed ? undefined : { name: "PAY IN", description: "Payin pending from client ..." }} name={variant == MilestoneStatus.Completed ? "Payment request has been acknowledged" : "Payin pending from client"} subline={variant == MilestoneStatus.Completed ? formatDateToReadableString(event.timestamp, false, true) : 'Current Status'} status={variant} payment ></MilestoneStep>
                    </div >)
            case ContractEvent.ContractPayinCompleted:
                return <MilestoneStep index={eventIndex} key={event.timestamp} status={variant} name={variant == MilestoneStatus.Completed ? `Payin to Neutron of ${contract.contractValue} towards this contract has been received` : 'Payin not received for this contract yet'} subline={variant == MilestoneStatus.Completed ? formatDateToReadableString(event.timestamp, false, true) : 'Current Status'} />;
            case ContractEvent.ContractAdvancePending:
                return (
                    <div key={event.timestamp}>
                        <MilestoneStep index={eventIndex} status={variant} milestone={variant == MilestoneStatus.Completed ? undefined : milestone} nextMilestoneIndex={nextMilestoneIndex} name={variant == MilestoneStatus.Completed ? `An advance of ₹${milestone.value} is being processed for this contract  ` : ``} subline={variant == MilestoneStatus.Completed ? formatDateToReadableString(event.timestamp, false, true) : 'Current Status'} ></MilestoneStep>
                    </div>)

            case ContractEvent.ContractAdvancePayoutCompleted:
                return (
                    <div key={event.timestamp}>
                        <MilestoneStep index={eventIndex} status={variant} nextMilestoneIndex={nextMilestoneIndex} name={`The advance has been paid for this contract `} subline={variant == MilestoneStatus.Completed ? formatDateToReadableString(event.timestamp, false, true) : 'Current Status'} submit ></MilestoneStep>
                    </div>)


            case ContractEvent.ContractMilestonePending:

                return (
                    <div>
                        <MilestoneStep index={eventIndex} status={variant} milestone={variant == MilestoneStatus.Completed ? undefined : milestone} nextMilestoneIndex={nextMilestoneIndex} name={variant == MilestoneStatus.Completed ? `Deliverable submitted for milestone ${milestone.name}` : ""} subline={variant == MilestoneStatus.Completed ? formatDateToReadableString(event.timestamp, false, true) : 'Current Status'} submit ></MilestoneStep>
                    </div>)
            case ContractEvent.ContractMilestoneSubmitted:
                const submittedMilestone = event?.payload?.data.milestone;
                return (
                    <div>
                        <MilestoneStep index={eventIndex} status={variant} milestone={variant == MilestoneStatus.Completed ? undefined : submittedMilestone} nextMilestoneIndex={nextMilestoneIndex} name={variant == MilestoneStatus.Completed ? `The client has reviewed the submitted deliverable` : "else"} subline={variant == MilestoneStatus.Completed ? formatDateToReadableString(event.timestamp, false, true) : 'Current Status'} approve ></MilestoneStep>
                    </div>)

            case ContractEvent.ContractDisputeRegistered:

                const pausedMilestone = event?.payload?.data?.currentMilestone;
                const registeredDispute: Dispute = event?.payload?.data?.dispute;
                return (
                    <div>
                        <MilestoneStep index={eventIndex} status={variant} dispute={variant == MilestoneStatus.Completed ? undefined : registeredDispute} nextMilestoneIndex={nextMilestoneIndex} name={variant == MilestoneStatus.Completed ? `A dispute was registered for this contract` : ``} subline={variant == MilestoneStatus.Completed ? formatDateToReadableString(event.timestamp, false, true) : 'Current Status'} approve ></MilestoneStep>
                    </div>)

            case ContractEvent.ContractDisputeCancelled:
                return <MilestoneStep index={eventIndex} key={event.event} status={variant} name={variant == MilestoneStatus.Completed ? `The dispute was cancelled by the raising party ` : ` This dispute is currently being cancelled by the raising party`} subline={variant == MilestoneStatus.Completed ? formatDateToReadableString(event.timestamp, false, true) : 'Current Status'} />;

            case ContractEvent.ContractDisputeRejected:
                return <MilestoneStep index={eventIndex} key={event.event} status={variant} name={variant == MilestoneStatus.Completed ? `The dispute was rejected by the counter party ` : ` This dispute is currently being cancelled by the raising party`} subline={variant == MilestoneStatus.Completed ? formatDateToReadableString(event.timestamp, false, true) : 'Current Status'} />;
            case ContractEvent.ContractDisputeInProcess:
                return <MilestoneStep index={eventIndex} key={event.event} status={variant} name={variant == MilestoneStatus.Completed ? `The dispute was accepted by the counter-party ` : ` This dispute is currently being accepted by the counter party`} subline={variant == MilestoneStatus.Completed ? formatDateToReadableString(event.timestamp, false, true) : 'Current Status'} />;


            case ContractEvent.ContractMilestoneInFeedback:
                const milestoneToBeRevised = event?.payload?.data.milestone;
                const milestoneIndex = event?.payload?.data.milestoneIndex;
                const revision = event?.payload?.data.revision;
                return (
                    <div>
                        <MilestoneStep index={eventIndex} status={variant} milestone={variant == MilestoneStatus.Completed ? undefined : { ...milestoneToBeRevised, name: "REVISION - " + milestoneToBeRevised.name, description: revision.description }} nextMilestoneIndex={milestoneIndex} name={variant == MilestoneStatus.Completed ? `Revision for milestone ${milestoneIndex} completed` : ""} subline={variant == MilestoneStatus.Completed ? formatDateToReadableString(event.timestamp, false, true) : 'Current Status'} submit ></MilestoneStep>
                    </div>)
            case ContractEvent.ContractMilestoneCompleted:
                const approvedMilestone = event?.payload?.data.milestone;
                return <MilestoneStep index={eventIndex} key={event.event} status={variant} name={`Milestone ${approvedMilestone.name} has been completed`} subline={variant == MilestoneStatus.Completed ? formatDateToReadableString(event.timestamp, false, true) : 'Current Status'} />;
            case ContractEvent.ContractMilestonePayoutRequested:
                let milestonePayoutAmount = event.payload?.data.amount;
                return <MilestoneStep index={eventIndex} key={event.event} status={variant} name={variant == MilestoneStatus.Completed ? `Payout of ₹${milestonePayoutAmount} has been queued ` : `Payout of ₹${milestonePayoutAmount} will be queued shortly `} subline={variant == MilestoneStatus.Completed ? formatDateToReadableString(event.timestamp, false, true) : 'Current Status'} />;
            case ContractEvent.ContractMilestonePayoutCompleted:
                return <MilestoneStep index={eventIndex} key={event.event} status={variant} name={variant == MilestoneStatus.Completed ? `Payout wil be credited shortly` : `Payout is being processed `} subline={variant == MilestoneStatus.Completed ? formatDateToReadableString(event.timestamp, false, true) : 'Current Status'} />;
            case ContractEvent.ContractPayoutRequested:
                let payoutAmount = event.payload?.data?.amount;
                return <MilestoneStep index={eventIndex} key={event.event} status={variant} name={variant == MilestoneStatus.Completed ? `Payout of ₹${payoutAmount} has been queued ` : `Payout of ₹${payoutAmount} will be queued shortly `} subline={variant == MilestoneStatus.Completed ? formatDateToReadableString(event.timestamp, false, true) : 'Current Status'} />;

            //TODO: Add contract details to contract payout completed event so that milestone event can be enriched.
            case ContractEvent.ContractPayoutCompleted:
                return <MilestoneStep index={eventIndex} key={event.event} status={variant} name={variant == MilestoneStatus.Completed ? `Payout wil be credited shortly` : `Payout is being processed `} subline={variant == MilestoneStatus.Completed ? formatDateToReadableString(event.timestamp, false, true) : 'Current Status'} />;

            case ContractEvent.ContractCompleted:
                let completedContract = event?.payload?.data;
                return <MilestoneStep index={eventIndex} key={event.event} status={variant} name={`This contract has been completed`} subline={variant == MilestoneStatus.Completed ? formatDateToReadableString(event.timestamp, false, true) : 'Current Status'} />;
            case PaymentEvent.PayoutRequested:
                let payoutRequestedContract = event?.payload?.data;
                return <MilestoneStep index={eventIndex} key={event.event} payout={variant == MilestoneStatus.Current} status={variant} name={variant == MilestoneStatus.Completed ? `Neutron has processed a payout request for contract ${payoutRequestedContract.projectName} ` : `Payout has been requested for contract ${payoutRequestedContract.projectName}`} subline={variant == MilestoneStatus.Completed ? formatDateToReadableString(event.timestamp, false, true) : 'Current Status'} />
            case ContractEvent.ContractClosed:
                return <MilestoneStep index={eventIndex} key={event.event} status={MilestoneStatus.Completed} name={'This contract has been closed'} subline={formatDateToReadableString(event.timestamp, false, true)} />;

        }
        return <MilestoneStep milestone={milestone} status={variant} ></MilestoneStep>

    }

    /** Algorithm:
     *  1)  Loop through events from first to second-last event, as they are all completed.
     *      a) For each event, generate Step
     *  2) Generate 'current' themed step for last event
     *  3) Return array of steps
     */
    function generateMilestonesFromEvents(events: NeutronEvent[]): JSX.Element[] | undefined {

        let milestoneArray: JSX.Element[] = [];
        for (let currentIndex = 0; currentIndex < events.length - 1; currentIndex++) {
            const currentEvent = events[currentIndex]

            milestoneArray.push(generateStepForEvent(currentEvent, MilestoneStatus.Completed, currentIndex))
        }

        milestoneArray.push(generateStepForEvent(events[events.length - 1], MilestoneStatus.Current, events.length - 1))
        // milestoneArray.push(
        //     <div key={key}>
        //         <div className={`ml-5 w-0.5 h-20 border-solid ${milestone.status == MilestoneStatus.Current || milestone.status == MilestoneStatus.Completed ? primaryGradientDark : 'bg-gray-100'}`}></div>
        //         <MilestoneStep milestone={milestone}></MilestoneStep>
        //     </div>
        // )
        return milestoneArray

    }
}





