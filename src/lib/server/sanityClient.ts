import sanityClient from '@sanity/client';
import type { SanityClient, SanityDocument } from '@sanity/client';
import type { Submission } from '../types/submission';
import type { Author } from '../types/author';
import type { Conference } from '../types/conference';
// @ts-ignore
import { env as private_env } from '$env/dynamic/private';
// @ts-ignore
import { env as public_env } from '$env/dynamic/public';

const client: SanityClient = sanityClient({
	projectId: public_env?.PUBLIC_SANITY_PROJECTID ?? 'mhv8s2ia',
	dataset: public_env?.PUBLIC_SANITY_DATASET ?? 'test',
	apiVersion: '2022-03-24',
	useCdn: false,
	token: private_env.SANITY_TOKEN
});

function makeid(length: number): string {
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

function generateSlug(string: string): string {
	let slug: string = string.toLowerCase();
	slug = slug.replace(' ', '-');
	return slug;
}

export async function createSubmission(submission: Submission, authors: Array<Author>) {
	const authorReference = authors.map((a) => {
		return {
			_type: 'reference',
			_ref: a.id
		};
	});
	submission.slug = generateSlug(submission.title);
	const submissionDoc = {
		_type: 'submission',
		title: submission.title,
		slug: { _type: 'slug', current: generateSlug(submission.slug) },
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
	author.slug = generateSlug(author.name);
	const authorDoc = {
		_type: 'author',
		name: author.name,
		slug: { _type: 'slug', current: author.slug },
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
						text: author.bio
					}
				]
			}
		],
		twitter: author?.twitter ?? '',
		instagram: author?.instagram ?? '',
		facebook: author?.facebook ?? '',
		linkedin: author?.linkedin ?? '',
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

export async function createConference(conference: Conference) {
	const conferenceDoc = {
		_type: 'conference',
		title: conference.title,
		slug: conference.slug,
		startDate: conference.startDate,
		endDate: conference.endDate,
		internal: conference.internal,
		url: conference.url
	};
	const insertedConference: SanityDocument<any> = await client.create(conferenceDoc);

	// client.assets
	//     .upload('image', createReadStream(''), {
	//         filename: basename('')
	//     })
	//     .then(imageAsset => {
	//         return client
	//         .patch(insertedConference._id)
	//         .set({
	//             image: {
	//             _type: 'image',
	//             asset: {
	//                 _type: "reference",
	//                 _ref: imageAsset._id
	//             }
	//             }
	//         })
	//         .commit()
	//     })
	//     .then(() => {
	//         console.log("Done!");
	//     });
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
