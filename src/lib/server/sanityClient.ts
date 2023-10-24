import sanityClient from '@sanity/client';
import type { SanityClient, SanityDocument, SanityImageAssetDocument } from '@sanity/client';
import type { Author } from '../types/author';
import type { ConferenceType } from '../types/conference';

import { env as private_env } from '$env/dynamic/private';
import { env as public_env } from '$env/dynamic/public';
import { makeid } from '../../utils/conference-utils';
import type {IConference} from "../../model/conference";
import {featureIsToggledOn} from "../../featureFlagging/common";
import {findUsers} from "$lib/server/cvpartnerClient";
import type {IDescription} from "../../model/event";

const client: SanityClient = sanityClient({
	projectId: public_env?.PUBLIC_SANITY_PROJECTID ?? 'mhv8s2ia',
	dataset: public_env?.PUBLIC_SANITY_DATASET ?? 'test',
	apiVersion: '2022-03-24',
	useCdn: false,
	token: private_env.SANITY_TOKEN
});

export const SANITY_CONFERENCE_TYPE = 'conference';
export const SANITY_AUTHOR_TYPE = 'author';
export const SANITY_REFERENCE_TYPE = 'reference';
export const SANITY_SUBMISSION_TYPE = 'submission';


// If a slug already exists, recursively tries to add and increase an index.
// To avoid excessive looping, after the 10 first attempts, tries random 5-character hashes instead of counting indices.
async function ensureUniqueSlug(slug: string, index: number = 1): Promise<string> {
	const suffix = index < 2 ? '' : index < 10 ? `-${index}` : `-${makeid(5)}`;
	const attemptedSlug = slug + suffix;

	const existingSlugItems = await client.fetch(
		`*[slug == "${attemptedSlug}" || slug.current == "${attemptedSlug}"]`
	);

	if (!existingSlugItems || !existingSlugItems.length) {
		return attemptedSlug;
	}
	console.log(`Preventing duplicate slugs: '${attemptedSlug}' already exists.`);
	return ensureUniqueSlug(slug, index + 1);
}

async function generateSlug(string: string): Promise<string> {
	let slug: string;
	if (featureIsToggledOn("strictAlphaNumericSlug")) {
		slug = string.trim().toLowerCase().replace(/[^a-zA-Z\d+]+/g, '-');
	} else {
		slug = string.toLowerCase();
		slug = slug.replace(' ', '-');
	}

	return await ensureUniqueSlug(slug);
}

export async function createSubmission(submission: ISubmission, authors: Array<Author>) {
	const authorReference = authors.map((a) => {
		return {
			_type: 'reference',
			_ref: a.id
		};
	});
	submission.slug = await generateSlug(submission.title);
	const submissionDoc = {
		_type: 'submission',
		title: submission.title,
		slug: { _type: 'slug', current: await generateSlug(submission.slug) },
		authors: authorReference,
		submissionType: submission.submissionType,
		description: [
			{
				_key: makeid(10),
				_type: 'block',
				style: 'normal',
				markDefs: [],
				children: [
					{
						_key: makeid(10),
						_type: 'span',
						marks: [],
						text: submission.description
					}
				]
			}
		],
		duration: submission.duration,
		keywords: submission.keywords
	};
	// const insertedSubmission = await client.create(submissionDoc);
	console.log(submissionDoc);
	return submissionDoc;
}

export async function createAuthor(author: Author) {
	const slug = await generateSlug(author.name);
	const authorDoc = {
		_type: SANITY_AUTHOR_TYPE,
		name: author.name,
		slug: { _type: 'slug', current: slug },
		bio: [
			{
				_key: makeid(10),
				_type: 'block',
				style: 'normal',
				markDefs: [],
				children: [
					{
						_key: makeid(10),
						_type: 'span',
						marks: [],
						text: author.bio ?? ''
					}
				]
			}
		],
		twitter: author.twitter ?? '',
		instagram: author.instagram ?? '',
		facebook: author.facebook ?? '',
		linkedin: author.linkedin ?? '',
		email: author.email
	};
	const insertedAuthor = await client.create(authorDoc);
	// const imageAsset = client.upload('image', createReadStream(''), {
	//     filename: basename('')
	// });
	// const updatedAuthor = await client.patch(author._id).set({
	//     image: {
	//         _type: 'image',
	//         asset: {
	//             _type: "reference",
	//             _ref: imageAsset._id
	//         }
	//     }
	// });
	return insertedAuthor;
}

