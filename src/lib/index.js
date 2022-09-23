import CryptoES from 'crypto-es';
import { CREDENTIAL_SALT } from '../secret';
import { format, getMonth } from 'date-fns';
import { nb } from 'date-fns/locale/index.js';

export const encrypt = (value) => CryptoES.AES.encrypt(value, CREDENTIAL_SALT);

export const decrypt = (value) =>
	CryptoES.AES.decrypt(value, CREDENTIAL_SALT).toString(CryptoES.enc.Utf8);

export const parseJwt = (token) => {
	const base64Url = token.split('.')[1];
	const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
	const jsonPayload = decodeURIComponent(
		window
			.atob(base64)
			.split('')
			.map(function (c) {
				return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
			})
			.join('')
	);

	return JSON.parse(jsonPayload);
};

export const formatConferenceDateRange = (sDate, eDate) => {
  const startDate = new Date(sDate);
  const endDate = new Date(eDate);

  if (getMonth(startDate) == getMonth(endDate)) {
    return `${format(new Date(startDate), 'd')}-${format(new Date(endDate), 'd MMMM', {locale: nb})}`;
  }
  return `${format(new Date(startDate), 'd MMM', {locale: nb})} - ${format(new Date(endDate), 'd MMM', {locale: nb})}`;
}
