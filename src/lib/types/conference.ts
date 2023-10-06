import { z } from "zod";

import { ConferenceCategory } from '../../enums/conference-category'
import {Submission} from "../../enums/submission-type";

const yyyymmdd = /^\d{4}-\d{2}-\d{2}$/
export const Conference = z.object({
    // _type: 'conference'
    slug: z.string().optional(),
    title: z.string().trim().min(1, {message: "Missing or invalid title"}),
    description: z.string().trim().optional(),
    startDate: z.string().trim().regex(yyyymmdd, {message: "Start date must be on the format YYYY-MM-DD"}).datetime( {message: "Missing or invalid start date"}),
    endDate: z.string().trim().regex(yyyymmdd, {message: "End date must be on the format YYYY-MM-DD"}).datetime( {message: "Missing or invalid end date"}),
    callForPapersDate: z.string().trim().regex(yyyymmdd, {message: "Call-for-papers date must be on the format YYYY-MM-DD"}).optional(),
    url: z.string().trim().min(1, {message: "Missing or invalid url"}).url({ message: "Invalid url" }),
    location: z.string().trim().optional(),
    //internal: z.boolean().optional(),
    categoryTag: z.array(z.nativeEnum(ConferenceCategory)).optional(),
    visibleTo: z.array(z.string()).optional(),
    image: z.string().optional(),
	performances: z.array(z.object({
		dateAndTime: z.string().trim(),
		location: z.string().trim(),
		submission: z.object({
			authors: z.array(z.object({
				name: z.string().trim(),
				email: z.string().trim()
			})),
			description: z.string().trim(),
			duration: z.number(),
			submissionType: z.nativeEnum(Submission),
			title: z.string().trim()
		})
	})).optional()
    // itinerary
});



export type ConferenceType = z.infer<typeof Conference>;