// Returns the year with a leading '-', for slug use - or an empty string if no parseable year
const getSlugYearFromDateString = (dateString: string = ''): string => {
    const year = new Date(Date.parse(dateString)).getFullYear();
    return (!isNaN(year) && year > 0) ? `-${year}` : '';
}


interface BaseAuthor {
	name:string,
	email?:string
}

/** Looks for unambiguous match among users from CVpartner
 * Then (if 1 was found), looks for unambiguous match among authors in Sanity.
 * Then, if none was found, creates it and returns the _id. If 1 was found, returns the _id.
 * If ambigous matches (multiple hits, cant separate), throws error.
 * @param author
 */
async function addAuthor(author: BaseAuthor): Promise<string> {

	const potentialAuthors = await findUsers(author.name, author.email);
	if (!potentialAuthors.length) {
		throw new Error("No user matching this author was found among users from CV partner: " + JSON.stringify(author));

	} else if (potentialAuthors.length === 1) {
		const targetAuthor = potentialAuthors[0];

		let foundAuthors = await client.fetch( /* groq */ `
		        *[ 
		            _type == "author" && email == $targetEmail && !(_id match "draft*") 
		        ] { 
		            _id, name, email 
		        }
		        `, {targetEmail: targetAuthor.email});

		if (!foundAuthors || !foundAuthors.length) {
			foundAuthors = await client.fetch( /* groq */ `
		        *[
		            _type == "author" && name == $targetName && !(_id match "draft*") 
		        ] { 
		            _id, name, email 
		        }
		        `, {targetName: targetAuthor.name});
		}

		if (!foundAuthors || foundAuthors.length === 0) {
			console.log("Submitted author data accepted: FOUND MATCHING USER IN CVPARTNER BUT NO MATCHING AUTHOR IN SANITY.\nCREATING AUTHOR:" + JSON.stringify(targetAuthor));

			const createdAuthor = await createAuthor(targetAuthor as Author);
			return createdAuthor._id;

		} else if (foundAuthors.length === 1) {
			const foundAuthor = foundAuthors[0];
			return foundAuthor._id;

		} else {
			console.warn("Submitted author data '" + JSON.stringify(author) + "' matches 1 user in CVpartner, but multiple authors in Sanity:" + JSON.stringify(foundAuthors));
			throw new Error("Ambiguous match in author data.");
		}

	} else {
		console.warn("Submitted author data '" + JSON.stringify(author) + "' matches multiple users is CVpartner: " +  JSON.stringify(potentialAuthors));
		throw new Error("Ambiguous match in author data.");
	}
}

interface ISubmission {
	title: string,
	slug?: string,
	submissionType: string,
	description: IDescription[],
	duration: number,
	authors: {
		name: string,
		email: string
	}[]
}

function validateSubmission(submission?: ISubmission) {
	if (!submission || !Object.keys(submission).length) {
		throw Error("Missing submission data");
	}
	["title", "submissionType", "description"].forEach(key => {
		// @ts-ignore
		if (!(submission[key] && (submission[key] + "").trim())) {
			throw Error("Missing submission " + key);
		}
	})
	if (!(submission.duration > 0)) {
		throw Error("Missing or invalid submission duration");
	}
	if (!submission.authors || !submission.authors.length) {
		throw Error("Missing submission authors");
	}
	submission.authors.forEach(author => {
		if (!author.name && !author.email) {
			throw Error("Missing submission author name and email (one is needed)");
		}
	});
}

