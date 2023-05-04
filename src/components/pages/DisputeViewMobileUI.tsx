import { useFetcher, useLoaderData, useNavigate, useSubmit } from "@remix-run/react";
import { useState } from "react";
import type { Dispute } from "~/models/disputes";
import { DisputeStatus, DisputeType } from "~/models/disputes";
import { generateTextForDisputeType } from "~/utils/utils";
import DisputesChatComponent from "../disputes/DisputesChatComponent";
import BackArrowButton from "../inputs/BackArrowButton";
import FormButton from "../inputs/FormButton";
import MobileNavbarPadding from "../layout/MobileNavbarPadding";
import NeutronModal from "../layout/NeutronModal";
import { DisputeSeverityGenerator } from "../layout/Statuses";



export default function DisputeViewMobileUI() {

    const data = useLoaderData();
    let submit = useSubmit();
    let fetcher = useFetcher();
    let navigate = useNavigate();
    const selectedDispute: Dispute = data.selectedDispute;
    const messages = data.messages;
    const metadata = data.metadata;

    const [resolutionModal, setResolutionModal] = useState(false);
    const [rejectionModal, setRejectionModal] = useState(false);
    const [cancelDisputeModal, setCancelDisputeModal] = useState(false);
    const from = data.from;
    const to = data.to;





    return (<div className=" sm:hidden h-screen ">
        <div className="w-full h-auto mb-5 ">
            <div className="flex flex-col items-center justify-between w-full">
                <div className="flex flex-row w-full h-auto items-center justify-between space-x-4">
                    <div className="sm:inline hover:drop-shadow-md  transition-all h-8 rounded-full">
                        <BackArrowButton className="p-2 ring-2 ring-transparent hover:bg-bg-secondary-dark hover:ring-purple-400 focus:ring-purple-400 focus:bg-bg-secondary-dark transition-all rounded-full" onClick={() => {
                            navigate(-1);

                        }} ></BackArrowButton>
                    </div>
                    <div className="flex flex-col text-white w-full  ">

                        <h1 className="text-[16px] font-gilroy-regular">{selectedDispute.id}</h1>
                        <h2 className="text-[22px] font-gilroy-bold">{generateTextForDisputeType(selectedDispute.type)}</h2>


                    </div>

                    <div className="flex flex-row w-full max-h-fit  justify-end  p-2">

                        <DisputeSeverityGenerator severity={selectedDispute.severity}></DisputeSeverityGenerator>

                    </div>
                </div>

            </div>
        </div>
        <DisputesChatComponent disableMessage={selectedDispute.status == DisputeStatus.Accepted ? `This ${generateTextForDisputeType(selectedDispute.type)} request has been accepted ` : selectedDispute.type === DisputeType.Fraud ? '' : `This ${generateTextForDisputeType(selectedDispute.type)} request has been rejected`} disabled={selectedDispute.type === DisputeType.Fraud || (selectedDispute.status == DisputeStatus.Rejected || selectedDispute.status == DisputeStatus.Accepted)} from={from} to={to} customKey={selectedDispute.id} messages={messages}></DisputesChatComponent>
        <div className="flex flex-col  w-full rounded-xl space-y-4 mt-4 justify-between p-4 ">
            {selectedDispute.raisedBy == metadata?.email && selectedDispute.type != DisputeType.Fraud && selectedDispute.status == DisputeStatus.Raised &&
                <button onClick={() => {
                    setCancelDisputeModal(true);
                }} className="rounded-lg p-4  w-auto text-white whitespace-nowrap active:bg-red-500 transition-all hover:border-white bg-red-700 border-2 border-transparent"> Cancel Dispute </button>}
            {selectedDispute.type === DisputeType.QualityIssue && selectedDispute.provider.email == metadata?.email && selectedDispute.status != DisputeStatus.Accepted &&
                <div className="flex flex-col space-y-3">
                    <FormButton text="Accept Dispute" onClick={() => { setResolutionModal(true) }}></FormButton>
                    <FormButton text="Reject" onClick={() => { setRejectionModal(true) }}></FormButton>
                </div>
            }
            {selectedDispute.type === DisputeType.DeadlineExtension && selectedDispute.client.email == metadata?.email && selectedDispute.status == DisputeStatus.Raised &&
                <div className="flex flex-col space-y-3">
                    <FormButton text="Accept Extension Request" onClick={() => { setResolutionModal(true) }}></FormButton>
                    <button className="p-4 self-center text-center w-40 text-white bg-red-800 border-2 border-transparent hover:border-white transition-all rounded-lg" onClick={() => { setRejectionModal(true) }}>Reject</button>
                </div>
            }
        </div>
        <MobileNavbarPadding></MobileNavbarPadding>
        {resolutionModal && <NeutronModal heading={<h1> You are about to accept this dispute  </h1>} onConfirm={() => {
            const data = new FormData();
            const payload = { dispute: selectedDispute, disputeID: selectedDispute.id, disputeData: selectedDispute?.data, contractID: selectedDispute.contractID, milestone: selectedDispute.currentMilestone, nextMilestoneIndex: selectedDispute.nextMilestoneIndex, viewers: selectedDispute.viewers }
            data.append('payload', JSON.stringify(payload))
            fetcher.submit(data, { method: "post", action: `/${metadata.displayName}/disputes/acceptDispute/${selectedDispute.id}` });
        }} body={<p> {selectedDispute.type == DisputeType.DeadlineExtension ? `The due date for the relevant milestone will be extended by ${selectedDispute.data.extension} days` : 'Upon confirmation, you will now have 7 days to submit an updated deliverable'} </p>} toggleModalFunction={setResolutionModal}></NeutronModal>}
        {
            rejectionModal && <NeutronModal heading={<h1 className="text-red-700"> Warning: You are about to reject this dispute request   </h1>} onConfirm={() => {
                const data = new FormData();
                const payload = { dispute: selectedDispute, disputeID: selectedDispute.id, contractID: selectedDispute.contractID, milestone: selectedDispute.currentMilestone, nextMilestoneIndex: selectedDispute.nextMilestoneIndex, viewers: selectedDispute.viewers }
                data.append('payload', JSON.stringify(payload))
                submit(data, { method: "post", action: `/${metadata.displayName}/disputes/rejectDispute/${selectedDispute.id}` });
            }} body={<p className="font-gilroy-regular text-[10px" > If this is a request for Deadline Extension, the contract will resume <br></br><br></br> If this is an Issue of Quality, the contract will be held until both parties arrive with a settlement</p>} toggleModalFunction={setRejectionModal} ></NeutronModal >}
        {
            cancelDisputeModal && <NeutronModal heading={<h1> You are about to cancel this dispute  </h1>} onConfirm={() => {
                const data = new FormData();
                const payload = { contractID: selectedDispute.contractID, milestone: selectedDispute.currentMilestone, nextMilestoneIndex: selectedDispute.nextMilestoneIndex, viewers: selectedDispute.viewers }
                data.append('payload', JSON.stringify(payload))
                submit(data, { method: "post" });
            }} body={<p className="text-red-700"> Upon confirmation, the dispute will be cancelled, and normal contract flow will resume </p>} toggleModalFunction={setCancelDisputeModal}></NeutronModal>
        }

    </div>)

}