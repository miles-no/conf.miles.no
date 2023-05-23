import type { StatusKeyType } from '../enums/status';
import type { IEmployee } from '../model/external-conference';
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
