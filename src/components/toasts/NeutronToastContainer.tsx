import React from "react";
import type { TypeOptions } from "react-toastify";
import { ToastContainer, toast } from "react-toastify";




const contextClass = {
    success: "bg-white border-2 border-l-8 w-full max-h-[300px] text-black text-md font-gilroy-medium border-success-base rounded-xl",
    error: "bg-white border-2 border-l-8 w-full max-h-[300px] text-black text-md font-gilroy-medium border-error-base rounded-xl",
    warning: "bg-white border-2 border-l-8 w-full max-h-[300px] text-black text-md font-gilroy-medium border-warning-base rounded-xl",
    default: "bg-white border-2 border-l-8 w-full max-h-[300px] text-black text-md font-gilroy-medium border-accent-base rounded-xl",
};


export function emitToast(head: React.ReactNode, body: React.ReactNode, type: TypeOptions) {

    return toast(
        <div className="p-3 flex flex-col justify-center max-h-60 max-w-4xl mr-8 ">
            <div>
                <h2 className="prose prose-md w-full text-black font-gilroy-bold">
                    {head}
                </h2>
            </div>
            <div>
                {body}
            </div>
        </div>,
        { theme: "dark", type: type }
    );

}



export function NeutronToastContainer() {


    return (<ToastContainer position="bottom-center"
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        toastClassName={({ type }) => contextClass[type || "default"]}
        theme="dark"
        limit={1}

        pauseOnFocusLoss
        draggable
        pauseOnHover></ToastContainer>)
}