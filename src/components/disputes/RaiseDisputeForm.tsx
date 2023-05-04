import { ErrorMessage } from "@hookform/error-message";
import { useLoaderData, useSubmit } from "@remix-run/react";
import type { Dispatch, SetStateAction} from "react";
import { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import type { Milestone } from "~/models/contracts";
import { DisputeType } from "~/models/disputes";





export default function RaiseDisputeForm({ milestone, milestoneIndex, client, toggleModalFunction }: { milestone: Milestone, client?: boolean, milestoneIndex: number, toggleModalFunction?: Dispatch<SetStateAction<boolean>> }) {
    const { contract, metadata } = useLoaderData();

    const methods = useForm();
    const control = methods.control;
    const trigger = methods.trigger;
    const errors = methods.formState.errors;
    const disputeType = useWatch({ control, name: 'disputeType', defaultValue: client ? DisputeType.QualityIssue : DisputeType.DeadlineExtension });


    let submit = useSubmit();


    useEffect(() => {
        trigger();
    }, [disputeType, trigger])

    return (
        <form onSubmit={methods.handleSubmit(async (data) => {
            const form = new FormData();
            const payload = { ...data, contractName: contract.projectName, milestone: milestone, nextMilestoneIndex: milestoneIndex, contract: contract, raisedBy: metadata?.email, description: data.description ? data.description : `A deadline extension of ${data?.extension} days is requested for this contract`, viewers: contract.viewers };
            form.append('payload', JSON.stringify(payload));
            submit(form, { method: "post", action: `/${metadata.displayName}/disputes/createDispute/${contract.id}` });
            if (toggleModalFunction) toggleModalFunction(false)
        })}>
            <div className="flex flex-col justify-start space-y-2 mt-8">
                <h2 className="prose prose-md text-black font-gilroy-medium text-[18px]"> What is the nature of your dispute? </h2>
                <select id="dispute-type-select"  {...methods.register('disputeType')} className=" bg-transparent p-3 transition-all ring-2 ring-black hover:ring-purple-400 active:ring-purple-400 focus:outline-none focus:ring-purple-400  text-black text-sm rounded-lg placeholder-black block w-auto h-auto dark:bg-gray-700 dark:border-gray-600 dark:placeholder-white dark:text-white ">
                    {metadata?.email == contract?.providerEmail && <option value={DisputeType.DeadlineExtension}>Deadline Extension</option>}
                    {contract?.externalDeliverables && metadata?.email != contract?.providerEmail ? <option value={DisputeType.QualityIssue}>Issue of Quality</option> : <></>}
                    {contract?.externalDeliverables && metadata?.email != contract?.providerEmail ? <option value={DisputeType.Fraud}>Fraud</option> : <></>}
                </select>
            </div>
            <div className="w-full h-10 mt-3 mb-2 text-left">
                <ErrorMessage errors={errors} name='disputeType' render={(data) => {
                    return <span className="text-red-500 p-2 flex-wrap z-10">{data.message}</span>
                }} />
            </div>

            {disputeType == DisputeType.QualityIssue || disputeType == DisputeType.Fraud ?
                <>
                    <div className="flex flex-col justify-start space-y-2 mt-8">
                        <h2 className="prose prose-md text-black font-gilroy-medium text-[18px]"> Describe the issue in detail </h2>
                        <input type="text" id="dispute-description" {...methods.register('description')} className=" bg-transparent p-3 transition-all ring-2 ring-black hover:ring-2 hover:ring-purple-400 active:ring-purple-400 focus:outline-none focus:ring-purple-400  text-black text-sm rounded-lg placeholder-black block w-auto h-auto dark:bg-gray-700 dark:border-gray-600 dark:placeholder-white dark:text-white " />
                    </div>
                    <div className="w-full h-10 mt-3 mb-2 text-left">
                        <ErrorMessage errors={errors} name='requestDetails' render={(data) => {
                            return <span className="text-red-500 p-2 flex-wrap z-10">{data.message}</span>
                        }} />
                    </div>
                </> : <></>
            }
            {disputeType == DisputeType.DeadlineExtension ?
                <>
                    <div className="flex flex-col justify-start space-y-2 mt-4">
                        <h2 className="prose prose-md text-black font-gilroy-medium text-[18px]"> How many days do you wish the deadline to be extended by ? </h2>
                        <input type="number" id="deadline-extension" max={30} min={1} {...methods.register('extension')} className=" bg-transparent p-3 transition-all ring-2 ring-black hover:ring-2 hover:ring-purple-400 active:ring-purple-400 focus:outline-none focus:ring-purple-400  text-black text-sm rounded-lg placeholder-black block w-auto h-auto dark:bg-gray-700 dark:border-gray-600 dark:placeholder-white dark:text-white " />
                    </div>
                    <div className="w-full h-10 mt-3 mb-2 text-left">
                        <ErrorMessage errors={errors} name='requestDetails' render={(data) => {
                            return <span className="text-red-500 p-2 flex-wrap z-10">{data.message}</span>
                        }} />
                    </div>
                </> : <></>
            }
            <button type="submit" className={`w-auto z-0 sm:w-full sm:min-w-[200px] self-center whitespace-nowrap rounded-lg bg-red-700 hover:bg-red-500 border-2 border-transparent hover:border-white font-gilroy-black text-white p-4 transition-all`}> Raise Dispute </button>

        </form>
    )
}