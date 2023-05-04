
import { useNavigation } from '@remix-run/react';
import { motion } from 'framer-motion';
import { useState } from 'react'
import SaveIcon from '~/assets/images/saveIcon.svg'
import DefaultSpinner from '~/components/layout/DefaultSpinner';




export default function SaveButtonMotion({ onClick, submit, loading }: { onClick?: React.MouseEventHandler<HTMLButtonElement>, submit?: boolean, loading?: boolean }) {


    const [clicked, setClicked] = useState(false);

    let navigation = useNavigation();


    return (
        <motion.button initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            type={submit ? 'submit' : 'button'} onClick={onClick ? (e) => { setClicked(true); onClick(e); setClicked(false); } : submit ? () => { setClicked(true); } : () => {
                alert("No click handler implemented")
            }} className="bg-success-light font-gilroy-medium hover:opacity-60 justify-center max-w-fit rounded-lg p-3 text-success-dark space-x-2 flex flex-row items-center">

            <img src={SaveIcon} alt="save_icon" className='h-6'></img>
            <span>{navigation.state == "submitting" && loading ? 'Saving..' : 'Save'}</span>

        </motion.button>
    )

}