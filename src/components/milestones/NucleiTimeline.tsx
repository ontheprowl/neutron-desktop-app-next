import { AnimatePresence, motion } from 'framer-motion';
import DefaultSpinner from '../layout/DefaultSpinner';
import { useState, useEffect } from 'react';
import { client_onValue } from '~/firebase/neutron-config.client';
import { generateEventsQuery } from '~/firebase/queries.client';
import { MessageStatus, MilestoneStatus } from '~/models/contracts';
import { NeutronEvent, EventType, DunningEvent } from '~/models/events';
import { useParams } from '@remix-run/react';
import TimelineStep from './NucleiTimelineStep';





export default function NucleiTimeline({ id, index }: { id: string, index?: string }) {


    console.log(id)
    //* Events are being loaded using this ad-hoc strategy to support real-time transformations

    const [dunningEvents, setDunningEvents] = useState<NeutronEvent[]>();

    const sortedEvents = dunningEvents?.sort((a, b) => (a?.timestamp - b?.timestamp))

    // const eventsGet = clientGet(query)

    useEffect(() => {
        const messageQuery = generateEventsQuery(EventType.DunningEvent, id, index ? index : "customer_id");
        return client_onValue(messageQuery, (snapshot) => {
            let result: NeutronEvent[] = []

            const data = snapshot.val();
            console.log(data)
            if (data) {
                for (const [key, value] of Object.entries(data)) {
                    result.push(value)
                }
            }
            setDunningEvents(result)
        })


    }, [id])

    function generateStepForEvent(event: NeutronEvent, variant = MilestoneStatus.Completed, lastEvent?: boolean): JSX.Element {

        return <TimelineStep
            key={event.id} event={event} variant={MessageStatus.Sent} lastStep={lastEvent} />

    }

    /** Algorithm:
        *  1)  Loop through events from first to second-last event, as they are all completed.
        *      a) For each event, generate Step
        *  2) Generate 'current' themed step for last event
        *  3) Return array of steps
        */
    function generateMilestonesFromEvents(events: NeutronEvent[]): JSX.Element[] | undefined {

        let milestoneArray: JSX.Element[] = [];
        for (let currentIndex = 0; currentIndex < events.length - 1; currentIndex++) {
            const currentEvent = events[currentIndex]

            milestoneArray.push(generateStepForEvent(currentEvent, MilestoneStatus.Completed))
        }

        milestoneArray.push(generateStepForEvent(events[events.length - 1], MilestoneStatus.Current, true))
        // milestoneArray.push(
        //     <div key={key}>
        //         <div className={`ml-5 w-0.5 h-20 border-solid ${milestone.status == MilestoneStatus.Current || milestone.status == MilestoneStatus.Completed ? primaryGradientDark : 'bg-gray-100'}`}></div>
        //         <MilestoneStep milestone={milestone}></MilestoneStep>
        //     </div>
        // )
        return milestoneArray

    }


    console.dir(dunningEvents)

    return (
        <div className="h-full w-full bg-white p-2 shadow-xl rounded-xl">
            <AnimatePresence exitBeforeEnter>
                <ul className={`p-2 flex flex-col space-y-1 ${sortedEvents && sortedEvents?.length > 0 ? 'justify-start' : 'justify-center'} w-full h-full overflow-y-scroll`}>
                    {sortedEvents && sortedEvents?.length > 0 ? generateMilestonesFromEvents(sortedEvents) : <DefaultSpinner size="large"></DefaultSpinner>}
                </ul>
            </AnimatePresence>
        </div>
    )
}