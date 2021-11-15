export type ResultDict = Map<string, string | number>;
export type Config = Dictionary<string | number | object>;

export interface Dictionary<T> {
  [prop: string]: T;
}
