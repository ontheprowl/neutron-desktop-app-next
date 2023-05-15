import NucleiTextInput from "@/components/inputs/fields/NucleiTextInput";
import DefaultSpinner from "@/components/layout/DefaultSpinner";
import Link from "next/link";
import Image from "next/image";

import React, { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { injectStyle } from "react-toastify/dist/inject-style";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { fbAuth } from "@/lib/firebase/firebase-config";
import { NeutronError } from "@/lib/logging/NeutronError";
import { emitToast } from "@/components/toasts/NeutronToastContainer";
import { useRouter } from "next/router";
import { updateProfile } from "firebase/auth";

export default function Login() {


    const router = useRouter();

    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useSignInWithEmailAndPassword(fbAuth);

    const loginButtonStates = (loading: boolean) => {
        if (loading) {
            return (<DefaultSpinner size="regular"></DefaultSpinner>)

        } else {
            return (<span>Log In</span>)

        }
    }

    // const [user, loading, error] = useAuthState(auth);

    const methods = useForm();

    const register = methods.register;
    const handleSubmit = methods.handleSubmit;


    useEffect(() => {
        if (error) {
            const neutronError = new NeutronError(error);
            if (neutronError) {
                emitToast(neutronError.message, null, "error")

            }
        }

    }, [error])


    useEffect(() => {
        if (user) {
            router.push('companies')
        }

    }, [user])

    return (
        <div className=" sm:h-screen w-full justify-center bg-white align-middle">
            <div className=" flex flex-row-reverse h-full w-full text-center">
                <div id="left-panel" className="flex flex-col w-full sm:basis-3/5 h-full justify-center sm:justify-start mt-20 sm:mt-0 sm:items-start p-8">
                    <div id="form-container" className=" w-full h-full flex flex-row justify-center mt-20 sm:mt-0">
                        <div className="flex flex-col w-full h-full justify-center">
                            <div className="bg-white rounded-lg text-black text-left self-center w-full sm:w-[500px]">
                                <h1
                                    className={`text-left sm:ml-0 font-gilroy-bold  text-[30px]`}
                                >
                                    Login
                                </h1>
                                <h2 className="prose prose-sm font-gilroy-medium text-[#7D7D7D]">Welcome Back</h2>

                                <div className=" flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 text-black  w-full justify-between">
                                    <div className="flex flex-col justify-items-start space-y-4 mt-5 w-full ">
                                        <FormProvider {...methods}>
                                            <form
                                                className=" space-y-6"
                                                onSubmit={handleSubmit(async (data) => {
                                                    signInWithEmailAndPassword(data.email, data.password)
                                                   
                                                    
                                                })}
                                            >
                                                <NucleiTextInput name={"email"} label={"Email"} placeholder="e.g : name@example.com" />
                                                <NucleiTextInput name={"password"} type="password" label={"Password"} placeholder="Enter Password" />

                                                <div className="flex flex-col sm:flex-row  items-center justify-start space-y-4 sm:space-y-0 sm:space-x-4">
                                                    <button
                                                        className="w-full basis-1/2 rounded-lg  bg-[#6950ba] p-3 border-2 border-transparent active:bg-primary-dark hover:bg-primary-dark  focus:bg-primary-dark outline-none focus:ring-1 focus:ring-white focus:border-white hover:border-white hover:ring-white text-white font-gilroy-medium font-[18px] transition-all"
                                                        type="submit"
                                                    >
                                                        {loginButtonStates(loading)}
                                                    </button>
                                                </div>

                                            </form>
                                        </FormProvider>

                                        <div className="hover:underline font-gilroy-medium  w-full text-center decoration-white self-start mt-4 pt-4"><span className="text-black">Don't have an account?</span> <Link href="/signup" className=" text-[#6950ba] hover:underline hover:decoration-[#6950ba]">Sign Up </Link></div>
                                        <Link href="/forgot_password" className=" text-[#6950ba] font-gilroy-medium hover:underline text-center hover:decoration-[#6950ba]"> Forgot your password? </Link>

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