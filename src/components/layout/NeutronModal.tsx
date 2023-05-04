import type { Dispatch, MouseEventHandler, SetStateAction } from "react";
import DefaultSpinner from "./DefaultSpinner";




export default function NeutronModal({ toggleModalFunction, type, heading, body, onConfirm, onConfirmText, onRejectText, onReject }: { toggleModalFunction: Dispatch<SetStateAction<boolean>>, heading?: JSX.Element, body?: JSX.Element, onConfirm?: MouseEventHandler<HTMLButtonElement>, onConfirmText?: string, onRejectText?: string, onReject?: MouseEventHandler<HTMLButtonElement>, type?: "email" | "whatsapp" }) {


    const neutronModalConfirmationStates = (state: string) => {

        switch (state) {
            case "idle":
                return (<span>{onConfirmText ? onConfirmText : 'Confirm'}</span>);
            case "submitting":
                return (<span>Confirming</span>);
            case "loading":
                return (<DefaultSpinner></DefaultSpinner>);
        }
    }

    const neutronModalRejectionStates = (state: string) => {

        switch (state) {
            case "idle":
                return (<span className="text-black">{onRejectText ? onRejectText : 'Cancel'}</span>);
            case "submitting":
                return (<span>Rejecting...</span>);
            case "loading":
                return (<DefaultSpinner></DefaultSpinner>);
        }
    }

    return (<>

        <div id="defaultModal" className="backdrop-blur-lg overflow-y-auto overflow-x-hidden fixed top-0 right-0 h-screen sm:h-full left-0 z-50 w-auto sm:w-full md:inset-0 h-modal md:h-full justify-center items-center flex" aria-modal="true" role="dialog">
            <div className="relative p-4 flex justify-center flex-col w-full max-w-3xl  h-full md:h-auto">
                <div className="relative shadow-lg  bg-white rounded-xl">
                    <div className="flex  justify-start items-start m-5  rounded-t">
                        {heading && <>
                            <h3 className="text-[20px] font-gilroy-bold text-gray-900 dark:text-white">
                                {heading}
                            </h3>
                            <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" onClick={() => {
                                toggleModalFunction(false);
                            }
                            }>
                                <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </>}

                    </div>
                    <hr></hr>
                    {body && <div className={`font-gilroy-medium p-10 mx-5 rounded-lg space-y-6 self-center text-center ${type=="email"?  'text-black': 'bg-primary-light text-primary-dark'}  justify-center mt-3 break-normal`}>
                        {body}
                    </div>}
                    <div className="flex items-center  justify-between p-5 font-gilroy-medium text-[18px] leading-relaxed space-x-6 rounded-b mt-8 dark:border-gray-600">
                        <div className="flex flex-row">
                            <button type="button" onClick={() => {
                                toggleModalFunction(false);
                            }
                            } className="border-2 border-neutral-light text-primary-base font-gilroy-medium p-3 rounded-lg hover:border-primary-dark hover:text-primary-dark px-10 transition-all">Close</button>
                        </div>
                        <div className="flex flex-row space-x-4">
                            {onReject && <button onClick={(e) => {
                                onReject && onReject(e);
                                toggleModalFunction(false);
                            }} type="button" className="transition-all text-black bg-primary-light  focus:ring-4 w-full focus:outline-none focus:ring-purple-300  rounded-lg ring-2 ring-purple-500 text-sm font-gilroy-black px-5 py-2.5  hover:ring-4 focus:z-10 ">Reject</button>}
                            {onConfirm && <button onClick={(e) => {
                                onConfirm && onConfirm(e);
                                toggleModalFunction(false);
                            }} type="button" className={`p-3 text-center rounded-lg bg-primary-base text-white font-gilroy-medium hover:bg-primary-dark transition-all`}>Confirm</button>}
                        </div>

                    </div>
                </div>
            </div>
        </div></>)

}