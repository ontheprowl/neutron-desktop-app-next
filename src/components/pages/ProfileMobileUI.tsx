import { useFetcher, useLoaderData } from "@remix-run/react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { injectStyle } from "react-toastify/dist/inject-style";
import MobileNavbarPadding from "../layout/MobileNavbarPadding";
import PlaceholderDP from '~/assets/images/kartik.png'
import ProfileBasicDetailsForm from "../profile/ProfileBasicDetailsForm";
import ProfileProfInformationForm from "../profile/ProfileProfInformationForm";
import ProfileAccountInformationForm from "../profile/ProfileAccountInformationForm";
import LogoutButton from "../LogoutButton";
import { AppStore } from "~/stores/UIStore";
import NeutronModal from "../layout/NeutronModal";


const profileForms: JSX.Element[] = [<ProfileBasicDetailsForm key={0}></ProfileBasicDetailsForm>, <ProfileProfInformationForm key={1}></ProfileProfInformationForm>, <ProfileAccountInformationForm key={3}></ProfileAccountInformationForm>]


export default function ProfileMobileUI() {


    const data = useLoaderData();
    const fetcher = useFetcher();


    const userMetadata = data.metadata;
    const profilePicture = userMetadata.photoURL;

    useEffect(() => {
        injectStyle();

    })



    const tab = AppStore.useState(s => s.profileTab);
    const [logoutConfirmationModal, setLogoutConfirmationModal] = useState(false);

    return (
        <div className="flex flex-col sm:hidden h-full bg-bg-primary-dark pr-3 pl-3 pt-2">
            <div id="user-profile-panel" className="w-full flex flex-col p-2 bg-bg-primary-dark h-auto sm:bg-bg-secondary-dark justify-start rounded-3xl ">
                <div className="w-full justify-between ">
                    <div className='flex flex-row justify-end h-auto'>
                        <div onClick={() => {
                            setLogoutConfirmationModal(!logoutConfirmationModal);
                        }} className="self-center  rounded-full p-3 cursor-pointer transition-all border-2 border-transparent hover:opacity-50 active:ring-1 active:ring-accent-dark hover:bg-bg-secondary-dark hover:border-accent-dark">
                            <LogoutButton></LogoutButton>
                        </div>
                    </div>
                    {/* <img alt="cover" className="w-auto h-auto min-h-48 object-cover rounded-bl-[50px] rounded-br-[50px] rounded-tl-[50px] " src={PlaceholderCover}></img> */}
                    <div className="flex flex-row justify-center">
                        <button onClick={() => {
                            const dpInput = document.getElementById("dp-input");

                            dpInput?.click()
                        }}>
                            <img alt="profile" src={profilePicture ? profilePicture : PlaceholderDP} className="h-20 w-20 mt-8 translate-y-[-30px] bg-[#e5e5e5] border-8 cursor-pointer hover:opacity-50 hover:ring-1 outline-none transition-all hover:ring-[#8364E8] border-solid border-black rounded-full self-center  object-contain"></img>
                            <input type="file" name="dp-input" id="dp-input" onChange={(e) => {
                                if (e?.currentTarget?.files) {
                                    const file = e.currentTarget.files[0];

                                    const form = new FormData();
                                    form.append('dpFile', file)
                                    fetcher.submit(form, { method: "post", action: `/${userMetadata.displayName}/profile/uploadDP`, encType: 'multipart/form-data' })
                                }


                            }} className="hidden"></input>
                        </button>

                    </div>
                    <div className='flex flex-col space-y-3 translate-y-[-35px]'>
                        <h1 className="prose prose-lg text-white self-center font-gilroy-black text-[25px]">{userMetadata?.firstName && userMetadata?.lastName ? userMetadata?.firstName + " " + userMetadata?.lastName : 'Your name'}</h1>
                        <h1 className="prose prose-lg text-[#CDC1F6] self-center font-gilroy-black text-[16px] translate-y-[-20px]">@{userMetadata.displayName}</h1>
                        <p className="prose prose-lg text-black text-center w-auto min-w-[101px] font-gilroy-bold self-center bg-white p-2 rounded-full text-[16px] translate-y-[-25px]"> {userMetadata.designation ? userMetadata.designation : 'What you do'}</p>
                        <p className="prose prose-lg text-white self-center text-center font-gilroy-medium text-[16px]"> <u className='text-center'>Registered Email</u> <br></br> {userMetadata?.email} </p>
                    </div>
                    <div className="flex flex-col w-auto sm:flex-col m-3 justify-evenly space-y-3 sm:space-x-0">
                        <button onClick={() => {
                             AppStore.update(s => {
                                s.profileTab = 0
                            })
                        }} className={`transition-all p-3 text-left text-white prose prose-md border-2  rounded-lg ${tab == 0 ? ' focus:border-purple-400 active:border-purple-400 border-purple-400 bg-bg-primary-dark' : "active:bg-bg-secondary-dark active:border-accent-dark border-transparent hover:border-2 bg-bg-secondary-dark hover:bg-bg-primary-dark"}`}>Basic Details</button>
                        <button onClick={() => {
                            AppStore.update(s => {
                                s.profileTab = 1
                            })
                        }} className={`transition-all p-3 border-2  whitespace-nowrap text-left text-white prose prose-md rounded-lg ${tab == 1 ? ' focus:border-purple-400 active:border-purple-400 border-purple-400 bg-bg-primary-dark' : "active:bg-bg-secondary-dark active:border-accent-dark border-transparent hover:border-2 bg-bg-secondary-dark hover:bg-bg-primary-dark"}`}>Professional Information</button>
                        <button onClick={() => {
                             AppStore.update(s => {
                                s.profileTab = 2
                            })
                        }} className={`transition-all p-3 border-2 text-left text-white prose  prose-md rounded-lg ${tab == 2 ? ' focus:border-purple-400 active:border-purple-400 border-purple-400 bg-bg-primary-dark' : "active:bg-bg-secondary-dark active:border-accent-dark border-transparent hover:border-2 bg-bg-secondary-dark hover:bg-bg-primary-dark"}`}>Account Information </button>
                    </div>

                </div>

            </div>
            <div id="profile-forms-container" className="flex flex-col w-auto sm:w-full ring-1 ring-purple-400 rounded-xl mt-2 pt-2 ">
                {/* <AnimatePresence exitBeforeEnter> */}
                <motion.div
                    layout
                    key={tab}
                    animate={{ opacity: 1, x: 0 }}
                    initial={{ opacity: 0, x: 500 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.3 }}
                    className=" m-2"
                >
                    {profileForms[tab]}
                </motion.div>
                {/* </AnimatePresence> */}

            </div>
            {logoutConfirmationModal && <NeutronModal onConfirm={() => {
                AppStore.update((s) => {
                    s.selectedTab = "Logout";
                });
                fetcher.submit(null, { method: 'post', action: "/logout" })
                AppStore.update((s) => {
                    s.selectedTab = "Home";
                });
            }} heading={<h1> You are about to log out of the Neutron app </h1>} body={<p> Are you sure you want to proceed?</p>} toggleModalFunction={setLogoutConfirmationModal}></NeutronModal>}
            <ToastContainer position="bottom-center"
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                theme="dark"
                limit={1}

                pauseOnFocusLoss
                draggable
                pauseOnHover></ToastContainer>
            <MobileNavbarPadding size="large"></MobileNavbarPadding>
        </div>
    );
}