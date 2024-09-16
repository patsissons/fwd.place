import { isDev } from './env';

export const host = isDev ? 'http://localhost:5173/' : 'https://fwd.place';
