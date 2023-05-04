import { useFormContext } from "react-hook-form";
import { ContractDataStore } from "~/stores/ContractStores";
import AddButton from "../inputs/AddButton";
import CrossButton from "../inputs/CrossButton";


export default function DeliverableFormEntry({ deliverableNumber }: { deliverableNumber: number }) {

    const formMethods = useFormContext();

    // const deliverableName = useWatch({ name: 'startDate' })
    // const deliverableDescription = useWatch({ name: 'endDate' })

    //formMethods.setValue(`milestones.${deliverableNumber}.value`, milestonePercentageNumber / 100 * contractValueNumber);

    return (
        <div key={deliverableNumber} id={`deliverable-${deliverableNumber}`} className="flex flex-col sm:flex-row space-y-5 sm:p-1 sm:space-y-0 sm:items-center sm:space-x-5 sm:mb-3 sm:mt-3 justify-start sm:justify-start">
            <input type="text" {...formMethods.register(`deliverables.${deliverableNumber}.name`)} className=" bg-[#4A4A4A] pt-3 pb-3 pl-4 pr-4 border-gray-300 text-white text-sm rounded-lg sm:w-auto placeholder-white block w-auto h-10 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-white dark:text-white " placeholder="E.g: Main Deliverable" required />
            <input type="textarea" {...formMethods.register(`deliverables.${deliverableNumber}.description`)} className=" bg-[#4A4A4A] pt-3 pb-3 pl-4 pr-4 border-gray-300 text-white text-sm sm:w-full rounded-lg placeholder-white block w-auto h-10 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-white dark:text-white " placeholder="Describe this deliverable in as much detail as possible" />
            {/* <input type="number" {...formMethods.register(`deliverables.${deliverableNumber}.revisions`)} min={minDate} max={endDate} className=" bg-[#4A4A4A] pt-3 pb-3 pl-4 pr-4 sm:w-full border-gray-300 text-white text-sm rounded-lg placeholder-white block w-auto h-10 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-white dark:text-white " placeholder="Describe this milestone in as much detail as possible" /> */}
            <div className="flex flex-row space-x-2 sm:w-full items-center">
                <AddButton onClick={() => {
                    ContractDataStore.update((s) => {
                        s.deliverablesCount += 1;
                    });
                }} className={""} />
                {deliverableNumber > 0 ? <CrossButton onClick={() => {
                    ContractDataStore.update((s) => {
                        s.deliverablesCount -= 1;
                    });
                    formMethods.unregister(`milestones.${deliverableNumber}`, { keepValue: false });
                }} className={""} /> : <div></div>}

            </div>

        </div>)

}
