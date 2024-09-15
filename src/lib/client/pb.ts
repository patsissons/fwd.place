import PocketBase from 'pocketbase';
import type { Fwd, NewRecord, User } from './types';
import { userStore } from '$lib/stores/userStore';
import { fwdStore } from '$lib/stores/fwdStore';

export function createClient() {
  return new PocketBase('https://fwd.pockethost.io/');
}

export const authProviders = ['github'] as const;
export type AuthProvider = (typeof authProviders)[number];

export const users = {
  async login(provider: AuthProvider) {
    const users = createClient().collection('users');
    const auth = await users.authWithOAuth2<User>({ provider });

    const user = auth.record;

    if (user) {
      if (!user.avatar && user.username && provider === 'github') {
        user.avatar = `https://github.com/${user.username}.png`;
        users.update(user.id, { avatar: user.avatar });
      }

      await fwds.byAuth(user);
    }

    userStore.set(user);

    return user;
  },
  async current() {
    const client = createClient();
    if (client.authStore.model) {
      const user = client.authStore.model as User;
      userStore.set(user);
      await fwds.byAuth(user);
      return user;
    }

    userStore.set(undefined);
  },
  logout() {
    userStore.set(undefined);
    fwdStore.set([]);
    return createClient().authStore.clear();
  },
  async byNs(ns: string) {
    return createClient()
      .collection('users')
      .getFirstListItem<User | undefined>(`name="${ns}" || username="${ns}"`);
  },
};

export const fwds = {
  async byAuth(user?: User) {
    if (!user) {
      user = await users.current();
    }

    if (!user) {
      fwdStore.set([]);
      return [];
    }

    const list = await createClient()
      .collection('fwds')
      .getFullList<Fwd>({ filter: `user="${user.id}"` });

    fwdStore.set(list);
    return list;
  },
  create(fwd: NewRecord<Fwd>) {
    return createClient().collection('fwds').create<Fwd>(fwd);
  },
  update(id: string, fwd: Partial<Fwd>) {
    return createClient().collection('fwds').update<Fwd>(id, fwd);
  },
  delete(id: string) {
    return createClient().collection('fwds').delete(id);
  },
};

export const redirects = {
  async byId(id: string) {
    return createClient().collection('redirects').getOne<Fwd | undefined>(id);
  },
  async byName(name: string, ns?: string) {
    if (!ns) return redirects.byId(name);

    return createClient()
      .collection('redirects')
      .getFirstListItem<Fwd | undefined>(`(uid="${ns}" || ns="${ns}") && name="${name}"`);
  },
};
