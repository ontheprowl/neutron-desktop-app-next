
export enum DunningEvent {
	MessageSent,
	MessageDelivered,
	EmailSent,
	EmailDelivered,
	WorkflowTriggered
}

export enum PaymentEvent {
	PayinRequested,
	PayinCompleted,
	PayoutRequested,
	PayoutCompleted
}

export enum ChatEvent {
	MessageReceived
}

export enum EventType {
	DunningEvent, KYCEvent
}

export type NeutronEvent = {
	id: string;
	uid: string;
	type: EventType;
	sandbox?: boolean;
	event: DunningEvent;
	payload?: EventPayload;
	timestamp: number;
}

export type EventPayload = {
	message: string;
	data?: any;
}

