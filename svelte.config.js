import adapter from '@sveltejs/adapter-auto'
import { vitePreprocess } from '@sveltejs/kit/vite'

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://kit.svelte.dev/docs/integrations#preprocessors
  // for more information about preprocessors
  preprocess: vitePreprocess(),

  kit: {
    adapter: adapter(),

    alias: {
      'components/*': 'src/lib/components/*',
      'context/*': 'src/lib/context/*',
      'data/*': 'src/lib/data/*',
      'foundation/*': 'src/lib/foundation/*',
      'pages/*': 'src/lib/pages/*',
      'server/*': 'src/lib/server/*',
      'utils/*': 'src/lib/utils/*',
      'styles/*': 'src/styles/*',
    },
  },
}

export default config
