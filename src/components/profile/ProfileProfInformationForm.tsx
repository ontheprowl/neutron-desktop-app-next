import { useFetcher, useLoaderData } from "@remix-run/react";
import { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form"
import { ErrorMessage } from '@hookform/error-message'
import { toast } from "react-toastify";
import DefaultSpinner from "../layout/DefaultSpinner";
import { primaryGradientDark } from "~/utils/neutron-theme-extensions";
import { AppStore } from "~/stores/UIStore";





export default function ProfileProfInformationForm() {

    const data = useLoaderData();

    const userMetadata = data.metadata
    const saveButtonStates = (state: string) => {
        switch (state) {
            case "idle":
                return (<span> Save Details </span>);

            case "submitting":
                return (<span> Saving Details ...</span>)
            case "loading":
                return (<DefaultSpinner></DefaultSpinner>);
        }
    }


    const userNames: string[] = data.usernames;

    const IsUsernameAvailable = (username: string) => {
        return userNames.indexOf(username) == -1 || username == userMetadata.displayName
    }
    const fetcher = useFetcher();
    const { handleSubmit, register, trigger, formState: { errors }, control } = useForm();

    const designation = useWatch({ control, name: 'designation' })
    const experience = useWatch({ control, name: 'experience' })
    const location = useWatch({ control, name: 'location' })
    const language = useWatch({ control, name: 'language' })
    const businessType = useWatch({ control, name: 'businessType' })


    useEffect(() => {
        trigger()
        if (fetcher.type === "done") {
            toast(<div><h2>Details saved!</h2></div>, { theme: "dark", type: "success" })
        }

    }, [designation, experience, location, language, fetcher, trigger])

    return (<form onSubmit={
        handleSubmit(async (data) => {
            const form = new FormData()
            form.append('payload', JSON.stringify(data));

            fetcher.submit(form, { method: "post" });

        })
    } autoComplete="off" className="max-h-[65vh] overflow-y-scroll p-3 sm:max-h-full">

        <h2 className="prose prose-lg  text-white font-gilroy-black text-center sm:text-left  text-[22px] sm:text-[30px]"> Professional Information </h2>
        <div className="relative w-auto mt-2  sm:mt-5 sm:mb-5 flex flex-col ">
            <span className=" prose prose-md text-white mb-5">Designation</span>
            <input type="text" id="designation"  {...register('designation', {
                required: true
            })} defaultValue={userMetadata.designation} className=" bg-[#4A4A4A] pt-3 pb-3 pl-4 pr-4 border-gray-300 text-white text-sm rounded-lg placeholder-white block w-auto h-10 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-white dark:text-white " placeholder="Describe your profession" required />
            <div className="w-full h-6 mt-3">
                <ErrorMessage errors={errors} name='designation' render={(data) => {
                    return <span className="text-red-500 whitespace-nowrap sm:p-2 sm:m-3 z-10">{data.message}</span>
                }} />
            </div>
            <div className="flex items-end mt-2 flex-col space-y-2 sm:space-y-0 sm:space-x-3 sm:flex-row w-full">
                <div className=" space-y-3 w-full h-auto sm:basis-1/3">
                    <span className=" prose prose-md text-white">Experience ( in years )</span>
                    <input  {...register('experience', { required: false })} type="number" max={50} min={0} placeholder="e.g : 5 years" defaultValue={userMetadata.experience} className=" bg-[#4A4A4A] pt-3 pb-3 pl-4 pr-4 border-gray-300 text-white text-sm rounded-lg invalid:border-red-500 placeholder-white block w-full h-10 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-white dark:text-white " />
                    <div className="w-full h-6  mt-3 text-left">
                        <ErrorMessage errors={errors} name='experience' render={(data) => {
                            return <span className="text-red-500 whitespace-nowrap z-10">{data.message}</span>
                        }} />
                    </div>

                </div>


                <div className=" space-y-3 w-full sm:basis-1/3">
                    <span className=" prose prose-md text-white">Location</span>
                    <input  {...register('location', { required: false, maxLength: { value: 20, message: 'Location exceeds maximum length of 20' } })} type="text" placeholder="e.g : Mumbai, India" defaultValue={userMetadata.location} className=" bg-[#4A4A4A] pt-3 pb-3 pl-4 pr-4 border-gray-300 text-white text-sm rounded-lg invalid:border-red-500 placeholder-white block w-full h-10 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-white dark:text-white " />
                    {/* <CountrySelect formFieldName="location" defaultValue={() => 'India'} className=" bg-[#4A4A4A] pt-3 pb-3 pl-4 pr-4 border-gray-300 text-white text-sm rounded-lg placeholder-white block w-full h-10 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-white dark:text-white " id={""} /> */}
                    <div className="w-full h-6  mt-3 text-left">
                        <ErrorMessage errors={errors} name='location' render={(data) => {
                            return <span className="text-red-500 whitespace-nowrap z-10">{data.message}</span>
                        }} />
                    </div>
                </div>
                <div className=" space-y-3 w-full h-auto sm:basis-1/3">
                    <span className=" prose prose-md text-white">Working Language</span>
                    <input  {...register('language', { required: false, maxLength: { value: 10, message: 'Language name exceeds maximum length of 10' } })} type="text" placeholder="e.g : English" defaultValue={userMetadata.language} className=" bg-[#4A4A4A] pt-3 pb-3 pl-4 pr-4 border-gray-300 text-white text-sm rounded-lg invalid:border-red-500 placeholder-white block w-full h-10 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-white dark:text-white " />
                    <div className="w-full h-6 mt-3 text-left">
                        <ErrorMessage errors={errors} name='language' render={(data) => {
                            return <span className="text-red-500 whitespace-nowrap z-10">{data.message}</span>
                        }} />
                    </div>

                </div>

            </div>
            <div className="flex flex-col sm:flex-row  w-full space-y-3 sm:space-y-0 sm:space-x-4">
                <div className="flex flex-col justify-start space-y-2 sm:basis-1/2">
                    <h2 className="prose prose-md text-white  text-[16px]"> Type of Work </h2>
                    <select id="work-type-select" {...register('workType')} defaultValue={userMetadata.workType} className=" bg-[#4A4A4A] p-3  text-white text-sm rounded-lg placeholder-white block w-auto h-auto dark:bg-gray-700 dark:border-gray-600 dark:placeholder-white dark:text-white ">
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

                <div className="flex flex-col justify-start space-y-2 sm:basis-1/2">
                    <h2 className="prose prose-md text-white text-[16px]"> What best describes your business? </h2>
                    <select id="business-type-select" {...register('businessType')} defaultValue={userMetadata.businessType} className=" bg-[#4A4A4A] p-3  text-white text-sm rounded-lg placeholder-white block w-auto h-auto dark:bg-gray-700 dark:border-gray-600 dark:placeholder-white dark:text-white ">
                        <option value="Just starting out">Just starting out</option>
                        <option value="Part-time Freelancer">Part-time Freelancer</option>
                        <option value="Full-time Freelancer or Business Owner">Full-time Freelancer or Business Owner</option>
                        <option value="Agency/Studio or Enterprise">Agency/Studio or Enterprise</option>
                    </select>
                </div>



            </div>
            <div className=" sm:border-0 flex flex-row mt-8">
                {businessType == "Agency/Studio or Enterprise" && <div className="flex flex-col justify-start space-y-2 ">
                    <h2 className="prose prose-md text-white text-[16px]">Does your business work with: </h2>
                    <select id="employee-type-select" {...register('employeeType')} defaultValue={userMetadata.employeeType} className=" bg-[#4A4A4A] p-3  text-white text-sm rounded-lg placeholder-white block w-auto h-auto dark:bg-gray-700 dark:border-gray-600 dark:placeholder-white dark:text-white ">
                        <option value="Full-time employees">Full-time employees</option>
                        <option value="Subcontractors">Subcontractors</option>
                        <option value="Combination of both">Combination of both</option>
                    </select>
                </div>}
                {businessType != "Agency/Studio or Enterprise" && <div className="flex flex-col justify-start space-y-2">
                    <h2 className="prose prose-md whitespace-nowrap text-white text-[16px]"> Is your business registered/incorporated? </h2>
                    <select id="is-registered" {...register('isRegistered')} defaultValue={userMetadata?.isRegistered} className=" bg-[#4A4A4A] p-3  text-white text-sm rounded-lg placeholder-white block w-auto h-auto dark:bg-gray-700 dark:border-gray-600 dark:placeholder-white dark:text-white ">
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                    </select>
                </div>}
            </div>
        </div>
        <button
            className={`w-40 hover:opacity-75 rounded-lg mt-2 self-start ${primaryGradientDark} p-3 border-2 border-transparent active:bg-amber-300 outline-none focus:ring-1 focus:ring-white focus:border-white hover:border-white hover:ring-white text-white font-gilroy-black font-[18px] transition-all`}
            type="submit"
        >
            {saveButtonStates(fetcher.state)}
        </button>
    </form>)
}


