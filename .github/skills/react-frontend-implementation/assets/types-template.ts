export type AsyncStatus = 'idle' | 'loading' | 'success' | 'error';

export type Variant<T extends string, P> = {
  kind: T;
  payload: P;
};

export type ButtonStyle = 'primary' | 'secondary' | 'danger';

export interface ListItem<T> {
  id: string;
  value: T;
}

export function assertNever(value: never): never {
  throw new Error(`Unexpected value: ${String(value)}`);
}