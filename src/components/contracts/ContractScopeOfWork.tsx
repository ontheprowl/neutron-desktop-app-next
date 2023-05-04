import { useEffect } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { ContractDataStore } from "~/stores/ContractStores";
import { ContractCreationStages } from "~/models/contracts";
import FormButton from "../inputs/FormButton";
import { isEmpty } from "~/utils/utils";
import { ErrorMessage } from "@hookform/error-message";
import { toast } from "react-toastify";
import MandatoryAsterisk from "../layout/MandatoryAsterisk";
import BackArrowButton from "../inputs/BackArrowButton";




export default function ContractScopeOfWork({ editMode }: { editMode?: boolean }) {



    const formMethods = useFormContext();
    const errors = formMethods.formState.errors;
    const trigger = formMethods.trigger;


    const description = useWatch({ name: 'description' })
    const businessType = useWatch({ name: 'businessType' })
    const workType = useWatch({ name: 'workType' });
    const attachment = useWatch({ name: 'attachment' });


    useEffect(() => {
        trigger()
    }, [description, businessType, trigger])


    return (
        <div className="flex flex-col w-full h-auto space-y-5">
            <div className="flex flex-row space-x-3">
                <div className="sm:inline hover:drop-shadow-md  transition-all h-12 translate-y-[8px]  rounded-full">
                    <BackArrowButton className="p-2 ring-2 ring-transparent hover:bg-bg-secondary-dark hover:ring-purple-400 transition-all rounded-full" onClick={() => {
                        ContractDataStore.update(s => { s.stage = s.stage - 1 })

                    }} ></BackArrowButton>
                </div>
                <h1 className="prose prose-lg text-white font-gilroy-black mt-1 text-[30px]"> Scope of Work </h1>

            </div>


            <div className="flex flex-row w-full space-x-4">
                <div className="flex flex-col justify-start space-y-2 mt-3">
                    <h2 className="prose prose-md text-white font-gilroy-regular text-[18px]"> Describe the type of work and the work order in detail <MandatoryAsterisk /> </h2>
                    <select id="work-type-select" defaultValue={workType} {...formMethods.register('workType', { required: true })} className=" bg-[#4A4A4A] p-3  text-white text-sm rounded-lg placeholder-white block w-auto h-auto dark:bg-gray-700 dark:border-gray-600 dark:placeholder-white dark:text-white ">
                        <option value="Accounting & Finance">Accounting & Finance</option>
                        <option value="Development & IT">Development & IT</option>
                        <option value="Design & Creative">Design & Creative</option>
                        <option value="Sales & Marketing">Sales & Marketing</option>
                        <option value="Writing & Translation">Writing & Translation</option>
                        <option value="Admin & Customer Support">Admin & Customer Support</option>
                        <option value="HR & Training">HR & Training</option>
                        <option value="Legal">Legal</option>
                        <option value="Engineering & Architecture">Engineering & Architecture</option>
                        <option value="Other">Other</option>
                        {/* <option value="Consulting">Consulting</option>
                        <option value="Digital Marketing">Digital Marketing</option>
                        <option value="Design">Design</option>
                        <option value="Engineering">Engineering</option>
                        <option value="Finance">Finance</option>
                        <option value="Wellness">Wellness</option>
                        <option value="Graphic Design">Graphic Design</option>
                        <option value="Human Resources">Human Resources</option>
                        <option value="IT Consulting">IT Consulting</option>
                        <option value="Influencer">Influencer</option>
                        <option value="Legal">Legal</option>
                        <option value="Marketing">Marketing</option>
                        <option value="Music Production">Music Production</option>
                        <option value="Performing Arts">Performing Arts</option>
                        <option value="Photography">Photography</option>
                        <option value="Podcasting">Podcasting</option>
                        <option value="Product Management">Product Management</option>
                        <option value="Product Management">Product Management</option>
                        <option value="Product Management">Product Management</option>
                        <option value="Product Management">Product Management</option>
                        <option value="Product Management">Product Management</option>
                        <option value="Product Management">Product Management</option>
                        <option value="Public Relations">Public Relations</option>
                        <option value="Recruitment">Recruitment</option>
                        <option value="Digital Media Management">Digital Media Management</option>
                        <option value="Software Engineering">Software Engineering</option>
                        <option value="Translation/Interpretation">Translation/Interpretation</option>
                        <option value="Production">Production</option>
                        <option value="Virtual Assistant">Virtual Assistant</option>
                        <option value="Videography">Videography</option>
                        <option value="Web Design">Web Design</option>
                        <option value="Web Development">Web Development</option>
                        <option value="Writing/Editing">Writing/Editing</option>
                        <option value="Youtuber">Youtuber</option>
                        <option value="Other">Other</option> */}
                    </select>
                </div>
            </div>


            <div className="flex flex-row w-full ">
                <textarea defaultValue={description} {...formMethods.register('description', { required: true, minLength: { value: 10, message: 'The job description needs to be at least 140 characters long' } })} id="job-description" className=" bg-[#4A4A4A] h-32 pt-3 pb-3 pl-4 pr-4 border-gray-300 text-white  text-sm rounded-lg placeholder-white w-full dark:bg-gray-700 dark:border-gray-600  dark:placeholder-white dark:text-white placeholder:overflow-ellipsis sm:overflow-visible" placeholder="The clearer you define your work, the better. Spell out what you'll do, including deliverables and dates. If necessary, you can attach a more detailed Statement of Work." required />
                <div className="hidden sm:flex sm:h-30 w-5 border-l-gray-500 border-l-2 ml-3"></div>

                <article className="hidden prose prose-sm sm:block text-white break-normal font-gilroy-regular">A clear, complete Scope of Work outlines the work to be done, how it will be completed and by whom, and the expected outcomes. By knowing exactly what a Scope is and what it should contain, you can get your budget estimate off to a strong start, setting your project up for success even before kick-off.</article>
            </div >
            <div className="w-full h-8 mt-2 text-left">
                <ErrorMessage errors={errors} name='description' render={(data) => {
                    return <span className="text-red-500 p-2 flex-wrap z-10">{data.message}</span>
                }} />
            </div>
            <div className=" flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 sm:items-center">
                <h2 className="prose prose-md text-white font-gilroy-bold text-[24px] whitespace-nowrap"> Supporting Document </h2>

                {editMode && typeof formMethods.getValues("attachment") == "string" && !formMethods.getValues("attachment").includes('null')  && <a className="hover:underline text-white text-[14px]" href={formMethods.getValues('attachment')}>Current Attached Document</a>}
            </div>

            <input type="file" {...formMethods.register('attachment')} placeholder="Attach a relevant document" className="block w-auto max-w-fit text-sm bg-[#4A4A4A] text-white rounded-lg cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 font-gilroy-regular text-[14px]" />


            <div className="flex flex-row space-x-3 space-y-0">

                <FormButton
                    text="Proceed" onClick={() => {
                        if (!isEmpty(errors)) {
                            toast("Invalid values detected for contract fields!", { theme: 'dark', type: 'warning' })
                        } else {
                            ContractDataStore.update(s => {
                                s.stage = ContractCreationStages.PaymentAndMilestones;
                                s.description = formMethods.getValues('description')
                            });
                        }

                    }} />

            </div>

        </div>);
}