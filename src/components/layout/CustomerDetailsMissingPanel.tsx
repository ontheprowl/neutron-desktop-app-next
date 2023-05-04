import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import ErrorIcon from '~/assets/images/errorIcon.svg';
import DropdownButton from '~/assets/images/dropdownIcon.svg';
import { useNavigate } from '@remix-run/react';





export default function CustomerDetailsMissingPanel({ email, phone, firstName, lastName }: { email: boolean, phone: boolean, firstName: boolean, lastName: boolean }) {


    const [panelOpen, setPanelOpen] = useState(false);

    let navigate = useNavigate();

    return (
        email || phone || (firstName || lastName) ? <div className="border-2 transition-all border-error-dark flex flex-col space-y-4 items-center justify-between p-4 text-xl bg-white text-error-dark rounded-xl w-full">
            <AnimatePresence exitBeforeEnter>
                <motion.div className="flex flex-row justify-between w-full space-x-4">
                    <motion.div className="flex flex-row space-x-4">
                        <motion.img className="h-8" src={ErrorIcon} alt="error_icon"></motion.img>
                        <motion.span>Missing Information</motion.span>
                    </motion.div>
                    <motion.button className='hover:opacity-80 ' onClick={() => {
                        setPanelOpen(!panelOpen)
                    }}><img className='' src={DropdownButton} alt="dropdown_icon"></img></motion.button>
                </motion.div>
                {panelOpen &&
                    <motion.div initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }} className="flex pt-4  lex-col space-y-4 w-full">
                        <div className="flex flex-row space-x-6 w-full items-center justify-between text-base">
                            <ul className='flex flex-col justify-start space-y-2  font-gilroy-medium divide-y divide divide-neutral-light divide-dashed text-black'>
                                {phone && <li>Mobile Number is missing</li>}
                                {email && <li className='pt-2'>Email is missing</li>}
                                {(firstName || lastName) && <li className='pt-2'>Customer's name is incomplete</li>}
                            </ul>
                            <button onClick={() => {
                                navigate("details")
                                setPanelOpen(!panelOpen)
                            }} className='font-gilroy-medium p-3 text-primary-base bg-primary-light rounded-xl hover:opacity-80'>Add Details</button>
                        </div>
                    </motion.div>}
            </AnimatePresence>
        </div> : <></>)

}