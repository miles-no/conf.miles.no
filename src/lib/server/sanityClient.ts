import sanityClient from '@sanity/client';
import type { SanityClient, SanityDocument } from '@sanity/client';
import type { Submission } from '../types/submission';
import type { Author } from '../types/author';
import type { ConferenceType } from '../types/conference';
// @ts-ignore
import { env as private_env } from '$env/dynamic/private';
// @ts-ignore
import { env as public_env } from '$env/dynamic/public';
import { makeid } from '../../utils/conference-utils';
import type { IExternalConference } from '../../model/external-conference';

const client: SanityClient = sanityClient({
	projectId: public_env?.PUBLIC_SANITY_PROJECTID ?? 'mhv8s2ia',
	dataset: public_env?.PUBLIC_SANITY_DATASET ?? 'test',
	apiVersion: '2022-03-24',
	useCdn: false,
	token: private_env.SANITY_TOKEN
});

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
	let slug: string = string.toLowerCase();
	slug = slug.replace(' ', '-');

	return await ensureUniqueSlug(slug);
}

export async function createSubmission(submission: Submission, authors: Array<Author>) {
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
	author.slug = await generateSlug(author.name);
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

export async function createConference(
	conference: ConferenceType,
	sanityConferenceType: string
): Promise<string> {
	const slugCurrent = conference.slug ?? (await generateSlug(conference.title));
	const conferenceDoc = {
		_type: sanityConferenceType,
		slug: { _type: 'slug', current: slugCurrent },
		title: conference.title,
		startDate: conference.startDate,
		endDate: conference.endDate,
		url: conference.url,
		categoryTag: conference.categoryTag ?? [],
		internal: false
	};

	const insertedConference: SanityDocument<any> = await client.create(conferenceDoc);
	console.log(
		'Created external conference:\n  _id:',
		insertedConference._id,
		'\n  title:' + insertedConference.title,
		"'\n  slug.current:",
		insertedConference.slug.current
	);
	return insertedConference.slug.current;

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

export async function updateConference(
	externalConference: IExternalConference
): Promise<string> {
	// imageUrl is not a part of external conference schema and updating external conference should not update its references to other schemas.
	const { imageUrl, performances, image, _createdAt, _updatedAt, _id, _rev, location, ...rest } =
		externalConference;

	await client
		.patch(externalConference._id)
		.set({
			...rest,
			slug: { _type: 'slug', current: externalConference.slug }
		})
		.commit();

	return externalConference._id;
}
