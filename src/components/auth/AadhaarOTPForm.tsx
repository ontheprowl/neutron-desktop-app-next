import { useFetcher, useTransition } from "@remix-run/react";
import type { Dispatch, SetStateAction } from "react";
import { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { toast } from "react-toastify";
import { AppStore } from "~/stores/UIStore";
import { primaryGradientDark } from "~/utils/neutron-theme-extensions";
import DefaultSpinner from "../layout/DefaultSpinner";




/**
 * This component returns a form that will be used to submit an Aadhaar Verification OTP.
 * Intended to be displayed within a Neutron Modal 
 * 
 * 
 * 
 * 
 */

export default function AadhaarOTPForm({ toggleModalFunction, verificationRef }: { toggleModalFunction?: Dispatch<SetStateAction<boolean>>, verificationRef: string }) {



    const methods = useForm();
    const trigger = methods.trigger;
    const errors = methods.formState.errors;
    const control = methods.control;
    const otp = useWatch({ control: control, name: 'otp' });
    
    let fetcher = useFetcher();


    useEffect(() => {
        trigger();
        if (fetcher.type == "done") {
            toast(<div><h2>OTP submitted successfully!</h2></div>, { theme: "dark", type: "success" });
            
            if (toggleModalFunction) toggleModalFunction(false);
            AppStore.update(s => {
                s.profileTab = 2
            })
        }
    }, [fetcher, trigger, otp, toggleModalFunction])

    function submitOTPStates(state: string) {
        switch (state) {
            case "idle":
                return (<span> Submit Aadhaar Verification OTP </span>);
            case "loading":
            case "submitting":
                return (<DefaultSpinner></DefaultSpinner>);
        }
    }

    return (
        <form onSubmit={methods.handleSubmit(async (data) => {
            const form = new FormData();
            form.append('otp', data.otp);
            form.append('ref_id', verificationRef);
            fetcher.submit(form, { method: "post", action: `/auth/verification/aadhaarOTPVerification` });
        })}>
            <div className="flex flex-row w-full h-auto">
                <input type="password" {...methods.register('otp', { required: 'An OTP is required to verify your Aadhaar number' })} id="revision-description" className=" bg-bg-primary-dark h-auto w-50 pt-3 pb-3 pl-4 pr-4 border-gray-300 text-white text-md rounded-lg placeholder-white w-full dark:bg-gray-700 dark:border-gray-600  dark:placeholder-white dark:text-white placeholder:overflow-ellipsis sm:overflow-visible mb-5" placeholder="Please enter your OTP" required />
            </div >
            <button type="submit" className={`w-auto z-0 sm:w-full sm:min-w-[200px] self-center whitespace-nowrap rounded-lg ${primaryGradientDark} border-2 border-transparent hover:border-white font-gilroy-black text-white p-4 transition-all`}>{submitOTPStates(fetcher.state)} </button>

        </form>
    )
}