import { useContext } from 'react';
import { useFormContext } from 'react-hook-form';
import GenericIcon from '~/assets/images/institution_icon.svg'
import { StateContext } from '~/utils/contexts/StateContext';


export default function NeutronRadioButton({ name, value, heading, description, icon, noIcon, no }: { name: string, value: string, heading: string, description?: string, icon?: string, no: number, noIcon?: boolean }) {

    const { getter, setter } = useContext(StateContext);


    const { register } = useFormContext();
    return (
        <div className={`border-2  border-dashed rounded-xl items-center transition-all justify-evenly max-w-[332px] max-h-[120px] flex flex-row p-6 ${getter && getter == no ? 'bg-primary-light border-primary-dark' : 'bg-white border-neutral-base'} `}>
            <div className="flex flex-row justify-between h-full w-full items-center">
                <div className="flex flex-row space-x-6 items-center">
                    <input {...register(name)} type="radio" onClick={(e) => {
                        console.log(e.currentTarget.checked)
                        if (setter) setter(no)
                    }} value={value} className="bg-primary-dark w-6 h-6 accent-primary-dark outline-primary-light" />
                    <div className="flex flex-col space-y-1">
                        <h1 className="font-gilroy-bold">{heading}</h1>
                        <span className="text-secondary-text">{description}</span>
                    </div>
                </div>

                {!noIcon && <img src={icon ? icon : GenericIcon} className='w-8 h-8' alt="radio_icon"></img>}
            </div>
        </div>)

}