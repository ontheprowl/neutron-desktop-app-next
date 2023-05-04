import { scroller } from "react-scroll";
import { ContractDataStore } from "~/stores/ContractStores";






export default function ContractCustomizationComponent({ viewMode }: { viewMode?: boolean }) {


    return (
        <div className="flex flex-col m-5">
            {!viewMode && <><h1 className="prose prose-lg text-white mb-2"> Edit Contract</h1>
                <div className="flex flex-col mt-3 w-full space-y-4">
                    <button type="button" onClick={() => {
                        ContractDataStore.update(s => {
                            s.stage = 0;
                        })
                    }} className={`transition-all p-3 border-2 border-white text-left text-white prose prose-md rounded-lg active:bg-bg-secondary-dark active:border-accent-dark border-transparent hover:border-2 bg-bg-primary-dark hover:border-accent-dark`}>Client Information </button>
                    <button type="button" onClick={() => {
                        ContractDataStore.update(s => {
                            s.stage = 1;
                        })
                    }} className={`transition-all p-3 border-2 border-white text-left text-white prose prose-md rounded-lg active:bg-bg-secondary-dark active:border-accent-dark border-transparent hover:border-2 bg-bg-primary-dark hover:border-accent-dark`}>Scope of Work </button>
                    <button type="button" onClick={() => {
                        ContractDataStore.update(s => {
                            s.stage = 2;
                        })
                    }} className={`transition-all p-3 border-2 border-white text-left text-white prose prose-md rounded-lg active:bg-bg-secondary-dark active:border-accent-dark border-transparent hover:border-2 bg-bg-primary-dark hover:border-accent-dark`}>Payment and Milestones </button>
                </div></>}
            <div className="hidden sm:flex sm:flex-col">
                <h1 className="prose prose-lg text-white mt-3 mb-2"> Contract Shortcuts</h1>
                <div className="flex flex-col mt-3 w-full space-y-4">
                    <button type="button" onClick={() => {
                        scroller.scrollTo('scope-of-work', { containerId: 'contract-container' });

                    }} className={`transition-all p-3 border-2 border-white text-left text-white prose prose-md rounded-lg active:bg-bg-secondary-dark active:border-accent-dark border-transparent hover:border-2 bg-bg-primary-dark hover:border-accent-dark`}>Exhibit A - Scope of Work</button>
                    <button type="button" onClick={() => {
                        scroller.scrollTo('exhibit-b', { containerId: 'contract-container' });

                    }} className={`transition-all p-3 border-2 border-white text-left text-white prose prose-md rounded-lg active:bg-bg-secondary-dark active:border-accent-dark border-transparent hover:border-2 bg-bg-primary-dark hover:border-accent-dark`}>Exhibit B - Payment and Milestones</button>
                    <button type="button" onClick={() => {
                        scroller.scrollTo('dispute-resolution', { containerId: 'contract-container' });

                    }} className={`transition-all p-3 border-2 border-white text-left text-white prose prose-md rounded-lg active:bg-bg-secondary-dark active:border-accent-dark border-transparent hover:border-2 bg-bg-primary-dark hover:border-accent-dark`}>Clause 26 - Dispute Resolution</button>
                </div>
            </div>
        </div>);
}