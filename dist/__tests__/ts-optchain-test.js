"use strict";
/**
 * Copyright (C) 2018-present, Rimeto, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../index");
describe('ts-optchain', () => {
    it('sanity checks', () => {
        const x = index_1.oc({
            a: 'hello',
            b: {
                d: 'world',
            },
            c: [-100, 200, -300],
        });
        expect(x.a()).toEqual('hello');
        expect(x.b.d()).toEqual('world');
        expect(x.c[0]()).toEqual(-100);
        expect(x.c[100]()).toBeUndefined();
        expect(x.c[100](1234)).toEqual(1234);
        expect(x.d.e()).toBeUndefined();
        expect(x.d.e('optional default value')).toEqual('optional default value');
        expect(x.y.z.a.b.c.d.e.f.g.h.i.j.k()).toBeUndefined();
    });
    it('optional chaining equivalence', () => {
        const x = {
            a: 'hello',
            b: {
                d: 'world',
            },
            c: [{ u: { v: -100 } }, { u: { v: 200 } }, {}, { u: { v: -300 } }],
        };
        expect(index_1.oc(x).a()).toEqual(x.a);
        expect(index_1.oc(x).b.d()).toEqual(x.b && x.b.d);
        expect(index_1.oc(x).c[0].u.v()).toEqual(x.c && x.c[0] && x.c[0].u && x.c[0].u.v);
        expect(index_1.oc(x).c[100].u.v()).toEqual(x.c && x.c[100] && x.c[100].u && x.c[100].u.v);
        expect(index_1.oc(x).c[100].u.v(1234)).toEqual(x.c && x.c[100] && x.c[100].u && x.c[100].u.v || 1234);
        expect(index_1.oc(x).e.f()).toEqual(x.e && x.e.f);
        expect(index_1.oc(x).e.f('optional default value')).toEqual(x.e && x.e.f || 'optional default value');
        expect(index_1.oc(x).e.g(() => 'Yo Yo')()).toEqual((x.e && x.e.g || (() => 'Yo Yo'))());
    });
    it('optional chaining for null values', () => {
        const x = {
            a: null,
            b: {
                d: null,
                e: 'someValue'
            }
        };
        expect(index_1.oc(x).a()).toEqual(undefined);
        expect(index_1.oc(x).b.e()).toEqual('someValue');
        expect(index_1.oc(x).b.d('default value')).toEqual('default value');
    });
});
