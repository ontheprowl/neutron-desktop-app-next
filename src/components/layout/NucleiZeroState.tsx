import { useNavigate } from "@remix-run/react";
import type { MouseEventHandler } from "react";
import TallyLogo from "~/assets/images/folder.png";


export default function NucleiZeroState({ entity, onClick, cta }: { entity: string, onClick?: MouseEventHandler<HTMLButtonElement>, cta?: string }) {


    let navigate = useNavigate();

    return <div className=" p-4 m-1 w-auto h-full flex flex-col justify-center text-black align-bottom">
        <div className="flex flex-row justify-center">
            <div className="flex flex-row justify-center w-full items-center mt-2">
                <div className="flex flex-col justify-start space-y-2  p-6 w-full items-center text-center ">
                    <img src={TallyLogo} className="h-16" alt="zero_state_graphic" />
                    <h1 className="prose prose-lg font-gilroy-bold text-black text-lg mt-5">Uh-oh! This field is looking empty!</h1>
                    <p className="prose prose-sm font-gilroy-regular text-black text-base mb-5">You do not have any {entity} right now</p>
                    <button className="text-white transition-all bg-primary-base p-3 w-3/5 max-w-xs hover:bg-primary-dark rounded-lg"
                        onClick={onClick? onClick : ()=>{
                            navigate('/settings/integrations');
                        }}
                    >
                        {cta? cta : 'Sync Data'}
                    </button>

                </div>
            </div>
        </div>

    </div>
}