import adapter from '@sveltejs/adapter-node';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	compilerOptions: {
		enableSourcemap: true
	},
	preprocess: preprocess({
		sourceMap: true
	}),
	kit: {
		adapter: adapter()
	}
};

export default config;
