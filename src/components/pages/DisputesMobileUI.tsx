import { Outlet, useLoaderData, useNavigate, useParams } from "@remix-run/react";
import type { Dispute } from "~/models/disputes";
import { formatDateToReadableString } from "~/utils/utils";
import DisputesZeroState from "../disputes/DisputesZeroState";
import MobileNavbarPadding from "../layout/MobileNavbarPadding";
import { DisputeSeverityGenerator } from "../layout/Statuses";
import PlaceholderDP from '~/assets/images/kartik.png'



export default function DisputesMobileUI() {

    const data = useLoaderData();

    const params = useParams();

    const disputeID = params.disputeID;
    let navigate = useNavigate();


    const metadata = data.metadata;
    const disputes: Dispute[] = data.disputes;

    return (
        <div className='flex flex-col sm:hidden sm:h-0  h-[95vh] mt-12'>
            <div className={`flex flex-row justify-between transition-all z-30 mb-10 `}>
                <div className="flex flex-col">
                    <h1 className={`text-white text-[25px] text-left font-gilroy-black ml-6`}> Disputes</h1>
                    <h2 className="text-white text-[16px] text-left font-gilroy-medium ml-6"> Manage disputes across your contracts</h2>
                </div>
                <div className="flex flex-col justify-center mr-6">
                    <img onClick={() => {
                        navigate(`/${metadata.displayName}/profile`)
                    }} alt="profile" src={metadata.photoURL ? metadata.photoURL : PlaceholderDP} className="h-10 w-10 bg-[#e5e5e5] object-fill cursor-pointer hover:opacity-50 hover:ring-1 outline-none transition-all hover:ring-[#8364E8] border-solid border-black rounded-full self-center"></img>
                </div>


            </div>

            <div className="p-2 rounded-t-xl bg-bg-primary-dark h-[90vh]">
                {disputeID ?
                    <div className="flex flex-col h-auto m-2 p-1">
                        <Outlet></Outlet>
                    </div> : <ul className="space-y-6 transition-all max-h-screen mt-12 overflow-y-scroll w-full  p-3 h-full snap-mandatory snap-y">
                        {disputes.length != 0 ? disputes.map((dispute: Dispute, index) => {
                            return <li onClick={() => {
                                navigate(`${dispute.id}`);
                            }} key={dispute.id} className={`bg-bg-secondary-dark w-full transition-all p-3 cursor-pointer snap-center border-2 border-l-transparent border-r-transparent border-t-transparent h-auto rounded-xl  dark:bg-gray-800 dark:border-gray-700 hover:border-purple-400 active:border-purple-400  hover:bg-bg-secondary-dark hover:bg-opacity-50 dark:hover:bg-gray-600 flex flex-col justify-between`}>
                                <div className="flex flex-row justify-between items-center ">
                                    <div className="flex flex-col w-full p-2 font-gilroy-regular basis-2/3">
                                        <h2 className="prose prose-md text-white font-gilroy-medium ">
                                            {dispute.name}
                                        </h2>
                                        <h3 className="prose prose-sm text-white text-[12px] ">{dispute.raisedBy}</h3>
                                        <h4 className="prose prose-sm text-gray-300 font-gilroy-black text-[18px]">{dispute.contractName}</h4>
                                    </div>
                                    <div className="m-2 p-3 w-full basis-1/3">
                                        <DisputeSeverityGenerator severity={dispute.severity}></DisputeSeverityGenerator>
                                    </div>
                                </div>

                                <div className="flex flex-col space-y-4 h-auto max-h-[40vh] p-2 justify-between">
                                    <p className="prose prose-md text-left break-normal align-text-top truncate font-gilroy-regular text-white text-[16px]">
                                        {dispute.description}
                                    </p>
                                    <p className="text-white font-gilroy-regular text-[14px]">{dispute.createdOn ? formatDateToReadableString(dispute.createdOn, false, true) : formatDateToReadableString(new Date().getTime(), false, true)}</p>
                                </div>


                                {/* <td><ViewIcon onClick={() => {
                            navigate(`${contract.id}`)
                        }} className={''}></ViewIcon></td>
                        <td><EditIcon onClick={function (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
                            throw new Error('Function not implemented.');
                        }} className={''}></EditIcon></td>
                        <td><DeleteIcon onClick={(e) => {
                            let data = new FormData();
                            data.append('id', contract.id);
                            submit(data,
                                { method: 'post' });
                        }} className={''}></DeleteIcon></td>
                        <td><ChatIcon onClick={function (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
                            throw new Error('Function not implemented.');
                        }} className={''}></ChatIcon></td> */}
                            </li>
                        }) : <DisputesZeroState></DisputesZeroState>}
                    </ul>}

            </div>

            {/* <div className=" flex flex-row justify-between w-auto mb-0 border-2">
        <div className='flex flex-row m-6 mb-2 justify-between'>
            <div className="flex flex-col">
                <article className="prose">
                    <h2 className="text-white prose prose-lg font-gilroy-bold text-[24px]">Welcome {metadata?.displayName}</h2>
                </article>
            </div> }
            <div id="user-action-buttons">
                <div>
                    {/**Add profile buttons here }
                </div>
            </div>
        </div>
        {/* <div className="flex items-center w-auto mt-10">
                <label htmlFor="simple-search" className="sr-only">Search</label>
                <div className="relative w-full ">
                    <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                        <svg className="w-5 h-5 text-white dark:text-black" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
                    </div>
                    <input type="text" id="simple-search" className="p-5 bg-bg-primary-dark border border-gray-300 text-gray-900 text-sm rounded-lg placeholder-white block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white " placeholder="Search through contracts" required />

                </div>
            </div> }

        <div id="user-action-buttons">

        </div>
    </div> */}

            <MobileNavbarPadding></MobileNavbarPadding>

        </div >)
}