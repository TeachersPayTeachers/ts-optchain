/**
 * Copyright (C) 2018-present, Rimeto, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
/**
 * A generic type that cannot be `undefined`.
 */
export declare type Defined<T> = Exclude<T, undefined> & Exclude<T, null>;
export interface IDataAccessor<T> {
    /**
     * Data accessor without a default value. If no data exists,
     * `undefined` is returned.
     */
    (): Defined<T> | undefined;
    /**
     * Data accessor with default value.
     * @param defaultValue
     */
    (defaultValue: Defined<T>): Defined<T>;
}
/**
 * `ObjectWrapper` gives TypeScript visibility into the properties of
 * an `OCType` object at compile-time.
 */
export declare type ObjectWrapper<T> = {
    [K in keyof T]-?: OCType<Defined<T[K]>>;
};
/**
 * `ArrayWrapper` gives TypeScript visibility into the `OCType` values of an array
 * without exposing Array methods (it is problematic to attempt to invoke methods during
 * the course of an optional chain traversal).
 */
export interface ArrayWrapper<T> {
    length: OCType<number>;
    [K: number]: OCType<T>;
}
/**
 * `DataWrapper` selects between `ArrayWrapper`, `ObjectWrapper`, and `IDataAccessor`
 * to wrap Arrays, Objects and all other types respectively.
 */
export declare type DataWrapper<T> = T extends any[] ? ArrayWrapper<T[number]> : T extends object ? ObjectWrapper<T> : IDataAccessor<T>;
/**
 * An object that supports optional chaining
 */
export declare type OCType<T> = IDataAccessor<T> & DataWrapper<T>;
/**
 * Proxies access to the passed object to support optional chaining w/ default values.
 * To look at a property deep in a tree-like structure, invoke it as a function passing an optional
 * default value.
 *
 * @example
 *   // Given:
 *   const x = oc<T>({
 *     a: 'hello',
 *     b: { d: 'world' },
 *     c: [-100, 200, -300],
 *   });
 *
 *   // Then:
 *   x.a() === 'hello'
 *   x.b.d() === 'world'
 *   x.c[0]() === -100
 *   x.c[100]() === undefined
 *   x.c[100](1234) === 1234
 *   x.c.map((e) => e()) === [-100, 200, -300]
 *   x.d.e() === undefined
 *   x.d.e('optional default value') === 'optional default value'
 *   (x as any).y.z.a.b.c.d.e.f.g.h.i.j.k() === undefined
 */
export declare function oc<T>(data?: T | null): OCType<T>;
