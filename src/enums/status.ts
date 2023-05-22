export enum Status {
	attending = 'Påmeldt',
	interested = 'Interresert',
	notGoing = 'Ikke interresert'
}

export type StatusType = 'Jeg er interessert' | 'Påmeldt' | 'Ikke interresert';

export type StatusKeyType = keyof typeof Status;
