import { useFetcher, useLoaderData } from "@remix-run/react";
import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form"
import { ErrorMessage } from '@hookform/error-message'
import { toast } from "react-toastify";
import DefaultSpinner from "../layout/DefaultSpinner";
import { primaryGradientDark } from "~/utils/neutron-theme-extensions";
import MandatoryAsterisk from "../layout/MandatoryAsterisk";
import NeutronModal from "../layout/NeutronModal";
import AadhaarOTPForm from "../auth/AadhaarOTPForm";
import { AppStore } from "~/stores/UIStore";


export default function ProfileAccountInformationForm() {

    const data = useLoaderData();

    const userMetadata = data.metadata

    const userNames: string[] = data.usernames;

    const [kycSubmissionModal, setKYCSubmissionModal] = useState(false);

    //* Required for offline Aadhaar verification 

    const [otpSubmissionModal, setOTPSubmissionModal] = useState(false);
    const [verificationRef, setVerificationRef] = useState('');


    const saveButtonStates = (state: string) => {
        switch (state) {
            case "idle":
                return (<span className="whitespace-nowrap"> Submit KYC and Proceed </span>);

            case "submitting":
                return (<span> Saving Details ...</span>)
            case "loading":
                return (<DefaultSpinner></DefaultSpinner>);
        }
    }

    const IsUsernameAvailable = (username: string) => {
        return userNames.indexOf(username) == -1 || username == userMetadata.displayName
    }
    const profileUpdationFetcher = useFetcher();
    const beneficiaryCreationFetcher = useFetcher();

    const verifyPANFetcher = useFetcher();
    const verifyBankAccountFetcher = useFetcher();
    const verifyAadhaarFetcher = useFetcher();

    const { handleSubmit, register, trigger, getValues, formState: { errors }, control } = useForm();

    const phoneNumber = useWatch({ control, name: 'phoneNumber' });
    const bankAccount = useWatch({ control, name: 'bankAccount' });
    const ifscCode = useWatch({ control, name: 'ifscCode' });
    const address = useWatch({ control, name: 'address' });
    const PAN = useWatch({ control, name: 'PAN' });
    const city = useWatch({ control, name: 'city' });
    const state = useWatch({ control, name: 'state' });
    const pincode = useWatch({ control, name: 'pincode' });


    useEffect(() => {
        trigger()
        if (profileUpdationFetcher.state === "loading") {
            toast(<div><h2>Details saved!</h2></div>, { theme: "dark", type: "success" })
        }

        if (verifyAadhaarFetcher?.data) {
            const data = JSON.parse(verifyAadhaarFetcher.data);
            if (data.status) {
                setOTPSubmissionModal(true);
                setVerificationRef(data.ref_id);
            }

        }

    }, [phoneNumber, bankAccount, PAN, ifscCode, address, city, state, pincode, profileUpdationFetcher, verifyAadhaarFetcher, trigger])

    return (
        <>
            <form className="max-h-[65vh] overflow-y-scroll p-3 sm:max-h-full" autoComplete="off">

                <div className="flex flex-col whitespace-nowrap sm:flex-row justify-between text-white items-center">
                    <h2 className="prose prose-lg font-gilroy-black text-[22px] sm:text-[30px] text-white"> Account Information (KYC) </h2>
                    {/* <KYCVerificationStatus status={userMetadata?.kycStatus}></KYCVerificationStatus> */}
                </div>
                <div className="relative w-auto mt-2 mb-5 sm:mt-5 sm:mb-0 sm:space-y-2 flex flex-col sm:flex-col ">
                    <div id="kyc-fields" className="sm:flex sm:flex-row  sm:space-x-5">
                        <div className="sm:text-left space-y-3 w-full">
                            <div className="flex flex-row space-x-4 items-center">
                                <span className=" prose prose-md text-white whitespace-nowrap">Phone Number <MandatoryAsterisk></MandatoryAsterisk> </span>

                                {userMetadata?.phoneVerified ? <div className="bg-green-600 pl-2.5 pt-1 border-0 rounded-full w-8 h-8 text-white">✓</div> : ''}
                            </div>
                            <input type="text" id="phone-number"  {...register('phoneNumber', {
                                required: true, pattern: {
                                    value: /^[^0]\d{9}/, message: "Not a valid Indian phone number"
                                }
                            })} defaultValue={userMetadata.phoneNumber} className=" bg-[#4A4A4A] pt-3 pb-3 pl-4 pr-4 border-gray-300 text-white text-sm rounded-lg placeholder-white block w-full h-10 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-white dark:text-white " placeholder="Enter your phone number" required />
                            <div className="w-full h-6 mt-3">
                                <ErrorMessage errors={errors} name='phoneNumber' render={(data) => {
                                    return <span className="text-red-500 whitespace-nowrap z-10">{data.message}</span>
                                }} />
                            </div>
                        </div>
                        <div className="sm:text-left space-y-3  w-full">
                            <div className="flex flex-row space-x-4 items-center">
                                <span className=" prose prose-md text-white">PAN <MandatoryAsterisk></MandatoryAsterisk></span>
                                {userMetadata?.panVerified ? <div className="bg-green-600 pl-2.5 pt-1 border-0 rounded-full w-8 h-8 text-white">✓</div> : ''}
                            </div>
                            <input type={userMetadata.PAN ? 'password' : 'text'} id="pan"  {...register('PAN', {
                                required: true, pattern: {
                                    value: /[A-Z]{5}[0-9]{4}[A-Z]{1}/, message: "Not a valid PAN Number"
                                }
                            })} defaultValue={userMetadata.PAN} className=" bg-[#4A4A4A] pt-3 pb-3 pl-4 pr-4 border-gray-300 text-white text-sm rounded-lg placeholder-white block w-full h-10 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-white dark:text-white " placeholder=" e.g: XXHPRXXXXQ" required />
                            <div className="w-full h-6 mt-3 ">
                                <ErrorMessage errors={errors} name='PAN' render={(data) => {
                                    return <span className="text-red-500 whitespace-nowrap sm:p-2 sm:m-3 z-10">{data.message}</span>
                                }} />
                            </div>
                        </div>
                        <div className="sm:text-left space-y-3 w-full">
                            <div className="flex flex-row space-x-4 items-center">
                                <span className=" prose prose-md text-white">Aadhaar <MandatoryAsterisk></MandatoryAsterisk></span>
                                {userMetadata?.aadhaarVerified ? <div className="bg-green-600 pl-2.5 pt-1 border-0 rounded-full w-8 h-8 text-white">✓</div> : ''}
                            </div>
                            <input type='password' id="aadhaar-number"  {...register('aadhaar', {
                                required: true, pattern: {
                                    value: /^[2-9]{1}[0-9]{3}[0-9]{4}[0-9]{4}$/, message: "Not a valid Aadhaar number"
                                }
                            })} defaultValue={userMetadata.aadhaar} className=" bg-[#4A4A4A] pt-3 pb-3 pl-4 pr-4 border-gray-300 text-white text-sm rounded-lg placeholder-white block w-full h-10 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-white dark:text-white " placeholder="e.g: 3892XXXXXXXX" required />
                            <div className="w-full h-6 mt-3">
                                <ErrorMessage errors={errors} name='aadhaar' render={(data) => {
                                    return <span className="text-red-500 whitespace-nowrap sm:p-2 sm:m-3 z-10">{data.message}</span>
                                }} />
                            </div>
                        </div>

                    </div>
                    <div id="address-fields" className="sm:flex sm:flex-row sm:space-x-5">
                        <div className="sm:text-left space-y-3 w-full sm:basis-3/5">
                            <span className=" prose prose-md text-white">Address <MandatoryAsterisk></MandatoryAsterisk></span>
                            <input {...register('address', { required: true, minLength: { value: 10, message: 'Please enter a complete billing address' } })} type="text" placeholder="Enter your complete street address" defaultValue={userMetadata.address} className=" bg-[#4A4A4A] pt-3 pb-3 pl-4 pr-4 border-gray-300 text-white text-sm rounded-lg placeholder-white block w-full h-10 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-white dark:text-white " />
                            <div className="w-full h-6 mt-3 text-left">
                                <ErrorMessage errors={errors} name='address' render={(data) => {
                                    return <span className="text-red-500 whitespace-nowrap sm:p-2 sm:m-3 z-10">{data.message}</span>
                                }} />
                            </div>
                        </div>

                        <div className="sm:text-left space-y-3 w-full sm:basis-1/5">
                            <span className=" prose prose-md text-white">City <MandatoryAsterisk></MandatoryAsterisk></span>
                            <input {...register('city', { required: true })} type="text" placeholder="e.g: Bengaluru" defaultValue={userMetadata.city} className=" bg-[#4A4A4A] pt-3 pb-3 pl-4 pr-4 border-gray-300 text-white text-sm rounded-lg placeholder-white block w-full h-10 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-white dark:text-white " />
                            <div className="w-full h-6 mt-3 text-left">
                                <ErrorMessage errors={errors} name='city' render={(data) => {
                                    return <span className="text-red-500 whitespace-nowrap sm:p-2 sm:m-3 z-10">{data.message}</span>
                                }} />
                            </div>
                        </div>

                        <div className="sm:text-left space-y-3 w-full sm:basis-1/5">
                            <span className=" prose prose-md text-white">State <MandatoryAsterisk></MandatoryAsterisk></span>
                            <input {...register('state', { required: true })} type="text" placeholder="e.g: Karnataka" defaultValue={userMetadata.state} className=" bg-[#4A4A4A] pt-3 pb-3 pl-4 pr-4 border-gray-300 text-white text-sm rounded-lg placeholder-white block w-full h-10 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-white dark:text-white " />
                            <div className="w-full h-6 mt-3 text-left">
                                <ErrorMessage errors={errors} name='state' render={(data) => {
                                    return <span className="text-red-500 whitespace-nowrap sm:p-2 sm:m-3 z-10">{data.message}</span>
                                }} />
                            </div>
                        </div>

                        <div className="sm:text-left space-y-3 w-full sm:basis-1/5">
                            <span className=" prose prose-md text-white">Pincode <MandatoryAsterisk></MandatoryAsterisk></span>
                            <input {...register('pincode', { required: true, maxLength: { value: 6, message: 'Please enter a valid Indian pincode' }, pattern: { value: /[1-9]*/, message: "Please enter a valid Indian pincode" } })} type="text" placeholder="e.g: 560*** " defaultValue={userMetadata.pincode} className=" bg-[#4A4A4A] pt-3 pb-3 pl-4 pr-4 border-gray-300 text-white text-sm rounded-lg placeholder-white block w-full h-10 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-white dark:text-white " />
                            <div className="w-full h-6 mt-3 text-left">
                                <ErrorMessage errors={errors} name='pincode' render={(data) => {
                                    return <span className="text-red-500 whitespace-nowrap sm:p-2 sm:m-3 z-10">{data.message}</span>
                                }} />
                            </div>
                        </div>
                    </div>

                    <div id="fields-column-2" className="flex items-start flex-col space-y-3 sm:space-x-3 sm:space-y-0 sm:flex-row w-auto">
                        <div className="sm:text-left space-y-3 w-full h-auto">
                            <div className="flex flex-row space-x-4 items-center">
                                <span className=" prose prose-md text-white">Bank Account <MandatoryAsterisk></MandatoryAsterisk></span>
                                {userMetadata?.bankVerified ? <div className="bg-green-600 pl-2.5 pt-1 border-0 rounded-full w-8 h-8 text-white">✓</div> : ''}
                            </div>
                            <input  {...register('bankAccount', {
                                required: true, pattern: {
                                    value: /^\d{9,18}$/, message: 'Not a valid Indian bank account'
                                }
                            })} type="password" placeholder="Enter your bank account number" defaultValue={userMetadata.bankAccount} className=" bg-[#4A4A4A] pt-3 pb-3 pl-4 pr-4 border-gray-300 text-white text-sm rounded-lg invalid:border-red-500 placeholder-white block w-full h-10 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-white dark:text-white " />
                            <div className="w-full h-6 mt-3 text-left">
                                <ErrorMessage errors={errors} name='bankAccount' render={(data) => {
                                    return <span className="text-red-500 whitespace-nowrap sm:p-2 sm:m-3 z-10">{data.message}</span>
                                }} />
                            </div>

                        </div>


                        <div className="sm:text-left space-y-3 w-full">
                            <div className="flex flex-row space-x-4 items-center">
                                <span className=" prose prose-md text-white">IFSC Code <MandatoryAsterisk></MandatoryAsterisk></span>
                                {userMetadata?.bankVerified ? <div className="bg-green-600 pl-2.5 pt-1 border-0 rounded-full w-8 h-8 text-white">✓</div> : ''}
                            </div>
                            <input {...register('ifscCode', { required: true, pattern: { value: /^[A-Z]{4}0[A-Z0-9]{6}$/, message: 'This is not a valid IFSC Code' } })} type="password" placeholder="e.g: ICIC0001875" defaultValue={userMetadata.ifscCode} className=" bg-[#4A4A4A] pt-3 pb-3 pl-4 pr-4 border-gray-300 text-white text-sm rounded-lg placeholder-white block w-full h-10 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-white dark:text-white " />
                            <div className="w-full h-6 mt-3 text-left">
                                <ErrorMessage errors={errors} name='ifscCode' render={(data) => {
                                    return <span className="text-red-500 whitespace-nowrap sm:p-2 sm:m-3 z-10">{data.message}</span>
                                }} />
                            </div>
                        </div>

                    </div>

                </div>
                <button
                    className={`w-60 rounded-lg mt-2 self-start ${primaryGradientDark} text-white p-3 border-2 border-transparent active:bg-amber-300 outline-none focus:ring-1 focus:ring-white focus:border-white hover:border-white hover:ring-white font-gilroy-black font-[18px] transition-all`}
                    type="button" onClick={() => {
                        setKYCSubmissionModal(!kycSubmissionModal);
                    }}
                >
                    {saveButtonStates(profileUpdationFetcher.state)}
                </button>
                {/* <button onClick={() => {
                    setKYCSubmissionModal(!kycSubmissionModal);
                }} type="button" className="text-white bg-green-500 border-2 border-transparent p-3 hover:border-white hover:opacity-70 transition-all rounded-xl m-4"> Verify </button> */}


            </form>
            {kycSubmissionModal && <NeutronModal onConfirm={() => {

                const data = getValues();
                const form = new FormData()
                form.append('payload', JSON.stringify(data));

                //* Verify bank account details
                const verifyBankDataForm = new FormData();
                verifyBankDataForm.append('bankAccount', data.bankAccount);
                verifyBankDataForm.append('name', userMetadata.firstName);
                verifyBankDataForm.append('ifsc', data.ifscCode);
                verifyBankDataForm.append('phone', data.phoneNumber);

                verifyBankAccountFetcher.submit(verifyBankDataForm, { method: "post", action: "/auth/verification/bank" })

                //* Verify PAN number 

                const verifyPANDataForm = new FormData();
                verifyPANDataForm.append('pan', data.PAN);
                verifyPANDataForm.append('name', userMetadata.firstName);

                verifyPANFetcher.submit(verifyPANDataForm, { method: "post", action: "/auth/verification/pan" })

                //* Verify Aadhaar Number

                const verifyAadhaarDataForm = new FormData();
                verifyAadhaarDataForm.append('aadhaarNumber', data.aadhaar);

                verifyAadhaarFetcher.submit(verifyAadhaarDataForm, { method: "post", action: "/auth/verification/aadhaarOTPRequest" })



                profileUpdationFetcher.submit(form, { method: "post" });

                //* This block ensures that a corresponding beneficiary is created in the system for payouts /
                const beneficiaryUpdateForm = new FormData();
                const beneficiary = {
                    "beneId": userMetadata.id,
                    "name": userMetadata.firstName,
                    "email": userMetadata.email,
                    "phone": data.phoneNumber,
                    "bankAccount": data.bankAccount,
                    "ifsc": data.ifscCode,
                    "address1": data.address,
                    "city": data.city,
                    "state": data.state,
                    "pincode": data.pincode
                }

                beneficiaryUpdateForm.append('beneficiary', JSON.stringify(beneficiary));
                beneficiaryCreationFetcher.submit(beneficiaryUpdateForm, { method: 'post', action: `/${userMetadata.displayName}/profile/beneficiary` });


            }} heading={<h1> You are about to submit your account details for KYC verification </h1>} body={<p> Are you sure you want to proceed?</p>} toggleModalFunction={setKYCSubmissionModal}></NeutronModal>}
            {otpSubmissionModal && <NeutronModal heading={<h1> Please submit the Aadhaar OTP received on your registered mobile number </h1>} body={<AadhaarOTPForm verificationRef={verificationRef} toggleModalFunction={setOTPSubmissionModal}></AadhaarOTPForm>} toggleModalFunction={setOTPSubmissionModal} ></NeutronModal>}
        </>
    );
}


