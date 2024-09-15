import { redirects } from '$lib/client/pb';
import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
  const { ns, name } = params;

  const fwd = await redirects.byPath(name, ns);
  if (!fwd) throw error(404, 'Not found');

  throw redirect(302, fwd.url);
};
