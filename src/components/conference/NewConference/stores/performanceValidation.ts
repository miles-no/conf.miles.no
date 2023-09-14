import {get, writable} from "svelte/store";
import type {Writable} from "svelte/store";
import {
	authorName,
	perfDescription,
	perfDuration, perfLocation,
	perfTime,
	perfTimeIsSet,
	perfTitle,
	perfType
} from "./performancesStore";

export const invalidFields: Writable<RequiredFields[]> = writable([]);

export enum RequiredFields {
	title="tittel",
	author="ansvarlig",
	dateAndTime="starttidspunkt",
	duration="varighet",
	location="lokasjon",
	type="type",
	description="beskrivelse"
};
export const requiredFieldsList = Object.keys(RequiredFields);

const getValueOrNull = (value: any) => {
	if ("string" === typeof value) {
		return value.trim() || null;
	}
	return value ?? null;
}

export const validateRequiredFields = () => {
	// Required fields validation and feedback: add all required data to an object, remove valid/completed fields
	// from it. If there are any fields remaining after that, use the object to provide user feedback. If not,
	// submit and proceed.
	const requiredData = {
		[RequiredFields.title]: getValueOrNull(get(perfTitle)),
		[RequiredFields.author]: getValueOrNull(get(authorName)),
		[RequiredFields.dateAndTime]: get(perfTimeIsSet) ? get(perfTime) : null,
		[RequiredFields.duration]: get(perfDuration) >= 0 ? get(perfDuration) : null,
		[RequiredFields.location]: getValueOrNull(get(perfLocation)),
		[RequiredFields.type]: getValueOrNull(get(perfType)),
		[RequiredFields.description]: getValueOrNull(get(perfDescription)),
	}

	if (requiredFieldsList.length !== Object.keys(requiredData).length) {
		throw Error("Flawed required-fields check");
	}

	invalidFields.set(
		Object.keys(requiredData)
			.map( field => (requiredData[field] == null) ? field : undefined)
			.filter( field => !!field ) as RequiredFields[]
	);

}
