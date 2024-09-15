import PocketBase from 'pocketbase';
import { type Name, type Fwd, type NewRecord, type Redirect, type User } from './types';
import { userStore } from '$lib/stores/userStore';
import { fwdStore } from '$lib/stores/fwdStore';

export function createClient() {
  return new PocketBase('https://fwd.pockethost.io/');
}

export const authProviders = ['github'] as const;
export type AuthProvider = (typeof authProviders)[number];

export const users = {
  async login(provider: AuthProvider) {
    const client = createClient();
    const users = client.collection('users');
    const auth = await users.authWithOAuth2<User>({ provider });

    const user = auth.record;

    if (user) {
      if (!user.avatar && user.username && provider === 'github') {
        user.avatar = `https://github.com/${user.username}.png`;
        users.update(user.id, { avatar: user.avatar });
      }

      if (!user.name && user.username) {
        const set = await names.startingWith(user.username).then((names) => new Set(names));
        let name = user.username;

        for (let i = 1; set.has(name); ++i) {
          name = `${user.username}${i}`;
        }

        users.update(user.id, { name });
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
  async update(id: string, fields: Partial<Pick<User, 'name'>>) {
    const user = await createClient().collection('users').update<User>(id, fields);
    userStore.set(user);
    return user;
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
  async create(fields: NewRecord<Fwd>) {
    const fwd = await createClient().collection('fwds').create<Fwd>(fields);
    await fwds.byAuth();
    return fwd;
  },
  async delete(id: string) {
    const deleted = await createClient().collection('fwds').delete(id);
    if (deleted) {
      await fwds.byAuth();
    }

    return deleted;
  },
  async update(id: string, fields: Partial<Fwd>) {
    const fwd = await createClient().collection('fwds').update<Fwd>(id, fields);
    await fwds.byAuth();
    return fwd;
  },
};

export const redirects = {
  async byId(id: string) {
    return createClient().collection('redirects').getOne<Redirect | undefined>(id);
  },
  async byPath(name: string, ns?: string) {
    if (!ns) return redirects.byId(name);

    const path = `${ns}/${name}`;

    return createClient()
      .collection('redirects')
      .getFirstListItem<Redirect | undefined>(`path="${path}" || id="${name}"`);
  },
};

export const names = {
  async startingWith(name: string) {
    return createClient()
      .collection('names')
      .getFullList<Name>({ filter: `name~"${name}%"` })
      .then((names) => names.map(({ name }) => name));
  },
  async byName(name: string) {
    return createClient().collection('names').getFirstListItem<Name | undefined>(`name="${name}"`);
  },
};
