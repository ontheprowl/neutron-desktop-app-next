import { useFormContext, useWatch } from "react-hook-form";
import { ContractDataStore } from "~/stores/ContractStores";
import type { Contract} from "~/models/contracts";
import { ContractCreationStages, ContractCreator } from "~/models/contracts";
import FormButton from "../inputs/FormButton";
import AccentedToggle from "../layout/AccentedToggle";
import { ErrorMessage } from "@hookform/error-message";
import { useEffect } from "react";
import { ValidationPatterns, minStartDate, minEndDate, isEmpty } from "~/utils/utils";
import { toast } from "react-toastify";
import { useLoaderData } from "@remix-run/react";
import MandatoryAsterisk from "../layout/MandatoryAsterisk";




export default function ContractClientInformation({ editMode }: { editMode?: boolean }) {

    const { validEmails, users, metadata }: { validEmails: string[], users: [{ id: string, data: { [key: string]: any } }], metadata: { [x: string]: any } } = useLoaderData();



    function IsProfileComplete(v: any) {
        return validEmails.indexOf(v) != -1 && users.find((value) => {
            return (value.data.email == v && value.data.profileComplete == true)
        })
    }

    function returnUsername(v: any) {
        return users.find((value) => {
            if (value?.data?.email && value?.data?.profileComplete) {
                return (value.data.email == v && value.data.profileComplete == true)
            } else {
                return false;
            }
        })?.id;
    }

    const formMethods = useFormContext();
    const errors = formMethods.formState.errors;
    const trigger = formMethods.trigger;




    const startDate = useWatch({ name: 'startDate' })
    const endDate = useWatch({ name: 'endDate' })
    const revisions = useWatch({ name: 'revisions' })
    const projectName = useWatch({ name: 'projectName' })

    const clientName = useWatch({ name: 'clientName' })
    const clientEmail = useWatch({ name: 'clientEmail' })
    const providerName = useWatch({ name: 'providerName' })
    const providerEmail = useWatch({ name: 'providerEmail' })





    useEffect(() => {
        trigger()

    }, [startDate, endDate, revisions, projectName, clientName, clientEmail, providerName, providerEmail, trigger])

    // useEffect(() => {
    //     console.log(fetcher.data)
    // }, [fetcher])


    const creator = ContractDataStore.useState(s => s.creator);



    return (
        <div>
            <div id="relationship_definition" className={`${editMode ? 'hidden' : ''}`}>
                <div className="flex flex-row items-center space-x-3">
                    <AccentedToggle name="isClient" states={{
                        default: <div className="text-white">
                            <span className="font-gilroy-black inline sm:hidden">I am the</span>

                            <h1 className="font-gilroy-black">Employer</h1>
                            <span className="font-gilroy-bold hidden sm:inline">Are you requesting the service?</span>
                        </div>, toggled: <div className="text-white">
                            <span className="font-gilroy-black inline sm:hidden">I am the</span>
                            <h1 className="font-gilroy-black">Service Provider</h1>
                            <span className="font-gilroy-bold hidden sm:inline">Are you providing the service?</span>
                        </div>
                    }} onToggle={() => {
                        if (creator === ContractCreator.IndividualServiceProvider) {
                            ContractDataStore.update((s: Contract) => {
                                s.creator = ContractCreator.IndividualClient
                            })
                            formMethods.unregister('providerName');
                            formMethods.unregister('providerEmail');
                        } else {
                            ContractDataStore.update((s: Contract) => {
                                s.creator = ContractCreator.IndividualServiceProvider
                            })
                            formMethods.unregister('clientName');
                            formMethods.unregister('clientEmail');
                        }
                    }}></AccentedToggle>
                </div>

                <h2 className="prose prose-lg mb-5 sm:mb-0 mt-5 text-white font-gilroy-black text-[30px]"> Counter-Party Details </h2>
                <label htmlFor="simple-search" className="sr-only">{creator === ContractCreator.IndividualServiceProvider ? 'Employer Name ' : 'Service Provider Name'}</label>
                <div className="flex flex-col sm:flex-row relative w-auto sm:items-end space-y-5 sm:space-x-10 justify-start align-middle">
                    {/* <div className="relative w-auto ">
                    <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                        <svg className="w-5 h-5 text-white dark:text-black" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
                    </div>
                    <input type="text" id="existing-client" className=" bg-[#4A4A4A] pt-3 pb-3 pl-10 pr-4 border-gray-300 text-white text-sm rounded-lg placeholder-white block w-auto h-10 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-white dark:text-white " placeholder="Search for an existing client" required />

                </div> */}
                    <div className=" space-y-3 w-full">
                        <span className=" prose prose-md text-white font-gilroy-regular text-[18px]">{creator === ContractCreator.IndividualServiceProvider ? 'Employer Email ' : 'Service Provider Email'}<MandatoryAsterisk /></span>
                        <input type="text" id="client-email" defaultValue={creator === ContractCreator.IndividualServiceProvider ? clientEmail : providerEmail} {...formMethods.register(creator === ContractCreator.IndividualServiceProvider ? 'clientEmail' : 'providerEmail', {
                            required: true, pattern: {
                                value: ValidationPatterns.emailValidationPattern,
                                message: 'Not a valid email ID '
                            }, validate: (v) => {
                                return IsProfileComplete(v) || 'This email ID is not associated with a KYC-complete Neutron profile';
                            }
                        })}
                            className=" bg-[#4A4A4A] pt-3 pb-3 pl-4 pr-4 border-gray-300 text-white text-sm rounded-lg outline-none placeholder-white block w-full h-10 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-white dark:text-white " placeholder="e.g : businessman@business.biz" required />

                        <div className="w-full h-5 mt-3 text-left">
                            <ErrorMessage errors={errors} name={creator === ContractCreator.IndividualServiceProvider ? 'clientEmail' : 'providerEmail'} render={(data) => {
                                return <span className="text-red-500 p-0 m-1 z-10">{data.message}</span>
                            }} />
                        </div>
                    </div>

                    <div className="hidden sm:flex sm:h-20 w-5 border-l-gray-500 border-l-2"></div>
                    <div className=" space-y-3 w-full">
                        <span className=" prose prose-md text-white font-gilroy-regular text-[18px]">{creator === ContractCreator.IndividualServiceProvider ? 'Employer Name ' : 'Service Provider Name'} (Autofilled)</span>
                        <input type="text" id="client-name" defaultValue={creator === ContractCreator.IndividualServiceProvider ? returnUsername(clientEmail) : returnUsername(providerEmail)} {...formMethods.register(creator === ContractCreator.IndividualServiceProvider ? 'clientName' : 'providerName')} readOnly className=" bg-[#4A4A4A] pt-3 pb-3 pl-4 pr-4 border-gray-300 text-white text-sm rounded-lg placeholder-white block w-full h-10 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-white dark:text-white " placeholder="e.g : Acme Corp" required />
                        <div className="w-full h-5 mt-3 text-justify">
                            <ErrorMessage errors={errors} name={creator === ContractCreator.IndividualServiceProvider ? 'clientName' : 'providerName'} render={(data) => {
                                return <span className="text-red-500 p-0 m-1 z-10">{data.message}</span>
                            }} />
                        </div>
                    </div>

                </div>
                <hr className="w-full mt-5 border-solid border-gray-500"></hr>

            </div>

            <label htmlFor="simple-search" className="sr-only">Search through contacts</label>


            <h2 className="prose prose-lg mt-3 text-white font-gilroy-bold text-[24px]"> Basic Details </h2>
            <div className="relative w-full mt-2 mb-5 sm:mt-5 sm:mb-5 flex flex-col ">
                <div className=" space-y-3 w-full">
                    <span className=" prose prose-md text-white w-full font-gilroy-regular text-[18px]"> Project Name <MandatoryAsterisk /> </span>

                    <input type="text" id="project-name" defaultValue={projectName}  {...formMethods.register('projectName', { required: true, pattern: { value: ValidationPatterns.projectNameValidationPattern, message: 'Project name cannot contain special characters ' } })} className=" bg-[#4A4A4A] pt-3 pb-3 pl-4 pr-4 border-gray-300 text-white text-sm rounded-lg placeholder-white block w-full h-10 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-white dark:text-white " placeholder="Project Name" required />
                    <div className="w-full h-5 mt-3 text-left">
                        <ErrorMessage errors={errors} name='projectName' render={(data) => {
                            return <span className="text-red-500 p-0 m-1 z-10">{data.message}</span>
                        }} />
                    </div>
                </div>

                <div className="flex items-end mt-5 flex-col space-y-3 sm:space-x-3 sm:flex-row w-full">
                    <div className=" space-y-3 w-full">
                        <span className=" prose prose-md text-white font-gilroy-regular text-[18px]">Contract Start Date <MandatoryAsterisk /></span>
                        <input defaultValue={startDate}  {...formMethods.register('startDate', { required: true })} type="date" min={minStartDate()} placeholder="Contract Start Date" className=" bg-[#4A4A4A] pt-3 pb-3 pl-4 pr-4 border-gray-300 text-white text-sm rounded-lg placeholder-white block w-full h-10 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-white dark:text-white " />
                        <div className="w-full h-5  mt-3 text-left">
                            <ErrorMessage errors={errors} name='startDate' render={(data) => {
                                return <span className="text-red-500 p-0 m-1 z-10">{data.message}</span>
                            }} />
                        </div>
                    </div>

                    <div className=" space-y-3 w-full">
                        <span className=" prose prose-md text-white font-gilroy-regular text-[18px]">Contract End Date <MandatoryAsterisk /></span>
                        <input defaultValue={endDate} {...formMethods.register('endDate', { required: true })} type="date" min={minEndDate(startDate)} placeholder="Contract Start Date" className=" bg-[#4A4A4A] pt-3 pb-3 pl-4 pr-4 border-gray-300 text-white text-sm rounded-lg placeholder-white block w-full h-10 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-white dark:text-white " />
                        <div className="w-full h-5 mt-3 text-left">
                            <ErrorMessage errors={errors} name='endDate' render={(data) => {
                                return <span className="text-red-500 p-0 m-1 z-10">{data.message}</span>
                            }} />
                        </div>
                    </div>
                    <div className="hidden sm:flex h-20 w-5 border-l-gray-500 border-l-2"></div>

                    <div className="text-left space-y-3 w-full">
                        <span className=" prose prose-md text-white font-gilroy-regular text-[18px]">No. of Revisions </span>
                        <input {...formMethods.register('revisions')} type="number" min="0" max="30" defaultValue={revisions} placeholder="e.g : 1" className=" bg-[#4A4A4A] pt-3 pb-3 pl-4 pr-4 border-gray-300 text-white text-sm rounded-lg placeholder-white block w-full h-10 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-white dark:text-white " />
                        <div className="w-full h-5 mt-3 text-left">
                            <ErrorMessage errors={errors} name='revisions' render={(data) => {
                                return <span className="text-red-500 p-0 m-1 z-10">{data.message}</span>
                            }} />
                        </div>
                    </div>
                </div>

            </div>
            <FormButton size="small" onClick={() => {
                if (!isEmpty(errors)) {

                    toast("Invalid values detected for contract fields!", { theme: 'dark', type: 'warning' })
                } else {
                    if (creator == ContractCreator.IndividualServiceProvider) {

                        formMethods.setValue('providerEmail', metadata?.email);
                        formMethods.setValue('providerName', metadata?.firstName + " " + metadata?.lastName);
                        formMethods.setValue('providerPAN', metadata?.PAN);
                        formMethods.setValue('providerAadhaar', metadata?.aadhaar);
                        formMethods.setValue('providerAddress', metadata?.address + ", " + metadata?.city + ", " + metadata?.state + " - " + metadata?.pincode);
                        formMethods.setValue('creator', metadata?.email);
                    }
                    else {
                        formMethods.setValue('clientEmail', metadata?.email);
                        formMethods.setValue('clientName', metadata?.firstName + " " + metadata?.lastName);
                        formMethods.setValue('clientPAN', metadata?.PAN);
                        formMethods.setValue('clientAadhaar', metadata?.aadhaar);
                        formMethods.setValue('clientAddress', metadata?.address + ", " + metadata?.city + ", " + metadata?.state + " - " + metadata?.pincode);
                        formMethods.setValue('creator', metadata?.email);

                    }
                    ContractDataStore.update(s => {
                        s.stage = ContractCreationStages.ScopeOfWork;

                        if (!editMode) {
                            s.clientName = formMethods.getValues('clientName');
                            s.clientEmail = formMethods.getValues('clientEmail')
                            s.providerName = formMethods.getValues('providerName');
                            s.providerEmail = formMethods.getValues('providerEmail');
                        }
                        s.projectName = formMethods.getValues('projectName');
                        s.startDate = formMethods.getValues('startDate');
                        s.endDate = formMethods.getValues('endDate');
                        s.revisions = formMethods.getValues('revisions');
                    });

                }

            }} text="Continue"></FormButton>

        </div >);
}


