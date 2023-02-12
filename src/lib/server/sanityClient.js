import sanityClient from '@sanity/client';
import {basename} from 'path'
import {createReadStream} from 'fs'
import { env as private_env } from '$env/dynamic/private';
import { env as public_env } from '$env/dynamic/public';

const client = sanityClient({
  projectId: public_env?.PUBLIC_SANITY_PROJECTID ?? 'mhv8s2ia',
  dataset: public_env?.PUBLIC_SANITY_DATASET ?? 'test',
  apiVersion: "2022-03-24",
  useCdn: false,
  token: private_env.SANITY_TOKEN,
});

function makeid(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}

function generateSlug(string) {
    let slug = string.toLowerCase();
    slug = slug.replace(' ', '-');
    return slug;
}

export async function createSubmission(doc, authors) {
    const authorReference = authors.map(a => {
        return {
            _type: 'reference',
            _ref: a._id
        }
    });
    const submissionDoc = {
        _type: 'submission',
        title: doc.title,
        slug: { _type: 'slug', current: generateSlug(doc.title) },
        authors: authorReference,
        submissionType: doc.submissionType,
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
                        text: doc.description
                    }
                ]
            }
        ],
        duration: Number(doc.duration),
        keywords: doc.keywords
    };
    // const insertedSubmission = await client.create(submissionDoc);
    console.log(submissionDoc);
    return submissionDoc;
}

export async function createAuthor(doc) {
    const authorDoc = {
        _type: 'author',
        name: doc.name,
        slug: { _type: 'slug', current: generateSlug(doc.name) },
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
                        text: doc.bio
                    }
                ]
            }
        ],
        twitter: doc?.twitter ?? '',
        instagram: doc?.instagram ?? '',
        facebook: doc?.facebook ?? '',
        linkedin: doc?.linkedin ?? '',
        email: doc.email
    };
    const author = await client.create(authorDoc);
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
    return author;
}

export function createConference(body) {
    const conferenceDoc = {
        _type: 'conference',
        title: body.title,
        slug: body.slug,
        startDate: body.startDate,
        endDate: body.endDate,
        internal: body.internal,
        url: body.url
    }
    let conferenceId;
    client.create(conferenceDoc).then((response) => {
        conferenceId = response._id;
    })

    client.assets
        .upload('image', createReadStream(filePath), {
            filename: basename(filePath)
        })
        .then(imageAsset => {
            return client
            .patch(conferenceId)
            .set({
                image: {
                _type: 'image',
                asset: {
                    _type: "reference",
                    _ref: imageAsset._id
                }
                }
            })
            .commit()
        })
        .then(() => {
            console.log("Done!");
        });
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