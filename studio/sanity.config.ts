import { defineConfig, definePlugin } from 'sanity';
import { deskTool } from 'sanity/desk';
import { visionTool } from '@sanity/vision';
import { DatabaseIcon } from '@sanity/icons';
import schemas from './schemas/schema';
import deskStructure from './deskStructure';
import { Logo } from './plugins/studio-logo/Logo';

const projectId = 'mhv8s2ia';

const sharedConfig = definePlugin({
	name: 'shareConfig',
	plugins: [
		deskTool({
			structure: deskStructure
		}),
		visionTool()
	],
	tools: (prev) => {
		// 👇 Uses environment variables set by Vite in development mode
		if (import.meta.env.DEV) {
			return prev;
		}
		return prev.filter((tool) => tool.name !== 'vision');
	},
	schema: {
		types: schemas
	},
	studio: {
		components: {
			logo: Logo
		}
	},
	document: {
		newDocumentOptions: (prev, { creationContext }) => {
			if (creationContext.type === 'global') {
				return prev.filter((templateItem) => templateItem.templateId != 'siteSettings');
			}
			return prev;
		},
		actions: (prev, { schemaType }) => {
			if (schemaType === 'siteSettings') {
				return prev.filter(({ action }) => !['unpublish', 'delete', 'duplicate'].includes(action!));
			}
			return prev;
		}
	}
});

export default defineConfig([
	{
		name: 'miles-conf-test',
		title: 'Miles Konferanser [Test]',
		icon: DatabaseIcon,
		projectId,
		dataset: 'test',
		basePath: '/test',
		plugins: [sharedConfig()]
	},
	{
		name: 'miles-conf-production',
		title: 'Miles Konferanser [Prod]',
		icon: DatabaseIcon,
		projectId,
		dataset: 'production',
		basePath: '/prod',
		plugins: [sharedConfig()]
	}
]);
