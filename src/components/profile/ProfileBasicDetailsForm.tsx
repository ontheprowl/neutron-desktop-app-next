import { useFetcher, useLoaderData } from "@remix-run/react";
import { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form"
import { ErrorMessage } from '@hookform/error-message'
import { toast } from "react-toastify";

import DefaultSpinner from "../layout/DefaultSpinner";
import { primaryGradientDark } from "~/utils/neutron-theme-extensions";
import MandatoryAsterisk from "../layout/MandatoryAsterisk";
import { AppStore } from "~/stores/UIStore";





export default function ProfileBasicDetailsForm() {
    const data = useLoaderData();
    const fetcher = useFetcher();
    const saveButtonStates = (state: string) => {
        switch (state) {
            case "idle":
                return (<span> Save & Proceed </span>);

            case "submitting":
                return (<span> Saving Details ...</span>)
            case "loading":
                return (<DefaultSpinner></DefaultSpinner>);
        }
    }



    const userMetadata = data.metadata

    const userNames: string[] = data.usernames;

    const IsUsernameAvailable = (username: string) => {
        return userNames.indexOf(username) == -1 || username == userMetadata.displayName
    }


    const { handleSubmit, register, trigger, formState: { errors }, control } = useForm();

    const firstName = useWatch({ control, name: 'firstName' })
    const lastName = useWatch({ control, name: 'lastName' })
    const displayName = useWatch({ control, name: 'displayName' })

    useEffect(() => {
        trigger()
        if (fetcher.type === "done") {
            toast(<div><h2>Details saved!</h2></div>, { theme: "dark", type: "success" })
            AppStore.update(s => {
                s.profileTab = 1
            })
        }

    }, [firstName, lastName, displayName, trigger, fetcher])

    return (<form onSubmit={
        handleSubmit(async (data) => {
            const form = new FormData()
            form.append('payload', JSON.stringify(data));

            fetcher.submit(form, { method: "post" });


        })
    } className="max-h-[65vh] overflow-y-scroll p-3 sm:max-h-full" autoComplete="off">

        <h2 className="prose prose-lg  text-white font-gilroy-black text-center sm:text-left text-[22px] sm:text-[30px]"> Basic Details </h2>
        <div className="relative w-auto mt-2  sm:mt-5 sm:mb-5 flex flex-col ">
            <span className=" prose prose-md text-white mb-2 text-[18px]">Display Name</span>
            <input type="text" readOnly id="project-name"  {...register('displayName', {
                required: 'This field is required', validate: (v) => {
                    return IsUsernameAvailable(v) || 'This username is already taken';
                }
            })} defaultValue={userMetadata.displayName} className=" bg-[#4A4A4A] pt-3 pb-3 pl-4 pr-4  text-white text-sm rounded-lg placeholder-white block w-auto h-10 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-white dark:text-white " placeholder="Something cool like XXX_DEMONSLAYER_XXX" required />
            {/* <div className="w-full h-10 mt-3">
                <ErrorMessage errors={errors} name='displayName' render={(data) => {
                    return <span className="text-red-500 p-2 m-3 z-10">{data.message}</span>
                }} />
            </div> */}
            <div className="flex items-start flex-col sm:space-y-0 sm:mt-2 sm:space-x-3 sm:flex-row w-full">
                <div className=" space-y-3 w-full h-auto">
                    <span className=" prose prose-md text-white text-[18px]">First Name <MandatoryAsterisk></MandatoryAsterisk></span>
                    <input  {...register('firstName', { required: true, maxLength: { value: 10, message: 'First name exceeds maximum length' } })} type="text" placeholder="e.g : Gaurav" defaultValue={userMetadata.firstName} className=" bg-[#4A4A4A] pt-3 pb-3 pl-4 pr-4 border-gray-300 text-white text-sm rounded-lg invalid:border-red-500 placeholder-white block w-full h-10 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-white dark:text-white " />
                    <div className="w-full h-6 mt-3 text-left">
                        <ErrorMessage errors={errors} name='firstName' render={(data) => {
                            return <span className="text-red-500 whitespace-nowrap z-10">{data.message}</span>
                        }} />
                    </div>

                </div>


                <div className=" space-y-3 w-full">
                    <span className=" prose prose-md text-white text-[18px]">Last Name <MandatoryAsterisk></MandatoryAsterisk></span>
                    <input {...register('lastName', { required: true, maxLength: { value: 20, message: 'Last name exceeds maximum length' } })} type="text" placeholder="e.g: Rajeev" defaultValue={userMetadata.lastName} className=" bg-[#4A4A4A] pt-3 pb-3 pl-4 pr-4 border-gray-300 text-white text-sm rounded-lg placeholder-white block w-full h-10 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-white dark:text-white " />
                    <div className="w-full h-6 mt-3 text-left">
                        <ErrorMessage errors={errors} name='lastName' render={(data) => {
                            return <span className="text-red-500 whitespace-nowrap z-10">{data.message}</span>
                        }} />
                    </div>
                </div>
            </div>


        </div>
        <button
            className={`w-40 rounded-lg text-white self-start p-3 border-2 border-transparent ${primaryGradientDark} active:bg-amber-300 outline-none focus:ring-1 focus:ring-white focus:border-white hover:border-white hover:ring-white font-gilroy-black font-[18px] transition-all`}
            type="submit"
        >
            {saveButtonStates(fetcher.state)}
        </button>

    </form>)
}


