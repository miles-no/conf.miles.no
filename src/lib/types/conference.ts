import { z } from "zod";

import { ConferenceCategory } from '../../enums/conference-category'

export const Conference = z.object({
    // _type: 'conference'
    slug: z.string().optional(),
    title: z.string().trim().min(1, {message: "Missing or invalid title"}),
    startDate: z.string().datetime( {message: "Missing or invalid start date"}),
    endDate: z.string().datetime( {message: "Missing or invalid end date"}),
    url: z.string().trim().min(1, {message: "Missing or invalid url"}).url({ message: "Invalid url" }),
    internal: z.boolean().optional(),
    categoryTag: z.array(z.nativeEnum(ConferenceCategory)).optional(),
    visibleTo: z.array(z.string()).optional(),
    image: z.string().url().optional(),
    // itinerary
});



export type ConferenceType = z.infer<typeof Conference>;
