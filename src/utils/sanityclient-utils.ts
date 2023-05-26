import imageUrlBuilder from '@sanity/image-url';
import { client } from '$lib/sanityClient';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';
import type { ImageUrlBuilder } from '@sanity/image-url/lib/types/builder';

const builder = imageUrlBuilder(client);

export const urlFor = (source: SanityImageSource): ImageUrlBuilder => {
	return builder.image(source);
};
