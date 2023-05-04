import { useFormContext, useWatch } from "react-hook-form";
import { ContractDataStore } from "~/stores/ContractStores";
import { ContractCreationStages } from "~/models/contracts";
import FormButton from "../inputs/FormButton";
import CurrencyInput from 'react-currency-input-field';
import AccentedToggle from "../layout/AccentedToggleV1";
import { useEffect } from "react";
import { isEmpty } from "~/utils/utils";
import { toast } from "react-toastify";
import MilestoneFormEntry from "../layout/MilestoneFormEntry";
import { ErrorMessage } from "@hookform/error-message";
import MandatoryAsterisk from "../layout/MandatoryAsterisk";
import BackArrowButton from "../inputs/BackArrowButton";






export default function ContractPaymentDetails({ editMode }: { editMode?: boolean }) {


    const startDate = useWatch({ name: 'startDate' })
    const endDate = useWatch({ name: 'endDate' })
    const basePay = useWatch({ name: 'basePay' })


    const advancePercentage: string = useWatch({ name: 'advancePercentage' });
    let advancePercentageValue = 0;
    if (advancePercentage) {
        advancePercentageValue = parseInt(advancePercentage.replace("%", ''));

    }

    const contractValue: string = useWatch({ name: 'contractValue' });
    let contractValueNumber = 0;

    if (contractValue) {
        contractValueNumber = parseInt(contractValue.replace("₹", '').replace(',', ''));
    }

    let basePayValueNumber = 0;

    if (basePay) {
        basePayValueNumber = parseInt(basePay.replace("₹", '').replace(',', ''));
    }

    const hasAdvance = ContractDataStore.useState(s => s.hasAdvance);
    const hasMilestones = ContractDataStore.useState(s => s.hasMilestones);
    const externalDeliverables = ContractDataStore.useState(s => s.externalDeliverables);

    const deliverables = ContractDataStore.useState(s => s.deliverables);
    const milestones = ContractDataStore.useState(s => s.milestonesCount)
    
    const formMethods = useFormContext();

    const errors = formMethods.formState.errors;
    const trigger = formMethods.trigger;


    const paymentMode = useWatch({ name: 'paymentMode' })

    useEffect(() => {

        trigger()
    }, [paymentMode, trigger, hasAdvance, basePay, contractValue])

    const IsLessThanContractValue = (v: string) => {
        return v && contractValueNumber && parseInt(v) < contractValueNumber;
    }

    return (
        <>
            <div className="flex flex-row space-x-3">
                <div className=" sm:inline hover:drop-shadow-md mt-1  transition-all h-12 rounded-full">
                    <BackArrowButton className="p-2 ring-2 ring-transparent hover:bg-bg-secondary-dark hover:ring-purple-400 transition-all rounded-full" onClick={() => {
                        ContractDataStore.update(s => { s.stage = s.stage - 1 })

                    }} ></BackArrowButton>
                </div>
                <h2 className="prose prose-lg  mb-1 text-white font-gilroy-black text-[30px]"> Payment & Milestones  </h2>
            </div>


            <h3 className="font-gilroy-bold text-gray-400 text-[16px] mb-5 w-full">Disclaimer : Neutron is not liable for work exchanged off-platform and advances paid aren't protected by escrow.</h3>
            <label htmlFor="simple-search" className="sr-only">Client Name</label>
            <div className="mb-10 sm:mb-5 flex flex-col space-y-5 sm:flex-row relative w-auto sm:items-end sm:space-x-3 justify-start align-middle">
                {/* <div className="relative w-auto ">
                    <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                        <svg className="w-5 h-5 text-white dark:text-black" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
                    </div>
                    <input type="text" id="existing-client" className=" bg-[#4A4A4A] pt-3 pb-3 pl-10 pr-4 border-gray-300 text-white text-sm rounded-lg placeholder-white block w-auto h-10 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-white dark:text-white " placeholder="Search for an existing client" required />

                </div> */}
                <div className="flex flex-col space-y-4 w-full">
                    <h2 className="prose prose-lg text-white font-gilroy-regular text-[18px]"> Contract Value <MandatoryAsterisk></MandatoryAsterisk> </h2>
                    <CurrencyInput
                        prefix="₹"
                        id="contract-value"
                        placeholder="E.g: ₹10000"
                        decimalsLimit={2}
                        defaultValue={contractValueNumber}
                        {...formMethods.register('contractValue', { required: true })}
                        className=" bg-[#4A4A4A] pt-3 pb-3 pl-3 space-x-3 border-gray-300 text-white text-sm rounded-lg placeholder-white block w-full h-10 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-white dark:text-white "

                    />
                    <div className="w-full h-0 sm:h-8 mt-3 text-left">
                        <ErrorMessage errors={errors} name={'contractValue'} render={(data) => {
                            return <span className="text-red-500 p-0 m-1 z-10">{data.message}</span>
                        }} />
                    </div>
                </div>



                <div className="hidden sm:flex sm:h-20 border-l-gray-500 border-l-2"></div>
                <div className="flex flex-col space-y-4 w-full">
                    <h2 className="prose prose-lg text-white font-gilroy-regular text-[18px]"> Minimum Pay </h2>
                    <CurrencyInput
                        prefix="₹"
                        id="contract-value-base-pay"
                        placeholder="Minimum compensation for the project"
                        decimalsLimit={2}
                        defaultValue={basePayValueNumber}
                        {...formMethods.register('basePay', {
                            validate: (v: string) => {
                                let value = v.replace("₹", '').replace(',', '')
                                return value.length == 0 || !value || IsLessThanContractValue(value) || "The minimum pay must be less than the total contract value"
                            }
                        })}
                        className=" bg-[#4A4A4A] pt-3 pb-3 pl-3 space-x-3 border-gray-300 text-white text-sm rounded-lg placeholder-white block w-full h-10 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-white dark:text-white "

                    />
                    <div className="w-full  h-5 sm:h-8 mt-3 text-left">
                        <ErrorMessage errors={errors} name={'basePay'} render={(data) => {
                            return <span className="text-red-500 p-0 m-1 z-10">{data.message}</span>
                        }} />
                    </div>
                </div>

            </div>

            <div className="flex flex-col sm:flex-row justify-start space-y-4 sm:space-y-0 sm:space-x-10 w-full">
                <div className="flex flex-row space-x-4 items-center">
                    <AccentedToggle control={hasAdvance} variant="neutron-purple" name={'hasAdvance'} onToggle={() => {
                        if (hasAdvance) {
                            ContractDataStore.update(s => {
                                s.hasAdvance = false
                            });
                            formMethods.resetField('advancePercentage');
                        } else {
                            ContractDataStore.update(s => {
                                s.hasAdvance = true
                            });
                        }
                    }}></AccentedToggle>
                    <div className="flex flex-col text-white">
                        <h1 className="font-gilroy-bold text-[18px]">Advance</h1>
                        <p className="font-gilroy-regular text-[14px] text-gray-300"> Does your project require an advance?</p>
                    </div>


                </div>

                <div className="flex flex-row space-x-4 items-center">
                    <AccentedToggle control={hasMilestones} variant="neutron-purple" name={'hasMilestones'} onToggle={() => {
                        if (hasMilestones === true) {
                            ContractDataStore.update(s => {
                                s.hasMilestones = !hasMilestones
                                s.milestonesCount = 0;
                            }
                            )
                            formMethods.resetField('milestones');

                        } else {
                            ContractDataStore.update(s => {
                                s.hasMilestones = !hasMilestones
                                s.milestonesCount = 1;
                            }
                            );


                        }
                    }}></AccentedToggle>
                    <div className="flex flex-col text-white">
                        <h1 className="font-gilroy-bold text-[18px]">Milestones</h1>
                        <p className="font-gilroy-regular text-[14px] text-gray-300"> Is your project structured in milestones?</p>
                    </div>


                </div>
            </div>
            <div className="flex flex-row justify-start space-x-10 mt-5 w-full">
                <div className="flex flex-row space-x-4 items-center">
                    <AccentedToggle control={externalDeliverables} variant="neutron-purple" name={'externalDeliverables'} onToggle={() => {
                        if (externalDeliverables === true) {
                            ContractDataStore.update(s => {
                                s.externalDeliverables = false;
                            });
                        } else {
                            ContractDataStore.update(s => {
                                s.externalDeliverables = true;
                            });
                        }
                    }}></AccentedToggle>
                    <div className="flex flex-col text-white">
                        <h1 className="font-gilroy-bold text-[18px]">External Delivery</h1>
                        <p className="font-gilroy-regular text-[14px] text-gray-300"> Are deliverables to be submitted externally?</p>
                    </div>


                </div>
            </div>

            <hr className="w-full mt-3 mb-5 border-solid border-gray-500"></hr>

            <label htmlFor="simple-search" className="sr-only">Search through contacts</label>


            {hasAdvance ?
                <>
                    <h2 className="prose prose-lg text-white mb-3 font-gilroy-bold text-[24px]"> Advance Details </h2>
                    <div className="flex flex-col space-y-4 mt-5 mb-3 w-full">
                        <div className="flex flex-row space-x-4 items-center">
                            <CurrencyInput
                                suffix="%"
                                id="contract-value-advance"
                                placeholder="e.g: 20% of total compensation"
                                decimalsLimit={2}
                                defaultValue={advancePercentageValue}
                                {...formMethods.register('advancePercentage')}
                                className=" bg-[#4A4A4A] pt-3 basis-1/2 pb-3 pl-3 max-w-xs space-x-3 border-gray-300 text-white text-sm rounded-lg placeholder-white block w-full h-10 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-white dark:text-white "

                            />
                            <h1 className="text-gray-400 basis-1/2"> = INR {advancePercentageValue / 100 * contractValueNumber}</h1>
                        </div>

                        <hr className="w-full mt-3 mb-5 border-solid border-gray-500"></hr>

                    </div>
                </>
                : <></>}

            {hasMilestones ? <><h2 className="prose prose-lg text-white mb-3 font-gilroy-bold text-[24px]"> Milestones </h2>
                <div className="flex flex-col space-y-4 mt-2 mb-3 w-full">
                    <div className="overflow-y-scroll mb-5 mt-2 space-y-6 sm:space-y-0 max-h-96">
                        {[...Array(milestones).keys()]?.map((milestoneNumber) => {
                            return (
                                <MilestoneFormEntry key={milestoneNumber} milestoneNumber={milestoneNumber}></MilestoneFormEntry>
                            )

                        })}
                    </div>

                </div></> : <></>}


            <FormButton text="Proceed" onClick={() => {
                let milestonesPayload: {
                    advance?: {
                        [x: string]: any
                    },
                    workMilestones?: {
                        [x: string]: any
                    }
                } = {};
                if (advancePercentage) {
                    milestonesPayload = {
                        advance: { name: "Advance", description: "This contract requires an advance payment before work begins", percentage: advancePercentage, value: advancePercentageValue / 100 * contractValueNumber }
                    }
                }
                let iter = -1;
                const milestonesFromForm = formMethods.getValues('milestones');

                // If milestones defined, construct milestones from inputted milestone details, else construct singleton milestone for overall contract
                if (milestonesFromForm) {
                    milestonesPayload['workMilestones'] = {}

                    for (const milestone of milestonesFromForm) {
                        const milestonePercentageNumber = parseInt(milestone.percentage.replace("%", ''));

                        milestonesPayload['workMilestones'][++iter] = { ...milestone, value: milestonePercentageNumber / 100 * contractValueNumber, submissionPath: '' }
                    }
                    milestonesPayload['workMilestones'][iter] = { ...milestonesPayload['workMilestones'][iter], isLastMilestone: true }

                } else {
                    milestonesPayload['workMilestones'] = {}
                    milestonesPayload['workMilestones'][0] = { name: "Contract End Milestone", date: formMethods.getValues('endDate'), description: "This contract will be paid out in full on the completion of this milestone", percentage: advancePercentageValue ? `${100 - advancePercentageValue}` : '100', value: advancePercentageValue ? (1 - (advancePercentageValue / 100)) * contractValueNumber : contractValueNumber, isLastMilestone: true, submissionPath: '' }
                }


                if (!isEmpty(errors)) {
                    toast("Invalid values detected for contract fields!", { theme: 'dark', type: 'warning' })
                } else if (!paymentBreakdownIsValid(milestonesPayload, contractValueNumber)) {
                    toast("Payment breakdown does not add up to the total contract value! Please re-check your inputs...", { theme: 'dark', type: 'warning' })
                } else {
                    ContractDataStore.update(s => {
                        s.stage = ContractCreationStages.DraftReview;
                        // s.milestones = milestonesPayload;
                        formMethods.setValue('milestonesProcessed', milestonesPayload);
                        formMethods.setValue('externalDeliverables', externalDeliverables);
                        ContractDataStore.update(s => {
                            s.hasAdvance = !s.hasAdvance;
                            s.hasDeliverables = !s.hasDeliverables;
                            s.hasMilestones = !s.hasMilestones
                        })
                    });
                }

            }} />
        </>);
}

function paymentBreakdownIsValid(milestones: {
    advance?: {
        [x: string]: any
    },
    workMilestones?: {
        [x: string]: any
    }
}, totalValue: number) {
    let sum = 0;
    if (milestones.advance) {
        sum += milestones.advance.value;
    }
    if (milestones.workMilestones) {
        for (const index of Object.keys(milestones.workMilestones)) {
            if (typeof milestones.workMilestones[index].value == 'number') {
                sum += milestones.workMilestones[index].value;
            }
        }
        return sum == totalValue;
    }
    return true;
}


