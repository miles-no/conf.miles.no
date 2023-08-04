import { z } from "zod";

import { ConferenceCategory } from '../../enums/conference-category'

const yyyymmdd = /^\d{4}-\d{2}-\d{2}$/
export const Conference = z.object({
    // _type: 'conference'
    slug: z.string().optional(),
    title: z.string().trim().min(1, {message: "Missing or invalid title"}),
    description: z.string().trim().min(1, {message: "Missing or invalid description"}),
    startDate: z.string().trim().regex(yyyymmdd, {message: "Start date must be on the format YYYY-MM-DD"}).datetime( {message: "Missing or invalid start date"}),
    endDate: z.string().trim().regex(yyyymmdd, {message: "End date must be on the format YYYY-MM-DD"}).datetime( {message: "Missing or invalid end date"}),
    callForPapersDate: z.string().trim().regex(yyyymmdd, {message: "Call-for-papers date must be on the format YYYY-MM-DD"}).optional(),
    url: z.string().trim().min(1, {message: "Missing or invalid url"}).url({ message: "Invalid url" }),
    internal: z.boolean().optional(),
    categoryTag: z.array(z.nativeEnum(ConferenceCategory)).optional(),
    visibleTo: z.array(z.string()).optional(),
    image: z.string().url().optional(),
    // itinerary
});



export type ConferenceType = z.infer<typeof Conference>;
