import preprocess from 'svelte-preprocess';
import adapter from '@sveltejs/adapter-static';
import { mdsvex } from 'mdsvex'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeSlug from 'rehype-slug'

const dev = process.argv.includes('dev');

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', '.md'],
	kit: {
		adapter: adapter(),
		paths: {
			base: dev ? '' : process.env.BASE_PATH,
		},
		prerender: {
			entries: [
				'*',
				'/api/posts/page/*',
				'/blog/category/*/page/',
				'/blog/category/*/page/*',
				'/blog/category/page/',
				'/blog/category/page/*',
				'/blog/page/',
				'/blog/page/*',
			]
		}
	},

	preprocess: [
		preprocess({
			postcss: true
		}),
		mdsvex({
			// The default mdsvex extension is .svx; this overrides that.
			extensions: ['.md'],

			// Adds IDs to headings, and anchor links to those IDs. Note: must stay in this order to work.
			rehypePlugins: [
				rehypeSlug,
				rehypeAutolinkHeadings,
			],
		}),
	],
};

export default config;
