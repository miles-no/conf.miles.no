export enum Status {
	attending = 'Påmeldt',
	interested = 'Interessert',
	notGoing = 'Ikke interessert'
}

export type StatusType = 'Jeg er interessert' | 'Påmeldt' | 'Ikke interessert';

export type StatusKeyType = keyof typeof Status;
