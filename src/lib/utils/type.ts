export interface Jsonable {
  toJson(): unknown;
}

export interface Arrayable<T = unknown> {
  toArray(): Array<T>;
}
