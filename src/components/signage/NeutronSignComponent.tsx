



/**
 * 
 * @param param0 
 * @returns 
 */
export default function NeutronSignComponent({ signerEmail, signerID, signDate, signerAadhaar }: { signerEmail: string, signerID: string, signDate: string, signerAadhaar: string }) {

    return <div className=" bg-center bg-no-repeat bg-contain bg-[url('/icons/android-chrome-512x512.png')] ">
        <div className="flex font-gilroy-bold flex-col backdrop-blur-sm text-center p-3 bg-gray-300 rounded-xl bg-opacity-20 space-y-2">
            <span className="font-gilroy-black">Signed by</span>
            {signerEmail}
            <span className="font-gilroy-black">Neutron ID: <br></br></span>
            #{signerID}<br></br>
            <span className="font-gilroy-black">Aadhaar No: <br></br></span>
            {signerAadhaar}<br></br>
            <span className="font-gilroy-black">Date of Signing: <br></br></span>
            {signDate}


        </div>
    </div>
}