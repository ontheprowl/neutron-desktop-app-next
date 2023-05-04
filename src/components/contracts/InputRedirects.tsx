import { ContractCreationStages } from "~/models/contracts";
import { ContractDataStore } from "~/stores/ContractStores";



export const ClientInformationRedirect = (props: { children: boolean | JSX.Element| string | undefined, viewMode?:boolean }) => (props.viewMode?<span className="text-black">{props.children?props.children : 'Empty field'}</span>:<span className="text-purple-400 hover:decoration-purple-400 hover:underline cursor-pointer" onClick={() => { ContractDataStore.update(s => { s.stage = ContractCreationStages.ClientInformation }) }}>{props.children?props.children : '[TO BE FILLED]'}</span>);

export const ScopeOfWorkRedirect = (props: { children:  boolean | JSX.Element| string | undefined, viewMode?:boolean}) => (props.viewMode?<span className="text-black">{props.children?props.children : 'Empty field'}</span>:<span className="text-purple-400 hover:decoration-purple-400 hover:underline cursor-pointer" onClick={() => { ContractDataStore.update(s => { s.stage = ContractCreationStages.ScopeOfWork }) }}>{props.children?props.children : '[TO BE FILLED]'}</span>);

export const PaymentAndMilestonesRedirect = (props: { children:  boolean | JSX.Element| string | undefined, viewMode?:boolean }) => (props.viewMode?<span className="text-black">{props.children?props.children : 'Empty field'}</span>:<span className="text-purple-400 hover:decoration-purple-400 hover:underline cursor-pointer" onClick={() => { ContractDataStore.update(s => { s.stage = ContractCreationStages.PaymentAndMilestones }) }}>{props.children?props.children : '[TO BE FILLED]'}</span>);