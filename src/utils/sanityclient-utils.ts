import imageUrlBuilder from '@sanity/image-url';
import { client } from '$lib/sanityClient';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';
import type { ImageUrlBuilder } from '@sanity/image-url/lib/types/builder';
import type {IDescription} from "../model/event";
import {normalizeBlock} from "@sanity/block-tools";

const builder = imageUrlBuilder(client);

export const urlFor = (source: SanityImageSource): ImageUrlBuilder => {
	return builder.image(source);
};

// TODO: temporary, until we implement an actual rich-text editor field for description

export const getMinimalPortableText = (description:string): IDescription[] => {
    const portableText = normalizeBlock({
        _type: 'block',
        // @ts-ignore
        children: [
            {
                _type: 'span',
                text: description,
                marks: [],
            },
        ],
    }) as IDescription;
    return [portableText];
};
