import type { RecordModel } from 'pocketbase';

export interface User extends RecordModel {
  username: string;
  email: string;
  name: string;
  avatar: string;
}

export interface Fwd extends RecordModel {
  user: User;
  name: string;
  url: string;
  enabled: boolean;
  public: boolean;
}

export type NewRecord<T> = Omit<T, keyof RecordModel>;

/*
SELECT fwds.id, fwds.url, (CASE WHEN fwds.public AND length(users.name) > 0 THEN concat(users.name, '/', fwds.name) ELSE NULL END) AS path
FROM fwds
INNER JOIN users ON fwds.user = users.id
WHERE fwds.enabled = TRUE
*/
export interface Redirect {
  id: string;
  url: string;
  path?: string;
}
/*
SELECT id, name
FROM users
WHERE length(name) > 0
*/
export interface Name {
  id: string;
  name: string;
}
