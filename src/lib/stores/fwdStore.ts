import { writable } from 'svelte/store';
import type { Fwd } from '../client/types';

export const fwdStore = writable<Fwd[]>([]);
