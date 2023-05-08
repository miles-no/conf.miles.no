export enum Event {
	Sosial = 'Sosial',
	Faglig = 'Faglig',
	SMiles = 'SMiles'
}

export type EventType = keyof typeof Event;
