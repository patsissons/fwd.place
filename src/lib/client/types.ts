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
