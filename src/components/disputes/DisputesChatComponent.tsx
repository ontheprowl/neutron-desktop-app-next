import { useFetcher, useLoaderData } from "@remix-run/react"
import { AnimatePresence, motion } from "framer-motion"
import React, { useEffect } from "react"
import { formatDateToReadableString } from "~/utils/utils"
import SendIcon from '~/assets/images/SendIcon.svg'
import { primaryGradientDark } from "~/utils/neutron-theme-extensions"
import { useList } from "react-firebase-hooks/database"
import { clientGet, clientQuery, clientRef, db } from "~/firebase/neutron-config.client"




export default function DisputesChatComponent({ from, to, fullHeight, customKey, disabled, disableMessage, id }: { from: string, to: string, customKey?: string, fullHeight?: boolean, id?: string, disabled?: boolean, disableMessage?: string }) {


    const loaderData = useLoaderData();
    const metadata = loaderData.metadata;
    const fetcher = useFetcher();
    const [chatMessages, setMessages] = React.useState<Array<{ text: string, from: string, to: string, timestamp: string }>>([]);

    const [newMessage, setNewMessage] = React.useState('')



    useEffect(() => {
        if (from && to) {
            const messageQuery = clientQuery(clientRef(db, 'messages/' + btoa((from + to + customKey).split('').sort().join(''))));
            let result: { text: string, to: string, from: string, timestamp: string }[] = []
            clientGet(messageQuery).then((snapshot) => {
                const data = snapshot.val();
                console.log(data)
                if (data) {
                    for (const [key, value] of Object.entries(data)) {
                        result.push(value)
                    }
                }
                setMessages(result)
            });
        }
    }, [customKey, from, to])

    return (
        <div className={` flex flex-col h-[70vh] pb-4 sm:pb-0 sm:h-full ${fullHeight ? '' : 'max-h-[550px]'} border-2 sm:border-0 border-purple-400 bg-bg-secondary-dark sm:bg-inherit overflow-y-scroll w-full  rounded-lg items-stretch`}>

            <h2 className={`${disabled ? 'text-center relative text-white z-40 self-center top-[200px] text-[18px] sm:text-[26px] font-gilroy-black' : 'hidden'}`}>{disableMessage}</h2>
            <ul className={`h-[900px] overflow-y-scroll m-3 ${disabled ? 'opacity-40' : ''} text-white flex flex-col grid-cols-1`}>
                <AnimatePresence initial={false}>

                    {chatMessages?.map((message, i) => {
                        return (
                            <motion.li initial={{ opacity: 0, y: 50, scale: 0.3 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{
                                    opacity: 0, scale: 0.5, transition: {
                                        type: "spring",
                                        stiffness: 700,
                                        damping: 30
                                    }
                                }} layout key={message.timestamp} className={`${message.from == from ? 'place-self-end text-right' : 'place-self-start text-left'} w-auto`}>
                                <motion.div className="mb-2 ">
                                    <motion.h2 className={`prose prose-lg text-black block  p-3 break-all ${message.from == from ? `rounded-l-xl rounded-tr-xl ${primaryGradientDark}` : 'rounded-r-xl rounded-tl-xl bg-gray-400'} `}>{message.text}</motion.h2>
                                    <motion.p className=" text-white text-xs mt-2">{formatDateToReadableString(message.timestamp, false, true)}</motion.p>
                                </motion.div>
                            </motion.li>)
                    })}
                </AnimatePresence>
            </ul>
            <motion.div className={`ml-4 mr-4 ${disabled ? 'opacity-40' : ''} rounded-full flex-row flex justify-between space-x-3 p-1 bg-[#5C5C5C] text-white placeholder:text-white`}>
                <motion.input type="text" id="new-message" className="bg-[#5C5C5C] rounded-full p-3 w-full ring-transparent transition-all  active:decoration-transparent caret-white outline-none inset-0" value={newMessage} onChange={(e) => {
                    setNewMessage(e.target.value)
                }} placeholder="Enter a new message..." />
                <motion.button onClick={disabled ? () => { } : () => {
                    if (newMessage.trim().length == 0) {
                        return
                    }
                    const data = new FormData();
                    data.append('message', newMessage);
                    data.append('from', from);
                    data.append('to', to);
                    if (customKey) {
                        data.append('key', customKey);
                    }
                    fetcher.submit(data, { method: 'post', action: `/${metadata.displayName}/disputes/sendMessage` });
                    setNewMessage('');
                }} className=" hover:ring-purple-500 hover:drop-shadow-2xl active:opacity-50 caret-white outline-none rounded-full p-1  transition-all"><img src={SendIcon} alt="sendicon"></img></motion.button>
            </motion.div>

        </div >)
}