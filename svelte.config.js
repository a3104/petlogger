import sveltePreprocess from 'svelte-preprocess';

export default {
  preprocess: sveltePreprocess(),
  // Options for the Svelte compiler
  compilerOptions: {
    // Enable run-time checks when not in production
    dev: !production,
  },
  // Options for the Svelte application
  appOptions: {
    // Hydrate the <div id="svelte"> element in src/index.html
    target: '#svelte',
  },
};
