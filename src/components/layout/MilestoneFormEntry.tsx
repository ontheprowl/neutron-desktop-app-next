import CurrencyInput from "react-currency-input-field";
import { useFormContext, useWatch } from "react-hook-form";
import { ContractDataStore } from "~/stores/ContractStores";
import AddButton from "../inputs/AddButton";
import CrossButton from "../inputs/CrossButton";



export default function MilestoneFormEntry({ milestoneNumber }: { milestoneNumber: number }) {

    const formMethods = useFormContext();

    const contractValue: string = useWatch({ name: 'contractValue' });
    let contractValueNumber = 0;

    if (contractValue) {
        contractValueNumber = parseInt(contractValue.replace("₹", '').replace(',', ''));
    }

    const startDate = useWatch({ name: 'startDate' })
    const endDate = useWatch({ name: 'endDate' })
    const milestoneName = useWatch({name:`milestones.${milestoneNumber}.name`});
    const milestoneDescription = useWatch({name:`milestones.${milestoneNumber}.description`});
    const milestoneDate = useWatch({name:`milestone.${milestoneNumber}.date`});
    const prevEndDate = useWatch({ name: `milestones.${milestoneNumber - 1}.date` });

    const milestonePercentage: string = useWatch({ name: `milestones.${milestoneNumber}.percentage` });
    let milestonePercentageNumber = 0;

    if (milestonePercentage) {
        milestonePercentageNumber = parseInt(milestonePercentage.replace("%", ''));
    }

    const minDate = milestoneNumber >= 1 ? prevEndDate : startDate;
    

    //formMethods.setValue(`milestones.${milestoneNumber}.value`, milestonePercentageNumber / 100 * contractValueNumber);

    return (
        <div key={milestoneNumber} id={`milestones-${milestoneNumber}`} className="flex flex-col border-gray-400 border-2 rounded-xl p-3 sm:p-0 sm:border-0 sm:flex-row space-y-5 sm:space-y-0 sm:items-center sm:space-x-5 sm:mb-3 sm:mt-3 justify-start sm:justify-start">
            <input type="text" defaultValue={milestoneName} {...formMethods.register(`milestones.${milestoneNumber}.name`)} className=" bg-[#4A4A4A] pt-3 pb-3 pl-4 pr-4 border-gray-300 text-white text-sm rounded-lg sm:w-auto placeholder-white block w-auto h-10 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-white dark:text-white " placeholder="Name" required />
            <input type="textarea" defaultValue={milestoneDescription} 
            {...formMethods.register(`milestones.${milestoneNumber}.description`)} className=" bg-[#4A4A4A] pt-3 pb-3 pl-4 pr-4 border-gray-300 text-white text-sm sm:w-full rounded-lg placeholder-white block w-auto h-10 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-white dark:text-white " placeholder="Describe this milestone in detail" />
            <input type="date" defaultValue={milestoneDate} {...formMethods.register(`milestones.${milestoneNumber}.date`)} min={minDate} max={endDate} className=" bg-[#4A4A4A] pt-3 pb-3 pl-4 pr-4 sm:w-full border-gray-300 text-white text-sm rounded-lg placeholder-white block w-auto h-10 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-white dark:text-white " placeholder="Describe this milestone in as much detail as possible" />
            <div className="flex flex-row space-x-2 sm:w-full items-center">
                <CurrencyInput
                    suffix="%"
                    id="contract-milestone-value"
                    placeholder="e.g: 20%"
                    decimalsLimit={2}
                    defaultValue={milestonePercentageNumber}
                    {...formMethods.register(`milestones.${milestoneNumber}.percentage`)}
                    className=" bg-[#4A4A4A] pt-3 pb-3 pl-3 max-w-xs space-x-3 border-gray-300 text-white text-sm rounded-lg placeholder-white block sm:w-auto h-10 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-white dark:text-white "

                />
                <h1 className="text-gray-400 w-auto"> = INR {milestonePercentageNumber / 100 * contractValueNumber}</h1>
                <AddButton onClick={() => {
                    ContractDataStore.update((s) => {
                        s.milestonesCount += 1;
                    });
                }} className={""} />
                {milestoneNumber > 0 ? <CrossButton onClick={() => {
                    ContractDataStore.update((s) => {
                        s.milestonesCount -= 1;
                    });
                    formMethods.unregister(`milestones.${milestoneNumber}`, { keepValue: false });
                }} className={""} /> : <div></div>}

            </div>

        </div>)

}