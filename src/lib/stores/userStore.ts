import { writable } from 'svelte/store';
import type { User } from '../client/types';

export const userStore = writable<User | undefined>();
