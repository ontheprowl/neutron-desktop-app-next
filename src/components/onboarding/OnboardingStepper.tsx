import { motion } from "framer-motion";





export default function OnboardingStepper({ stage }: { stage: number }) {


    return (
        <motion.div id="contract-process-stepper" className="flex flex-col pl-10">
            <motion.div layout className=" flex flex-row w-full items-end  space-x-2">
                <motion.div className={`h-11 w-11 ${stage > 0 ? ' bg-success-light text-success-dark' : 'bg-primary-base text-white '}  p-2 text-center rounded-lg font-gilroy-bold text-white transition-all`}>{stage > 0 ? '✓' : '1'}</motion.div>
                <motion.div className="text-black whitespace-nowrap  font-gilroy-regular text-sm">
                    <h2 className={`${stage > 0 ? ' text-black' : 'text-primary-base'} text-lg font-gilroy-bold`}>Integrations</h2>
                    <span className="text-xs text-secondary-text font-gilroy-bold">Integrate software</span>
                </motion.div>
            </motion.div>
            <motion.div custom={[1, 'hr']} className={`w-[25px] h-10 ${stage > 0 ? 'border-neutral-dark' : 'border-neutral-light'} border-dashed border-r-2`}></motion.div>
            <motion.div layout className=" flex flex-row w-full items-end space-x-2">
                <motion.div className={`h-11 w-11 ${stage > 1 ? ' bg-success-light text-success-dark' : stage < 1 ? ' bg-neutral-light text-secondary-text' : 'bg-primary-base text-white'} p-2 text-center rounded-lg font-gilroy-bold text-white transition-all`}>{stage > 1 ? '✓' : '2'}</motion.div>
                <motion.div className="text-black whitespace-nowrap  font-gilroy-regular text-sm">
                    <h2 className={`${stage > 1 ? ' text-black' : stage < 1 ? 'text-secondary-text' : 'text-primary-base'} text-lg font-gilroy-bold`}>Industry</h2>
                    <span className="text-xs text-secondary-text font-gilroy-bold">What industry do you operate in?</span>
                </motion.div>
            </motion.div>
            <motion.div custom={[1, 'hr']} className={`w-[25px] h-10 ${stage > 1 ? 'border-neutral-dark' : 'border-neutral-light'} border-dashed border-r-2`}></motion.div>
            <motion.div layout className=" flex flex-row w-full items-end space-x-2">
                <motion.div className={`h-11 w-11 ${stage > 2 ? ' bg-success-light text-success-dark' : stage < 2 ? ' bg-neutral-light text-secondary-text' : 'bg-primary-base text-white'} p-2 text-center rounded-lg font-gilroy-bold text-white transition-all`}>{stage > 2 ? '✓' : '3'}</motion.div>
                <motion.div className="text-black whitespace-nowrap  font-gilroy-regular text-sm">
                    <h2 className={`${stage > 2 ? ' text-black' : stage < 2 ? 'text-secondary-text' : 'text-primary-base'} text-lg font-gilroy-bold`}>Business Details</h2>
                    <span className="text-xs text-secondary-text font-gilroy-bold">Tell us some basic details</span>
                </motion.div>
            </motion.div>
            <motion.div custom={[1, 'hr']} className={`w-[25px] h-10 ${stage > 2 ? 'border-neutral-dark' : 'border-neutral-light'} border-dashed border-r-2`}></motion.div>
            <motion.div layout className=" flex flex-row w-full items-end space-x-2">
                <motion.div className={`h-11 w-11 ${stage > 3 ? ' bg-success-light text-success-dark' : stage < 3 ? ' bg-neutral-light text-secondary-text' : 'bg-primary-base text-white'} p-2 text-center rounded-lg font-gilroy-bold text-white transition-all`}>{stage > 3 ? '✓' : '4'}</motion.div>
                <motion.div className="text-black whitespace-nowrap  font-gilroy-regular text-sm">
                    <h2 className={`${stage > 3 ? ' text-black' : stage < 3 ? 'text-secondary-text' : 'text-primary-base'} text-lg font-gilroy-bold`}>Team Setup</h2>
                    <span className="text-xs text-secondary-text font-gilroy-bold">Invite your team members</span>
                </motion.div>
            </motion.div>
            <motion.div custom={[1, 'hr']} className={`w-[25px] h-10 ${stage > 3 ? 'border-neutral-dark' : 'border-neutral-light'} border-dashed border-r-2`}></motion.div>
            <motion.div layout className=" flex flex-row w-full items-end space-x-2">
                <motion.div className={`h-11 w-11 ${stage > 4 ? ' bg-success-light text-success-dark' : stage < 4 ? ' bg-neutral-light text-secondary-text' : 'bg-primary-base text-white'} p-2 text-center rounded-lg font-gilroy-bold text-white transition-all`}>{stage > 4 ? '✓' : '5'}</motion.div>
                <motion.div className="text-black whitespace-nowrap  font-gilroy-regular text-sm">
                    <h2 className={`${stage > 4 ? ' text-black' : stage < 4 ? 'text-secondary-text' : 'text-primary-base'} text-lg font-gilroy-bold`}>Welcome</h2>
                    <span className="text-xs text-secondary-text font-gilroy-bold">Put your AR on auto-pilot</span>
                </motion.div>
            </motion.div>
        </motion.div>);
}