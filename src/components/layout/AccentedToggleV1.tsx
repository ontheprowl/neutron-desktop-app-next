
import { useLocation, useNavigate } from '@remix-run/react';
import { motion, useAnimation } from 'framer-motion';
import React, { useEffect, useState } from 'react';
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



export default function AccentedToggle({ name, states, onToggle, variant, control }: { name: string, variant?: 'neutron-purple' | 'neutron-yellow', states?: { default: string, toggled: string }, control?: boolean, onToggle?: React.MouseEventHandler }) {

    const [isOn, setIsOn] = useState(control ? control : false)


    const toggleSwitch = () => setIsOn(!isOn)

    let location = useLocation();

    useEffect(() => {
        setIsOn(false);
    }, [location])

    const spring = {
        type: 'spring',
        stiffness: 700,
        damping: 30,
        duration: 0.2
    }


    const purpleSpring = {
        type: 'spring',
        ease: 'linear',
        duration: '0.2'
    }

    return (
        <div onClick={onToggle ? (e) => {
            onToggle(e)
            toggleSwitch()
        } : toggleSwitch} className={variant && variant == "neutron-purple" ? `flex flex-start p-1 w-14 h-8 bg-bg-primary-dark cursor-pointer rounded-full   whitespace-nowrap ${isOn && 'place-content-end'} ${isOn ? primaryGradientDark : 'bg-gray-400'} ` : `flex flex-start w-48 bg-bg-primary-dark border-2 cursor-pointer border-accent-dark rounded-full whitespace-nowrap ${isOn && 'place-content-end'}`}>

            <motion.div
                className={variant && variant == "neutron-purple" ? " flex items-center justify-center p-3 w-5 h-5 rounded-full bg-white" : "flex items-center justify-center p-3 rounded-full bg-accent-dark"}
                layout
                transition={variant && variant == "neutron-purple" ? purpleSpring : spring}
            >
                {states ? isOn ? `${states.default}` : `${states.toggled}` : ''}
                <input type="checkbox" className='hidden' value={isOn ? 'true' : 'false'}  ></input>
            </motion.div>


        </div>
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