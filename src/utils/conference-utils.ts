import type { StatusKeyType } from '../enums/status';
import type { IEmployee } from '../model/event';
import { v4 as uuidv4 } from 'uuid';

export const updateEmployeesStatus = (
	employees: IEmployee[],
	newStatus: StatusKeyType,
	email: string
): IEmployee[] => {
	const existingAttendee = employees.find((attendee) => attendee.email === email);
	if (existingAttendee) {
		return employees.map((attendee) => {
			if (attendee.email === email) {
				return {
					...attendee,
					status: newStatus
				};
			}
			return attendee;
		});
	} else {
		return [...employees, { email: email, _key: uuidv4(), status: newStatus }];
	}
};


export function makeid(length: number): string {
    let result = '';
    const characters: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength: number = characters.length;
    let counter: number = 0;
    while (counter < length) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
    }
    return result;
}
