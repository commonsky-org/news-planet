var Xn = Object.defineProperty;
var rn = (t) => {
  throw TypeError(t);
};
var Zn = (t, n, e) => n in t ? Xn(t, n, { enumerable: !0, configurable: !0, writable: !0, value: e }) : t[n] = e;
var L = (t, n, e) => Zn(t, typeof n != "symbol" ? n + "" : n, e), sn = (t, n, e) => n.has(t) || rn("Cannot " + e);
var T = (t, n, e) => (sn(t, n, "read from private field"), e ? e.call(t) : n.get(t)), jt = (t, n, e) => n.has(t) ? rn("Cannot add the same private member more than once") : n instanceof WeakSet ? n.add(t) : n.set(t, e), Bt = (t, n, e, r) => (sn(t, n, "write to private field"), r ? r.call(t, e) : n.set(t, e), e);
const te = "5";
typeof window < "u" && (window.__svelte || (window.__svelte = { v: /* @__PURE__ */ new Set() })).v.add(te);
const ne = 2, ee = 1, re = 2, hn = "[", _n = "[!", vn = "]", gt = {}, pn = !1;
function Gt(t) {
  console.warn("hydration_mismatch");
}
var ie = Array.isArray, se = Array.from, qt = Object.keys, Ct = Object.defineProperty, Rt = Object.getOwnPropertyDescriptor, le = Object.getOwnPropertyDescriptors, ln = Object.getPrototypeOf;
function ae(t) {
  for (var n = 0; n < t.length; n++)
    t[n]();
}
const K = 2, gn = 4, Ht = 8, Jt = 16, M = 32, wt = 64, _t = 128, Ot = 256, q = 512, G = 1024, $t = 2048, ct = 4096, vt = 8192, oe = 16384, Qt = 32768, ue = 1 << 18, mn = 1 << 19, fe = Symbol("");
function xn(t) {
  return t === this.v;
}
function ce(t, n) {
  return t != t ? n == n : t !== n || t !== null && typeof t == "object" || typeof t == "function";
}
function de(t) {
  return !ce(t, this.v);
}
function he() {
  throw new Error("effect_update_depth_exceeded");
}
function _e() {
  throw new Error("hydration_failed");
}
function ve(t) {
  throw new Error("props_invalid_value");
}
function pe() {
  throw new Error("state_unsafe_local_read");
}
function ge() {
  throw new Error("state_unsafe_mutation");
}
function bn(t) {
  return {
    f: 0,
    // TODO ideally we could skip this altogether, but it causes type errors
    v: t,
    reactions: null,
    equals: xn,
    version: 0
  };
}
// @__NO_SIDE_EFFECTS__
function wn(t, n = !1) {
  var r;
  const e = bn(t);
  return n || (e.equals = de), k !== null && k.l !== null && ((r = k.l).s ?? (r.s = [])).push(e), e;
}
function $n(t, n) {
  return w !== null && Zt() && w.f & (K | Jt) && // If the source was created locally within the current derived, then
  // we allow the mutation.
  (nt === null || !nt.includes(t)) && ge(), me(t, n);
}
function me(t, n) {
  return t.equals(n) || (t.v = n, t.version = Fn(), yn(t, G), Zt() && v !== null && v.f & q && !(v.f & M) && (E !== null && E.includes(t) ? (Y(v, G), It(v)) : U === null ? Te([t]) : U.push(t))), n;
}
function yn(t, n) {
  var e = t.reactions;
  if (e !== null)
    for (var r = Zt(), i = e.length, s = 0; s < i; s++) {
      var l = e[s], a = l.f;
      a & G || !r && l === v || (Y(l, n), a & (q | _t) && (a & K ? yn(
        /** @type {Derived} */
        l,
        $t
      ) : It(
        /** @type {Effect} */
        l
      )));
    }
}
// @__NO_SIDE_EFFECTS__
function xe(t) {
  var n = K | G;
  v === null ? n |= _t : v.f |= mn;
  const e = {
    children: null,
    ctx: k,
    deps: null,
    equals: xn,
    f: n,
    fn: t,
    reactions: null,
    v: (
      /** @type {V} */
      null
    ),
    version: 0,
    parent: v
  };
  if (w !== null && w.f & K) {
    var r = (
      /** @type {Derived} */
      w
    );
    (r.children ?? (r.children = [])).push(e);
  }
  return e;
}
function En(t) {
  var n = t.children;
  if (n !== null) {
    t.children = null;
    for (var e = 0; e < n.length; e += 1) {
      var r = n[e];
      r.f & K ? Xt(
        /** @type {Derived} */
        r
      ) : pt(
        /** @type {Effect} */
        r
      );
    }
  }
}
function kn(t) {
  var n, e = v;
  J(t.parent);
  try {
    En(t), n = zn(t);
  } finally {
    J(e);
  }
  return n;
}
function Nn(t) {
  var n = kn(t), e = (it || t.f & _t) && t.deps !== null ? $t : q;
  Y(t, e), t.equals(n) || (t.v = n, t.version = Fn());
}
function Xt(t) {
  En(t), xt(t, 0), Y(t, vt), t.v = t.children = t.deps = t.ctx = t.reactions = null;
}
function be(t, n) {
  var e = n.last;
  e === null ? n.last = n.first = t : (e.next = t, t.prev = e, n.last = t);
}
function yt(t, n, e, r = !0) {
  var i = (t & wt) !== 0, s = v, l = {
    ctx: k,
    deps: null,
    deriveds: null,
    nodes_start: null,
    nodes_end: null,
    f: t | G,
    first: null,
    fn: n,
    last: null,
    next: null,
    parent: i ? null : s,
    prev: null,
    teardown: null,
    transitions: null,
    version: 0
  };
  if (e) {
    var a = at;
    try {
      un(!0), Lt(l), l.f |= oe;
    } catch (c) {
      throw pt(l), c;
    } finally {
      un(a);
    }
  } else n !== null && It(l);
  var o = e && l.deps === null && l.first === null && l.nodes_start === null && l.teardown === null && (l.f & mn) === 0;
  if (!o && !i && r && (s !== null && be(l, s), w !== null && w.f & K)) {
    var f = (
      /** @type {Derived} */
      w
    );
    (f.children ?? (f.children = [])).push(l);
  }
  return l;
}
function An(t) {
  const n = yt(wt, t, !0);
  return () => {
    pt(n);
  };
}
function we(t) {
  return yt(gn, t, !1);
}
function $e(t) {
  return yt(Ht, t, !0);
}
function W(t) {
  return Tn(t);
}
function Tn(t, n = 0) {
  return yt(Ht | Jt | n, t, !0);
}
function Yt(t, n = !0) {
  return yt(Ht | M, t, !0, n);
}
function Sn(t) {
  var n = t.teardown;
  if (n !== null) {
    const e = w;
    dt(null);
    try {
      n.call(null);
    } finally {
      dt(e);
    }
  }
}
function qn(t) {
  var n = t.deriveds;
  if (n !== null) {
    t.deriveds = null;
    for (var e = 0; e < n.length; e += 1)
      Xt(n[e]);
  }
}
function Cn(t, n = !1) {
  var e = t.first;
  for (t.first = t.last = null; e !== null; ) {
    var r = e.next;
    pt(e, n), e = r;
  }
}
function ye(t) {
  for (var n = t.first; n !== null; ) {
    var e = n.next;
    n.f & M || pt(n), n = e;
  }
}
function pt(t, n = !0) {
  var e = !1;
  if ((n || t.f & ue) && t.nodes_start !== null) {
    for (var r = t.nodes_start, i = t.nodes_end; r !== null; ) {
      var s = r === i ? null : (
        /** @type {TemplateNode} */
        /* @__PURE__ */ et(r)
      );
      r.remove(), r = s;
    }
    e = !0;
  }
  qn(t), Cn(t, n && !e), xt(t, 0), Y(t, vt);
  var l = t.transitions;
  if (l !== null)
    for (const o of l)
      o.stop();
  Sn(t);
  var a = t.parent;
  a !== null && a.first !== null && Rn(t), t.next = t.prev = t.teardown = t.ctx = t.deps = t.parent = t.fn = t.nodes_start = t.nodes_end = null;
}
function Rn(t) {
  var n = t.parent, e = t.prev, r = t.next;
  e !== null && (e.next = r), r !== null && (r.prev = e), n !== null && (n.first === t && (n.first = r), n.last === t && (n.last = e));
}
function an(t, n) {
  var e = [];
  On(t, e, !0), Ee(e, () => {
    pt(t), n && n();
  });
}
function Ee(t, n) {
  var e = t.length;
  if (e > 0) {
    var r = () => --e || n();
    for (var i of t)
      i.out(r);
  } else
    n();
}
function On(t, n, e) {
  if (!(t.f & ct)) {
    if (t.f ^= ct, t.transitions !== null)
      for (const l of t.transitions)
        (l.is_global || e) && n.push(l);
    for (var r = t.first; r !== null; ) {
      var i = r.next, s = (r.f & Qt) !== 0 || (r.f & M) !== 0;
      On(r, n, s ? e : !1), r = i;
    }
  }
}
function on(t) {
  Dn(t, !0);
}
function Dn(t, n) {
  if (t.f & ct) {
    t.f ^= ct, Et(t) && Lt(t);
    for (var e = t.first; e !== null; ) {
      var r = e.next, i = (e.f & Qt) !== 0 || (e.f & M) !== 0;
      Dn(e, i ? n : !1), e = r;
    }
    if (t.transitions !== null)
      for (const s of t.transitions)
        (s.is_global || n) && s.in();
  }
}
let Dt = !1, Vt = [];
function Hn() {
  Dt = !1;
  const t = Vt.slice();
  Vt = [], ae(t);
}
function ke(t) {
  Dt || (Dt = !0, queueMicrotask(Hn)), Vt.push(t);
}
function Ne() {
  Dt && Hn();
}
const Ln = 0, Ae = 1;
let Tt = Ln, mt = !1, at = !1;
function un(t) {
  at = t;
}
let tt = [], ot = 0;
let w = null;
function dt(t) {
  w = t;
}
let v = null;
function J(t) {
  v = t;
}
let nt = null, E = null, S = 0, U = null;
function Te(t) {
  U = t;
}
let In = 0, it = !1, k = null;
function Fn() {
  return ++In;
}
function Zt() {
  return k !== null && k.l === null;
}
function Et(t) {
  var l, a;
  var n = t.f;
  if (n & G)
    return !0;
  if (n & $t) {
    var e = t.deps, r = (n & _t) !== 0;
    if (e !== null) {
      var i;
      if (n & Ot) {
        for (i = 0; i < e.length; i++)
          ((l = e[i]).reactions ?? (l.reactions = [])).push(t);
        t.f ^= Ot;
      }
      for (i = 0; i < e.length; i++) {
        var s = e[i];
        if (Et(
          /** @type {Derived} */
          s
        ) && Nn(
          /** @type {Derived} */
          s
        ), r && v !== null && !it && !((a = s == null ? void 0 : s.reactions) != null && a.includes(t)) && (s.reactions ?? (s.reactions = [])).push(t), s.version > t.version)
          return !0;
      }
    }
    r || Y(t, q);
  }
  return !1;
}
function Se(t, n, e) {
  throw t;
}
function zn(t) {
  var d;
  var n = E, e = S, r = U, i = w, s = it, l = nt, a = k, o = t.f;
  E = /** @type {null | Value[]} */
  null, S = 0, U = null, w = o & (M | wt) ? null : t, it = !at && (o & _t) !== 0, nt = null, k = t.ctx;
  try {
    var f = (
      /** @type {Function} */
      (0, t.fn)()
    ), c = t.deps;
    if (E !== null) {
      var u;
      if (xt(t, S), c !== null && S > 0)
        for (c.length = S + E.length, u = 0; u < E.length; u++)
          c[S + u] = E[u];
      else
        t.deps = c = E;
      if (!it)
        for (u = S; u < c.length; u++)
          ((d = c[u]).reactions ?? (d.reactions = [])).push(t);
    } else c !== null && S < c.length && (xt(t, S), c.length = S);
    return f;
  } finally {
    E = n, S = e, U = r, w = i, it = s, nt = l, k = a;
  }
}
function qe(t, n) {
  let e = n.reactions;
  if (e !== null) {
    var r = e.indexOf(t);
    if (r !== -1) {
      var i = e.length - 1;
      i === 0 ? e = n.reactions = null : (e[r] = e[i], e.pop());
    }
  }
  e === null && n.f & K && // Destroying a child effect while updating a parent effect can cause a dependency to appear
  // to be unused, when in fact it is used by the currently-updating parent. Checking `new_deps`
  // allows us to skip the expensive work of disconnecting and immediately reconnecting it
  (E === null || !E.includes(n)) && (Y(n, $t), n.f & (_t | Ot) || (n.f ^= Ot), xt(
    /** @type {Derived} **/
    n,
    0
  ));
}
function xt(t, n) {
  var e = t.deps;
  if (e !== null)
    for (var r = n; r < e.length; r++)
      qe(t, e[r]);
}
function Lt(t) {
  var n = t.f;
  if (!(n & vt)) {
    Y(t, q);
    var e = v;
    v = t;
    try {
      qn(t), n & Jt ? ye(t) : Cn(t), Sn(t);
      var r = zn(t);
      t.teardown = typeof r == "function" ? r : null, t.version = In;
    } catch (i) {
      Se(
        /** @type {Error} */
        i
      );
    } finally {
      v = e;
    }
  }
}
function Mn() {
  ot > 1e3 && (ot = 0, he()), ot++;
}
function Pn(t) {
  var n = t.length;
  if (n !== 0) {
    Mn();
    var e = at;
    at = !0;
    try {
      for (var r = 0; r < n; r++) {
        var i = t[r];
        i.f & q || (i.f ^= q);
        var s = [];
        jn(i, s), Ce(s);
      }
    } finally {
      at = e;
    }
  }
}
function Ce(t) {
  var n = t.length;
  if (n !== 0)
    for (var e = 0; e < n; e++) {
      var r = t[e];
      !(r.f & (vt | ct)) && Et(r) && (Lt(r), r.deps === null && r.first === null && r.nodes_start === null && (r.teardown === null ? Rn(r) : r.fn = null));
    }
}
function Re() {
  if (mt = !1, ot > 1001)
    return;
  const t = tt;
  tt = [], Pn(t), mt || (ot = 0);
}
function It(t) {
  Tt === Ln && (mt || (mt = !0, queueMicrotask(Re)));
  for (var n = t; n.parent !== null; ) {
    n = n.parent;
    var e = n.f;
    if (e & (wt | M)) {
      if (!(e & q)) return;
      n.f ^= q;
    }
  }
  tt.push(n);
}
function jn(t, n) {
  var e = t.first, r = [];
  t: for (; e !== null; ) {
    var i = e.f, s = (i & M) !== 0, l = s && (i & q) !== 0;
    if (!l && !(i & ct))
      if (i & Ht) {
        s ? e.f ^= q : Et(e) && Lt(e);
        var a = e.first;
        if (a !== null) {
          e = a;
          continue;
        }
      } else i & gn && r.push(e);
    var o = e.next;
    if (o === null) {
      let u = e.parent;
      for (; u !== null; ) {
        if (t === u)
          break t;
        var f = u.next;
        if (f !== null) {
          e = f;
          continue t;
        }
        u = u.parent;
      }
    }
    e = o;
  }
  for (var c = 0; c < r.length; c++)
    a = r[c], n.push(a), jn(a, n);
}
function g(t) {
  var n = Tt, e = tt;
  try {
    Mn();
    const i = [];
    Tt = Ae, tt = i, mt = !1, Pn(e);
    var r = t == null ? void 0 : t();
    return Ne(), (tt.length > 0 || i.length > 0) && g(), ot = 0, r;
  } finally {
    Tt = n, tt = e;
  }
}
function st(t) {
  var a;
  var n = t.f, e = (n & K) !== 0;
  if (e && n & vt) {
    var r = kn(
      /** @type {Derived} */
      t
    );
    return Xt(
      /** @type {Derived} */
      t
    ), r;
  }
  if (w !== null) {
    nt !== null && nt.includes(t) && pe();
    var i = w.deps;
    E === null && i !== null && i[S] === t ? S++ : E === null ? E = [t] : E.push(t), U !== null && v !== null && v.f & q && !(v.f & M) && U.includes(t) && (Y(v, G), It(v));
  } else if (e && /** @type {Derived} */
  t.deps === null) {
    var s = (
      /** @type {Derived} */
      t
    ), l = s.parent;
    l !== null && !((a = l.deriveds) != null && a.includes(s)) && (l.deriveds ?? (l.deriveds = [])).push(s);
  }
  return e && (s = /** @type {Derived} */
  t, Et(s) && Nn(s)), t.v;
}
function Oe(t) {
  const n = w;
  try {
    return w = null, t();
  } finally {
    w = n;
  }
}
const De = ~(G | $t | q);
function Y(t, n) {
  t.f = t.f & De | n;
}
function kt(t, n = !1, e) {
  k = {
    p: k,
    c: null,
    e: null,
    m: !1,
    s: t,
    x: null,
    l: null
  }, n || (k.l = {
    s: null,
    u: null,
    r1: [],
    r2: bn(!1)
  });
}
function Nt(t) {
  const n = k;
  if (n !== null) {
    t !== void 0 && (n.x = t);
    const l = n.e;
    if (l !== null) {
      var e = v, r = w;
      n.e = null;
      try {
        for (var i = 0; i < l.length; i++) {
          var s = l[i];
          J(s.effect), dt(s.reaction), we(s.fn);
        }
      } finally {
        J(e), dt(r);
      }
    }
    k = n.p, n.m = !0;
  }
  return t || /** @type {T} */
  {};
}
var fn, Bn, Yn;
function Wt() {
  if (fn === void 0) {
    fn = window;
    var t = Element.prototype, n = Node.prototype;
    Bn = Rt(n, "firstChild").get, Yn = Rt(n, "nextSibling").get, t.__click = void 0, t.__className = "", t.__attributes = null, t.__styles = null, t.__e = void 0, Text.prototype.__t = void 0;
  }
}
function bt(t = "") {
  return document.createTextNode(t);
}
// @__NO_SIDE_EFFECTS__
function ht(t) {
  return Bn.call(t);
}
// @__NO_SIDE_EFFECTS__
function et(t) {
  return Yn.call(t);
}
function N(t, n) {
  if (!y)
    return /* @__PURE__ */ ht(t);
  var e = (
    /** @type {TemplateNode} */
    /* @__PURE__ */ ht($)
  );
  if (e === null)
    e = $.appendChild(bt());
  else if (n && e.nodeType !== 3) {
    var r = bt();
    return e == null || e.before(r), Q(r), r;
  }
  return Q(e), e;
}
function cn(t, n) {
  if (!y) {
    var e = (
      /** @type {DocumentFragment} */
      /* @__PURE__ */ ht(
        /** @type {Node} */
        t
      )
    );
    return e instanceof Comment && e.data === "" ? /* @__PURE__ */ et(e) : e;
  }
  return $;
}
function z(t, n = 1, e = !1) {
  let r = y ? $ : t;
  for (; n--; )
    r = /** @type {TemplateNode} */
    /* @__PURE__ */ et(r);
  if (!y)
    return r;
  var i = r.nodeType;
  if (e && i !== 3) {
    var s = bt();
    return r == null || r.before(s), Q(s), s;
  }
  return Q(r), /** @type {TemplateNode} */
  r;
}
function He(t) {
  t.textContent = "";
}
let y = !1;
function lt(t) {
  y = t;
}
let $;
function Q(t) {
  if (t === null)
    throw Gt(), gt;
  return $ = t;
}
function Ft() {
  return Q(
    /** @type {TemplateNode} */
    /* @__PURE__ */ et($)
  );
}
function A(t) {
  if (y) {
    if (/* @__PURE__ */ et($) !== null)
      throw Gt(), gt;
    $ = t;
  }
}
function Le() {
  for (var t = 0, n = $; ; ) {
    if (n.nodeType === 8) {
      var e = (
        /** @type {Comment} */
        n.data
      );
      if (e === vn) {
        if (t === 0) return n;
        t -= 1;
      } else (e === hn || e === _n) && (t += 1);
    }
    var r = (
      /** @type {TemplateNode} */
      /* @__PURE__ */ et(n)
    );
    n.remove(), n = r;
  }
}
const Vn = /* @__PURE__ */ new Set(), Ut = /* @__PURE__ */ new Set();
function Ie(t) {
  for (var n = 0; n < t.length; n++)
    Vn.add(t[n]);
  for (var e of Ut)
    e(t);
}
function At(t) {
  var C;
  var n = this, e = (
    /** @type {Node} */
    n.ownerDocument
  ), r = t.type, i = ((C = t.composedPath) == null ? void 0 : C.call(t)) || [], s = (
    /** @type {null | Element} */
    i[0] || t.target
  ), l = 0, a = t.__root;
  if (a) {
    var o = i.indexOf(a);
    if (o !== -1 && (n === document || n === /** @type {any} */
    window)) {
      t.__root = n;
      return;
    }
    var f = i.indexOf(n);
    if (f === -1)
      return;
    o <= f && (l = o);
  }
  if (s = /** @type {Element} */
  i[l] || t.target, s !== n) {
    Ct(t, "currentTarget", {
      configurable: !0,
      get() {
        return s || e;
      }
    });
    var c = w, u = v;
    dt(null), J(null);
    try {
      for (var d, b = []; s !== null; ) {
        var h = s.assignedSlot || s.parentNode || /** @type {any} */
        s.host || null;
        try {
          var p = s["__" + r];
          if (p !== void 0 && !/** @type {any} */
          s.disabled)
            if (ie(p)) {
              var [D, ...I] = p;
              D.apply(s, [t, ...I]);
            } else
              p.call(s, t);
        } catch (m) {
          d ? b.push(m) : d = m;
        }
        if (t.cancelBubble || h === n || h === null)
          break;
        s = h;
      }
      if (d) {
        for (let m of b)
          queueMicrotask(() => {
            throw m;
          });
        throw d;
      }
    } finally {
      t.__root = n, delete t.currentTarget, dt(c), J(u);
    }
  }
}
function Fe(t) {
  var n = document.createElement("template");
  return n.innerHTML = t, n.content;
}
function ut(t, n) {
  var e = (
    /** @type {Effect} */
    v
  );
  e.nodes_start === null && (e.nodes_start = t, e.nodes_end = n);
}
// @__NO_SIDE_EFFECTS__
function P(t, n) {
  var e = (n & ee) !== 0, r = (n & re) !== 0, i, s = !t.startsWith("<!>");
  return () => {
    if (y)
      return ut($, null), $;
    i === void 0 && (i = Fe(s ? t : "<!>" + t), e || (i = /** @type {Node} */
    /* @__PURE__ */ ht(i)));
    var l = (
      /** @type {TemplateNode} */
      r ? document.importNode(i, !0) : i.cloneNode(!0)
    );
    if (e) {
      var a = (
        /** @type {TemplateNode} */
        /* @__PURE__ */ ht(l)
      ), o = (
        /** @type {TemplateNode} */
        l.lastChild
      );
      ut(a, o);
    } else
      ut(l, l);
    return l;
  };
}
function ze() {
  if (y)
    return ut($, null), $;
  var t = document.createDocumentFragment(), n = document.createComment(""), e = bt();
  return t.append(n, e), ut(n, e), t;
}
function O(t, n) {
  if (y) {
    v.nodes_end = $, Ft();
    return;
  }
  t !== null && t.before(
    /** @type {Node} */
    n
  );
}
const Me = ["touchstart", "touchmove"];
function Pe(t) {
  return Me.includes(t);
}
function X(t, n) {
  var e = n == null ? "" : typeof n == "object" ? n + "" : n;
  e !== (t.__t ?? (t.__t = t.nodeValue)) && (t.__t = e, t.nodeValue = e == null ? "" : e + "");
}
function Wn(t, n) {
  return Un(t, n);
}
function je(t, n) {
  Wt(), n.intro = n.intro ?? !1;
  const e = n.target, r = y, i = $;
  try {
    for (var s = (
      /** @type {TemplateNode} */
      /* @__PURE__ */ ht(e)
    ); s && (s.nodeType !== 8 || /** @type {Comment} */
    s.data !== hn); )
      s = /** @type {TemplateNode} */
      /* @__PURE__ */ et(s);
    if (!s)
      throw gt;
    lt(!0), Q(
      /** @type {Comment} */
      s
    ), Ft();
    const l = Un(t, { ...n, anchor: s });
    if ($ === null || $.nodeType !== 8 || /** @type {Comment} */
    $.data !== vn)
      throw Gt(), gt;
    return lt(!1), /**  @type {Exports} */
    l;
  } catch (l) {
    if (l === gt)
      return n.recover === !1 && _e(), Wt(), He(e), lt(!1), Wn(t, n);
    throw l;
  } finally {
    lt(r), Q(i);
  }
}
const rt = /* @__PURE__ */ new Map();
function Un(t, { target: n, anchor: e, props: r = {}, events: i, context: s, intro: l = !0 }) {
  Wt();
  var a = /* @__PURE__ */ new Set(), o = (u) => {
    for (var d = 0; d < u.length; d++) {
      var b = u[d];
      if (!a.has(b)) {
        a.add(b);
        var h = Pe(b);
        n.addEventListener(b, At, { passive: h });
        var p = rt.get(b);
        p === void 0 ? (document.addEventListener(b, At, { passive: h }), rt.set(b, 1)) : rt.set(b, p + 1);
      }
    }
  };
  o(se(Vn)), Ut.add(o);
  var f = void 0, c = An(() => {
    var u = e ?? n.appendChild(bt());
    return Yt(() => {
      if (s) {
        kt({});
        var d = (
          /** @type {ComponentContext} */
          k
        );
        d.c = s;
      }
      i && (r.$$events = i), y && ut(
        /** @type {TemplateNode} */
        u,
        null
      ), f = t(u, r) || {}, y && (v.nodes_end = $), s && Nt();
    }), () => {
      var h;
      for (var d of a) {
        n.removeEventListener(d, At);
        var b = (
          /** @type {number} */
          rt.get(d)
        );
        --b === 0 ? (document.removeEventListener(d, At), rt.delete(d)) : rt.set(d, b);
      }
      Ut.delete(o), Kt.delete(f), u !== e && ((h = u.parentNode) == null || h.removeChild(u));
    };
  });
  return Kt.set(f, c), f;
}
let Kt = /* @__PURE__ */ new WeakMap();
function Be(t) {
  const n = Kt.get(t);
  n && n();
}
function ft(t, n, e, r = null, i = !1) {
  y && Ft();
  var s = t, l = null, a = null, o = null, f = i ? Qt : 0;
  Tn(() => {
    if (o === (o = !!n())) return;
    let c = !1;
    if (y) {
      const u = (
        /** @type {Comment} */
        s.data === _n
      );
      o === u && (s = Le(), Q(s), lt(!1), c = !0);
    }
    o ? (l ? on(l) : l = Yt(() => e(s)), a && an(a, () => {
      a = null;
    })) : (a ? on(a) : r && (a = Yt(() => r(s))), l && an(l, () => {
      l = null;
    })), c && lt(!0);
  }, f), y && (s = $);
}
function Ye(t, n, e, r, i) {
  var a;
  y && Ft();
  var s = (a = n.$$slots) == null ? void 0 : a[e], l = !1;
  s === !0 && (s = n.children, l = !0), s === void 0 || s(t, l ? () => r : r);
}
function zt(t, n) {
  ke(() => {
    var e = t.getRootNode(), r = (
      /** @type {ShadowRoot} */
      e.host ? (
        /** @type {ShadowRoot} */
        e
      ) : (
        /** @type {Document} */
        e.head ?? /** @type {Document} */
        e.ownerDocument.head
      )
    );
    if (!r.querySelector("#" + n.hash)) {
      const i = document.createElement("style");
      i.id = n.hash, i.textContent = n.code, r.appendChild(i);
    }
  });
}
function Z(t, n, e, r) {
  var i = t.__attributes ?? (t.__attributes = {});
  y && (i[n] = t.getAttribute(n), n === "src" || n === "srcset" || n === "href" && t.nodeName === "LINK") || i[n] !== (i[n] = e) && (n === "style" && "__styles" in t && (t.__styles = {}), n === "loading" && (t[fe] = e), e == null ? t.removeAttribute(n) : typeof e != "string" && Kn(t).includes(n) ? t[n] = e : t.setAttribute(n, e));
}
function V(t, n, e) {
  Kn(t).includes(n) ? t[n] = e : Z(t, n, e);
}
var dn = /* @__PURE__ */ new Map();
function Kn(t) {
  var n = dn.get(t.nodeName);
  if (n) return n;
  dn.set(t.nodeName, n = []);
  for (var e, r = ln(t), i = Element.prototype; i !== r; ) {
    e = le(r);
    for (var s in e)
      e[s].set && n.push(s);
    r = ln(r);
  }
  return n;
}
function Ve(t, n) {
  var e = t.__className, r = We(n);
  y && t.className === r ? t.__className = r : (e !== r || y && t.className !== r) && (n == null ? t.removeAttribute("class") : t.className = r, t.__className = r);
}
function We(t) {
  return t ?? "";
}
function Ue(t) {
  for (var n = v, e = v; n !== null && !(n.f & (M | wt)); )
    n = n.parent;
  try {
    return J(n), t();
  } finally {
    J(e);
  }
}
function x(t, n, e, r) {
  var C;
  var i = (e & ne) !== 0, s = !1, l;
  l = /** @type {V} */
  t[n];
  var a = (C = Rt(t, n)) == null ? void 0 : C.set, o = (
    /** @type {V} */
    r
  ), f = !0, c = !1, u = () => (c = !0, f && (f = !1, o = /** @type {V} */
  r), o);
  l === void 0 && r !== void 0 && (a && i && ve(), l = u(), a && a(l));
  var d;
  if (d = () => {
    var m = (
      /** @type {V} */
      t[n]
    );
    return m === void 0 ? u() : (f = !0, c = !1, m);
  }, a) {
    var b = t.$$legacy;
    return function(m, H) {
      return arguments.length > 0 ? ((!H || b || s) && a(H ? d() : m), m) : d();
    };
  }
  var h = !1, p = !1, D = /* @__PURE__ */ wn(l), I = Ue(
    () => /* @__PURE__ */ xe(() => {
      var m = d(), H = st(D), j = (
        /** @type {Derived} */
        w
      );
      return h || m === void 0 && j.f & vt ? (h = !1, p = !0, H) : (p = !1, D.v = m);
    })
  );
  return function(m, H) {
    if (arguments.length > 0) {
      const j = H ? st(I) : m;
      return I.equals(j) || (h = !0, $n(D, j), c && o !== void 0 && (o = j), Oe(() => st(I))), m;
    }
    return st(I);
  };
}
function Ke(t) {
  return new Ge(t);
}
var B, R;
class Ge {
  /**
   * @param {ComponentConstructorOptions & {
   *  component: any;
   * }} options
   */
  constructor(n) {
    /** @type {any} */
    jt(this, B);
    /** @type {Record<string, any>} */
    jt(this, R);
    var s;
    var e = /* @__PURE__ */ new Map(), r = (l, a) => {
      var o = /* @__PURE__ */ wn(a);
      return e.set(l, o), o;
    };
    const i = new Proxy(
      { ...n.props || {}, $$events: {} },
      {
        get(l, a) {
          return st(e.get(a) ?? r(a, Reflect.get(l, a)));
        },
        has(l, a) {
          return st(e.get(a) ?? r(a, Reflect.get(l, a))), Reflect.has(l, a);
        },
        set(l, a, o) {
          return $n(e.get(a) ?? r(a, o), o), Reflect.set(l, a, o);
        }
      }
    );
    Bt(this, R, (n.hydrate ? je : Wn)(n.component, {
      target: n.target,
      props: i,
      context: n.context,
      intro: n.intro ?? !1,
      recover: n.recover
    })), (!((s = n == null ? void 0 : n.props) != null && s.$$host) || n.sync === !1) && g(), Bt(this, B, i.$$events);
    for (const l of Object.keys(T(this, R)))
      l === "$set" || l === "$destroy" || l === "$on" || Ct(this, l, {
        get() {
          return T(this, R)[l];
        },
        /** @param {any} value */
        set(a) {
          T(this, R)[l] = a;
        },
        enumerable: !0
      });
    T(this, R).$set = /** @param {Record<string, any>} next */
    (l) => {
      Object.assign(i, l);
    }, T(this, R).$destroy = () => {
      Be(T(this, R));
    };
  }
  /** @param {Record<string, any>} props */
  $set(n) {
    T(this, R).$set(n);
  }
  /**
   * @param {string} event
   * @param {(...args: any[]) => any} callback
   * @returns {any}
   */
  $on(n, e) {
    T(this, B)[n] = T(this, B)[n] || [];
    const r = (...i) => e.call(this, ...i);
    return T(this, B)[n].push(r), () => {
      T(this, B)[n] = T(this, B)[n].filter(
        /** @param {any} fn */
        (i) => i !== r
      );
    };
  }
  $destroy() {
    T(this, R).$destroy();
  }
}
B = new WeakMap(), R = new WeakMap();
let Gn;
typeof HTMLElement == "function" && (Gn = class extends HTMLElement {
  /**
   * @param {*} $$componentCtor
   * @param {*} $$slots
   * @param {*} use_shadow_dom
   */
  constructor(n, e, r) {
    super();
    /** The Svelte component constructor */
    L(this, "$$ctor");
    /** Slots */
    L(this, "$$s");
    /** @type {any} The Svelte component instance */
    L(this, "$$c");
    /** Whether or not the custom element is connected */
    L(this, "$$cn", !1);
    /** @type {Record<string, any>} Component props data */
    L(this, "$$d", {});
    /** `true` if currently in the process of reflecting component props back to attributes */
    L(this, "$$r", !1);
    /** @type {Record<string, CustomElementPropDefinition>} Props definition (name, reflected, type etc) */
    L(this, "$$p_d", {});
    /** @type {Record<string, EventListenerOrEventListenerObject[]>} Event listeners */
    L(this, "$$l", {});
    /** @type {Map<EventListenerOrEventListenerObject, Function>} Event listener unsubscribe functions */
    L(this, "$$l_u", /* @__PURE__ */ new Map());
    /** @type {any} The managed render effect for reflecting attributes */
    L(this, "$$me");
    this.$$ctor = n, this.$$s = e, r && this.attachShadow({ mode: "open" });
  }
  /**
   * @param {string} type
   * @param {EventListenerOrEventListenerObject} listener
   * @param {boolean | AddEventListenerOptions} [options]
   */
  addEventListener(n, e, r) {
    if (this.$$l[n] = this.$$l[n] || [], this.$$l[n].push(e), this.$$c) {
      const i = this.$$c.$on(n, e);
      this.$$l_u.set(e, i);
    }
    super.addEventListener(n, e, r);
  }
  /**
   * @param {string} type
   * @param {EventListenerOrEventListenerObject} listener
   * @param {boolean | AddEventListenerOptions} [options]
   */
  removeEventListener(n, e, r) {
    if (super.removeEventListener(n, e, r), this.$$c) {
      const i = this.$$l_u.get(e);
      i && (i(), this.$$l_u.delete(e));
    }
  }
  async connectedCallback() {
    if (this.$$cn = !0, !this.$$c) {
      let n = function(i) {
        return (s) => {
          const l = document.createElement("slot");
          i !== "default" && (l.name = i), O(s, l);
        };
      };
      if (await Promise.resolve(), !this.$$cn || this.$$c)
        return;
      const e = {}, r = Je(this);
      for (const i of this.$$s)
        i in r && (i === "default" && !this.$$d.children ? (this.$$d.children = n(i), e.default = !0) : e[i] = n(i));
      for (const i of this.attributes) {
        const s = this.$$g_p(i.name);
        s in this.$$d || (this.$$d[s] = St(s, i.value, this.$$p_d, "toProp"));
      }
      for (const i in this.$$p_d)
        !(i in this.$$d) && this[i] !== void 0 && (this.$$d[i] = this[i], delete this[i]);
      this.$$c = Ke({
        component: this.$$ctor,
        target: this.shadowRoot || this,
        props: {
          ...this.$$d,
          $$slots: e,
          $$host: this
        }
      }), this.$$me = An(() => {
        $e(() => {
          var i;
          this.$$r = !0;
          for (const s of qt(this.$$c)) {
            if (!((i = this.$$p_d[s]) != null && i.reflect)) continue;
            this.$$d[s] = this.$$c[s];
            const l = St(
              s,
              this.$$d[s],
              this.$$p_d,
              "toAttribute"
            );
            l == null ? this.removeAttribute(this.$$p_d[s].attribute || s) : this.setAttribute(this.$$p_d[s].attribute || s, l);
          }
          this.$$r = !1;
        });
      });
      for (const i in this.$$l)
        for (const s of this.$$l[i]) {
          const l = this.$$c.$on(i, s);
          this.$$l_u.set(s, l);
        }
      this.$$l = {};
    }
  }
  // We don't need this when working within Svelte code, but for compatibility of people using this outside of Svelte
  // and setting attributes through setAttribute etc, this is helpful
  /**
   * @param {string} attr
   * @param {string} _oldValue
   * @param {string} newValue
   */
  attributeChangedCallback(n, e, r) {
    var i;
    this.$$r || (n = this.$$g_p(n), this.$$d[n] = St(n, r, this.$$p_d, "toProp"), (i = this.$$c) == null || i.$set({ [n]: this.$$d[n] }));
  }
  disconnectedCallback() {
    this.$$cn = !1, Promise.resolve().then(() => {
      !this.$$cn && this.$$c && (this.$$c.$destroy(), this.$$me(), this.$$c = void 0);
    });
  }
  /**
   * @param {string} attribute_name
   */
  $$g_p(n) {
    return qt(this.$$p_d).find(
      (e) => this.$$p_d[e].attribute === n || !this.$$p_d[e].attribute && e.toLowerCase() === n
    ) || n;
  }
});
function St(t, n, e, r) {
  var s;
  const i = (s = e[t]) == null ? void 0 : s.type;
  if (n = i === "Boolean" && typeof n != "boolean" ? n != null : n, !r || !e[t])
    return n;
  if (r === "toAttribute")
    switch (i) {
      case "Object":
      case "Array":
        return n == null ? null : JSON.stringify(n);
      case "Boolean":
        return n ? "" : null;
      case "Number":
        return n ?? null;
      default:
        return n;
    }
  else
    switch (i) {
      case "Object":
      case "Array":
        return n && JSON.parse(n);
      case "Boolean":
        return n;
      case "Number":
        return n != null ? +n : n;
      default:
        return n;
    }
}
function Je(t) {
  const n = {};
  return t.childNodes.forEach((e) => {
    n[
      /** @type {Element} node */
      e.slot || "default"
    ] = !0;
  }), n;
}
function Mt(t, n, e, r, i, s) {
  let l = class extends Gn {
    constructor() {
      super(t, e, i), this.$$p_d = n;
    }
    static get observedAttributes() {
      return qt(n).map(
        (a) => (n[a].attribute || a).toLowerCase()
      );
    }
  };
  return qt(n).forEach((a) => {
    Ct(l.prototype, a, {
      get() {
        return this.$$c && a in this.$$c ? this.$$c[a] : this.$$d[a];
      },
      set(o) {
        var u;
        o = St(a, o, n), this.$$d[a] = o;
        var f = this.$$c;
        if (f) {
          var c = (u = Rt(f, a)) == null ? void 0 : u.get;
          c ? f[a] = o : f.$set({ [a]: o });
        }
      }
    });
  }), r.forEach((a) => {
    Ct(l.prototype, a, {
      get() {
        var o;
        return (o = this.$$c) == null ? void 0 : o[a];
      }
    });
  }), t.element = /** @type {any} */
  l, l;
}
var Qe = /* @__PURE__ */ P('<button type="button"> </button>');
const Xe = {
  hash: "svelte-1bto172",
  code: `
  .button.svelte-1bto172 {
    display: inline-block;
    cursor: pointer;
    border: 0;
    margin-left: 14px;
    border-radius: 3em;
    font-weight: 700;
    line-height: 1;
    font-family: 'Nunito Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }
  .button--primary.svelte-1bto172 {
    background-color: #1ea7fd;
    color: white;
  }
  .button--secondary.svelte-1bto172 {
    box-shadow: rgba(0, 0, 0, 0.15) 0px 0px 0px 1px inset;
    background-color: transparent;
    color: #333;
  }
  .button--small.svelte-1bto172 {
    padding: 10px 16px;
    font-size: 12px;
  }
  .button--medium.svelte-1bto172 {
    padding: 11px 20px;
    font-size: 14px;
  }
  .button--large.svelte-1bto172 {
    padding: 12px 24px;
    font-size: 16px;
  }
`
};
function Ze(t, n) {
  kt(n, !0), zt(t, Xe);
  const e = x(n, "type", 7, "primary"), r = x(n, "size", 7, "medium"), i = x(n, "label", 7, "Button"), s = x(n, "onClick", 7, void 0);
  var l = Qe();
  l.__click = function(...o) {
    var f;
    (f = s()) == null || f.apply(this, o);
  };
  var a = N(l, !0);
  return A(l), W(() => {
    Ve(l, `${"button button--" + r() + " button--" + e()} svelte-1bto172`), X(a, i());
  }), O(t, l), Nt({
    get type() {
      return e();
    },
    set type(o = "primary") {
      e(o), g();
    },
    get size() {
      return r();
    },
    set size(o = "medium") {
      r(o), g();
    },
    get label() {
      return i();
    },
    set label(o = "Button") {
      i(o), g();
    },
    get onClick() {
      return s();
    },
    set onClick(o = void 0) {
      s(o), g();
    }
  });
}
Ie(["click"]);
customElements.define("apint-button", Mt(Ze, { type: {}, size: {}, label: {}, onClick: {} }, [], [], !0));
var tr = /* @__PURE__ */ P("<span> </span>"), nr = /* @__PURE__ */ P('<img alt="news" class="card_byline_right_image svelte-6f3qpf">'), er = /* @__PURE__ */ P("<span> </span>"), rr = /* @__PURE__ */ P('<a class="card svelte-6f3qpf" target="_blank"><div class="card_top_detail svelte-6f3qpf"> </div> <img alt="card" class="card_hero svelte-6f3qpf"> <div class="card_title svelte-6f3qpf"> </div> <div class="card_byline svelte-6f3qpf"><!> <!> <!></div> <div class="card_description svelte-6f3qpf"> </div></a>');
const ir = {
  hash: "svelte-6f3qpf",
  code: `
    a.svelte-6f3qpf {
      text-decoration: none;
    }

    .card.svelte-6f3qpf {
      display: flex;
      flex-flow: column;

      color: black;
      background-color: #fff;
      box-shadow: rgba(0, 0, 0, 0.2) 0px 1px 5px 0px, rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 3px 1px -2px;
      padding: 16px 20px;
      transition: box-shadow 0.2s ease 0s;
      width: 246px;
      /* height: 370px; */
      margin: 14px;
      position: relative;
      font-family: 'Nunito Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;

      overflow: hidden;
      text-overflow: ellipsis;
      line-clamp: 4;
      column-width: 200vw;
    }

    .card.svelte-6f3qpf:hover {
      box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 5px -1px, rgba(0, 0, 0, 0.14) 0px 6px 10px 0px, rgba(0, 0, 0, 0.12) 0px 1px 18px 0px;
      cursor: pointer;
    }

    .card_top_detail.svelte-6f3qpf {
      display: flex;
      color: #444746;
      flex-direction: row;
      font-family: Google Sans, Roboto, Arial, sans-serif;
      font-size: .875rem;
      font-weight: 400;
      letter-spacing: 0;
      line-height: 1.25rem;
      padding: 0px 4px 12px 4px;
      white-space: nowrap;
      width: 100%;
      justify-content: space-between;
    }

    .card_hero.svelte-6f3qpf {
      /* height: 44%; */
      border-radius: 7px;
      overflow: hidden;
      width: 100%;
      object-fit: cover;
      object-position: 0% 20%;
    }

    .card_title.svelte-6f3qpf {
      margin-top: 10px;
      font-size: 18px;
      font-weight: 500;
      text-overflow: ellipsis;

      /* overflow: hidden; 
      text-overflow: ellipsis;
      white-space: nowrap; */
    }

    .card_byline.svelte-6f3qpf {
      height: 34px;
      margin-top: 2px;
      margin-right: 1px;
      font-size: 13px;
      font-weight: 300;
      color: rgb(0,0,0,.66);
      /* white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis; */
    }

    .card_byline_right_image.svelte-6f3qpf {
      height: 18px;
      position: relative;
      top: 4px;
    }

    .card_description.svelte-6f3qpf {
      height: 54%;

      color: #444746;
      font-size: 13px;
      line-height: 20px;
      margin-top: 8px;
      overflow-y: auto;
    }

    /* (unused) .card_footer {
      display: flex; 
      width: 90%;
      position: absolute;
      bottom: 10px;
    }*/

    /* (unused) .likes_box {
      width: 10%;
    }*/

    /* (unused) .wait {
      cursor: wait;
    }*/

    /* (unused) .likes_box:hover {
      fill: orange;
      color: orange;
    }*/

    /* (unused) .likes_number {
      color: gray;
      position: absolute;
      bottom: -2px;
      right: 26px;
    }*/

    /* (unused) .likes_active {
      fill: rgb(0, 0, 0);
      color: rgb(0, 0, 0);
      /* font-weight: bold; *\\/
    }*/

    /* (unused) .likes_user {
      /* fill: #3367d6;
      color: #3367d6; *\\/

      fill: #e78300;
      color: #e78300;
    }*/

    /* .likes_number:hover {
      color: orange;
    } */

    /* (unused) .likes_icon {
      position: absolute;
      bottom: 2px;
      right: 0px;
    }*/

    /* .likes_icon:hover {
      fill: orange;
    } */

    /* (unused) .tags_box {

      width: 85%;
      display: flex;
      flex-wrap: wrap;
    }*/

    /* (unused) .tag {
      padding: 2px 8px 2px 8px;
      border-radius: 24px;
      font-size: 14px;
      font-weight: bold;
      color: white;
      margin-right: 6px;
      margin-bottom: 4px;
    }*/

    /* (unused) .tag_green {
      background-color: rgb(85, 153, 85);
    }*/

    /* (unused) .tag_red {
      background-color: rgb(240, 74, 74);
    }*/

    /* (unused) .tag_orange {
      background-color: orange;
    }*/

    /* (unused) .tag_blue {
      background-color: #3367d6;
    }*/

    @media (width <= 700px) {
      .card.svelte-6f3qpf {
        padding: 16px 20px;
        width: 84vw;
        margin: 10px 0px;
      }

      .card_hero.svelte-6f3qpf {
        height: 200px;
      }
    }
`
};
function sr(t, n) {
  kt(n, !0), zt(t, ir);
  const e = x(n, "title", 7, ""), r = x(n, "image", 7, ""), i = x(n, "bylineleft", 7, ""), s = x(n, "bylineright", 7, ""), l = x(n, "bylinerightimage", 7, ""), a = x(n, "description", 7, ""), o = x(n, "href", 7, ""), f = x(n, "toplefttext", 7, ""), c = x(n, "height", 7, ""), u = x(n, "width", 7, ""), d = x(n, "maxWidth", 7, ""), b = x(n, "maxHeight", 7, ""), h = x(n, "heroImageStyle", 7, "");
  var p = rr(), D = N(p), I = N(D, !0);
  A(D);
  var C = z(D, 2), m = z(C, 2), H = N(m, !0);
  A(m);
  var j = z(m, 2), tn = N(j);
  ft(tn, i, (_) => {
    var F = tr(), Pt = N(F, !0);
    A(F), W(() => X(Pt, i())), O(_, F);
  });
  var nn = z(tn, 2);
  ft(nn, l, (_) => {
    var F = nr();
    W(() => Z(F, "src", l())), O(_, F);
  });
  var Jn = z(nn, 2);
  ft(Jn, s, (_) => {
    var F = er(), Pt = N(F, !0);
    A(F), W(() => X(Pt, s())), O(_, F);
  }), A(j);
  var en = z(j, 2), Qn = N(en, !0);
  return A(en), A(p), W(() => {
    Z(p, "href", o()), Z(p, "style", `height: ${c() ?? ""}; width: ${u() ?? ""}; max-width: ${d() ?? ""}; max-height: ${b() ?? ""}`), X(I, f()), Z(C, "src", r()), Z(C, "style", h()), X(H, e()), X(Qn, a());
  }), O(t, p), Nt({
    get title() {
      return e();
    },
    set title(_ = "") {
      e(_), g();
    },
    get image() {
      return r();
    },
    set image(_ = "") {
      r(_), g();
    },
    get bylineleft() {
      return i();
    },
    set bylineleft(_ = "") {
      i(_), g();
    },
    get bylineright() {
      return s();
    },
    set bylineright(_ = "") {
      s(_), g();
    },
    get bylinerightimage() {
      return l();
    },
    set bylinerightimage(_ = "") {
      l(_), g();
    },
    get description() {
      return a();
    },
    set description(_ = "") {
      a(_), g();
    },
    get href() {
      return o();
    },
    set href(_ = "") {
      o(_), g();
    },
    get toplefttext() {
      return f();
    },
    set toplefttext(_ = "") {
      f(_), g();
    },
    get height() {
      return c();
    },
    set height(_ = "") {
      c(_), g();
    },
    get width() {
      return u();
    },
    set width(_ = "") {
      u(_), g();
    },
    get maxWidth() {
      return d();
    },
    set maxWidth(_ = "") {
      d(_), g();
    },
    get maxHeight() {
      return b();
    },
    set maxHeight(_ = "") {
      b(_), g();
    },
    get heroImageStyle() {
      return h();
    },
    set heroImageStyle(_ = "") {
      h(_), g();
    }
  });
}
customElements.define("apint-card", Mt(
  sr,
  {
    title: {},
    image: {},
    bylineleft: {},
    bylineright: {},
    bylinerightimage: {},
    description: {},
    href: {},
    toplefttext: {},
    height: {},
    width: {},
    maxWidth: {},
    maxHeight: {},
    heroImageStyle: {}
  },
  [],
  [],
  !0
));
var lr = /* @__PURE__ */ P('<img width="32px" height="32px" alt="home">'), ar = /* @__PURE__ */ P("<apint-button></apint-button>", 2), or = /* @__PURE__ */ P("<apint-button></apint-button><apint-button></apint-button>", 3), ur = /* @__PURE__ */ P('<header><div class="header svelte-nr1gc1"><div><!>  <h1 class="svelte-nr1gc1"> </h1></div> <div><!></div></div></header>');
const fr = {
  hash: "svelte-nr1gc1",
  code: `
  .header.svelte-nr1gc1 {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    padding: 15px 20px;
    font-family: 'Nunito Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  /* (unused) .header svg {
    display: inline-block;
    vertical-align: top;
  }*/

  .header.svelte-nr1gc1 h1:where(.svelte-nr1gc1) {
    display: inline-block;
    vertical-align: top;
    margin: 6px 0 6px 10px;
    font-weight: 700;
    font-size: 20px;
    line-height: 1;
  }

  /* (unused) .header button + button {
    margin-left: 10px;
  }*/

  /* (unused) .header .welcome {
    margin-right: 10px;
    color: #333;
    font-size: 14px;
  }*/
`
};
function cr(t, n) {
  kt(n, !0), zt(t, fr);
  const e = x(n, "title", 7, "Apint.org"), r = x(n, "supportuser", 7, !1), i = x(n, "user", 7, void 0), s = x(n, "icon", 7, "");
  var l = ur(), a = N(l), o = N(a), f = N(o);
  ft(f, s, (h) => {
    var p = lr();
    W(() => Z(p, "src", s())), O(h, p);
  });
  var c = z(f, 2), u = N(c, !0);
  A(c), A(o);
  var d = z(o, 2), b = N(d);
  return ft(
    b,
    () => r() && i(),
    (h) => {
      var p = ar();
      V(p, "label", "Log out"), V(p, "type", "primary"), O(h, p);
    },
    (h) => {
      var p = ze(), D = cn(p);
      ft(
        D,
        r,
        (I) => {
          var C = or(), m = cn(C);
          V(m, "type", "secondary"), V(m, "label", "Log in");
          var H = z(m);
          V(H, "type", "primary"), V(H, "label", "Sign up"), O(I, C);
        },
        null,
        !0
      ), O(h, p);
    }
  ), A(d), A(a), A(l), W(() => X(u, e())), O(t, l), Nt({
    get title() {
      return e();
    },
    set title(h = "Apint.org") {
      e(h), g();
    },
    get supportuser() {
      return r();
    },
    set supportuser(h = !1) {
      r(h), g();
    },
    get user() {
      return i();
    },
    set user(h = void 0) {
      i(h), g();
    },
    get icon() {
      return s();
    },
    set icon(h = "") {
      s(h), g();
    }
  });
}
customElements.define("apint-header", Mt(
  cr,
  {
    title: {},
    supportuser: { type: "Boolean" },
    user: {},
    icon: {}
  },
  [],
  [],
  !0
));
var dr = /* @__PURE__ */ P('<article><apint-header></apint-header> <section class="page svelte-109aq1a"><!></section></article>', 2);
const hr = {
  hash: "svelte-109aq1a",
  code: `
  .page.svelte-109aq1a {
    margin: 0 auto;
    padding: 14px 20px;
    max-width: 944px;
    color: #333;
    font-size: 14px;
    line-height: 24px;
    font-family: 'Nunito Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  /* (unused) h2 {
    display: inline-block;
    vertical-align: top;
    font-weight: 700;
    font-size: 32px;
    line-height: 1;
    width: 100%;
    margin-left: 10px;
  }*/

  /* (unused) .container_wrap {
    display: flex;
    flex-flow: row wrap;
    margin: 4px 4px 14px 4px;
    width: 100%;
    justify-content: center;
  }*/

  /* (unused) .page p {
    margin: 1em 0;
  }*/

  /* (unused) .page a {
    color: #1ea7fd;
    text-decoration: none;
  }*/

  /* (unused) .page ul {
    margin: 1em 0;
    padding-left: 30px;
  }*/

  /* (unused) .page li {
    margin-bottom: 8px;
  }*/

  /* (unused) .page .tip {
    display: inline-block;
    vertical-align: top;
    margin-right: 10px;
    border-radius: 1em;
    background: #e7fdd8;
    padding: 4px 12px;
    color: #66bf3c;
    font-weight: 700;
    font-size: 11px;
    line-height: 12px;
  }*/

  /* (unused) .page .tip-wrapper {
    margin-top: 40px;
    margin-bottom: 40px;
    font-size: 13px;
    line-height: 20px;
  }*/

  /* (unused) .page .tip-wrapper svg {
    display: inline-block;
    vertical-align: top;
    margin-top: 3px;
    margin-right: 4px;
    width: 12px;
    height: 12px;
  }*/

  /* (unused) .page .tip-wrapper svg path {
    fill: #1ea7fd;
  }*/

  @media (width <= 700px) {
    .page.svelte-109aq1a {
      padding: 4px 4px;
    }

    /* (unused) .page .container_wrap {
      margin: 4px 0px 4px 0px;
      width: 98%;
      justify-content: center;
    }*/
  }
`
};
function _r(t, n) {
  kt(n, !0), zt(t, hr);
  const e = x(n, "title", 7, "Apint.org"), r = x(n, "icon", 7, "");
  var i = dr(), s = N(i), l = z(s, 2), a = N(l);
  return Ye(a, n, "default", {}), A(l), A(i), W(() => {
    V(s, "title", e()), V(s, "icon", r());
  }), O(t, i), Nt({
    get title() {
      return e();
    },
    set title(o = "Apint.org") {
      e(o), g();
    },
    get icon() {
      return r();
    },
    set icon(o = "") {
      r(o), g();
    }
  });
}
customElements.define("apint-page", Mt(_r, { title: {}, icon: {} }, ["default"], [], !0));
export {
  Ze as ApintButton,
  sr as ApintCard,
  cr as ApintHeader,
  _r as ApintPage
};
