import sanityClient from '@sanity/client';
import {basename} from 'path'
import {createReadStream} from 'fs'
import { SANITY_TOKEN } from '$env/static/private';

const client = sanityClient({
  projectId: 'mhv8s2ia',
  dataset: 'production',
  apiVersion: "2022-03-24",
  useCdn: false,
  token: SANITY_TOKEN,
});

export function createConference(body) {
    const doc = {
        _type: 'conference',
        title: body.title,
        slug: body.slug,
        startDate: body.startDate,
        endDate: body.endDate,
        internal: body.internal,
        url: body.url
    }
    let conferenceId;
    client.create(doc).then((response) => {
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