import { MessageStatus, MilestoneStatus } from "~/models/contracts";
import { DunningEvent, NeutronEvent } from "~/models/events";
import { motion } from 'framer-motion';
import MessageSentIcon from '~/assets/images/timeline/messageSent.svg'
import MessageDeliveredIcon from '~/assets/images/timeline/messageDelivered.svg'
import EmailSentIcon from '~/assets/images/timeline/emailSent.svg'
import EmailDeliveredIcon from '~/assets/images/timeline/emailDelivered.svg'
import WorkflowTriggeredIcon from '~/assets/images/timeline/workflowTriggered.svg';
import GenericTimelineIcon from '~/assets/images/filterIcon.svg'



export default function TimelineStep({ event, variant = MessageStatus.Completed, lastStep }: { event: NeutronEvent, variant: MessageStatus, lastStep?: boolean }) {

    function generateIconForEventType(event: DunningEvent): string | undefined {
        switch (event) {
            case DunningEvent.EmailSent:
                return EmailSentIcon
            case DunningEvent.EmailDelivered:
                return EmailDeliveredIcon
            case DunningEvent.MessageSent:
                return MessageSentIcon
            case DunningEvent.WorkflowTriggered:
                return WorkflowTriggeredIcon
            case DunningEvent.MessageDelivered:
                return MessageDeliveredIcon
        }
        return GenericTimelineIcon;
    }

    return (
        <motion.div layout className="h-fit flex flex-col w-full items-start space-y-0">
            <motion.div className="flex flex-row space-x-3  items-center w-full justify-between">
                <div className="flex flex-row space-x-3 items-center w-4/6  justify-start">
                    <div className={`${lastStep ? 'bg-transparent border-accent-base' : 'bg-primary-base border-transparent ml-0.5'} border-4 p-4 rounded-full`}></div>
                    <div className="flex flex-col space-y-2">
                        <h1 className="font-gilroy-bold text-lg">{event.payload?.message}{event.payload?.data?.invoice_number ? <span> for <span className="text-primary-base">Invoice {event.payload?.data?.invoice_number}</span></span> : ''}</h1>
                        <span className="font-gilroy-medium text-md text-secondary-text">{formatDateForTimeline(new Date(event?.timestamp))}</span>
                    </div>
                </div>
                <div className="flex flex-row items-center w-1/6 h-full justify-center px-5">
                    <img src={generateIconForEventType(event?.event)} alt="timeline_event_icon" />
                </div>
            </motion.div>
            {!lastStep && <motion.div className="bg-transparent border-l-2 w-auto ml-5 border-l-primary-base h-10"></motion.div>}
        </motion.div>)

}

const formatDateForTimeline = (date: Date) => {
    return `${date.getHours()}:${date.getMinutes()}, ${date.toLocaleDateString('en-IN')}`
}