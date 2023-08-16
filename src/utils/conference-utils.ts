import type { StatusKeyType } from '../enums/status';
import type { IEmployee } from '../model/event';
import { v4 as uuidv4 } from 'uuid';
import {Conference} from "$lib/types/conference";
import type {ConferenceType} from "$lib/types/conference";

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




/*
Consider moving to frontend?

// https://dmitripavlutin.com/timeout-fetch-request/
 */
const fetchWithTimeout = async (url: string, options = {}) => {
    const timeout = 10000;
    const controller = new AbortController();
    const id = setTimeout(() => {
        console.warn('Conference-URL-checking request timed out: ' + url);
        controller.abort();
    }, timeout);

    const response = await fetch(url, {
        ...options,
        signal: controller.signal
    });
    clearTimeout(id);

    return response;
};

export const verifyConferenceUrl = async (url: string) => {
    let checkResult;
    try {
        checkResult = await fetchWithTimeout(url, { method: 'HEAD' });

        if (checkResult.ok) {
            return undefined;
        }
        console.warn(`Conference url (${url}) failed check: not .ok`);
        console.warn('    status:    ', await checkResult.status);
        console.warn('    statusText:', await checkResult.statusText);
        console.warn('    headers:   ', await checkResult.headers, '\n');
        return `Couldn't reach the conference URL: ${url}`;
    } catch (e) {
        console.log(e);
        return `Couldn't reach the conference URL: ${url}`;
    }
};

const urlStartPattern = /^https?:\/\//;

export const verifyAndNormalizeConferenceData = (confData: ConferenceType) => {
    if (!urlStartPattern.test(confData.url)) {
        confData.url = 'https://' + confData.url;
    }

    Conference.safeParse(confData);

    if (confData.endDate < confData.startDate) {
        throw Error("Start date can't be after End date");
    }
    if (!!confData.callForPapersDate && confData.endDate < confData.callForPapersDate) {
        throw Error("Call-for-papers date can't be after End date");
    }
};
