
import { motion, useAnimation } from 'framer-motion';
import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { ContractDataStore } from '~/stores/ContractStores';
import { primaryGradientDark } from '~/utils/neutron-theme-extensions';

const spring = {
    type: "spring",
    stiffness: 700,
    damping: 30
};

const variants = {
    delivery: {
        justifyContent: 'flex-start'
    },
    milestone: {
        justifyContent: 'flex-end'
    }
}



export default function AccentedToggle({ name, states, onToggle }: { name?: string, states: { default: JSX.Element, toggled: JSX.Element }, onToggle?: React.MouseEventHandler }) {

    if (!name) {
        name = "dummy"
    }
    const formMethods = useFormContext();
    const [isOn, setIsOn] = useState(false)

    const toggleSwitch = () => setIsOn(!isOn)


    return (
        <div onClick={onToggle ? (e) => {
            onToggle(e)
            toggleSwitch()
        } : toggleSwitch} className={`flex flex-start w-[609px] bg-bg-secondary-dark border-2 transition-all border-gray-400 outline-none cursor-pointer ring-gray-400 rounded-lg whitespace-nowrap `}>

            <div
                className={`flex w-6/12 sm:w-[304px] items-start p-3 transition-all rounded-md ${isOn ? 'bg-bg-secondary-dark' : 'bg-purple-400'}`}
            >
                {states.default}
                <input type="checkbox" className='hidden' value={isOn ? 'true' : 'false'} {...formMethods.register(name)} ></input>
            </div>
            <div
                className={`flex w-6/12 sm:w-[304px] items-start transition-all p-3 rounded-md   ${isOn ? 'bg-purple-400' : 'bg-bg-secondary-dark'}`}
            >
                {states.toggled}
                <input type="checkbox" className='hidden' value={isOn ? 'true' : 'false'} {...formMethods.register(name)} ></input>
            </div>


        </div >
    )

    // <div onClick={() => {
    //     setToggle(!toggle);
    //     controls.start("milestone");
    // }}
    //     className='flex flex-row border-2 w-full bg-bg-primary-dark border-accent-dark rounded-full'>

    //     <motion.div layout variants={variants} initial="delivery" animate={controls} transition={spring} className="bg-accent-dark rounded-full p-5 whitespace-nowrap">
    //         Delivery based
    //     </motion.div>
    //     {/* <motion.div layout transition={spring} className='bg-transparent rounded-full p-5 whitespace-nowrap'>
    //         Advance based
    //     </motion.div> */}
    // </div>

}