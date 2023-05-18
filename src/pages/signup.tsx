import NucleiTextInput from "@/components/inputs/fields/NucleiTextInput";
import DefaultSpinner from "@/components/layout/DefaultSpinner";
import Image from "next/image";
import Link from "next/link";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import { useEffect } from "react";

import { ValidationPatterns } from "@/utils/utils.client";
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { fbAuth } from "@/lib/firebase/firebase-config";
import { useRouter } from "next/router";
import { emitToast } from "@/components/toasts/NeutronToastContainer";
import { NeutronError } from "@/lib/logging/NeutronError";

export default function Signup() {


    const router = useRouter()

    const signUpButtonStates = (loading: boolean) => {
        if (loading) {
            return (<DefaultSpinner size="regular"></DefaultSpinner>)

        } else {
            return (<span>Sign Up</span>)

        }
    }
    // const [user, loading, error] = useAuthState(auth);



    const methods = useForm();

    const control = methods.control;
    const trigger = methods.trigger;
    const password = useWatch({ control, name: 'password' });
    const passwordConfirmation = useWatch({ control, name: 'passwordConfirmation' });

    useEffect(() => {
        trigger();

    }, [password, passwordConfirmation, trigger])

    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useCreateUserWithEmailAndPassword(fbAuth, { sendEmailVerification: true });


    useEffect(() => {
        if (error) {

            const nError = new NeutronError(error)
            console.dir(nError)
            emitToast(nError.message, null, "error")
        }
    }, [error, router])


    useEffect(() => {
        if (user) {
            router.push('/check_email')
        }
    }, [user])

    return (
        <div className=" sm:h-screen w-full justify-center bg-white align-middle">
            <div className=" flex flex-row-reverse h-full w-full text-center">
                <div id="left-panel" className="flex flex-col w-full sm:basis-3/5  h-full justify-center sm:justify-start sm:items-start mt-20 sm:mt-0 p-8">
                    <div id="form-container" className=" w-full h-full flex flex-row justify-center mt-10 sm:mt-0">
                        <div className="flex flex-col w-full h-full justify-center">
                            <div className="bg-white rounded-lg text-left self-center p-2 w-full sm:w-[500px]">
                                <h1
                                    className={`text-left sm:ml-0 font-gilroy-bold text-black text-[30px]`}
                                >
                                    Sign Up
                                </h1>
                                <h2 className="prose prose-sm font-gilroy-medium text-secondary-text">An AR revolution awaits</h2>


                                <div className=" flex flex-col sm:flex-row items-start space-y-2 sm:space-y-0  w-full justify-between">
                                    <div className="flex flex-col justify-items-start space-y-2 mt-2 w-full">
                                        <FormProvider {...methods}>
                                            <form

                                                onSubmit={methods.handleSubmit(async (data) => {
                                                    createUserWithEmailAndPassword(data.email, data.password)
                                                })}
                                            >
                                                <NucleiTextInput name="email" label="Email" placeholder="e.g: name@example.com" options={{ required: true, pattern: { value: ValidationPatterns.emailValidationPattern, message: 'This is not a valid email ID' } }} />
                                                <NucleiTextInput name="password" type="password" label="Password" placeholder="Enter Password" options={{ required: true, minLength: { value: 8, message: " Password should at least be 8 characters" } }} />
                                                <NucleiTextInput name="passwordConfirmation" type="password" label="Confirm Password" placeholder="Re-enter password" options={{ required: true, validate: (v) => v == password || "Passwords do not match" }} />
                                                <div className="flex flex-col sm:flex-row  items-center justify-start space-y-4 sm:space-y-0 sm:space-x-4 mt-3">
                                                    <button
                                                        className="w-full basis-1/2 rounded-lg  bg-[#6950ba] p-3 border-2 border-transparent active:bg-primary-dark focus:bg-primary-dark hover:bg-primary-dark  outline-none focus:ring-1 focus:ring-white focus:border-white hover:border-white hover:ring-white text-white font-gilroy-medium font-[18px] transition-all"
                                                        type="submit"
                                                    >
                                                        {signUpButtonStates(loading)}
                                                    </button>
                                                </div>

                                            </form>
                                        </FormProvider>

                                        <div className="hover:underline font-gilroy-medium  w-full text-center decoration-white self-start mt-4 pt-4"><span className="text-black">Already have an account?</span> <Link href="/login" className=" text-[#6950ba] hover:underline hover:decoration-[#6950ba]">Log In </Link></div>

                                        <div className="flex flex-row w-full">


                                        </div>
                                    </div>

                                </div>

                            </div>
                        </div>
                    </div>

                </div>
                <div id="right-panel" className="hidden sm:flex sm:flex-col w-full basis-2/5">
                    <Image width="100" height="100" className=" w-full h-full object-cover" alt="Neutron Auth Page Graphic" src="/AuthPageSidePanel2.svg" />

                </div>

            </div>
        </div>
    );

}