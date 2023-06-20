import { createClient } from '@sanity/client';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.resolve(__dirname, '..', '.env') });

type Doc = {
	_id: string;
	_rev?: string;
	_type: string;
	incomingReferences?: Doc[];
};

const client = createClient({
	projectId: process.env.PUBLIC_SANITY_PROJECTID,
	dataset: process.env.PUBLIC_SANITY_DATASET,
	token: process.env.SANITY_TOKEN,
	apiVersion: '2022-03-24'
});

// To run migration: sanity exec migrations/migrateDocumentType.ts
// This script will duplicate all the documents from the OLD_TYPE to NEW_TYPE.
// You can choose to delete the old document after the duplication by inserting a
// delete operation into the mutations by referencing the document id

const OLD_TYPE = 'externalConference';
const NEW_TYPE = 'conference';

const fetchDocuments = () =>
	client.fetch(
		`*[_type == $oldType][0...1000] {..., "incomingReferences": *[references(^._id)]{...}}`,
		{ oldType: OLD_TYPE }
	);

const buildMutations = (docs: Doc[]) => {
	const mutations: any = [];

	docs.forEach((doc) => {
		console.log(OLD_TYPE, doc._id);
		// Updating an document _type field isn't allowed, we have to create a new and delete the old
		const newDocId = `${doc._id}-migrated`;
		const newDocument = { ...doc, ...{ _id: newDocId, _type: NEW_TYPE } };
		delete newDocument.incomingReferences;
		delete newDocument._rev;

		mutations.push({ create: newDocument });
		if (!doc.incomingReferences) {
			return;
		}

		// Patch each of the incoming references
		doc.incomingReferences.forEach((referencingDocument) => {
			console.log('ref', referencingDocument._id);
			// ⚠️ We're assuming the field is named the same as the type!
			// There might be another structure involved, perhaps an array, that needs patching
			const updatedReference = {
				[NEW_TYPE]: {
					_ref: newDocId,
					_type: 'reference'
				}
			};
			mutations.push({
				id: referencingDocument._id,
				patch: {
					set: updatedReference,
					unset: [OLD_TYPE],
					ifRevisionID: referencingDocument._rev
				}
			});
		});

		// We can choose to delete the old document if needed
		// mutations.push({delete: doc._id})
	});
	return mutations.filter(Boolean);
};

const createTransaction = (mutations: any) => {
	return mutations.reduce((tx: any, mutation: any) => {
		if (mutation.patch) {
			return tx.patch(mutation.id, mutation.patch);
		}
		if (mutation.delete) {
			return tx.delete(mutation.delete);
		}
		if (mutation.create) {
			return tx.createIfNotExists(mutation.create);
		}
	}, client.transaction());
};

const migrate: any = async () => {
	const documents = await fetchDocuments();
	if (documents.length === 0) {
		console.log('No documents to migrate!');
		return null;
	}
	const mutations = buildMutations(documents);
	const transaction = createTransaction(mutations);
	return await transaction.commit();
};

migrate().catch((err: any) => {
	console.error(JSON.stringify(err, null, 2));
	process.exit(1);
});