async function addSubmission(submission?: ISubmission) {
	validateSubmission(submission);

	const slug = await generateSlug(submission?.title as string);

	const addedAuthorIds = await Promise.all(
		(submission?.authors || []).map(addAuthor)
	);

	const submissionDoc = {
		_type: SANITY_SUBMISSION_TYPE,
		slug: { _type: 'slug', current: slug },
		title: submission?.title,
		submissionType: submission?.submissionType,
		description: submission?.description,
		duration: submission?.duration,
		authors: addedAuthorIds.map(id => ({
			_key: makeid(12),
			_ref: id,
			_type: SANITY_REFERENCE_TYPE
		}))
	};

	const insertedConference: SanityDocument<any> = await client.create(submissionDoc);

	return insertedConference._id;
}


async function addPerformance(performance?: {
	dateAndTime: string,
	location: string,
	submission: ISubmission
}){


	const submissionId = await addSubmission(performance?.submission);

	const performanceDoc = {
		dateAndTime: performance?.dateAndTime,
		location: performance?.location,
		_key: makeid(12),
		submission: {
			_ref: submissionId,
			_type: SANITY_REFERENCE_TYPE
		}
	};
	return performanceDoc;
}


export async function createConference(
	conference: ConferenceType
): Promise<string> {
	const slugCurrent = conference.slug ?? (await generateSlug(conference.title + getSlugYearFromDateString(conference.startDate)));
	const imageAsset = conference.image ? await uploadImageFromDataUrl(conference.image) : undefined;

	const performanceDocs = await Promise.all(
		(conference.performances || []).map(addPerformance)
	)

	let conferenceDoc = {
		_type: SANITY_CONFERENCE_TYPE,
		slug: { _type: 'slug', current: slugCurrent },
		title: conference.title,
		startDate: conference.startDate,
        endDate: conference.endDate,
        callForPapersDate: conference.callForPapersDate,
        location: conference.location,
        description: conference.description,
		url: conference.url,
		categoryTag: conference.categoryTag ?? [],
		performances: performanceDocs ?? [],
		image: imageAsset ? {
			_type: 'image',
			asset: {
				_type: 'reference',
				_ref: imageAsset._id
			}
		} : null
	};


	const insertedConference: SanityDocument<any> = await client.create(conferenceDoc);

	return insertedConference.slug.current;
}

async function uploadImageFromDataUrl(dataUrl: string): Promise<SanityImageAssetDocument | undefined> {
	if (typeof dataUrl !== 'string' || !dataUrl.startsWith('data:')) {
		return undefined;
	}
	
	const [, base64Data] = dataUrl.split(',');
	const binaryData = Buffer.from(base64Data, 'base64');

	try {
		return client.assets.upload('image', binaryData);
	} catch (error) {
		console.error('Error uploading image:', error);
		return undefined;
	}
}

/*
{
  _createdAt: '2023-02-12T19:47:57Z',
  _id: '2U3N42Q8RufiFhOoB78uhX',
  _rev: '2U3N42Q8RufiFhOoB78ugv',
  _type: 'submission',
  _updatedAt: '2023-02-12T19:47:57Z',
  authors: [ { _ref: 'EmCriQJSDEYU7ED0Biw3yb', _type: 'reference' } ],
  description: [
    {
      _key: 'rwI2J50qNp',
      _type: 'block',
      children: [Array],
      markDefs: [],
      style: 'normal'
    }
  ],
  duration: 60,
  keywords: [ 'Test' ],
  slug: { _type: 'slug', current: 'tester-innlegg' },
  submissionType: 'presentation',
  title: 'Tester innlegg'
}
*/

export async function updateConference(
	conferenceWithUpdatedValues: IConference,
	replacingImage?: string
): Promise<string> {
	// imageUrl is not a part of conference schema and updating conference should not update its references to other schemas.
	const { imageUrl, performances, image, _createdAt, _updatedAt, _id, _rev, ...rest } =
		conferenceWithUpdatedValues;

	const imageAsset = replacingImage ? await uploadImageFromDataUrl(replacingImage) : undefined;

	await client
		.patch(conferenceWithUpdatedValues._id)
		.set({
			...rest,
			image: imageAsset ? {
				_type: 'image',
				asset: {
					_type: 'reference',
					_ref: imageAsset._id
				}
			} : image,
			slug: { _type: 'slug', current: conferenceWithUpdatedValues.slug }
		})
		.commit();

	return conferenceWithUpdatedValues._id;
}
