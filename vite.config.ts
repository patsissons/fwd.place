import { kitql } from '@kitql/all-in'
import graphql from '@rollup/plugin-graphql'
import { sveltekit } from '@sveltejs/kit/vite'
import houdini from 'houdini/vite'
import type { UserConfig } from 'vite'

const config: UserConfig = {
  plugins: [
    graphql(),
    kitql({
      projectName: 'default',
    }),
    houdini(),
    sveltekit(),
  ],
  test: {
    include: ['src/**/*.{test,spec}.{js,ts}'],
  },
}

export default config
