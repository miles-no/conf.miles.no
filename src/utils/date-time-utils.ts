import { intlFormat, parse } from 'date-fns';

export interface IFormatOptions {
	localeMatcher?: 'lookup' | 'best fit';
	weekday?: 'narrow' | 'short' | 'long';
	era?: 'narrow' | 'short' | 'long';
	year?: 'numeric' | '2-digit';
	month?: 'numeric' | '2-digit' | 'narrow' | 'short' | 'long';
	day?: 'numeric' | '2-digit';
	hour?: 'numeric' | '2-digit';
	minute?: 'numeric' | '2-digit';
	second?: 'numeric' | '2-digit';
	timeZoneName?: 'short' | 'long';
	formatMatcher?: 'basic' | 'best fit';
	hour12?: boolean;
	timeZone?: string;
}

export const formatDate = (date: string, formatOptions: IFormatOptions) =>
	intlFormat(Date.parse(date), formatOptions, { locale: 'nb-NO' });

// Format date to YYYY-MM-DD
export const formatDateYYYYMMDD = (date: Date) => {
    // timezone-safety not necessary (?)
    //date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
    return date.toISOString().slice(0,10);
};

export const parseDateYYYYMMDD = (yyyymmdd: string) => parse(yyyymmdd, 'yyyy-MM-dd', new Date())
