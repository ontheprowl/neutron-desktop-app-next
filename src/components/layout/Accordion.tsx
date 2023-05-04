import * as React from "react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { primaryGradientDark } from "~/utils/neutron-theme-extensions";

export default function Accordion({ expanded, setExpanded, content, label, className }: { expanded: boolean, setExpanded: React.Dispatch<React.SetStateAction<boolean>>, content?: JSX.Element, label?: JSX.Element, className?: string }) {
    const isOpen = expanded;
    // By using `AnimatePresence` to mount and unmount the contents, we can animate
    // them in and out while also only rendering the contents of open accordions
    return (
        <motion.div
            className={className} initial={false}
        >
            {label}
            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        key="content"
                        initial="collapsed"
                        animate="open"
                        exit="collapsed"
                        variants={{
                            open: { opacity: 1, height: "auto" },
                            collapsed: {
                                opacity: 0, height: 0, transition: {
                                    when: "afterChildren",
                                },
                            }
                        }}
                        transition={{ duration: 0.3 }}
                    >
                        {content}
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div >

    );
};
