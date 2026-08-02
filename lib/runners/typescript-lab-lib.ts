/**
 * A small, curated ambient library for TypeScript lab lessons.
 *
 * Why not the real lib.es2020.d.ts: TypeScript's shipped lib files are read
 * from disk by `tsc` and are not part of the importable `typescript` module.
 * Bundling them would add roughly a megabyte of declaration text to an
 * already-large browser chunk, for globals a beginner TypeScript course
 * barely touches.
 *
 * Why a curated lib is still honest: the type checker needs a handful of
 * global interfaces (Array, String, Number, Boolean, Function, Object,
 * RegExp, IArguments) to operate at all -- without them every program fails
 * with "Cannot find global type". This file declares those plus the specific
 * globals the TypeScript Foundations course actually uses, so learner code is
 * genuinely type-checked rather than merely transpiled.
 *
 * Known limitation, surfaced to learners in the lab UI and documented in
 * docs/CURRICULUM.md: APIs outside this list are not declared, so a lab is not
 * a substitute for running `tsc` locally on a real project. Course exercises
 * are written to stay inside this surface, and
 * scripts/validate-snippets.ts fails the build if any course exercise
 * references something this lib does not declare.
 */
export const TYPESCRIPT_LAB_LIB = `
interface Boolean {}
interface IArguments {}
interface Symbol {}
type PropertyKey = string | number | symbol;

interface Function {
  apply(thisArg: any, argArray?: any): any;
  call(thisArg: any, ...argArray: any[]): any;
  bind(thisArg: any, ...argArray: any[]): any;
  readonly length: number;
}
interface CallableFunction extends Function {}
interface NewableFunction extends Function {}

interface Object {
  toString(): string;
  hasOwnProperty(v: PropertyKey): boolean;
}
interface ObjectConstructor {
  keys(o: any): string[];
  values(o: any): any[];
  entries(o: any): [string, any][];
  assign(target: any, ...sources: any[]): any;
  freeze<T>(o: T): T;
}
declare var Object: ObjectConstructor;

interface String {
  readonly length: number;
  toUpperCase(): string;
  toLowerCase(): string;
  trim(): string;
  includes(searchString: string): boolean;
  split(separator: string): string[];
  slice(start?: number, end?: number): string;
  substring(start: number, end?: number): string;
  repeat(count: number): string;
  startsWith(searchString: string): boolean;
  endsWith(searchString: string): boolean;
  replace(searchValue: string, replaceValue: string): string;
  padStart(targetLength: number, padString?: string): string;
  padEnd(targetLength: number, padString?: string): string;
  charAt(index: number): string;
  indexOf(searchString: string): number;
  concat(...strings: string[]): string;
}

interface Number {
  toFixed(digits?: number): string;
  toString(radix?: number): string;
}
interface NumberConstructor {
  isInteger(n: unknown): boolean;
  isFinite(n: unknown): boolean;
  parseFloat(s: string): number;
  parseInt(s: string, radix?: number): number;
  readonly MAX_SAFE_INTEGER: number;
}
declare var Number: NumberConstructor;

interface Array<T> {
  length: number;
  [n: number]: T;
  push(...items: T[]): number;
  pop(): T | undefined;
  shift(): T | undefined;
  unshift(...items: T[]): number;
  map<U>(callback: (value: T, index: number) => U): U[];
  filter(callback: (value: T, index: number) => boolean): T[];
  forEach(callback: (value: T, index: number) => void): void;
  reduce<U>(callback: (acc: U, value: T, index: number) => U, initial: U): U;
  join(separator?: string): string;
  includes(searchElement: T): boolean;
  find(callback: (value: T, index: number) => boolean): T | undefined;
  findIndex(callback: (value: T, index: number) => boolean): number;
  slice(start?: number, end?: number): T[];
  splice(start: number, deleteCount?: number): T[];
  sort(compare?: (a: T, b: T) => number): T[];
  some(callback: (value: T, index: number) => boolean): boolean;
  every(callback: (value: T, index: number) => boolean): boolean;
  indexOf(searchElement: T): number;
  concat(...items: T[][]): T[];
  reverse(): T[];
  flat(): any[];
}
interface ReadonlyArray<T> {
  readonly length: number;
  readonly [n: number]: T;
  map<U>(callback: (value: T, index: number) => U): U[];
  filter(callback: (value: T, index: number) => boolean): T[];
  forEach(callback: (value: T, index: number) => void): void;
  includes(searchElement: T): boolean;
  join(separator?: string): string;
}
interface ArrayConstructor {
  isArray(arg: any): boolean;
  from<T>(arrayLike: any): T[];
  of<T>(...items: T[]): T[];
  new <T>(length?: number): T[];
}
declare var Array: ArrayConstructor;

interface RegExp {
  test(s: string): boolean;
  readonly source: string;
}
interface RegExpConstructor {
  new (pattern: string, flags?: string): RegExp;
}
declare var RegExp: RegExpConstructor;

interface Console {
  log(...data: any[]): void;
  error(...data: any[]): void;
  warn(...data: any[]): void;
  info(...data: any[]): void;
}
declare var console: Console;

interface Math {
  readonly PI: number;
  readonly E: number;
  round(x: number): number;
  floor(x: number): number;
  ceil(x: number): number;
  abs(x: number): number;
  max(...values: number[]): number;
  min(...values: number[]): number;
  random(): number;
  pow(base: number, exponent: number): number;
  sqrt(x: number): number;
}
declare var Math: Math;

/*
 * Built-in utility types. These live in lib.es5.d.ts in a real project; the
 * TypeScript Foundations course teaches them in its "Utility Types" lesson,
 * so the lab has to declare them for those exercises to type-check.
 */
type Partial<T> = { [P in keyof T]?: T[P] };
type Required<T> = { [P in keyof T]-?: T[P] };
type Readonly<T> = { readonly [P in keyof T]: T[P] };
type Pick<T, K extends keyof T> = { [P in K]: T[P] };
type Record<K extends string | number | symbol, T> = { [P in K]: T };
type Exclude<T, U> = T extends U ? never : T;
type Extract<T, U> = T extends U ? T : never;
type Omit<T, K extends string | number | symbol> = Pick<T, Exclude<keyof T, K>>;
type NonNullable<T> = T & {};
type ReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : any;
type Parameters<T extends (...args: any) => any> =
  T extends (...args: infer P) => any ? P : never;

interface JSON {
  stringify(value: any, replacer?: any, space?: any): string;
  parse(text: string): any;
}
declare var JSON: JSON;

interface Promise<T> {
  then<U>(onfulfilled: (value: T) => U): Promise<U>;
  catch(onrejected: (reason: any) => any): Promise<T>;
  finally(onfinally: () => void): Promise<T>;
}
interface PromiseConstructor {
  resolve<T>(value: T): Promise<T>;
  reject(reason?: any): Promise<never>;
  all<T>(values: Promise<T>[]): Promise<T[]>;
  new <T>(executor: (resolve: (value: T) => void, reject: (reason?: any) => void) => void): Promise<T>;
}
declare var Promise: PromiseConstructor;

interface Error {
  name: string;
  message: string;
}
interface ErrorConstructor {
  new (message?: string): Error;
  (message?: string): Error;
}
declare var Error: ErrorConstructor;
declare var TypeError: ErrorConstructor;
declare var RangeError: ErrorConstructor;

interface Map<K, V> {
  get(key: K): V | undefined;
  set(key: K, value: V): this;
  has(key: K): boolean;
  delete(key: K): boolean;
  clear(): void;
  readonly size: number;
  forEach(callback: (value: V, key: K) => void): void;
}
interface MapConstructor {
  new <K, V>(entries?: [K, V][]): Map<K, V>;
}
declare var Map: MapConstructor;

interface Set<T> {
  add(value: T): this;
  has(value: T): boolean;
  delete(value: T): boolean;
  clear(): void;
  readonly size: number;
  forEach(callback: (value: T) => void): void;
}
interface SetConstructor {
  new <T>(values?: T[]): Set<T>;
}
declare var Set: SetConstructor;

interface Date {
  getTime(): number;
  toISOString(): string;
  getFullYear(): number;
  getMonth(): number;
  getDate(): number;
}
interface DateConstructor {
  new (value?: any): Date;
  now(): number;
}
declare var Date: DateConstructor;

declare function setTimeout(handler: () => void, timeout?: number): number;
declare function clearTimeout(id: number): void;
declare function parseInt(s: string, radix?: number): number;
declare function parseFloat(s: string): number;
declare function isNaN(n: number): boolean;
declare function structuredClone<T>(value: T): T;
`;
