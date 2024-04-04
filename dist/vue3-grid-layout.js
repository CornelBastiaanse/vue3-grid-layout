import './style.css';
var Ci = Object.defineProperty;
var Pi = (e, t, i) => t in e ? Ci(e, t, { enumerable: !0, configurable: !0, writable: !0, value: i }) : e[t] = i;
var Dt = (e, t, i) => (Pi(e, typeof t != "symbol" ? t + "" : t, i), i);
import { getCurrentInstance as Ai, defineComponent as Fn, inject as Oi, ref as P, computed as Xt, watch as F, onBeforeUnmount as Nn, onMounted as jn, useSlots as ki, openBlock as je, createElementBlock as Xe, normalizeClass as dn, unref as He, normalizeStyle as Ye, renderSlot as Xn, createCommentVNode as Ri, provide as Hi, onBeforeMount as $i, nextTick as St, withDirectives as Bi, createVNode as Li, vShow as Wi } from "vue";
function Fi(e) {
  let t = 0, i;
  for (let n = 0, o = e.length; n < o; n++)
    i = e[n].y + e[n].h, i > t && (t = i);
  return t;
}
function Ge(e) {
  const t = Array(e.length);
  for (let i = 0, n = e.length; i < n; i++)
    t[i] = Ni(e[i]);
  return t;
}
function Ni(e) {
  return JSON.parse(JSON.stringify(e));
}
function Yn(e, t) {
  return !(e === t || e.x + e.w <= t.x || e.x >= t.x + t.w || e.y + e.h <= t.y || e.y >= t.y + t.h);
}
function Gt(e, t, i) {
  const n = qn(e), o = Un(e), r = Array(e.length);
  for (let s = 0, a = o.length; s < a; s++) {
    let l = o[s];
    l.static || (l = ji(n, l, t, i), n.push(l)), r[e.indexOf(l)] = l, l.moved = !1;
  }
  return r;
}
function ji(e, t, i, n) {
  if (i)
    for (; t.y > 0 && !se(e, t); )
      t.y--;
  else if (n) {
    const r = n[t.i].y;
    for (; t.y > r && !se(e, t); )
      t.y--;
  }
  let o;
  for (; o = se(e, t); )
    t.y = o.y + o.h;
  return t;
}
function Xi(e, t) {
  const i = qn(e);
  for (let n = 0, o = e.length; n < o; n++) {
    const r = e[n];
    if (r.x + r.w > t.cols && (r.x = t.cols - r.w), r.x < 0 && (r.x = 0, r.w = t.cols), !r.static)
      i.push(r);
    else
      for (; se(i, r); )
        r.y++;
  }
  return e;
}
function hn(e, t) {
  for (let i = 0, n = e.length; i < n; i++)
    if (e[i].i === t)
      return e[i];
}
function se(e, t) {
  for (let i = 0, n = e.length; i < n; i++)
    if (Yn(e[i], t))
      return e[i];
}
function Gn(e, t) {
  return e.filter((i) => Yn(i, t));
}
function qn(e) {
  return e.filter((t) => t.static);
}
function qe(e, t, i, n, o, r) {
  if (t.static)
    return e;
  const s = t.x, a = t.y, l = n && t.y > n;
  typeof i == "number" && (t.x = i), typeof n == "number" && (t.y = n), t.moved = !0;
  let c = Un(e);
  l && (c = c.reverse());
  const u = Gn(c, t);
  if (r && u.length)
    return t.x = s, t.y = a, t.moved = !1, e;
  for (let f = 0, g = u.length; f < g; f++) {
    const m = u[f];
    m.moved || t.y > m.y && t.y - m.y > m.h / 4 || (m.static ? e = pn(e, m, t, o) : e = pn(e, t, m, o));
  }
  return e;
}
function pn(e, t, i, n) {
  if (n) {
    const r = {
      x: i.x,
      y: i.y,
      w: i.w,
      h: i.h,
      i: "-1"
    };
    if (r.y = Math.max(t.y - i.h, 0), !se(e, r))
      return qe(e, i, void 0, r.y, !1);
  }
  return qe(e, i, void 0, i.y + 1, !1);
}
function Yi(e, t, i, n) {
  const o = "translate3d(" + t + "px," + e + "px, 0)";
  return {
    transform: o,
    WebkitTransform: o,
    MozTransform: o,
    msTransform: o,
    OTransform: o,
    width: i + "px",
    height: n + "px",
    position: "absolute"
  };
}
function Gi(e, t, i, n) {
  const o = "translate3d(" + t * -1 + "px," + e + "px, 0)";
  return {
    transform: o,
    WebkitTransform: o,
    MozTransform: o,
    msTransform: o,
    OTransform: o,
    width: i + "px",
    height: n + "px",
    position: "absolute"
  };
}
function qi(e, t, i, n) {
  return {
    top: e + "px",
    left: t + "px",
    width: i + "px",
    height: n + "px",
    position: "absolute"
  };
}
function Ui(e, t, i, n) {
  return {
    top: e + "px",
    right: t + "px",
    width: i + "px",
    height: n + "px",
    position: "absolute"
  };
}
function Un(e) {
  return [].concat(e).sort(function(i, n) {
    return i.y === n.y && i.x === n.x ? 0 : i.y > n.y || i.y === n.y && i.x > n.x ? 1 : -1;
  });
}
function Vi(e, t) {
  t = t || "Layout";
  const i = ["x", "y", "w", "h"], n = [];
  if (!Array.isArray(e))
    throw new Error(t + " must be an array!");
  for (let o = 0, r = e.length; o < r; o++) {
    const s = e[o];
    for (let a = 0; a < i.length; a++)
      if (typeof s[i[a]] != "number")
        throw new Error(
          "VueGridLayout: " + t + "[" + o + "]." + i[a] + " must be a number!"
        );
    if (s.i === void 0 || s.i === null)
      throw new Error("VueGridLayout: " + t + "[" + o + "].i cannot be null!");
    if (typeof s.i != "number" && typeof s.i != "string")
      throw new Error("VueGridLayout: " + t + "[" + o + "].i must be a string or number!");
    if (n.indexOf(s.i) >= 0)
      throw new Error("VueGridLayout: " + t + "[" + o + "].i must be unique!");
    if (n.push(s.i), s.static !== void 0 && typeof s.static != "boolean")
      throw new Error("VueGridLayout: " + t + "[" + o + "].static must be a boolean!");
  }
}
function gn(e) {
  return Ki(e);
}
function Ki(e) {
  const t = e.target, i = t.offsetParent || document.body, n = t.offsetParent === document.body ? { left: 0, top: 0 } : i.getBoundingClientRect(), o = e.clientX + i.scrollLeft - n.left, r = e.clientY + i.scrollTop - n.top;
  return { x: o, y: r };
}
function vn(e, t, i, n) {
  return Ji(e) ? {
    deltaX: i - e,
    deltaY: n - t,
    lastX: e,
    lastY: t,
    x: i,
    y: n
  } : {
    deltaX: 0,
    deltaY: 0,
    lastX: i,
    lastY: n,
    x: i,
    y: n
  };
}
function Ji(e) {
  return typeof e == "number" && !isNaN(e);
}
function Zi(e, t) {
  const i = Vn(e);
  let n = i[0];
  for (let o = 1, r = i.length; o < r; o++) {
    const s = i[o];
    t > e[s] && (n = s);
  }
  return n;
}
function Ue(e, t) {
  if (!t[e])
    throw new Error(
      "ResponsiveGridLayout: `cols` entry for breakpoint " + e + " is missing!"
    );
  return t[e];
}
function Qi(e, t, i, n, o, r, s) {
  if (t[n])
    return Ge(t[n]);
  let a = e;
  const l = Vn(i), c = l.slice(l.indexOf(n));
  for (let u = 0, f = c.length; u < f; u++) {
    const g = c[u];
    if (t[g]) {
      a = t[g];
      break;
    }
  }
  return a = Ge(a || []), Gt(Xi(a, { cols: r }), s);
}
function Vn(e) {
  return Object.keys(e).sort(function(i, n) {
    return e[i] - e[n];
  });
}
let to = "auto";
function eo() {
  return typeof document < "u";
}
function Kn() {
  return typeof window < "u";
}
function mn() {
  return eo() ? typeof document.dir < "u" ? document.dir : document.getElementsByTagName("html")[0].getAttribute("dir") || "auto" : to;
}
function no(e, t) {
  return Kn ? (window.addEventListener(e, t), !0) : (t(), !1);
}
function io(e, t) {
  !Kn || window.removeEventListener(e, t);
}
const V = {
  init: oo,
  document: null,
  DocumentFragment: null,
  SVGElement: null,
  SVGSVGElement: null,
  SVGElementInstance: null,
  Element: null,
  HTMLElement: null,
  Event: null,
  Touch: null,
  PointerEvent: null
};
function Yt() {
}
function oo(e) {
  const t = e;
  V.document = t.document, V.DocumentFragment = t.DocumentFragment || Yt, V.SVGElement = t.SVGElement || Yt, V.SVGSVGElement = t.SVGSVGElement || Yt, V.SVGElementInstance = t.SVGElementInstance || Yt, V.Element = t.Element || Yt, V.HTMLElement = t.HTMLElement || V.Element, V.Event = t.Event, V.Touch = t.Touch || Yt, V.PointerEvent = t.PointerEvent || t.MSPointerEvent;
}
var Jn = (e) => !!(e && e.Window) && e instanceof e.Window;
let Zn, Ot;
function Qn(e) {
  Zn = e;
  const t = e.document.createTextNode("");
  t.ownerDocument !== e.document && typeof e.wrap == "function" && e.wrap(t) === t && (e = e.wrap(e)), Ot = e;
}
typeof window < "u" && !!window && Qn(window);
function Wt(e) {
  return Jn(e) ? e : (e.ownerDocument || e).defaultView || Ot.window;
}
const ro = (e) => e === Ot || Jn(e), so = (e) => Te(e) && e.nodeType === 11, Te = (e) => !!e && typeof e == "object", ti = (e) => typeof e == "function", ao = (e) => typeof e == "number", lo = (e) => typeof e == "boolean", co = (e) => typeof e == "string", uo = (e) => {
  if (!e || typeof e != "object")
    return !1;
  const t = Wt(e) || Ot;
  return /object|function/.test(typeof Element) ? e instanceof Element || e instanceof t.Element : e.nodeType === 1 && typeof e.nodeName == "string";
}, fo = (e) => Te(e) && !!e.constructor && /function Object\b/.test(e.constructor.toString()), ho = (e) => Te(e) && typeof e.length < "u" && ti(e.splice);
var p = {
  window: ro,
  docFrag: so,
  object: Te,
  func: ti,
  number: ao,
  bool: lo,
  string: co,
  element: uo,
  plainObject: fo,
  array: ho
};
const tt = {
  init: po,
  supportsTouch: null,
  supportsPointerEvent: null,
  isIOS7: null,
  isIOS: null,
  isIe9: null,
  isOperaMobile: null,
  prefixedMatchesSelector: null,
  pEventTypes: null,
  wheelEvent: null
};
function po(e) {
  const t = V.Element, i = e.navigator || {};
  tt.supportsTouch = "ontouchstart" in e || p.func(e.DocumentTouch) && V.document instanceof e.DocumentTouch, tt.supportsPointerEvent = i.pointerEnabled !== !1 && !!V.PointerEvent, tt.isIOS = /iP(hone|od|ad)/.test(i.platform), tt.isIOS7 = /iP(hone|od|ad)/.test(i.platform) && /OS 7[^\d]/.test(i.appVersion), tt.isIe9 = /MSIE 9/.test(i.userAgent), tt.isOperaMobile = i.appName === "Opera" && tt.supportsTouch && /Presto/.test(i.userAgent), tt.prefixedMatchesSelector = "matches" in t.prototype ? "matches" : "webkitMatchesSelector" in t.prototype ? "webkitMatchesSelector" : "mozMatchesSelector" in t.prototype ? "mozMatchesSelector" : "oMatchesSelector" in t.prototype ? "oMatchesSelector" : "msMatchesSelector", tt.pEventTypes = tt.supportsPointerEvent ? V.PointerEvent === e.MSPointerEvent ? {
    up: "MSPointerUp",
    down: "MSPointerDown",
    over: "mouseover",
    out: "mouseout",
    move: "MSPointerMove",
    cancel: "MSPointerCancel"
  } : {
    up: "pointerup",
    down: "pointerdown",
    over: "pointerover",
    out: "pointerout",
    move: "pointermove",
    cancel: "pointercancel"
  } : null, tt.wheelEvent = V.document && "onmousewheel" in V.document ? "mousewheel" : "wheel";
}
const ei = (e, t) => {
  for (const i of t)
    e.push(i);
  return e;
}, ni = (e) => ei([], e), ze = (e, t) => {
  for (let i = 0; i < e.length; i++)
    if (t(e[i], i, e))
      return i;
  return -1;
}, ye = (e, t) => e[ze(e, t)];
function Kt(e) {
  const t = {};
  for (const i in e) {
    const n = e[i];
    p.plainObject(n) ? t[i] = Kt(n) : p.array(n) ? t[i] = ni(n) : t[i] = n;
  }
  return t;
}
function C(e, t) {
  for (const n in t)
    e[n] = t[n];
  return e;
}
let yn = 0, Et, Bt;
function go(e) {
  if (Et = e.requestAnimationFrame, Bt = e.cancelAnimationFrame, !Et) {
    const t = ["ms", "moz", "webkit", "o"];
    for (const i of t)
      Et = e[`${i}RequestAnimationFrame`], Bt = e[`${i}CancelAnimationFrame`] || e[`${i}CancelRequestAnimationFrame`];
  }
  Et = Et && Et.bind(e), Bt = Bt && Bt.bind(e), Et || (Et = (t) => {
    const i = Date.now(), n = Math.max(0, 16 - (i - yn)), o = e.setTimeout(() => {
      t(i + n);
    }, n);
    return yn = i + n, o;
  }, Bt = (t) => clearTimeout(t));
}
var qt = {
  request: (e) => Et(e),
  cancel: (e) => Bt(e),
  init: go
};
function Ut(e, t) {
  let i = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : (o) => !0, n = arguments.length > 3 ? arguments[3] : void 0;
  if (n = n || {}, p.string(e) && e.search(" ") !== -1 && (e = bn(e)), p.array(e))
    return e.forEach((o) => Ut(o, t, i, n)), n;
  if (p.object(e) && (t = e, e = ""), p.func(t) && i(e))
    n[e] = n[e] || [], n[e].push(t);
  else if (p.array(t))
    for (const o of t)
      Ut(e, o, i, n);
  else if (p.object(t))
    for (const o in t) {
      const r = bn(o).map((s) => `${e}${s}`);
      Ut(r, t[o], i, n);
    }
  return n;
}
function bn(e) {
  return e.trim().split(/ +/);
}
function xn(e, t) {
  for (const i of t) {
    if (e.immediatePropagationStopped)
      break;
    i(e);
  }
}
class ii {
  constructor(t) {
    this.options = void 0, this.types = {}, this.propagationStopped = !1, this.immediatePropagationStopped = !1, this.global = void 0, this.options = C({}, t || {});
  }
  fire(t) {
    let i;
    const n = this.global;
    (i = this.types[t.type]) && xn(t, i), !t.propagationStopped && n && (i = n[t.type]) && xn(t, i);
  }
  on(t, i) {
    const n = Ut(t, i);
    for (t in n)
      this.types[t] = ei(this.types[t] || [], n[t]);
  }
  off(t, i) {
    const n = Ut(t, i);
    for (t in n) {
      const o = this.types[t];
      if (!(!o || !o.length))
        for (const r of n[t]) {
          const s = o.indexOf(r);
          s !== -1 && o.splice(s, 1);
        }
    }
  }
  getRect(t) {
    return null;
  }
}
function Lt(e, t) {
  if (e.contains)
    return e.contains(t);
  for (; t; ) {
    if (t === e)
      return !0;
    t = t.parentNode;
  }
  return !1;
}
function oi(e, t) {
  for (; p.element(e); ) {
    if (Ft(e, t))
      return e;
    e = kt(e);
  }
  return null;
}
function kt(e) {
  let t = e.parentNode;
  if (p.docFrag(t)) {
    for (; (t = t.host) && p.docFrag(t); )
      ;
    return t;
  }
  return t;
}
function Ft(e, t) {
  return Ot !== Zn && (t = t.replace(/\/deep\//g, " ")), e[tt.prefixedMatchesSelector](t);
}
function Ve(e, t, i) {
  for (; p.element(e); ) {
    if (Ft(e, t))
      return !0;
    if (e = kt(e), e === i)
      return Ft(e, t);
  }
  return !1;
}
function wn(e) {
  return e.correspondingUseElement || e;
}
function vo(e) {
  return e = e || Ot, {
    x: e.scrollX || e.document.documentElement.scrollLeft,
    y: e.scrollY || e.document.documentElement.scrollTop
  };
}
function Qe(e) {
  const t = e instanceof V.SVGElement ? e.getBoundingClientRect() : e.getClientRects()[0];
  return t && {
    left: t.left,
    right: t.right,
    top: t.top,
    bottom: t.bottom,
    width: t.width || t.right - t.left,
    height: t.height || t.bottom - t.top
  };
}
function tn(e) {
  const t = Qe(e);
  if (!tt.isIOS7 && t) {
    const i = vo(Wt(e));
    t.left += i.x, t.right += i.x, t.top += i.y, t.bottom += i.y;
  }
  return t;
}
function Sn(e) {
  return p.string(e) ? (V.document.querySelector(e), !0) : !1;
}
const mo = ["webkit", "moz"];
function ri(e, t) {
  e.__set || (e.__set = {});
  for (const i in t)
    mo.some((n) => i.indexOf(n) === 0) || typeof e[i] != "function" && i !== "__set" && Object.defineProperty(e, i, {
      get() {
        return i in e.__set ? e.__set[i] : e.__set[i] = t[i];
      },
      set(n) {
        e.__set[i] = n;
      },
      configurable: !0
    });
  return e;
}
var _e = (e, t) => Math.sqrt(e * e + t * t);
function $e(e, t) {
  e.page = e.page || {}, e.page.x = t.page.x, e.page.y = t.page.y, e.client = e.client || {}, e.client.x = t.client.x, e.client.y = t.client.y, e.timeStamp = t.timeStamp;
}
function yo(e, t, i) {
  e.page.x = i.page.x - t.page.x, e.page.y = i.page.y - t.page.y, e.client.x = i.client.x - t.client.x, e.client.y = i.client.y - t.client.y, e.timeStamp = i.timeStamp - t.timeStamp;
}
function bo(e, t) {
  const i = Math.max(t.timeStamp / 1e3, 1e-3);
  e.page.x = t.page.x / i, e.page.y = t.page.y / i, e.client.x = t.client.x / i, e.client.y = t.client.y / i, e.timeStamp = i;
}
function xo(e) {
  e.page.x = 0, e.page.y = 0, e.client.x = 0, e.client.y = 0;
}
function si(e) {
  return e instanceof V.Event || e instanceof V.Touch;
}
function xe(e, t, i) {
  return i = i || {}, e = e || "page", i.x = t[e + "X"], i.y = t[e + "Y"], i;
}
function wo(e, t) {
  return t = t || {
    x: 0,
    y: 0
  }, tt.isOperaMobile && si(e) ? (xe("screen", e, t), t.x += window.scrollX, t.y += window.scrollY) : xe("page", e, t), t;
}
function So(e, t) {
  return t = t || {}, tt.isOperaMobile && si(e) ? xe("screen", e, t) : xe("client", e, t), t;
}
function we(e) {
  return p.number(e.pointerId) ? e.pointerId : e.identifier;
}
function Eo(e, t, i) {
  const n = t.length > 1 ? ai(t) : t[0];
  wo(n, e.page), So(n, e.client), e.timeStamp = i;
}
function en(e) {
  const t = [];
  return p.array(e) ? (t[0] = e[0], t[1] = e[1]) : e.type === "touchend" ? e.touches.length === 1 ? (t[0] = e.touches[0], t[1] = e.changedTouches[0]) : e.touches.length === 0 && (t[0] = e.changedTouches[0], t[1] = e.changedTouches[1]) : (t[0] = e.touches[0], t[1] = e.touches[1]), t;
}
function ai(e) {
  const t = {
    pageX: 0,
    pageY: 0,
    clientX: 0,
    clientY: 0,
    screenX: 0,
    screenY: 0
  };
  for (const i of e)
    for (const n in t)
      t[n] += i[n];
  for (const i in t)
    t[i] /= e.length;
  return t;
}
function Io(e) {
  if (!e.length)
    return null;
  const t = en(e), i = Math.min(t[0].pageX, t[1].pageX), n = Math.min(t[0].pageY, t[1].pageY), o = Math.max(t[0].pageX, t[1].pageX), r = Math.max(t[0].pageY, t[1].pageY);
  return {
    x: i,
    y: n,
    left: i,
    top: n,
    right: o,
    bottom: r,
    width: o - i,
    height: r - n
  };
}
function To(e, t) {
  const i = t + "X", n = t + "Y", o = en(e), r = o[0][i] - o[1][i], s = o[0][n] - o[1][n];
  return _e(r, s);
}
function zo(e, t) {
  const i = t + "X", n = t + "Y", o = en(e), r = o[1][i] - o[0][i], s = o[1][n] - o[0][n];
  return 180 * Math.atan2(s, r) / Math.PI;
}
function _o(e) {
  return p.string(e.pointerType) ? e.pointerType : p.number(e.pointerType) ? [void 0, void 0, "touch", "pen", "mouse"][e.pointerType] : /touch/.test(e.type || "") || e instanceof V.Touch ? "touch" : "mouse";
}
function li(e) {
  const t = p.func(e.composedPath) ? e.composedPath() : e.path;
  return [wn(t ? t[0] : e.target), wn(e.currentTarget)];
}
function ne() {
  return {
    page: {
      x: 0,
      y: 0
    },
    client: {
      x: 0,
      y: 0
    },
    timeStamp: 0
  };
}
function Mo(e) {
  var t;
  const i = [], n = {}, o = [], r = {
    add: s,
    remove: a,
    addDelegate: l,
    removeDelegate: c,
    delegateListener: u,
    delegateUseCapture: f,
    delegatedEvents: n,
    documents: o,
    targets: i,
    supportsOptions: !1,
    supportsPassive: !1
  };
  (t = e.document) == null || t.createElement("div").addEventListener("test", null, {
    get capture() {
      return r.supportsOptions = !0;
    },
    get passive() {
      return r.supportsPassive = !0;
    }
  }), e.events = r;
  function s(g, m, b, S) {
    if (!g.addEventListener)
      return;
    const I = ie(S);
    let A = ye(i, (T) => T.eventTarget === g);
    A || (A = {
      eventTarget: g,
      events: {}
    }, i.push(A)), A.events[m] || (A.events[m] = []), ye(A.events[m], (T) => T.func === b && ge(T.options, I)) || (g.addEventListener(m, b, r.supportsOptions ? I : I.capture), A.events[m].push({
      func: b,
      options: I
    }));
  }
  function a(g, m, b, S) {
    if (!g.addEventListener || !g.removeEventListener)
      return;
    const I = ze(i, (v) => v.eventTarget === g), A = i[I];
    if (!A || !A.events)
      return;
    if (m === "all") {
      for (m in A.events)
        A.events.hasOwnProperty(m) && a(g, m, "all");
      return;
    }
    let T = !1;
    const z = A.events[m];
    if (z)
      if (b === "all") {
        for (let v = z.length - 1; v >= 0; v--) {
          const d = z[v];
          a(g, m, d.func, d.options);
        }
        return;
      } else {
        const v = ie(S);
        for (let d = 0; d < z.length; d++) {
          const O = z[d];
          if (O.func === b && ge(O.options, v)) {
            g.removeEventListener(m, b, r.supportsOptions ? v : v.capture), z.splice(d, 1), z.length === 0 && (delete A.events[m], T = !0);
            break;
          }
        }
      }
    T && !Object.keys(A.events).length && i.splice(I, 1);
  }
  function l(g, m, b, S, I) {
    const A = ie(I);
    if (!n[b]) {
      n[b] = [];
      for (const v of o)
        s(v, b, u), s(v, b, f, !0);
    }
    const T = n[b];
    let z = ye(T, (v) => v.selector === g && v.context === m);
    z || (z = {
      selector: g,
      context: m,
      listeners: []
    }, T.push(z)), z.listeners.push({
      func: S,
      options: A
    });
  }
  function c(g, m, b, S, I) {
    const A = ie(I), T = n[b];
    let z = !1, v;
    if (!!T)
      for (v = T.length - 1; v >= 0; v--) {
        const d = T[v];
        if (d.selector === g && d.context === m) {
          const {
            listeners: O
          } = d;
          for (let x = O.length - 1; x >= 0; x--) {
            const L = O[x];
            if (L.func === S && ge(L.options, A)) {
              O.splice(x, 1), O.length || (T.splice(v, 1), a(m, b, u), a(m, b, f, !0)), z = !0;
              break;
            }
          }
          if (z)
            break;
        }
      }
  }
  function u(g, m) {
    const b = ie(m), S = new Do(g), I = n[g.type], [A] = li(g);
    let T = A;
    for (; p.element(T); ) {
      for (let z = 0; z < I.length; z++) {
        const v = I[z], {
          selector: d,
          context: O
        } = v;
        if (Ft(T, d) && Lt(O, A) && Lt(O, T)) {
          const {
            listeners: x
          } = v;
          S.currentTarget = T;
          for (const L of x)
            ge(L.options, b) && L.func(S);
        }
      }
      T = kt(T);
    }
  }
  function f(g) {
    return u.call(this, g, !0);
  }
  return r;
}
class Do {
  constructor(t) {
    this.currentTarget = void 0, this.originalEvent = void 0, this.type = void 0, this.originalEvent = t, ri(this, t);
  }
  preventOriginalDefault() {
    this.originalEvent.preventDefault();
  }
  stopPropagation() {
    this.originalEvent.stopPropagation();
  }
  stopImmediatePropagation() {
    this.originalEvent.stopImmediatePropagation();
  }
}
function ie(e) {
  return p.object(e) ? {
    capture: !!e.capture,
    passive: !!e.passive
  } : {
    capture: !!e,
    passive: !1
  };
}
function ge(e, t) {
  return e === t ? !0 : typeof e == "boolean" ? !!t.capture === e && !t.passive : !!e.capture == !!t.capture && !!e.passive == !!t.passive;
}
var Co = {
  id: "events",
  install: Mo
};
const Po = function(t) {
  return /^(always|never|auto)$/.test(t) ? (this.options.preventDefault = t, this) : p.bool(t) ? (this.options.preventDefault = t ? "always" : "never", this) : this.options.preventDefault;
};
function Ao(e, t, i) {
  const n = e.options.preventDefault;
  if (n !== "never") {
    if (n === "always") {
      i.preventDefault();
      return;
    }
    if (t.events.supportsPassive && /^touch(start|move)$/.test(i.type)) {
      const o = Wt(i.target).document, r = t.getDocOptions(o);
      if (!(r && r.events) || r.events.passive !== !1)
        return;
    }
    /^(mouse|pointer|touch)*(down|start)/i.test(i.type) || p.element(i.target) && Ft(i.target, "input,select,textarea,[contenteditable=true],[contenteditable=true] *") || i.preventDefault();
  }
}
function Oo(e) {
  let {
    interaction: t,
    event: i
  } = e;
  t.interactable && t.interactable.checkAndPreventDefault(i);
}
function ko(e) {
  const {
    Interactable: t
  } = e;
  t.prototype.preventDefault = Po, t.prototype.checkAndPreventDefault = function(i) {
    return Ao(this, e, i);
  }, e.interactions.docEvents.push({
    type: "dragstart",
    listener(i) {
      for (const n of e.interactions.list)
        if (n.element && (n.element === i.target || Lt(n.element, i.target))) {
          n.interactable.checkAndPreventDefault(i);
          return;
        }
    }
  });
}
var Ro = {
  id: "core/interactablePreventDefault",
  install: ko,
  listeners: ["down", "move", "up", "cancel"].reduce((e, t) => (e[`interactions:${t}`] = Oo, e), {})
};
function le(e, t) {
  let i = !1;
  return function() {
    return i || (Ot.console.warn(t), i = !0), e.apply(this, arguments);
  };
}
function ci(e, t) {
  return e.name = t.name, e.axis = t.axis, e.edges = t.edges, e;
}
function ui(e, t, i) {
  return e === "parent" ? kt(i) : e === "self" ? t.getRect(i) : oi(i, e);
}
function ce(e, t, i, n) {
  let o = e;
  return p.string(o) ? o = ui(o, t, i) : p.func(o) && (o = o(...n)), p.element(o) && (o = tn(o)), o;
}
function Me(e) {
  return e && {
    x: "x" in e ? e.x : e.left,
    y: "y" in e ? e.y : e.top
  };
}
function Ho(e) {
  return e && !("left" in e && "top" in e) && (e = C({}, e), e.left = e.x || 0, e.top = e.y || 0, e.right = e.right || e.left + e.width, e.bottom = e.bottom || e.top + e.height), e;
}
function En(e) {
  return e && !("x" in e && "y" in e) && (e = C({}, e), e.x = e.left || 0, e.y = e.top || 0, e.width = e.width || (e.right || 0) - e.x, e.height = e.height || (e.bottom || 0) - e.y), e;
}
function nn(e, t, i) {
  e.left && (t.left += i.x), e.right && (t.right += i.x), e.top && (t.top += i.y), e.bottom && (t.bottom += i.y), t.width = t.right - t.left, t.height = t.bottom - t.top;
}
function on(e, t, i) {
  const n = i && e.options[i], r = n && n.origin || e.options.origin, s = ce(r, e, t, [e && t]);
  return Me(s) || {
    x: 0,
    y: 0
  };
}
class fi {
  constructor(t) {
    this.immediatePropagationStopped = !1, this.propagationStopped = !1, this._interaction = t;
  }
  preventDefault() {
  }
  stopPropagation() {
    this.propagationStopped = !0;
  }
  stopImmediatePropagation() {
    this.immediatePropagationStopped = this.propagationStopped = !0;
  }
}
Object.defineProperty(fi.prototype, "interaction", {
  get() {
    return this._interaction._proxy;
  },
  set() {
  }
});
const di = {
  base: {
    preventDefault: "auto",
    deltaSource: "page"
  },
  perAction: {
    enabled: !1,
    origin: {
      x: 0,
      y: 0
    }
  },
  actions: {}
};
class rn extends fi {
  constructor(t, i, n, o, r, s, a) {
    super(t), this.relatedTarget = null, this.screenX = void 0, this.screenY = void 0, this.button = void 0, this.buttons = void 0, this.ctrlKey = void 0, this.shiftKey = void 0, this.altKey = void 0, this.metaKey = void 0, this.page = void 0, this.client = void 0, this.delta = void 0, this.rect = void 0, this.x0 = void 0, this.y0 = void 0, this.t0 = void 0, this.dt = void 0, this.duration = void 0, this.clientX0 = void 0, this.clientY0 = void 0, this.velocity = void 0, this.speed = void 0, this.swipe = void 0, this.axes = void 0, this.preEnd = void 0, r = r || t.element;
    const l = t.interactable, c = (l && l.options || di).deltaSource, u = on(l, r, n), f = o === "start", g = o === "end", m = f ? this : t.prevEvent, b = f ? t.coords.start : g ? {
      page: m.page,
      client: m.client,
      timeStamp: t.coords.cur.timeStamp
    } : t.coords.cur;
    this.page = C({}, b.page), this.client = C({}, b.client), this.rect = C({}, t.rect), this.timeStamp = b.timeStamp, g || (this.page.x -= u.x, this.page.y -= u.y, this.client.x -= u.x, this.client.y -= u.y), this.ctrlKey = i.ctrlKey, this.altKey = i.altKey, this.shiftKey = i.shiftKey, this.metaKey = i.metaKey, this.button = i.button, this.buttons = i.buttons, this.target = r, this.currentTarget = r, this.preEnd = s, this.type = a || n + (o || ""), this.interactable = l, this.t0 = f ? t.pointers[t.pointers.length - 1].downTime : m.t0, this.x0 = t.coords.start.page.x - u.x, this.y0 = t.coords.start.page.y - u.y, this.clientX0 = t.coords.start.client.x - u.x, this.clientY0 = t.coords.start.client.y - u.y, f || g ? this.delta = {
      x: 0,
      y: 0
    } : this.delta = {
      x: this[c].x - m[c].x,
      y: this[c].y - m[c].y
    }, this.dt = t.coords.delta.timeStamp, this.duration = this.timeStamp - this.t0, this.velocity = C({}, t.coords.velocity[c]), this.speed = _e(this.velocity.x, this.velocity.y), this.swipe = g || o === "inertiastart" ? this.getSwipe() : null;
  }
  getSwipe() {
    const t = this._interaction;
    if (t.prevEvent.speed < 600 || this.timeStamp - t.prevEvent.timeStamp > 150)
      return null;
    let i = 180 * Math.atan2(t.prevEvent.velocityY, t.prevEvent.velocityX) / Math.PI;
    const n = 22.5;
    i < 0 && (i += 360);
    const o = 135 - n <= i && i < 225 + n, r = 225 - n <= i && i < 315 + n, s = !o && (315 - n <= i || i < 45 + n), a = !r && 45 - n <= i && i < 135 + n;
    return {
      up: r,
      down: a,
      left: o,
      right: s,
      angle: i,
      speed: t.prevEvent.speed,
      velocity: {
        x: t.prevEvent.velocityX,
        y: t.prevEvent.velocityY
      }
    };
  }
  preventDefault() {
  }
  stopImmediatePropagation() {
    this.immediatePropagationStopped = this.propagationStopped = !0;
  }
  stopPropagation() {
    this.propagationStopped = !0;
  }
}
Object.defineProperties(rn.prototype, {
  pageX: {
    get() {
      return this.page.x;
    },
    set(e) {
      this.page.x = e;
    }
  },
  pageY: {
    get() {
      return this.page.y;
    },
    set(e) {
      this.page.y = e;
    }
  },
  clientX: {
    get() {
      return this.client.x;
    },
    set(e) {
      this.client.x = e;
    }
  },
  clientY: {
    get() {
      return this.client.y;
    },
    set(e) {
      this.client.y = e;
    }
  },
  dx: {
    get() {
      return this.delta.x;
    },
    set(e) {
      this.delta.x = e;
    }
  },
  dy: {
    get() {
      return this.delta.y;
    },
    set(e) {
      this.delta.y = e;
    }
  },
  velocityX: {
    get() {
      return this.velocity.x;
    },
    set(e) {
      this.velocity.x = e;
    }
  },
  velocityY: {
    get() {
      return this.velocity.y;
    },
    set(e) {
      this.velocity.y = e;
    }
  }
});
class $o {
  constructor(t, i, n, o, r) {
    this.id = void 0, this.pointer = void 0, this.event = void 0, this.downTime = void 0, this.downTarget = void 0, this.id = t, this.pointer = i, this.event = n, this.downTime = o, this.downTarget = r;
  }
}
let Bo = /* @__PURE__ */ function(e) {
  return e.interactable = "", e.element = "", e.prepared = "", e.pointerIsDown = "", e.pointerWasMoved = "", e._proxy = "", e;
}({}), Lo = /* @__PURE__ */ function(e) {
  return e.start = "", e.move = "", e.end = "", e.stop = "", e.interacting = "", e;
}({}), Wo = 0;
class Fo {
  get pointerMoveTolerance() {
    return 1;
  }
  constructor(t) {
    this.interactable = null, this.element = null, this.rect = null, this._rects = void 0, this.edges = null, this._scopeFire = void 0, this.prepared = {
      name: null,
      axis: null,
      edges: null
    }, this.pointerType = void 0, this.pointers = [], this.downEvent = null, this.downPointer = {}, this._latestPointer = {
      pointer: null,
      event: null,
      eventTarget: null
    }, this.prevEvent = null, this.pointerIsDown = !1, this.pointerWasMoved = !1, this._interacting = !1, this._ending = !1, this._stopped = !0, this._proxy = void 0, this.simulation = null, this.doMove = le(function(r) {
      this.move(r);
    }, "The interaction.doMove() method has been renamed to interaction.move()"), this.coords = {
      start: ne(),
      prev: ne(),
      cur: ne(),
      delta: ne(),
      velocity: ne()
    }, this._id = Wo++;
    let {
      pointerType: i,
      scopeFire: n
    } = t;
    this._scopeFire = n, this.pointerType = i;
    const o = this;
    this._proxy = {};
    for (const r in Bo)
      Object.defineProperty(this._proxy, r, {
        get() {
          return o[r];
        }
      });
    for (const r in Lo)
      Object.defineProperty(this._proxy, r, {
        value: function() {
          return o[r](...arguments);
        }
      });
    this._scopeFire("interactions:new", {
      interaction: this
    });
  }
  pointerDown(t, i, n) {
    const o = this.updatePointer(t, i, n, !0), r = this.pointers[o];
    this._scopeFire("interactions:down", {
      pointer: t,
      event: i,
      eventTarget: n,
      pointerIndex: o,
      pointerInfo: r,
      type: "down",
      interaction: this
    });
  }
  start(t, i, n) {
    return this.interacting() || !this.pointerIsDown || this.pointers.length < (t.name === "gesture" ? 2 : 1) || !i.options[t.name].enabled ? !1 : (ci(this.prepared, t), this.interactable = i, this.element = n, this.rect = i.getRect(n), this.edges = this.prepared.edges ? C({}, this.prepared.edges) : {
      left: !0,
      right: !0,
      top: !0,
      bottom: !0
    }, this._stopped = !1, this._interacting = this._doPhase({
      interaction: this,
      event: this.downEvent,
      phase: "start"
    }) && !this._stopped, this._interacting);
  }
  pointerMove(t, i, n) {
    !this.simulation && !(this.modification && this.modification.endResult) && this.updatePointer(t, i, n, !1);
    const o = this.coords.cur.page.x === this.coords.prev.page.x && this.coords.cur.page.y === this.coords.prev.page.y && this.coords.cur.client.x === this.coords.prev.client.x && this.coords.cur.client.y === this.coords.prev.client.y;
    let r, s;
    this.pointerIsDown && !this.pointerWasMoved && (r = this.coords.cur.client.x - this.coords.start.client.x, s = this.coords.cur.client.y - this.coords.start.client.y, this.pointerWasMoved = _e(r, s) > this.pointerMoveTolerance);
    const a = this.getPointerIndex(t), l = {
      pointer: t,
      pointerIndex: a,
      pointerInfo: this.pointers[a],
      event: i,
      type: "move",
      eventTarget: n,
      dx: r,
      dy: s,
      duplicate: o,
      interaction: this
    };
    o || bo(this.coords.velocity, this.coords.delta), this._scopeFire("interactions:move", l), !o && !this.simulation && (this.interacting() && (l.type = null, this.move(l)), this.pointerWasMoved && $e(this.coords.prev, this.coords.cur));
  }
  move(t) {
    (!t || !t.event) && xo(this.coords.delta), t = C({
      pointer: this._latestPointer.pointer,
      event: this._latestPointer.event,
      eventTarget: this._latestPointer.eventTarget,
      interaction: this
    }, t || {}), t.phase = "move", this._doPhase(t);
  }
  pointerUp(t, i, n, o) {
    let r = this.getPointerIndex(t);
    r === -1 && (r = this.updatePointer(t, i, n, !1));
    const s = /cancel$/i.test(i.type) ? "cancel" : "up";
    this._scopeFire(`interactions:${s}`, {
      pointer: t,
      pointerIndex: r,
      pointerInfo: this.pointers[r],
      event: i,
      eventTarget: n,
      type: s,
      curEventTarget: o,
      interaction: this
    }), this.simulation || this.end(i), this.removePointer(t, i);
  }
  documentBlur(t) {
    this.end(t), this._scopeFire("interactions:blur", {
      event: t,
      type: "blur",
      interaction: this
    });
  }
  end(t) {
    this._ending = !0, t = t || this._latestPointer.event;
    let i;
    this.interacting() && (i = this._doPhase({
      event: t,
      interaction: this,
      phase: "end"
    })), this._ending = !1, i === !0 && this.stop();
  }
  currentAction() {
    return this._interacting ? this.prepared.name : null;
  }
  interacting() {
    return this._interacting;
  }
  stop() {
    this._scopeFire("interactions:stop", {
      interaction: this
    }), this.interactable = this.element = null, this._interacting = !1, this._stopped = !0, this.prepared.name = this.prevEvent = null;
  }
  getPointerIndex(t) {
    const i = we(t);
    return this.pointerType === "mouse" || this.pointerType === "pen" ? this.pointers.length - 1 : ze(this.pointers, (n) => n.id === i);
  }
  getPointerInfo(t) {
    return this.pointers[this.getPointerIndex(t)];
  }
  updatePointer(t, i, n, o) {
    const r = we(t);
    let s = this.getPointerIndex(t), a = this.pointers[s];
    return o = o === !1 ? !1 : o || /(down|start)$/i.test(i.type), a ? a.pointer = t : (a = new $o(r, t, i, null, null), s = this.pointers.length, this.pointers.push(a)), Eo(this.coords.cur, this.pointers.map((l) => l.pointer), this._now()), yo(this.coords.delta, this.coords.prev, this.coords.cur), o && (this.pointerIsDown = !0, a.downTime = this.coords.cur.timeStamp, a.downTarget = n, ri(this.downPointer, t), this.interacting() || ($e(this.coords.start, this.coords.cur), $e(this.coords.prev, this.coords.cur), this.downEvent = i, this.pointerWasMoved = !1)), this._updateLatestPointer(t, i, n), this._scopeFire("interactions:update-pointer", {
      pointer: t,
      event: i,
      eventTarget: n,
      down: o,
      pointerInfo: a,
      pointerIndex: s,
      interaction: this
    }), s;
  }
  removePointer(t, i) {
    const n = this.getPointerIndex(t);
    if (n === -1)
      return;
    const o = this.pointers[n];
    this._scopeFire("interactions:remove-pointer", {
      pointer: t,
      event: i,
      eventTarget: null,
      pointerIndex: n,
      pointerInfo: o,
      interaction: this
    }), this.pointers.splice(n, 1), this.pointerIsDown = !1;
  }
  _updateLatestPointer(t, i, n) {
    this._latestPointer.pointer = t, this._latestPointer.event = i, this._latestPointer.eventTarget = n;
  }
  destroy() {
    this._latestPointer.pointer = null, this._latestPointer.event = null, this._latestPointer.eventTarget = null;
  }
  _createPreparedEvent(t, i, n, o) {
    return new rn(this, t, this.prepared.name, i, this.element, n, o);
  }
  _fireEvent(t) {
    var i;
    (i = this.interactable) == null || i.fire(t), (!this.prevEvent || t.timeStamp >= this.prevEvent.timeStamp) && (this.prevEvent = t);
  }
  _doPhase(t) {
    const {
      event: i,
      phase: n,
      preEnd: o,
      type: r
    } = t, {
      rect: s
    } = this;
    if (s && n === "move" && (nn(this.edges, s, this.coords.delta[this.interactable.options.deltaSource]), s.width = s.right - s.left, s.height = s.bottom - s.top), this._scopeFire(`interactions:before-action-${n}`, t) === !1)
      return !1;
    const l = t.iEvent = this._createPreparedEvent(i, n, o, r);
    return this._scopeFire(`interactions:action-${n}`, t), n === "start" && (this.prevEvent = l), this._fireEvent(l), this._scopeFire(`interactions:after-action-${n}`, t), !0;
  }
  _now() {
    return Date.now();
  }
}
const Ke = {
  methodOrder: ["simulationResume", "mouseOrPen", "hasPointer", "idle"],
  search(e) {
    for (const t of Ke.methodOrder) {
      const i = Ke[t](e);
      if (i)
        return i;
    }
    return null;
  },
  simulationResume(e) {
    let {
      pointerType: t,
      eventType: i,
      eventTarget: n,
      scope: o
    } = e;
    if (!/down|start/i.test(i))
      return null;
    for (const r of o.interactions.list) {
      let s = n;
      if (r.simulation && r.simulation.allowResume && r.pointerType === t)
        for (; s; ) {
          if (s === r.element)
            return r;
          s = kt(s);
        }
    }
    return null;
  },
  mouseOrPen(e) {
    let {
      pointerId: t,
      pointerType: i,
      eventType: n,
      scope: o
    } = e;
    if (i !== "mouse" && i !== "pen")
      return null;
    let r;
    for (const s of o.interactions.list)
      if (s.pointerType === i) {
        if (s.simulation && !In(s, t))
          continue;
        if (s.interacting())
          return s;
        r || (r = s);
      }
    if (r)
      return r;
    for (const s of o.interactions.list)
      if (s.pointerType === i && !(/down/i.test(n) && s.simulation))
        return s;
    return null;
  },
  hasPointer(e) {
    let {
      pointerId: t,
      scope: i
    } = e;
    for (const n of i.interactions.list)
      if (In(n, t))
        return n;
    return null;
  },
  idle(e) {
    let {
      pointerType: t,
      scope: i
    } = e;
    for (const n of i.interactions.list) {
      if (n.pointers.length === 1) {
        const o = n.interactable;
        if (o && !(o.options.gesture && o.options.gesture.enabled))
          continue;
      } else if (n.pointers.length >= 2)
        continue;
      if (!n.interacting() && t === n.pointerType)
        return n;
    }
    return null;
  }
};
function In(e, t) {
  return e.pointers.some((i) => {
    let {
      id: n
    } = i;
    return n === t;
  });
}
const hi = ["pointerDown", "pointerMove", "pointerUp", "updatePointer", "removePointer", "windowBlur"];
function No(e) {
  const t = {};
  for (const r of hi)
    t[r] = pi(r, e);
  const i = tt.pEventTypes;
  let n;
  V.PointerEvent ? n = [{
    type: i.down,
    listener: o
  }, {
    type: i.down,
    listener: t.pointerDown
  }, {
    type: i.move,
    listener: t.pointerMove
  }, {
    type: i.up,
    listener: t.pointerUp
  }, {
    type: i.cancel,
    listener: t.pointerUp
  }] : n = [{
    type: "mousedown",
    listener: t.pointerDown
  }, {
    type: "mousemove",
    listener: t.pointerMove
  }, {
    type: "mouseup",
    listener: t.pointerUp
  }, {
    type: "touchstart",
    listener: o
  }, {
    type: "touchstart",
    listener: t.pointerDown
  }, {
    type: "touchmove",
    listener: t.pointerMove
  }, {
    type: "touchend",
    listener: t.pointerUp
  }, {
    type: "touchcancel",
    listener: t.pointerUp
  }], n.push({
    type: "blur",
    listener(r) {
      for (const s of e.interactions.list)
        s.documentBlur(r);
    }
  }), e.prevTouchTime = 0, e.Interaction = class extends Fo {
    get pointerMoveTolerance() {
      return e.interactions.pointerMoveTolerance;
    }
    set pointerMoveTolerance(r) {
      e.interactions.pointerMoveTolerance = r;
    }
    _now() {
      return e.now();
    }
  }, e.interactions = {
    list: [],
    new(r) {
      r.scopeFire = (a, l) => e.fire(a, l);
      const s = new e.Interaction(r);
      return e.interactions.list.push(s), s;
    },
    listeners: t,
    docEvents: n,
    pointerMoveTolerance: 1
  };
  function o() {
    for (const r of e.interactions.list)
      if (!(!r.pointerIsDown || r.pointerType !== "touch" || r._interacting))
        for (const s of r.pointers)
          e.documents.some((a) => {
            let {
              doc: l
            } = a;
            return Lt(l, s.downTarget);
          }) || r.removePointer(s.pointer, s.event);
  }
  e.usePlugin(Ro);
}
function pi(e, t) {
  return function(i) {
    const n = t.interactions.list, o = _o(i), [r, s] = li(i), a = [];
    if (/^touch/.test(i.type)) {
      t.prevTouchTime = t.now();
      for (const l of i.changedTouches) {
        const c = l, u = we(c), f = {
          pointer: c,
          pointerId: u,
          pointerType: o,
          eventType: i.type,
          eventTarget: r,
          curEventTarget: s,
          scope: t
        }, g = Tn(f);
        a.push([f.pointer, f.eventTarget, f.curEventTarget, g]);
      }
    } else {
      let l = !1;
      if (!tt.supportsPointerEvent && /mouse/.test(i.type)) {
        for (let c = 0; c < n.length && !l; c++)
          l = n[c].pointerType !== "mouse" && n[c].pointerIsDown;
        l = l || t.now() - t.prevTouchTime < 500 || i.timeStamp === 0;
      }
      if (!l) {
        const c = {
          pointer: i,
          pointerId: we(i),
          pointerType: o,
          eventType: i.type,
          curEventTarget: s,
          eventTarget: r,
          scope: t
        }, u = Tn(c);
        a.push([c.pointer, c.eventTarget, c.curEventTarget, u]);
      }
    }
    for (const [l, c, u, f] of a)
      f[e](l, i, c, u);
  };
}
function Tn(e) {
  const {
    pointerType: t,
    scope: i
  } = e, o = {
    interaction: Ke.search(e),
    searchDetails: e
  };
  return i.fire("interactions:find", o), o.interaction || i.interactions.new({
    pointerType: t
  });
}
function Be(e, t) {
  let {
    doc: i,
    scope: n,
    options: o
  } = e;
  const {
    interactions: {
      docEvents: r
    },
    events: s
  } = n, a = s[t];
  n.browser.isIOS && !o.events && (o.events = {
    passive: !1
  });
  for (const c in s.delegatedEvents)
    a(i, c, s.delegateListener), a(i, c, s.delegateUseCapture, !0);
  const l = o && o.events;
  for (const {
    type: c,
    listener: u
  } of r)
    a(i, c, u, l);
}
const jo = {
  id: "core/interactions",
  install: No,
  listeners: {
    "scope:add-document": (e) => Be(e, "add"),
    "scope:remove-document": (e) => Be(e, "remove"),
    "interactable:unset": (e, t) => {
      let {
        interactable: i
      } = e;
      for (let n = t.interactions.list.length - 1; n >= 0; n--) {
        const o = t.interactions.list[n];
        o.interactable === i && (o.stop(), t.fire("interactions:destroy", {
          interaction: o
        }), o.destroy(), t.interactions.list.length > 2 && t.interactions.list.splice(n, 1));
      }
    }
  },
  onDocSignal: Be,
  doOnInteractions: pi,
  methodNames: hi
};
function Se(e, t) {
  if (t.phaselessTypes[e])
    return !0;
  for (const i in t.map)
    if (e.indexOf(i) === 0 && e.substr(i.length) in t.phases)
      return !0;
  return !1;
}
var At = /* @__PURE__ */ function(e) {
  return e[e.On = 0] = "On", e[e.Off = 1] = "Off", e;
}(At || {});
class Xo {
  get _defaults() {
    return {
      base: {},
      perAction: {},
      actions: {}
    };
  }
  constructor(t, i, n, o) {
    this.target = void 0, this.options = void 0, this._actions = void 0, this.events = new ii(), this._context = void 0, this._win = void 0, this._doc = void 0, this._scopeEvents = void 0, this._actions = i.actions, this.target = t, this._context = i.context || n, this._win = Wt(Sn(t) ? this._context : t), this._doc = this._win.document, this._scopeEvents = o, this.set(i);
  }
  setOnEvents(t, i) {
    return p.func(i.onstart) && this.on(`${t}start`, i.onstart), p.func(i.onmove) && this.on(`${t}move`, i.onmove), p.func(i.onend) && this.on(`${t}end`, i.onend), p.func(i.oninertiastart) && this.on(`${t}inertiastart`, i.oninertiastart), this;
  }
  updatePerActionListeners(t, i, n) {
    var o;
    const r = (o = this._actions.map[t]) == null ? void 0 : o.filterEventType, s = (a) => (r == null || r(a)) && Se(a, this._actions);
    (p.array(i) || p.object(i)) && this._onOff(At.Off, t, i, void 0, s), (p.array(n) || p.object(n)) && this._onOff(At.On, t, n, void 0, s);
  }
  setPerAction(t, i) {
    const n = this._defaults;
    for (const o in i) {
      const r = o, s = this.options[t], a = i[r];
      r === "listeners" && this.updatePerActionListeners(t, s.listeners, a), p.array(a) ? s[r] = ni(a) : p.plainObject(a) ? (s[r] = C(s[r] || {}, Kt(a)), p.object(n.perAction[r]) && "enabled" in n.perAction[r] && (s[r].enabled = a.enabled !== !1)) : p.bool(a) && p.object(n.perAction[r]) ? s[r].enabled = a : s[r] = a;
    }
  }
  getRect(t) {
    return t = t || (p.element(this.target) ? this.target : null), p.string(this.target) && (t = t || this._context.querySelector(this.target)), tn(t);
  }
  rectChecker(t) {
    return p.func(t) ? (this.getRect = (i) => {
      const n = C({}, t.apply(this, i));
      return "width" in n || (n.width = n.right - n.left, n.height = n.bottom - n.top), n;
    }, this) : t === null ? (delete this.getRect, this) : this.getRect;
  }
  _backCompatOption(t, i) {
    if (Sn(i) || p.object(i)) {
      this.options[t] = i;
      for (const n in this._actions.map)
        this.options[n][t] = i;
      return this;
    }
    return this.options[t];
  }
  origin(t) {
    return this._backCompatOption("origin", t);
  }
  deltaSource(t) {
    return t === "page" || t === "client" ? (this.options.deltaSource = t, this) : this.options.deltaSource;
  }
  getAllElements() {
    const {
      target: t
    } = this;
    return p.string(t) ? Array.from(this._context.querySelectorAll(t)) : p.func(t) && t.getAllElements ? t.getAllElements() : p.element(t) ? [t] : [];
  }
  context() {
    return this._context;
  }
  inContext(t) {
    return this._context === t.ownerDocument || Lt(this._context, t);
  }
  testIgnoreAllow(t, i, n) {
    return !this.testIgnore(t.ignoreFrom, i, n) && this.testAllow(t.allowFrom, i, n);
  }
  testAllow(t, i, n) {
    return t ? p.element(n) ? p.string(t) ? Ve(n, t, i) : p.element(t) ? Lt(t, n) : !1 : !1 : !0;
  }
  testIgnore(t, i, n) {
    return !t || !p.element(n) ? !1 : p.string(t) ? Ve(n, t, i) : p.element(t) ? Lt(t, n) : !1;
  }
  fire(t) {
    return this.events.fire(t), this;
  }
  _onOff(t, i, n, o, r) {
    p.object(i) && !p.array(i) && (o = n, n = null);
    const s = Ut(i, n, r);
    for (let a in s) {
      a === "wheel" && (a = tt.wheelEvent);
      for (const l of s[a])
        Se(a, this._actions) ? this.events[t === At.On ? "on" : "off"](a, l) : p.string(this.target) ? this._scopeEvents[t === At.On ? "addDelegate" : "removeDelegate"](this.target, this._context, a, l, o) : this._scopeEvents[t === At.On ? "add" : "remove"](this.target, a, l, o);
    }
    return this;
  }
  on(t, i, n) {
    return this._onOff(At.On, t, i, n);
  }
  off(t, i, n) {
    return this._onOff(At.Off, t, i, n);
  }
  set(t) {
    const i = this._defaults;
    p.object(t) || (t = {}), this.options = Kt(i.base);
    for (const n in this._actions.methodDict) {
      const o = n, r = this._actions.methodDict[o];
      this.options[o] = {}, this.setPerAction(o, C(C({}, i.perAction), i.actions[o])), this[r](t[o]);
    }
    for (const n in t) {
      if (n === "getRect") {
        this.rectChecker(t.getRect);
        continue;
      }
      p.func(this[n]) && this[n](t[n]);
    }
    return this;
  }
  unset() {
    if (p.string(this.target))
      for (const t in this._scopeEvents.delegatedEvents) {
        const i = this._scopeEvents.delegatedEvents[t];
        for (let n = i.length - 1; n >= 0; n--) {
          const {
            selector: o,
            context: r,
            listeners: s
          } = i[n];
          o === this.target && r === this._context && i.splice(n, 1);
          for (let a = s.length - 1; a >= 0; a--)
            this._scopeEvents.removeDelegate(this.target, this._context, t, s[a][0], s[a][1]);
        }
      }
    else
      this._scopeEvents.remove(this.target, "all");
  }
}
class Yo {
  constructor(t) {
    this.list = [], this.selectorMap = {}, this.scope = void 0, this.scope = t, t.addListeners({
      "interactable:unset": (i) => {
        let {
          interactable: n
        } = i;
        const {
          target: o
        } = n, r = p.string(o) ? this.selectorMap[o] : o[this.scope.id], s = ze(r, (a) => a === n);
        r.splice(s, 1);
      }
    });
  }
  new(t, i) {
    i = C(i || {}, {
      actions: this.scope.actions
    });
    const n = new this.scope.Interactable(t, i, this.scope.document, this.scope.events);
    return this.scope.addDocument(n._doc), this.list.push(n), p.string(t) ? (this.selectorMap[t] || (this.selectorMap[t] = []), this.selectorMap[t].push(n)) : (n.target[this.scope.id] || Object.defineProperty(t, this.scope.id, {
      value: [],
      configurable: !0
    }), t[this.scope.id].push(n)), this.scope.fire("interactable:new", {
      target: t,
      options: i,
      interactable: n,
      win: this.scope._win
    }), n;
  }
  getExisting(t, i) {
    const n = i && i.context || this.scope.document, o = p.string(t), r = o ? this.selectorMap[t] : t[this.scope.id];
    if (!!r)
      return ye(r, (s) => s._context === n && (o || s.inContext(t)));
  }
  forEachMatch(t, i) {
    for (const n of this.list) {
      let o;
      if ((p.string(n.target) ? p.element(t) && Ft(t, n.target) : t === n.target) && n.inContext(t) && (o = i(n)), o !== void 0)
        return o;
    }
  }
}
function Go(e) {
  const t = (i, n) => {
    let o = e.interactables.getExisting(i, n);
    return o || (o = e.interactables.new(i, n), o.events.global = t.globalEvents), o;
  };
  return t.getPointerAverage = ai, t.getTouchBBox = Io, t.getTouchDistance = To, t.getTouchAngle = zo, t.getElementRect = tn, t.getElementClientRect = Qe, t.matchesSelector = Ft, t.closest = oi, t.globalEvents = {}, t.version = "1.10.27", t.scope = e, t.use = function(i, n) {
    return this.scope.usePlugin(i, n), this;
  }, t.isSet = function(i, n) {
    return !!this.scope.interactables.get(i, n && n.context);
  }, t.on = le(function(n, o, r) {
    if (p.string(n) && n.search(" ") !== -1 && (n = n.trim().split(/ +/)), p.array(n)) {
      for (const s of n)
        this.on(s, o, r);
      return this;
    }
    if (p.object(n)) {
      for (const s in n)
        this.on(s, n[s], o);
      return this;
    }
    return Se(n, this.scope.actions) ? this.globalEvents[n] ? this.globalEvents[n].push(o) : this.globalEvents[n] = [o] : this.scope.events.add(this.scope.document, n, o, {
      options: r
    }), this;
  }, "The interact.on() method is being deprecated"), t.off = le(function(n, o, r) {
    if (p.string(n) && n.search(" ") !== -1 && (n = n.trim().split(/ +/)), p.array(n)) {
      for (const s of n)
        this.off(s, o, r);
      return this;
    }
    if (p.object(n)) {
      for (const s in n)
        this.off(s, n[s], o);
      return this;
    }
    if (Se(n, this.scope.actions)) {
      let s;
      n in this.globalEvents && (s = this.globalEvents[n].indexOf(o)) !== -1 && this.globalEvents[n].splice(s, 1);
    } else
      this.scope.events.remove(this.scope.document, n, o, r);
    return this;
  }, "The interact.off() method is being deprecated"), t.debug = function() {
    return this.scope;
  }, t.supportsTouch = function() {
    return tt.supportsTouch;
  }, t.supportsPointerEvent = function() {
    return tt.supportsPointerEvent;
  }, t.stop = function() {
    for (const i of this.scope.interactions.list)
      i.stop();
    return this;
  }, t.pointerMoveTolerance = function(i) {
    return p.number(i) ? (this.scope.interactions.pointerMoveTolerance = i, this) : this.scope.interactions.pointerMoveTolerance;
  }, t.addDocument = function(i, n) {
    this.scope.addDocument(i, n);
  }, t.removeDocument = function(i) {
    this.scope.removeDocument(i);
  }, t;
}
class qo {
  constructor() {
    this.id = `__interact_scope_${Math.floor(Math.random() * 100)}`, this.isInitialized = !1, this.listenerMaps = [], this.browser = tt, this.defaults = Kt(di), this.Eventable = ii, this.actions = {
      map: {},
      phases: {
        start: !0,
        move: !0,
        end: !0
      },
      methodDict: {},
      phaselessTypes: {}
    }, this.interactStatic = Go(this), this.InteractEvent = rn, this.Interactable = void 0, this.interactables = new Yo(this), this._win = void 0, this.document = void 0, this.window = void 0, this.documents = [], this._plugins = {
      list: [],
      map: {}
    }, this.onWindowUnload = (i) => this.removeDocument(i.target);
    const t = this;
    this.Interactable = class extends Xo {
      get _defaults() {
        return t.defaults;
      }
      set(i) {
        return super.set(i), t.fire("interactable:set", {
          options: i,
          interactable: this
        }), this;
      }
      unset() {
        super.unset();
        const i = t.interactables.list.indexOf(this);
        i < 0 || (t.interactables.list.splice(i, 1), t.fire("interactable:unset", {
          interactable: this
        }));
      }
    };
  }
  addListeners(t, i) {
    this.listenerMaps.push({
      id: i,
      map: t
    });
  }
  fire(t, i) {
    for (const {
      map: {
        [t]: n
      }
    } of this.listenerMaps)
      if (!!n && n(i, this, t) === !1)
        return !1;
  }
  init(t) {
    return this.isInitialized ? this : Uo(this, t);
  }
  pluginIsInstalled(t) {
    const {
      id: i
    } = t;
    return i ? !!this._plugins.map[i] : this._plugins.list.indexOf(t) !== -1;
  }
  usePlugin(t, i) {
    if (!this.isInitialized)
      return this;
    if (this.pluginIsInstalled(t))
      return this;
    if (t.id && (this._plugins.map[t.id] = t), this._plugins.list.push(t), t.install && t.install(this, i), t.listeners && t.before) {
      let n = 0;
      const o = this.listenerMaps.length, r = t.before.reduce((s, a) => (s[a] = !0, s[zn(a)] = !0, s), {});
      for (; n < o; n++) {
        const s = this.listenerMaps[n].id;
        if (s && (r[s] || r[zn(s)]))
          break;
      }
      this.listenerMaps.splice(n, 0, {
        id: t.id,
        map: t.listeners
      });
    } else
      t.listeners && this.listenerMaps.push({
        id: t.id,
        map: t.listeners
      });
    return this;
  }
  addDocument(t, i) {
    if (this.getDocIndex(t) !== -1)
      return !1;
    const n = Wt(t);
    i = i ? C({}, i) : {}, this.documents.push({
      doc: t,
      options: i
    }), this.events.documents.push(t), t !== this.document && this.events.add(n, "unload", this.onWindowUnload), this.fire("scope:add-document", {
      doc: t,
      window: n,
      scope: this,
      options: i
    });
  }
  removeDocument(t) {
    const i = this.getDocIndex(t), n = Wt(t), o = this.documents[i].options;
    this.events.remove(n, "unload", this.onWindowUnload), this.documents.splice(i, 1), this.events.documents.splice(i, 1), this.fire("scope:remove-document", {
      doc: t,
      window: n,
      scope: this,
      options: o
    });
  }
  getDocIndex(t) {
    for (let i = 0; i < this.documents.length; i++)
      if (this.documents[i].doc === t)
        return i;
    return -1;
  }
  getDocOptions(t) {
    const i = this.getDocIndex(t);
    return i === -1 ? null : this.documents[i].options;
  }
  now() {
    return (this.window.Date || Date).now();
  }
}
function Uo(e, t) {
  return e.isInitialized = !0, p.window(t) && Qn(t), V.init(t), tt.init(t), qt.init(t), e.window = t, e.document = t.document, e.usePlugin(jo), e.usePlugin(Co), e;
}
function zn(e) {
  return e && e.replace(/\/.*$/, "");
}
const gi = new qo(), Vo = gi.interactStatic, Tt = Vo, Ko = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : globalThis;
gi.init(Ko);
function Jo(e) {
  const {
    Interactable: t
  } = e;
  t.prototype.getAction = function(n, o, r, s) {
    const a = Zo(this, o, r, s, e);
    return this.options.actionChecker ? this.options.actionChecker(n, o, a, this, s, r) : a;
  }, t.prototype.ignoreFrom = le(function(i) {
    return this._backCompatOption("ignoreFrom", i);
  }, "Interactable.ignoreFrom() has been deprecated. Use Interactble.draggable({ignoreFrom: newValue})."), t.prototype.allowFrom = le(function(i) {
    return this._backCompatOption("allowFrom", i);
  }, "Interactable.allowFrom() has been deprecated. Use Interactble.draggable({allowFrom: newValue})."), t.prototype.actionChecker = tr, t.prototype.styleCursor = Qo;
}
function Zo(e, t, i, n, o) {
  const r = e.getRect(n), s = t.buttons || {
    0: 1,
    1: 4,
    3: 8,
    4: 16
  }[t.button], a = {
    action: null,
    interactable: e,
    interaction: i,
    element: n,
    rect: r,
    buttons: s
  };
  return o.fire("auto-start:check", a), a.action;
}
function Qo(e) {
  return p.bool(e) ? (this.options.styleCursor = e, this) : e === null ? (delete this.options.styleCursor, this) : this.options.styleCursor;
}
function tr(e) {
  return p.func(e) ? (this.options.actionChecker = e, this) : e === null ? (delete this.options.actionChecker, this) : this.options.actionChecker;
}
const er = {
  id: "auto-start/interactableMethods",
  install: Jo
};
function nr(e) {
  const {
    interactStatic: t,
    defaults: i
  } = e;
  e.usePlugin(er), i.base.actionChecker = null, i.base.styleCursor = !0, C(i.perAction, {
    manualStart: !1,
    max: 1 / 0,
    maxPerElement: 1,
    allowFrom: null,
    ignoreFrom: null,
    mouseButtons: 1
  }), t.maxInteractions = (n) => bi(n, e), e.autoStart = {
    maxInteractions: 1 / 0,
    withinInteractionLimit: De,
    cursorElement: null
  };
}
function ir({
  interaction: e,
  pointer: t,
  event: i,
  eventTarget: n
}, o) {
  if (e.interacting())
    return;
  const r = mi(e, t, i, n, o);
  yi(e, r, o);
}
function or({
  interaction: e,
  pointer: t,
  event: i,
  eventTarget: n
}, o) {
  if (e.pointerType !== "mouse" || e.pointerIsDown || e.interacting())
    return;
  const r = mi(e, t, i, n, o);
  yi(e, r, o);
}
function rr(e, t) {
  const {
    interaction: i
  } = e;
  if (!i.pointerIsDown || i.interacting() || !i.pointerWasMoved || !i.prepared.name)
    return;
  t.fire("autoStart:before-start", e);
  const {
    interactable: n
  } = i, o = i.prepared.name;
  o && n && (n.options[o].manualStart || !De(n, i.element, i.prepared, t) ? i.stop() : (i.start(i.prepared, n, i.element), xi(i, t)));
}
function sr({
  interaction: e
}, t) {
  const {
    interactable: i
  } = e;
  i && i.options.styleCursor && Je(e.element, "", t);
}
function vi(e, t, i, n, o) {
  return t.testIgnoreAllow(t.options[e.name], i, n) && t.options[e.name].enabled && De(t, i, e, o) ? e : null;
}
function ar(e, t, i, n, o, r, s) {
  for (let a = 0, l = n.length; a < l; a++) {
    const c = n[a], u = o[a], f = c.getAction(t, i, e, u);
    if (!f)
      continue;
    const g = vi(f, c, u, r, s);
    if (g)
      return {
        action: g,
        interactable: c,
        element: u
      };
  }
  return {
    action: null,
    interactable: null,
    element: null
  };
}
function mi(e, t, i, n, o) {
  let r = [], s = [], a = n;
  function l(c) {
    r.push(c), s.push(a);
  }
  for (; p.element(a); ) {
    r = [], s = [], o.interactables.forEachMatch(a, l);
    const c = ar(e, t, i, r, s, n, o);
    if (c.action && !c.interactable.options[c.action.name].manualStart)
      return c;
    a = kt(a);
  }
  return {
    action: null,
    interactable: null,
    element: null
  };
}
function yi(e, {
  action: t,
  interactable: i,
  element: n
}, o) {
  t = t || {
    name: null
  }, e.interactable = i, e.element = n, ci(e.prepared, t), e.rect = i && t.name ? i.getRect(n) : null, xi(e, o), o.fire("autoStart:prepared", {
    interaction: e
  });
}
function De(e, t, i, n) {
  const o = e.options, r = o[i.name].max, s = o[i.name].maxPerElement, a = n.autoStart.maxInteractions;
  let l = 0, c = 0, u = 0;
  if (!(r && s && a))
    return !1;
  for (const f of n.interactions.list) {
    const g = f.prepared.name;
    if (!!f.interacting()) {
      if (l++, l >= a)
        return !1;
      if (f.interactable === e && (c += g === i.name ? 1 : 0, c >= r || f.element === t && (u++, g === i.name && u >= s)))
        return !1;
    }
  }
  return a > 0;
}
function bi(e, t) {
  return p.number(e) ? (t.autoStart.maxInteractions = e, this) : t.autoStart.maxInteractions;
}
function Je(e, t, i) {
  const {
    cursorElement: n
  } = i.autoStart;
  n && n !== e && (n.style.cursor = ""), e.ownerDocument.documentElement.style.cursor = t, e.style.cursor = t, i.autoStart.cursorElement = t ? e : null;
}
function xi(e, t) {
  const {
    interactable: i,
    element: n,
    prepared: o
  } = e;
  if (!(e.pointerType === "mouse" && i && i.options.styleCursor)) {
    t.autoStart.cursorElement && Je(t.autoStart.cursorElement, "", t);
    return;
  }
  let r = "";
  if (o.name) {
    const s = i.options[o.name].cursorChecker;
    p.func(s) ? r = s(o, i, n, e._interacting) : r = t.actions.map[o.name].getCursor(o);
  }
  Je(e.element, r || "", t);
}
const lr = {
  id: "auto-start/base",
  before: ["actions"],
  install: nr,
  listeners: {
    "interactions:down": ir,
    "interactions:move": (e, t) => {
      or(e, t), rr(e, t);
    },
    "interactions:stop": sr
  },
  maxInteractions: bi,
  withinInteractionLimit: De,
  validateAction: vi
}, sn = lr;
function cr({
  interaction: e,
  eventTarget: t,
  dx: i,
  dy: n
}, o) {
  if (e.prepared.name !== "drag")
    return;
  const r = Math.abs(i), s = Math.abs(n), a = e.interactable.options.drag, l = a.startAxis, c = r > s ? "x" : r < s ? "y" : "xy";
  if (e.prepared.axis = a.lockAxis === "start" ? c[0] : a.lockAxis, c !== "xy" && l !== "xy" && l !== c) {
    e.prepared.name = null;
    let u = t;
    const f = function(g) {
      if (g === e.interactable)
        return;
      const m = e.interactable.options.drag;
      if (!m.manualStart && g.testIgnoreAllow(m, u, t)) {
        const b = g.getAction(e.downPointer, e.downEvent, e, u);
        if (b && b.name === "drag" && ur(c, g) && sn.validateAction(b, g, u, t, o))
          return g;
      }
    };
    for (; p.element(u); ) {
      const g = o.interactables.forEachMatch(u, f);
      if (g) {
        e.prepared.name = "drag", e.interactable = g, e.element = u;
        break;
      }
      u = kt(u);
    }
  }
}
function ur(e, t) {
  if (!t)
    return !1;
  const i = t.options.drag.startAxis;
  return e === "xy" || i === "xy" || i === e;
}
const fr = {
  id: "auto-start/dragAxis",
  listeners: {
    "autoStart:before-start": cr
  }
};
function dr(e) {
  const {
    defaults: t
  } = e;
  e.usePlugin(sn), t.perAction.hold = 0, t.perAction.delay = 0;
}
function Le(e) {
  const t = e.prepared && e.prepared.name;
  if (!t)
    return null;
  const i = e.interactable.options;
  return i[t].hold || i[t].delay;
}
const hr = {
  id: "auto-start/hold",
  install: dr,
  listeners: {
    "interactions:new": ({
      interaction: e
    }) => {
      e.autoStartHoldTimer = null;
    },
    "autoStart:prepared": ({
      interaction: e
    }) => {
      const t = Le(e);
      t > 0 && (e.autoStartHoldTimer = setTimeout(() => {
        e.start(e.prepared, e.interactable, e.element);
      }, t));
    },
    "interactions:move": ({
      interaction: e,
      duplicate: t
    }) => {
      e.autoStartHoldTimer && e.pointerWasMoved && !t && (clearTimeout(e.autoStartHoldTimer), e.autoStartHoldTimer = null);
    },
    "autoStart:before-start": ({
      interaction: e
    }) => {
      Le(e) > 0 && (e.prepared.name = null);
    }
  },
  getHoldDuration: Le
}, pr = hr, gr = {
  id: "auto-start",
  install(e) {
    e.usePlugin(sn), e.usePlugin(pr), e.usePlugin(fr);
  }
};
Tt.use(gr);
function vr(e) {
  const {
    defaults: t,
    actions: i
  } = e;
  e.autoScroll = D, D.now = () => e.now(), i.phaselessTypes.autoscroll = !0, t.perAction.autoScroll = D.defaults;
}
const D = {
  defaults: {
    enabled: !1,
    margin: 60,
    container: null,
    speed: 300
  },
  now: Date.now,
  interaction: null,
  i: 0,
  x: 0,
  y: 0,
  isScrolling: !1,
  prevTime: 0,
  margin: 0,
  speed: 0,
  start(e) {
    D.isScrolling = !0, qt.cancel(D.i), e.autoScroll = D, D.interaction = e, D.prevTime = D.now(), D.i = qt.request(D.scroll);
  },
  stop() {
    D.isScrolling = !1, D.interaction && (D.interaction.autoScroll = null), qt.cancel(D.i);
  },
  scroll() {
    const {
      interaction: e
    } = D, {
      interactable: t,
      element: i
    } = e, n = e.prepared.name, o = t.options[n].autoScroll, r = _n(o.container, t, i), s = D.now(), a = (s - D.prevTime) / 1e3, l = o.speed * a;
    if (l >= 1) {
      const c = {
        x: D.x * l,
        y: D.y * l
      };
      if (c.x || c.y) {
        const u = Mn(r);
        p.window(r) ? r.scrollBy(c.x, c.y) : r && (r.scrollLeft += c.x, r.scrollTop += c.y);
        const f = Mn(r), g = {
          x: f.x - u.x,
          y: f.y - u.y
        };
        (g.x || g.y) && t.fire({
          type: "autoscroll",
          target: i,
          interactable: t,
          delta: g,
          interaction: e,
          container: r
        });
      }
      D.prevTime = s;
    }
    D.isScrolling && (qt.cancel(D.i), D.i = qt.request(D.scroll));
  },
  check(e, t) {
    var i;
    return (i = e.options[t].autoScroll) == null ? void 0 : i.enabled;
  },
  onInteractionMove({
    interaction: e,
    pointer: t
  }) {
    if (!(e.interacting() && D.check(e.interactable, e.prepared.name)))
      return;
    if (e.simulation) {
      D.x = D.y = 0;
      return;
    }
    let i, n, o, r;
    const {
      interactable: s,
      element: a
    } = e, l = e.prepared.name, c = s.options[l].autoScroll, u = _n(c.container, s, a);
    if (p.window(u))
      r = t.clientX < D.margin, i = t.clientY < D.margin, n = t.clientX > u.innerWidth - D.margin, o = t.clientY > u.innerHeight - D.margin;
    else {
      const f = Qe(u);
      r = t.clientX < f.left + D.margin, i = t.clientY < f.top + D.margin, n = t.clientX > f.right - D.margin, o = t.clientY > f.bottom - D.margin;
    }
    D.x = n ? 1 : r ? -1 : 0, D.y = o ? 1 : i ? -1 : 0, D.isScrolling || (D.margin = c.margin, D.speed = c.speed, D.start(e));
  }
};
function _n(e, t, i) {
  return (p.string(e) ? ui(e, t, i) : e) || Wt(i);
}
function Mn(e) {
  return p.window(e) && (e = window.document.body), {
    x: e.scrollLeft,
    y: e.scrollTop
  };
}
const mr = {
  id: "auto-scroll",
  install: vr,
  listeners: {
    "interactions:new": ({
      interaction: e
    }) => {
      e.autoScroll = null;
    },
    "interactions:destroy": ({
      interaction: e
    }) => {
      e.autoScroll = null, D.stop(), D.interaction && (D.interaction = null);
    },
    "interactions:stop": D.stop,
    "interactions:action-move": (e) => D.onInteractionMove(e)
  }
}, yr = mr;
Tt.use(yr);
function br(e) {
  const {
    actions: t,
    Interactable: i,
    defaults: n
  } = e;
  i.prototype.draggable = be.draggable, t.map.drag = be, t.methodDict.drag = "draggable", n.actions.drag = be.defaults;
}
function We({
  interaction: e
}) {
  if (e.prepared.name !== "drag")
    return;
  const t = e.prepared.axis;
  t === "x" ? (e.coords.cur.page.y = e.coords.start.page.y, e.coords.cur.client.y = e.coords.start.client.y, e.coords.velocity.client.y = 0, e.coords.velocity.page.y = 0) : t === "y" && (e.coords.cur.page.x = e.coords.start.page.x, e.coords.cur.client.x = e.coords.start.client.x, e.coords.velocity.client.x = 0, e.coords.velocity.page.x = 0);
}
function Dn({
  iEvent: e,
  interaction: t
}) {
  if (t.prepared.name !== "drag")
    return;
  const i = t.prepared.axis;
  if (i === "x" || i === "y") {
    const n = i === "x" ? "y" : "x";
    e.page[n] = t.coords.start.page[n], e.client[n] = t.coords.start.client[n], e.delta[n] = 0;
  }
}
const xr = function(t) {
  return p.object(t) ? (this.options.drag.enabled = t.enabled !== !1, this.setPerAction("drag", t), this.setOnEvents("drag", t), /^(xy|x|y|start)$/.test(t.lockAxis) && (this.options.drag.lockAxis = t.lockAxis), /^(xy|x|y)$/.test(t.startAxis) && (this.options.drag.startAxis = t.startAxis), this) : p.bool(t) ? (this.options.drag.enabled = t, this) : this.options.drag;
}, be = {
  id: "actions/drag",
  install: br,
  listeners: {
    "interactions:before-action-move": We,
    "interactions:action-resume": We,
    "interactions:action-move": Dn,
    "auto-start:check": (e) => {
      const {
        interaction: t,
        interactable: i,
        buttons: n
      } = e, o = i.options.drag;
      if (!(!(o && o.enabled) || t.pointerIsDown && /mouse|pointer/.test(t.pointerType) && (n & i.options.drag.mouseButtons) === 0))
        return e.action = {
          name: "drag",
          axis: o.lockAxis === "start" ? o.startAxis : o.lockAxis
        }, !1;
    }
  },
  draggable: xr,
  beforeMove: We,
  move: Dn,
  defaults: {
    startAxis: "xy",
    lockAxis: "xy"
  },
  getCursor() {
    return "move";
  }
}, wr = be;
Tt.use(wr);
function Sr(e) {
  const {
    actions: t,
    browser: i,
    Interactable: n,
    defaults: o
  } = e;
  It.cursors = zr(i), It.defaultMargin = i.supportsTouch || i.supportsPointerEvent ? 20 : 10, n.prototype.resizable = function(r) {
    return Ir(this, r, e);
  }, t.map.resize = It, t.methodDict.resize = "resizable", o.actions.resize = It.defaults;
}
function Er(e) {
  const {
    interaction: t,
    interactable: i,
    element: n,
    rect: o,
    buttons: r
  } = e;
  if (!o)
    return;
  const s = C({}, t.coords.cur.page), a = i.options.resize;
  if (!(!(a && a.enabled) || t.pointerIsDown && /mouse|pointer/.test(t.pointerType) && (r & a.mouseButtons) === 0)) {
    if (p.object(a.edges)) {
      const l = {
        left: !1,
        right: !1,
        top: !1,
        bottom: !1
      };
      for (const c in l)
        l[c] = Tr(c, a.edges[c], s, t._latestPointer.eventTarget, n, o, a.margin || It.defaultMargin);
      l.left = l.left && !l.right, l.top = l.top && !l.bottom, (l.left || l.right || l.top || l.bottom) && (e.action = {
        name: "resize",
        edges: l
      });
    } else {
      const l = a.axis !== "y" && s.x > o.right - It.defaultMargin, c = a.axis !== "x" && s.y > o.bottom - It.defaultMargin;
      (l || c) && (e.action = {
        name: "resize",
        axes: (l ? "x" : "") + (c ? "y" : "")
      });
    }
    return e.action ? !1 : void 0;
  }
}
function Ir(e, t, i) {
  return p.object(t) ? (e.options.resize.enabled = t.enabled !== !1, e.setPerAction("resize", t), e.setOnEvents("resize", t), p.string(t.axis) && /^x$|^y$|^xy$/.test(t.axis) ? e.options.resize.axis = t.axis : t.axis === null && (e.options.resize.axis = i.defaults.actions.resize.axis), p.bool(t.preserveAspectRatio) ? e.options.resize.preserveAspectRatio = t.preserveAspectRatio : p.bool(t.square) && (e.options.resize.square = t.square), e) : p.bool(t) ? (e.options.resize.enabled = t, e) : e.options.resize;
}
function Tr(e, t, i, n, o, r, s) {
  if (!t)
    return !1;
  if (t === !0) {
    const a = p.number(r.width) ? r.width : r.right - r.left, l = p.number(r.height) ? r.height : r.bottom - r.top;
    if (s = Math.min(s, Math.abs((e === "left" || e === "right" ? a : l) / 2)), a < 0 && (e === "left" ? e = "right" : e === "right" && (e = "left")), l < 0 && (e === "top" ? e = "bottom" : e === "bottom" && (e = "top")), e === "left") {
      const c = a >= 0 ? r.left : r.right;
      return i.x < c + s;
    }
    if (e === "top") {
      const c = l >= 0 ? r.top : r.bottom;
      return i.y < c + s;
    }
    if (e === "right")
      return i.x > (a >= 0 ? r.right : r.left) - s;
    if (e === "bottom")
      return i.y > (l >= 0 ? r.bottom : r.top) - s;
  }
  return p.element(n) ? p.element(t) ? t === n : Ve(n, t, o) : !1;
}
function zr(e) {
  return e.isIe9 ? {
    x: "e-resize",
    y: "s-resize",
    xy: "se-resize",
    top: "n-resize",
    left: "w-resize",
    bottom: "s-resize",
    right: "e-resize",
    topleft: "se-resize",
    bottomright: "se-resize",
    topright: "ne-resize",
    bottomleft: "ne-resize"
  } : {
    x: "ew-resize",
    y: "ns-resize",
    xy: "nwse-resize",
    top: "ns-resize",
    left: "ew-resize",
    bottom: "ns-resize",
    right: "ew-resize",
    topleft: "nwse-resize",
    bottomright: "nwse-resize",
    topright: "nesw-resize",
    bottomleft: "nesw-resize"
  };
}
function _r({
  iEvent: e,
  interaction: t
}) {
  if (t.prepared.name !== "resize" || !t.prepared.edges)
    return;
  const i = e, n = t.rect;
  t._rects = {
    start: C({}, n),
    corrected: C({}, n),
    previous: C({}, n),
    delta: {
      left: 0,
      right: 0,
      width: 0,
      top: 0,
      bottom: 0,
      height: 0
    }
  }, i.edges = t.prepared.edges, i.rect = t._rects.corrected, i.deltaRect = t._rects.delta;
}
function Mr({
  iEvent: e,
  interaction: t
}) {
  if (t.prepared.name !== "resize" || !t.prepared.edges)
    return;
  const i = e, o = t.interactable.options.resize.invert, r = o === "reposition" || o === "negate", s = t.rect, {
    start: a,
    corrected: l,
    delta: c,
    previous: u
  } = t._rects;
  if (C(u, l), r) {
    if (C(l, s), o === "reposition") {
      if (l.top > l.bottom) {
        const f = l.top;
        l.top = l.bottom, l.bottom = f;
      }
      if (l.left > l.right) {
        const f = l.left;
        l.left = l.right, l.right = f;
      }
    }
  } else
    l.top = Math.min(s.top, a.bottom), l.bottom = Math.max(s.bottom, a.top), l.left = Math.min(s.left, a.right), l.right = Math.max(s.right, a.left);
  l.width = l.right - l.left, l.height = l.bottom - l.top;
  for (const f in l)
    c[f] = l[f] - u[f];
  i.edges = t.prepared.edges, i.rect = l, i.deltaRect = c;
}
function Dr({
  iEvent: e,
  interaction: t
}) {
  if (t.prepared.name !== "resize" || !t.prepared.edges)
    return;
  const i = e;
  i.edges = t.prepared.edges, i.rect = t._rects.corrected, i.deltaRect = t._rects.delta;
}
function Cn({
  iEvent: e,
  interaction: t
}) {
  if (t.prepared.name !== "resize" || !t.resizeAxes)
    return;
  const i = t.interactable.options, n = e;
  i.resize.square ? (t.resizeAxes === "y" ? n.delta.x = n.delta.y : n.delta.y = n.delta.x, n.axes = "xy") : (n.axes = t.resizeAxes, t.resizeAxes === "x" ? n.delta.y = 0 : t.resizeAxes === "y" && (n.delta.x = 0));
}
const It = {
  id: "actions/resize",
  before: ["actions/drag"],
  install: Sr,
  listeners: {
    "interactions:new": ({
      interaction: e
    }) => {
      e.resizeAxes = "xy";
    },
    "interactions:action-start": (e) => {
      _r(e), Cn(e);
    },
    "interactions:action-move": (e) => {
      Mr(e), Cn(e);
    },
    "interactions:action-end": Dr,
    "auto-start:check": Er
  },
  defaults: {
    square: !1,
    preserveAspectRatio: !1,
    axis: "xy",
    margin: NaN,
    edges: null,
    invert: "none"
  },
  cursors: null,
  getCursor({
    edges: e,
    axis: t,
    name: i
  }) {
    const n = It.cursors;
    let o = null;
    if (t)
      o = n[i + t];
    else if (e) {
      let r = "";
      for (const s of ["top", "bottom", "left", "right"])
        e[s] && (r += s);
      o = n[r];
    }
    return o;
  },
  defaultMargin: null
}, Cr = It;
Tt.use(Cr);
const Pr = () => {
}, Ar = () => {
}, Or = (e) => {
  const t = [["x", "y"], ["left", "top"], ["right", "bottom"], ["width", "height"]].filter(([n, o]) => n in e || o in e), i = (n, o) => {
    const {
      range: r,
      limits: s = {
        left: -1 / 0,
        right: 1 / 0,
        top: -1 / 0,
        bottom: 1 / 0
      },
      offset: a = {
        x: 0,
        y: 0
      }
    } = e, l = {
      range: r,
      grid: e,
      x: null,
      y: null
    };
    for (const [c, u] of t) {
      const f = Math.round((n - a.x) / e[c]), g = Math.round((o - a.y) / e[u]);
      l[c] = Math.max(s.left, Math.min(s.right, f * e[c] + a.x)), l[u] = Math.max(s.top, Math.min(s.bottom, g * e[u] + a.y));
    }
    return l;
  };
  return i.grid = e, i.coordFields = t, i;
}, kr = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  edgeTarget: Pr,
  elements: Ar,
  grid: Or
}, Symbol.toStringTag, { value: "Module" })), Rr = {
  id: "snappers",
  install(e) {
    const {
      interactStatic: t
    } = e;
    t.snappers = C(t.snappers || {}, kr), t.createSnapGrid = t.snappers.grid;
  }
}, Hr = Rr;
class wi {
  constructor(t) {
    Dt(this, "states", []);
    Dt(this, "startOffset", {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0
    });
    Dt(this, "startDelta");
    Dt(this, "result");
    Dt(this, "endResult");
    Dt(this, "edges");
    Dt(this, "interaction");
    this.interaction = t, this.result = ve();
  }
  start({
    phase: t
  }, i) {
    const {
      interaction: n
    } = this, o = $r(n);
    this.prepareStates(o), this.edges = C({}, n.edges), this.startOffset = Br(n.rect, i), this.startDelta = {
      x: 0,
      y: 0
    };
    const r = this.fillArg({
      phase: t,
      pageCoords: i,
      preEnd: !1
    });
    return this.result = ve(), this.startAll(r), this.result = this.setAll(r);
  }
  fillArg(t) {
    const {
      interaction: i
    } = this;
    return t.interaction = i, t.interactable = i.interactable, t.element = i.element, t.rect = t.rect || i.rect, t.edges = this.edges, t.startOffset = this.startOffset, t;
  }
  startAll(t) {
    for (const i of this.states)
      i.methods.start && (t.state = i, i.methods.start(t));
  }
  setAll(t) {
    const {
      phase: i,
      preEnd: n,
      skipModifiers: o,
      rect: r
    } = t;
    t.coords = C({}, t.pageCoords), t.rect = C({}, r);
    const s = o ? this.states.slice(o) : this.states, a = ve(t.coords, t.rect);
    for (const f of s) {
      var l;
      const {
        options: g
      } = f, m = C({}, t.coords);
      let b = null;
      (l = f.methods) != null && l.set && this.shouldDo(g, n, i) && (t.state = f, b = f.methods.set(t), nn(this.interaction.edges, t.rect, {
        x: t.coords.x - m.x,
        y: t.coords.y - m.y
      })), a.eventProps.push(b);
    }
    a.delta.x = t.coords.x - t.pageCoords.x, a.delta.y = t.coords.y - t.pageCoords.y, a.rectDelta.left = t.rect.left - r.left, a.rectDelta.right = t.rect.right - r.right, a.rectDelta.top = t.rect.top - r.top, a.rectDelta.bottom = t.rect.bottom - r.bottom;
    const c = this.result.coords, u = this.result.rect;
    if (c && u) {
      const f = a.rect.left !== u.left || a.rect.right !== u.right || a.rect.top !== u.top || a.rect.bottom !== u.bottom;
      a.changed = f || c.x !== a.coords.x || c.y !== a.coords.y;
    }
    return a;
  }
  applyToInteraction(t) {
    const {
      interaction: i
    } = this, {
      phase: n
    } = t, o = i.coords.cur, r = i.coords.start, {
      result: s,
      startDelta: a
    } = this, l = s.delta;
    n === "start" && C(this.startDelta, s.delta);
    for (const [f, g] of [[r, a], [o, l]])
      f.page.x += g.x, f.page.y += g.y, f.client.x += g.x, f.client.y += g.y;
    const {
      rectDelta: c
    } = this.result, u = t.rect || i.rect;
    u.left += c.left, u.right += c.right, u.top += c.top, u.bottom += c.bottom, u.width = u.right - u.left, u.height = u.bottom - u.top;
  }
  setAndApply(t) {
    const {
      interaction: i
    } = this, {
      phase: n,
      preEnd: o,
      skipModifiers: r
    } = t, s = this.setAll(this.fillArg({
      preEnd: o,
      phase: n,
      pageCoords: t.modifiedCoords || i.coords.cur.page
    }));
    if (this.result = s, !s.changed && (!r || r < this.states.length) && i.interacting())
      return !1;
    if (t.modifiedCoords) {
      const {
        page: a
      } = i.coords.cur, l = {
        x: t.modifiedCoords.x - a.x,
        y: t.modifiedCoords.y - a.y
      };
      s.coords.x += l.x, s.coords.y += l.y, s.delta.x += l.x, s.delta.y += l.y;
    }
    this.applyToInteraction(t);
  }
  beforeEnd(t) {
    const {
      interaction: i,
      event: n
    } = t, o = this.states;
    if (!o || !o.length)
      return;
    let r = !1;
    for (const s of o) {
      t.state = s;
      const {
        options: a,
        methods: l
      } = s, c = l.beforeEnd && l.beforeEnd(t);
      if (c)
        return this.endResult = c, !1;
      r = r || !r && this.shouldDo(a, !0, t.phase, !0);
    }
    r && i.move({
      event: n,
      preEnd: !0
    });
  }
  stop(t) {
    const {
      interaction: i
    } = t;
    if (!this.states || !this.states.length)
      return;
    const n = C({
      states: this.states,
      interactable: i.interactable,
      element: i.element,
      rect: null
    }, t);
    this.fillArg(n);
    for (const o of this.states)
      n.state = o, o.methods.stop && o.methods.stop(n);
    this.states = null, this.endResult = null;
  }
  prepareStates(t) {
    this.states = [];
    for (let i = 0; i < t.length; i++) {
      const {
        options: n,
        methods: o,
        name: r
      } = t[i];
      this.states.push({
        options: n,
        methods: o,
        index: i,
        name: r
      });
    }
    return this.states;
  }
  restoreInteractionCoords({
    interaction: {
      coords: t,
      rect: i,
      modification: n
    }
  }) {
    if (!n.result)
      return;
    const {
      startDelta: o
    } = n, {
      delta: r,
      rectDelta: s
    } = n.result, a = [[t.start, o], [t.cur, r]];
    for (const [l, c] of a)
      l.page.x -= c.x, l.page.y -= c.y, l.client.x -= c.x, l.client.y -= c.y;
    i.left -= s.left, i.right -= s.right, i.top -= s.top, i.bottom -= s.bottom;
  }
  shouldDo(t, i, n, o) {
    return !(!t || t.enabled === !1 || o && !t.endOnly || t.endOnly && !i || n === "start" && !t.setStart);
  }
  copyFrom(t) {
    this.startOffset = t.startOffset, this.startDelta = t.startDelta, this.edges = t.edges, this.states = t.states.map((i) => Kt(i)), this.result = ve(C({}, t.result.coords), C({}, t.result.rect));
  }
  destroy() {
    for (const t in this)
      this[t] = null;
  }
}
function ve(e, t) {
  return {
    rect: t,
    coords: e,
    delta: {
      x: 0,
      y: 0
    },
    rectDelta: {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0
    },
    eventProps: [],
    changed: !0
  };
}
function $r(e) {
  const t = e.interactable.options[e.prepared.name], i = t.modifiers;
  return i && i.length ? i : ["snap", "snapSize", "snapEdges", "restrict", "restrictEdges", "restrictSize"].map((n) => {
    const o = t[n];
    return o && o.enabled && {
      options: o,
      methods: o._methods
    };
  }).filter((n) => !!n);
}
function Br(e, t) {
  return e ? {
    left: t.x - e.left,
    top: t.y - e.top,
    right: e.right - t.x,
    bottom: e.bottom - t.y
  } : {
    left: 0,
    top: 0,
    right: 0,
    bottom: 0
  };
}
function Rt(e, t) {
  const {
    defaults: i
  } = e, n = {
    start: e.start,
    set: e.set,
    beforeEnd: e.beforeEnd,
    stop: e.stop
  }, o = (r) => {
    const s = r || {};
    s.enabled = s.enabled !== !1;
    for (const l in i)
      l in s || (s[l] = i[l]);
    const a = {
      options: s,
      methods: n,
      name: t,
      enable: () => (s.enabled = !0, a),
      disable: () => (s.enabled = !1, a)
    };
    return a;
  };
  return t && typeof t == "string" && (o._defaults = i, o._methods = n), o;
}
function Fe({
  iEvent: e,
  interaction: t
}) {
  const i = t.modification.result;
  i && (e.modifiers = i.eventProps);
}
const Lr = {
  id: "modifiers/base",
  before: ["actions"],
  install: (e) => {
    e.defaults.perAction.modifiers = [];
  },
  listeners: {
    "interactions:new": ({
      interaction: e
    }) => {
      e.modification = new wi(e);
    },
    "interactions:before-action-start": (e) => {
      const t = e.interaction.modification;
      t.start(e, e.interaction.coords.start.page), e.interaction.edges = t.edges, t.applyToInteraction(e);
    },
    "interactions:before-action-move": (e) => e.interaction.modification.setAndApply(e),
    "interactions:before-action-end": (e) => e.interaction.modification.beforeEnd(e),
    "interactions:action-start": Fe,
    "interactions:action-move": Fe,
    "interactions:action-end": Fe,
    "interactions:after-action-start": (e) => e.interaction.modification.restoreInteractionCoords(e),
    "interactions:after-action-move": (e) => e.interaction.modification.restoreInteractionCoords(e),
    "interactions:stop": (e) => e.interaction.modification.stop(e)
  }
}, Wr = Lr, Fr = {
  start(e) {
    const {
      state: t,
      rect: i,
      edges: n,
      pageCoords: o
    } = e;
    let {
      ratio: r
    } = t.options;
    const {
      equalDelta: s,
      modifiers: a
    } = t.options;
    r === "preserve" && (r = i.width / i.height), t.startCoords = C({}, o), t.startRect = C({}, i), t.ratio = r, t.equalDelta = s;
    const l = t.linkedEdges = {
      top: n.top || n.left && !n.bottom,
      left: n.left || n.top && !n.right,
      bottom: n.bottom || n.right && !n.top,
      right: n.right || n.bottom && !n.left
    };
    if (t.xIsPrimaryAxis = !!(n.left || n.right), t.equalDelta) {
      const u = (l.left ? 1 : -1) * (l.top ? 1 : -1);
      t.edgeSign = {
        x: u,
        y: u
      };
    } else
      t.edgeSign = {
        x: l.left ? -1 : 1,
        y: l.top ? -1 : 1
      };
    if (C(e.edges, l), !a || !a.length)
      return;
    const c = new wi(e.interaction);
    c.copyFrom(e.interaction.modification), c.prepareStates(a), t.subModification = c, c.startAll({
      ...e
    });
  },
  set(e) {
    const {
      state: t,
      rect: i,
      coords: n
    } = e, o = C({}, n), r = t.equalDelta ? Nr : jr;
    if (r(t, t.xIsPrimaryAxis, n, i), !t.subModification)
      return null;
    const s = C({}, i);
    nn(t.linkedEdges, s, {
      x: n.x - o.x,
      y: n.y - o.y
    });
    const a = t.subModification.setAll({
      ...e,
      rect: s,
      edges: t.linkedEdges,
      pageCoords: n,
      prevCoords: n,
      prevRect: s
    }), {
      delta: l
    } = a;
    if (a.changed) {
      const c = Math.abs(l.x) > Math.abs(l.y);
      r(t, c, a.coords, a.rect), C(n, a.coords);
    }
    return a.eventProps;
  },
  defaults: {
    ratio: "preserve",
    equalDelta: !1,
    modifiers: [],
    enabled: !1
  }
};
function Nr({
  startCoords: e,
  edgeSign: t
}, i, n) {
  i ? n.y = e.y + (n.x - e.x) * t.y : n.x = e.x + (n.y - e.y) * t.x;
}
function jr({
  startRect: e,
  startCoords: t,
  ratio: i,
  edgeSign: n
}, o, r, s) {
  if (o) {
    const a = s.width / i;
    r.y = t.y + (a - e.height) * n.y;
  } else {
    const a = s.height * i;
    r.x = t.x + (a - e.width) * n.x;
  }
}
const Xr = Rt(Fr, "aspectRatio"), Si = () => {
};
Si._defaults = {};
const me = Si;
function Yr({
  rect: e,
  startOffset: t,
  state: i,
  interaction: n,
  pageCoords: o
}) {
  const {
    options: r
  } = i, {
    elementRect: s
  } = r, a = C({
    left: 0,
    top: 0,
    right: 0,
    bottom: 0
  }, r.offset || {});
  if (e && s) {
    const l = Nt(r.restriction, n, o);
    if (l) {
      const c = l.right - l.left - e.width, u = l.bottom - l.top - e.height;
      c < 0 && (a.left += c, a.right += c), u < 0 && (a.top += u, a.bottom += u);
    }
    a.left += t.left - e.width * s.left, a.top += t.top - e.height * s.top, a.right += t.right - e.width * (1 - s.right), a.bottom += t.bottom - e.height * (1 - s.bottom);
  }
  i.offset = a;
}
function Gr({
  coords: e,
  interaction: t,
  state: i
}) {
  const {
    options: n,
    offset: o
  } = i, r = Nt(n.restriction, t, e);
  if (!r)
    return;
  const s = Ho(r);
  e.x = Math.max(Math.min(s.right - o.right, e.x), s.left + o.left), e.y = Math.max(Math.min(s.bottom - o.bottom, e.y), s.top + o.top);
}
function Nt(e, t, i) {
  return p.func(e) ? ce(e, t.interactable, t.element, [i.x, i.y, t]) : ce(e, t.interactable, t.element);
}
const qr = {
  restriction: null,
  elementRect: null,
  offset: null,
  endOnly: !1,
  enabled: !1
}, Ee = {
  start: Yr,
  set: Gr,
  defaults: qr
}, Ur = Rt(Ee, "restrict"), Ei = {
  top: 1 / 0,
  left: 1 / 0,
  bottom: -1 / 0,
  right: -1 / 0
}, Ii = {
  top: -1 / 0,
  left: -1 / 0,
  bottom: 1 / 0,
  right: 1 / 0
};
function Vr({
  interaction: e,
  startOffset: t,
  state: i
}) {
  const {
    options: n
  } = i;
  let o;
  if (n) {
    const r = Nt(n.offset, e, e.coords.start.page);
    o = Me(r);
  }
  o = o || {
    x: 0,
    y: 0
  }, i.offset = {
    top: o.y + t.top,
    left: o.x + t.left,
    bottom: o.y - t.bottom,
    right: o.x - t.right
  };
}
function Kr({
  coords: e,
  edges: t,
  interaction: i,
  state: n
}) {
  const {
    offset: o,
    options: r
  } = n;
  if (!t)
    return;
  const s = C({}, e), a = Nt(r.inner, i, s) || {}, l = Nt(r.outer, i, s) || {};
  Pn(a, Ei), Pn(l, Ii), t.top ? e.y = Math.min(Math.max(l.top + o.top, s.y), a.top + o.top) : t.bottom && (e.y = Math.max(Math.min(l.bottom + o.bottom, s.y), a.bottom + o.bottom)), t.left ? e.x = Math.min(Math.max(l.left + o.left, s.x), a.left + o.left) : t.right && (e.x = Math.max(Math.min(l.right + o.right, s.x), a.right + o.right));
}
function Pn(e, t) {
  for (const i of ["top", "left", "bottom", "right"])
    i in e || (e[i] = t[i]);
  return e;
}
const Jr = {
  inner: null,
  outer: null,
  offset: null,
  endOnly: !1,
  enabled: !1
}, ae = {
  noInner: Ei,
  noOuter: Ii,
  start: Vr,
  set: Kr,
  defaults: Jr
}, Zr = Rt(ae, "restrictEdges"), Qr = C({
  get elementRect() {
    return {
      top: 0,
      left: 0,
      bottom: 1,
      right: 1
    };
  },
  set elementRect(e) {
  }
}, Ee.defaults), ts = {
  start: Ee.start,
  set: Ee.set,
  defaults: Qr
}, es = Rt(ts, "restrictRect"), ns = {
  width: -1 / 0,
  height: -1 / 0
}, is = {
  width: 1 / 0,
  height: 1 / 0
};
function os(e) {
  return ae.start(e);
}
function rs(e) {
  const {
    interaction: t,
    state: i,
    rect: n,
    edges: o
  } = e, {
    options: r
  } = i;
  if (!o)
    return;
  const s = En(Nt(r.min, t, e.coords)) || ns, a = En(Nt(r.max, t, e.coords)) || is;
  i.options = {
    endOnly: r.endOnly,
    inner: C({}, ae.noInner),
    outer: C({}, ae.noOuter)
  }, o.top ? (i.options.inner.top = n.bottom - s.height, i.options.outer.top = n.bottom - a.height) : o.bottom && (i.options.inner.bottom = n.top + s.height, i.options.outer.bottom = n.top + a.height), o.left ? (i.options.inner.left = n.right - s.width, i.options.outer.left = n.right - a.width) : o.right && (i.options.inner.right = n.left + s.width, i.options.outer.right = n.left + a.width), ae.set(e), i.options = r;
}
const ss = {
  min: null,
  max: null,
  endOnly: !1,
  enabled: !1
}, as = {
  start: os,
  set: rs,
  defaults: ss
}, ls = Rt(as, "restrictSize");
function cs(e) {
  const {
    interaction: t,
    interactable: i,
    element: n,
    rect: o,
    state: r,
    startOffset: s
  } = e, {
    options: a
  } = r, l = a.offsetWithOrigin ? fs(e) : {
    x: 0,
    y: 0
  };
  let c;
  if (a.offset === "startCoords")
    c = {
      x: t.coords.start.page.x,
      y: t.coords.start.page.y
    };
  else {
    const f = ce(a.offset, i, n, [t]);
    c = Me(f) || {
      x: 0,
      y: 0
    }, c.x += l.x, c.y += l.y;
  }
  const {
    relativePoints: u
  } = a;
  r.offsets = o && u && u.length ? u.map((f, g) => ({
    index: g,
    relativePoint: f,
    x: s.left - o.width * f.x + c.x,
    y: s.top - o.height * f.y + c.y
  })) : [{
    index: 0,
    relativePoint: null,
    x: c.x,
    y: c.y
  }];
}
function us(e) {
  const {
    interaction: t,
    coords: i,
    state: n
  } = e, {
    options: o,
    offsets: r
  } = n, s = on(t.interactable, t.element, t.prepared.name), a = C({}, i), l = [];
  o.offsetWithOrigin || (a.x -= s.x, a.y -= s.y);
  for (const u of r) {
    const f = a.x - u.x, g = a.y - u.y;
    for (let m = 0, b = o.targets.length; m < b; m++) {
      const S = o.targets[m];
      let I;
      p.func(S) ? I = S(f, g, t._proxy, u, m) : I = S, I && l.push({
        x: (p.number(I.x) ? I.x : f) + u.x,
        y: (p.number(I.y) ? I.y : g) + u.y,
        range: p.number(I.range) ? I.range : o.range,
        source: S,
        index: m,
        offset: u
      });
    }
  }
  const c = {
    target: null,
    inRange: !1,
    distance: 0,
    range: 0,
    delta: {
      x: 0,
      y: 0
    }
  };
  for (const u of l) {
    const f = u.range, g = u.x - a.x, m = u.y - a.y, b = _e(g, m);
    let S = b <= f;
    f === 1 / 0 && c.inRange && c.range !== 1 / 0 && (S = !1), (!c.target || (S ? c.inRange && f !== 1 / 0 ? b / f < c.distance / c.range : f === 1 / 0 && c.range !== 1 / 0 || b < c.distance : !c.inRange && b < c.distance)) && (c.target = u, c.distance = b, c.range = f, c.inRange = S, c.delta.x = g, c.delta.y = m);
  }
  return c.inRange && (i.x = c.target.x, i.y = c.target.y), n.closest = c, c;
}
function fs(e) {
  const {
    element: t
  } = e.interaction;
  return Me(ce(e.state.options.origin, null, null, [t])) || on(e.interactable, t, e.interaction.prepared.name);
}
const ds = {
  range: 1 / 0,
  targets: null,
  offset: null,
  offsetWithOrigin: !0,
  origin: null,
  relativePoints: null,
  endOnly: !1,
  enabled: !1
}, an = {
  start: cs,
  set: us,
  defaults: ds
}, hs = Rt(an, "snap");
function ps(e) {
  const {
    state: t,
    edges: i
  } = e, {
    options: n
  } = t;
  if (!i)
    return null;
  e.state = {
    options: {
      targets: null,
      relativePoints: [{
        x: i.left ? 0 : 1,
        y: i.top ? 0 : 1
      }],
      offset: n.offset || "self",
      origin: {
        x: 0,
        y: 0
      },
      range: n.range
    }
  }, t.targetFields = t.targetFields || [["width", "height"], ["x", "y"]], an.start(e), t.offsets = e.state.offsets, e.state = t;
}
function gs(e) {
  const {
    interaction: t,
    state: i,
    coords: n
  } = e, {
    options: o,
    offsets: r
  } = i, s = {
    x: n.x - r[0].x,
    y: n.y - r[0].y
  };
  i.options = C({}, o), i.options.targets = [];
  for (const l of o.targets || []) {
    let c;
    if (p.func(l) ? c = l(s.x, s.y, t) : c = l, !!c) {
      for (const [u, f] of i.targetFields)
        if (u in c || f in c) {
          c.x = c[u], c.y = c[f];
          break;
        }
      i.options.targets.push(c);
    }
  }
  const a = an.set(e);
  return i.options = o, a;
}
const vs = {
  range: 1 / 0,
  targets: null,
  offset: null,
  endOnly: !1,
  enabled: !1
}, Ie = {
  start: ps,
  set: gs,
  defaults: vs
}, ms = Rt(Ie, "snapSize");
function ys(e) {
  const {
    edges: t
  } = e;
  return t ? (e.state.targetFields = e.state.targetFields || [[t.left ? "left" : "right", t.top ? "top" : "bottom"]], Ie.start(e)) : null;
}
const bs = {
  start: ys,
  set: Ie.set,
  defaults: C(Kt(Ie.defaults), {
    targets: null,
    range: null,
    offset: {
      x: 0,
      y: 0
    }
  })
}, xs = Rt(bs, "snapEdges"), Ne = {
  aspectRatio: Xr,
  restrictEdges: Zr,
  restrict: Ur,
  restrictRect: es,
  restrictSize: ls,
  snapEdges: xs,
  snap: hs,
  snapSize: ms,
  spring: me,
  avoid: me,
  transform: me,
  rubberband: me
}, ws = {
  id: "modifiers",
  install(e) {
    const {
      interactStatic: t
    } = e;
    e.usePlugin(Wr), e.usePlugin(Hr), t.modifiers = Ne;
    for (const i in Ne) {
      const {
        _defaults: n,
        _methods: o
      } = Ne[i];
      n._methods = o, e.defaults.perAction[i] = n;
    }
  }
}, Ss = ws;
Tt.use(Ss);
const Es = {};
var Vt;
(function(e) {
  e.touchAction = "touchAction", e.boxSizing = "boxSizing", e.noListeners = "noListeners";
})(Vt || (Vt = {}));
const An = "[interact.js] ", Ze = {
  touchAction: "https://developer.mozilla.org/en-US/docs/Web/CSS/touch-action",
  boxSizing: "https://developer.mozilla.org/en-US/docs/Web/CSS/box-sizing"
}, Is = !1;
function Ts(e, {
  logger: t
} = {}) {
  const {
    Interactable: i,
    defaults: n
  } = e;
  e.logger = t || console, n.base.devTools = {
    ignore: {}
  }, i.prototype.devTools = function(o) {
    return o ? (C(this.options.devTools, o), this) : this.options.devTools;
  }, e.usePlugin(Es);
}
const On = [{
  name: Vt.touchAction,
  perform({
    element: e
  }) {
    return !zs(e, "touchAction", /pan-|pinch|none/);
  },
  getInfo({
    element: e
  }) {
    return [e, Ze.touchAction];
  },
  text: `Consider adding CSS "touch-action: none" to this element
`
}, {
  name: Vt.boxSizing,
  perform(e) {
    const {
      element: t
    } = e;
    return e.prepared.name === "resize" && t instanceof V.HTMLElement && !Ti(t, "boxSizing", /border-box/);
  },
  text: 'Consider adding CSS "box-sizing: border-box" to this resizable element',
  getInfo({
    element: e
  }) {
    return [e, Ze.boxSizing];
  }
}, {
  name: Vt.noListeners,
  perform(e) {
    const t = e.prepared.name;
    return !(e.interactable.events.types[`${t}move`] || []).length;
  },
  getInfo(e) {
    return [e.prepared.name, e.interactable];
  },
  text: "There are no listeners set for this action"
}];
function Ti(e, t, i) {
  const n = e.style[t] || Ot.getComputedStyle(e)[t];
  return i.test((n || "").toString());
}
function zs(e, t, i) {
  let n = e;
  for (; p.element(n); ) {
    if (Ti(n, t, i))
      return !0;
    n = kt(n);
  }
  return !1;
}
const kn = "dev-tools", _s = Is ? {
  id: kn,
  install: () => {
  }
} : {
  id: kn,
  install: Ts,
  listeners: {
    "interactions:action-start": ({
      interaction: e
    }, t) => {
      for (const i of On) {
        const n = e.interactable && e.interactable.options;
        !(n && n.devTools && n.devTools.ignore[i.name]) && i.perform(e) && t.logger.warn(An + i.text, ...i.getInfo(e));
      }
    }
  },
  checks: On,
  CheckName: Vt,
  links: Ze,
  prefix: An
}, Ms = _s;
Tt.use(Ms);
function Ds() {
  const { appContext: e, proxy: t } = Ai(), i = e.config.globalProperties;
  return {
    proxy: t,
    appContext: e,
    globalProperties: i
  };
}
const Cs = {
  name: "GridItem"
}, zi = /* @__PURE__ */ Fn({
  ...Cs,
  props: {
    isDraggable: { type: [Boolean, null], default: null },
    isResizable: { type: [Boolean, null], default: null },
    isBounded: { type: [Boolean, null], default: null },
    static: { type: Boolean, default: !1 },
    minH: { default: 1 },
    minW: { default: 1 },
    maxH: { default: 1 / 0 },
    maxW: { default: 1 / 0 },
    x: null,
    y: null,
    w: null,
    h: null,
    i: null,
    dragIgnoreFrom: { default: "a, button" },
    dragAllowFrom: { default: null },
    resizeIgnoreFrom: { default: "a, button" },
    preserveAspectRatio: { type: Boolean, default: !1 },
    dragOption: { default: () => ({}) },
    resizeOption: { default: () => ({}) }
  },
  emits: ["container-resized", "resize", "resized", "move", "moved", "dragging", "dragend"],
  setup(e, { expose: t, emit: i }) {
    const n = e, { proxy: o } = Ds(), r = o == null ? void 0 : o.$parent, s = Oi("eventBus"), a = P({}), l = P(1), c = P(100), u = P(30), f = P([10, 10]), g = P(1 / 0), m = P(null), b = P(null), S = P(1), I = P(!0), A = P(!0), T = P(!1), z = P(null), v = P(!1), d = P(null), O = P(NaN), x = P(NaN), L = P(NaN), ot = P(NaN), H = P({}), K = P(!1), y = P(!1), M = P(!1), R = P(null), N = P(null), U = P(null), J = P(null), _ = P(n.x), Z = P(n.y), it = P(n.w), Q = P(n.h), at = P(null), Y = P(null), ue = Xt(() => b.value && !n.static), Ce = Xt(() => (m.value || b.value) && !n.static), Pe = Xt(() => navigator.userAgent.toLowerCase().indexOf("android") !== -1), ut = Xt(() => r != null && r.isMirrored ? !K.value : K.value), fe = Xt(() => ({
      "vue-resizable": ue.value,
      static: n.static,
      resizing: v.value,
      "vue-draggable-dragging": T.value,
      cssTransforms: I.value,
      "render-rtl": ut.value,
      "disable-userselect": T.value,
      "no-touch": Pe.value && Ce.value
    })), E = Xt(() => ut.value ? "vue-resizable-handle vue-rtl-resizable-handle" : "vue-resizable-handle");
    F(
      () => n.isDraggable,
      (h) => {
        m.value = h;
      }
    ), F(
      () => n.static,
      () => {
        he(), ct();
      }
    ), F(m, () => {
      he();
    }), F(
      () => n.isResizable,
      (h) => {
        b.value = h;
      }
    ), F(
      () => n.isBounded,
      (h) => {
        at.value = h;
      }
    ), F(b, () => {
      ct();
    }), F(u, () => {
      et(), dt();
    }), F(l, () => {
      ct(), et(), dt();
    }), F(c, () => {
      ct(), et();
    }), F(
      () => n.x,
      (h) => {
        _.value = h, et();
      }
    ), F(
      () => n.y,
      (h) => {
        Z.value = h, et();
      }
    ), F(
      () => n.h,
      (h) => {
        Q.value = h, et();
      }
    ), F(
      () => n.w,
      (h) => {
        it.value = h, et();
      }
    ), F(ut, () => {
      ct(), et();
    }), F(
      () => n.minH,
      () => {
        ct();
      }
    ), F(
      () => n.maxH,
      () => {
        ct();
      }
    ), F(
      () => n.minW,
      () => {
        ct();
      }
    ), F(
      () => n.maxW,
      () => {
        ct();
      }
    ), F(
      () => r == null ? void 0 : r.margin,
      (h) => {
        !h || h[0] == f.value[0] && h[1] == f.value[1] || (f.value = h.map((w) => Number(w)), et(), dt());
      }
    );
    function $(h) {
      _t(h);
    }
    function G(h) {
      yt();
    }
    function ft(h) {
      n.isDraggable === null && (m.value = h);
    }
    function gt(h) {
      n.isResizable === null && (b.value = h);
    }
    function bt(h) {
      n.isBounded === null && (at.value = h);
    }
    function xt(h) {
      S.value = h;
    }
    function st(h) {
      u.value = h;
    }
    function W(h) {
      g.value = h;
    }
    function lt() {
      K.value = mn() === "rtl", yt();
    }
    function vt(h) {
      const w = h.toString();
      l.value = parseInt(w);
    }
    s.on("updateWidth", $), s.on("compact", G), s.on("setDraggable", ft), s.on("setResizable", gt), s.on("setBounded", bt), s.on("setTransformScale", xt), s.on("setRowHeight", st), s.on("setMaxRows", W), s.on("directionchange", lt), s.on("setColNum", vt), K.value = mn() === "rtl", Nn(() => {
      s.off("updateWidth", $), s.off("compact", G), s.off("setDraggable", ft), s.off("setResizable", gt), s.off("setBounded", bt), s.off("setTransformScale", xt), s.off("setRowHeight", st), s.off("setMaxRows", W), s.off("directionchange", lt), s.off("setColNum", vt), Y.value && Y.value.unset();
    }), jn(() => {
      (r == null ? void 0 : r.responsive) && r.lastBreakpoint ? l.value = Ue(r.lastBreakpoint, r == null ? void 0 : r.cols) : l.value = r == null ? void 0 : r.colNum, u.value = r == null ? void 0 : r.rowHeight, c.value = (r == null ? void 0 : r.width) !== null ? r == null ? void 0 : r.width : 100, f.value = (r == null ? void 0 : r.margin) !== void 0 ? r.margin : [10, 10], g.value = r == null ? void 0 : r.maxRows, n.isDraggable === null ? m.value = r == null ? void 0 : r.isDraggable : m.value = n.isDraggable, n.isResizable === null ? b.value = r == null ? void 0 : r.isResizable : b.value = n.isResizable, n.isBounded === null ? at.value = r == null ? void 0 : r.isBounded : at.value = n.isBounded, S.value = r == null ? void 0 : r.transformScale, I.value = r == null ? void 0 : r.useCssTransforms, A.value = r == null ? void 0 : r.useStyleCursor, et();
    });
    function et() {
      var B, X, k, q, $t;
      n.x + n.w > l.value ? (_.value = 0, it.value = n.w > l.value ? l.value : n.w) : (_.value = n.x, it.value = n.w);
      let h = mt(_.value, Z.value, it.value, Q.value);
      T.value && (h.top = (B = z.value) == null ? void 0 : B.top, ut.value ? h.right = (X = z.value) == null ? void 0 : X.left : h.left = (k = z.value) == null ? void 0 : k.left), v.value && (h.width = (q = d.value) == null ? void 0 : q.width, h.height = ($t = d.value) == null ? void 0 : $t.height);
      let w;
      I.value ? ut.value ? w = Gi(h.top, h.right, h.width, h.height) : w = Yi(h.top, h.left, h.width, h.height) : ut.value ? w = Ui(h.top, h.right, h.width, h.height) : w = qi(h.top, h.left, h.width, h.height), H.value = w;
    }
    function dt() {
      let h = {};
      for (let w of ["width", "height"]) {
        let X = H.value[w].match(/^(\d+)px$/);
        if (!X)
          return;
        h[w] = X[1];
      }
      i("container-resized", n.i, n.h, n.w, h.height, h.width);
    }
    function zt(h) {
      var w, B, X;
      {
        if (n.static)
          return;
        const k = gn(h);
        if (k == null)
          return;
        const { x: q, y: $t } = k, rt = { width: 0, height: 0 };
        let j;
        switch (h.type) {
          case "resizestart": {
            ct(), R.value = it.value, N.value = Q.value, j = mt(_.value, Z.value, it.value, Q.value), rt.width = j.width, rt.height = j.height, d.value = rt, v.value = !0;
            break;
          }
          case "resizemove": {
            const ht = vn(L.value, ot.value, q, $t);
            ut.value ? rt.width = Number((w = d.value) == null ? void 0 : w.width) - ht.deltaX / S.value : rt.width = Number((B = d.value) == null ? void 0 : B.width) + ht.deltaX / S.value, rt.height = Number((X = d.value) == null ? void 0 : X.height) + ht.deltaY / S.value, d.value = rt;
            break;
          }
          case "resizeend": {
            j = mt(_.value, Z.value, it.value, Q.value), rt.width = j.width, rt.height = j.height, d.value = null, v.value = !1;
            break;
          }
        }
        j = pt(rt.height, rt.width), j.w < n.minW && (j.w = n.minW), j.w > n.maxW && (j.w = n.maxW), j.h < n.minH && (j.h = n.minH), j.h > n.maxH && (j.h = n.maxH), j.h < 1 && (j.h = 1), j.w < 1 && (j.w = 1), L.value = q, ot.value = $t, (it.value !== j.w || Q.value !== j.h) && i("resize", n.i, j.h, j.w, rt.height, rt.width), h.type === "resizeend" && (R.value !== it.value || N.value !== Q.value) && i("resized", n.i, j.h, j.w, rt.height, rt.width);
        const pe = {
          eventType: h.type,
          i: n.i,
          x: _.value,
          y: Z.value,
          h: j.h,
          w: j.w
        };
        s.emit("resizeEvent", pe);
      }
    }
    function de(h) {
      var rt, j, pe;
      if (n.static || v.value)
        return;
      const w = gn(h);
      if (w === null)
        return;
      const { x: B, y: X } = w;
      let k = { top: 0, left: 0 };
      switch (h.type) {
        case "dragstart": {
          U.value = _.value, J.value = Z.value;
          const ht = h.target;
          let Mt = ht.offsetParent.getBoundingClientRect(), wt = ht.getBoundingClientRect();
          const te = wt.left / S.value, ee = Mt.left / S.value, Ae = wt.right / S.value, Oe = Mt.right / S.value, ke = wt.top / S.value, Re = Mt.top / S.value;
          ut.value ? k.left = (Ae - Oe) * -1 : k.left = te - ee, k.top = ke - Re, z.value = k, T.value = !0;
          break;
        }
        case "dragend": {
          if (!T.value)
            return;
          i("dragend", h, n.i);
          const ht = h.target;
          let Mt = ht.offsetParent.getBoundingClientRect(), wt = ht.getBoundingClientRect();
          const te = wt.left / S.value, ee = Mt.left / S.value, Ae = wt.right / S.value, Oe = Mt.right / S.value, ke = wt.top / S.value, Re = Mt.top / S.value;
          ut.value ? k.left = (Ae - Oe) * -1 : k.left = te - ee, k.top = ke - Re, z.value = null, T.value = !1;
          break;
        }
        case "dragmove": {
          i("dragging", h, n.i);
          const ht = vn(O.value, x.value, B, X);
          if (ut.value ? k.left = Number((rt = z.value) == null ? void 0 : rt.left) - ht.deltaX / S.value : k.left = Number((j = z.value) == null ? void 0 : j.left) + ht.deltaX / S.value, k.top = Number((pe = z.value) == null ? void 0 : pe.top) + ht.deltaY / S.value, at.value) {
            const wt = h.target.offsetParent.clientHeight - Jt(n.h, u.value, f.value[1]);
            k.top = nt(k.top, 0, wt);
            const te = Ht(), ee = c.value - Jt(n.w, te, f.value[0]);
            k.left = nt(k.left, 0, ee);
          }
          z.value = k;
          break;
        }
      }
      let q;
      ut.value, q = jt(k.top, k.left), O.value = B, x.value = X, (_.value !== q.x || Z.value !== q.y) && i("move", n.i, q.x, q.y), h.type === "dragend" && (U.value !== _.value || J.value !== Z.value) && i("moved", n.i, q.x, q.y);
      const $t = {
        eventType: h.type,
        i: n.i,
        x: q.x,
        y: q.y,
        h: Q.value,
        w: it.value
      };
      s.emit("dragEvent", $t);
    }
    function mt(h, w, B, X) {
      const k = Ht();
      let q;
      return ut.value ? q = {
        right: Math.round(k * h + (h + 1) * f.value[0]),
        top: Math.round(u.value * w + (w + 1) * f.value[1]),
        width: B === 1 / 0 ? B : Math.round(k * B + Math.max(0, B - 1) * f.value[0]),
        height: X === 1 / 0 ? X : Math.round(u.value * X + Math.max(0, X - 1) * f.value[1])
      } : q = {
        left: Math.round(k * h + (h + 1) * f.value[0]),
        top: Math.round(u.value * w + (w + 1) * f.value[1]),
        width: B === 1 / 0 ? B : Math.round(k * B + Math.max(0, B - 1) * f.value[0]),
        height: X === 1 / 0 ? X : Math.round(u.value * X + Math.max(0, X - 1) * f.value[1])
      }, q;
    }
    function jt(h, w) {
      const B = Ht();
      let X = Math.round((w - f.value[0]) / (B + f.value[0])), k = Math.round((h - f.value[1]) / (u.value + f.value[1]));
      return X = Math.max(Math.min(X, l.value - it.value), 0), k = Math.max(Math.min(k, g.value - Q.value), 0), { x: X, y: k };
    }
    function Ht() {
      return (c.value - f.value[0] * (l.value + 1)) / l.value;
    }
    function Jt(h, w, B) {
      return Number.isFinite(h) ? Math.round(w * h + Math.max(0, h - 1) * B) : h;
    }
    function nt(h, w, B) {
      return Math.max(Math.min(h, B), w);
    }
    function pt(h, w, B = !1) {
      const X = Ht();
      let k = Math.round((w + f.value[0]) / (X + f.value[0])), q = 0;
      return B ? q = Math.ceil((h + f.value[1]) / (u.value + f.value[1])) : q = Math.round((h + f.value[1]) / (u.value + f.value[1])), k = Math.max(Math.min(k, l.value - _.value), 0), q = Math.max(Math.min(q, g.value - Z.value), 0), { w: k, h: q };
    }
    function _t(h, w) {
      c.value = h, w != null && (l.value = w);
    }
    function yt(h) {
      et();
    }
    function he() {
      var h;
      if ((Y.value === null || Y.value === void 0) && (Y.value = Tt(a.value), A.value || Y.value.styleCursor(!1)), m.value && !n.static) {
        const w = {
          ignoreFrom: n.dragIgnoreFrom,
          allowFrom: n.dragAllowFrom,
          ...n.dragOption
        };
        Y.value.draggable(w), y.value || (y.value = !0, (h = Y.value) == null || h.on("dragstart dragmove dragend", function(B) {
          de(B);
        }));
      } else
        Y.value.draggable({
          enabled: !1
        });
    }
    function ct() {
      var h;
      if ((Y.value === null || Y.value === void 0) && (Y.value = Tt(a.value), A.value || Y.value.styleCursor(!1)), b.value && !n.static) {
        let w = mt(0, 0, n.maxW, n.maxH), B = mt(0, 0, n.minW, n.minH);
        const X = {
          edges: {
            left: !1,
            right: "." + E.value.trim().replace(" ", "."),
            bottom: "." + E.value.trim().replace(" ", "."),
            top: !1
          },
          ignoreFrom: n.resizeIgnoreFrom,
          restrictSize: {
            min: {
              height: B.height * S.value,
              width: B.width * S.value
            },
            max: {
              height: w.height * S.value,
              width: w.width * S.value
            }
          },
          ...n.resizeOption
        };
        n.preserveAspectRatio && (X.modifiers = [
          Tt.modifiers.aspectRatio({
            ratio: "preserve"
          })
        ]), Y.value.resizable(X), M.value || (M.value = !0, (h = Y.value) == null || h.on("resizestart resizemove resizeend", function(k) {
          zt(k);
        }));
      } else
        Y.value.resizable({
          enabled: !1
        });
    }
    const Zt = ki();
    function Qt() {
      R.value = it.value, N.value = Q.value;
      let h = Zt == null ? void 0 : Zt.default[0].elm.getBoundingClientRect(), w = pt(h.height, h.width, !0);
      if (w.w < n.minW && (w.w = n.minW), w.w > n.maxW && (w.w = n.maxW), w.h < n.minH && (w.h = n.minH), w.h > n.maxH && (w.h = n.maxH), w.h < 1 && (w.h = 1), w.w < 1 && (w.w = 1), (it.value !== w.w || Q.value !== w.h) && i("resize", n.i, w.h, w.w, h.height, h.width), R.value !== w.w || N.value !== w.h) {
        i("resized", n.i, w.h, w.w, h.height, h.width);
        const B = {
          eventType: "resizeend",
          i: n.i,
          x: _.value,
          y: Z.value,
          h: w.h,
          w: w.w
        };
        s.emit("resizeEvent", B);
      }
    }
    return t({
      autoSize: Qt,
      calcXY: jt,
      dragging: z,
      ...n
    }), (h, w) => (je(), Xe("div", {
      ref_key: "this$refsItem",
      ref: a,
      class: dn(["vue-grid-item", He(fe)]),
      style: Ye(H.value)
    }, [
      Xn(h.$slots, "default", {
        style: Ye(H.value)
      }),
      He(ue) ? (je(), Xe("span", {
        key: 0,
        ref: "handle",
        class: dn(He(E))
      }, null, 2)) : Ri("", !0)
    ], 6));
  }
});
function Ps(e) {
  return { all: e = e || /* @__PURE__ */ new Map(), on: function(t, i) {
    var n = e.get(t);
    n ? n.push(i) : e.set(t, [i]);
  }, off: function(t, i) {
    var n = e.get(t);
    n && (i ? n.splice(n.indexOf(i) >>> 0, 1) : e.set(t, []));
  }, emit: function(t, i) {
    var n = e.get(t);
    n && n.slice().map(function(o) {
      o(i);
    }), (n = e.get("*")) && n.slice().map(function(o) {
      o(t, i);
    });
  } };
}
var ln = { exports: {} }, As = ln.exports = {};
As.forEach = function(e, t) {
  for (var i = 0; i < e.length; i++) {
    var n = t(e[i]);
    if (n)
      return n;
  }
};
var Os = function(e) {
  var t = e.stateHandler.getState;
  function i(s) {
    var a = t(s);
    return a && !!a.isDetectable;
  }
  function n(s) {
    t(s).isDetectable = !0;
  }
  function o(s) {
    return !!t(s).busy;
  }
  function r(s, a) {
    t(s).busy = !!a;
  }
  return {
    isDetectable: i,
    markAsDetectable: n,
    isBusy: o,
    markBusy: r
  };
}, ks = function(e) {
  var t = {};
  function i(s) {
    var a = e.get(s);
    return a === void 0 ? [] : t[a] || [];
  }
  function n(s, a) {
    var l = e.get(s);
    t[l] || (t[l] = []), t[l].push(a);
  }
  function o(s, a) {
    for (var l = i(s), c = 0, u = l.length; c < u; ++c)
      if (l[c] === a) {
        l.splice(c, 1);
        break;
      }
  }
  function r(s) {
    var a = i(s);
    !a || (a.length = 0);
  }
  return {
    get: i,
    add: n,
    removeListener: o,
    removeAllListeners: r
  };
}, Rs = function() {
  var e = 1;
  function t() {
    return e++;
  }
  return {
    generate: t
  };
}, Hs = function(e) {
  var t = e.idGenerator, i = e.stateHandler.getState;
  function n(r) {
    var s = i(r);
    return s && s.id !== void 0 ? s.id : null;
  }
  function o(r) {
    var s = i(r);
    if (!s)
      throw new Error("setId required the element to have a resize detection state.");
    var a = t.generate();
    return s.id = a, a;
  }
  return {
    get: n,
    set: o
  };
}, $s = function(e) {
  function t() {
  }
  var i = {
    log: t,
    warn: t,
    error: t
  };
  if (!e && window.console) {
    var n = function(o, r) {
      o[r] = function() {
        var a = console[r];
        if (a.apply)
          a.apply(console, arguments);
        else
          for (var l = 0; l < arguments.length; l++)
            a(arguments[l]);
      };
    };
    n(i, "log"), n(i, "warn"), n(i, "error");
  }
  return i;
}, cn = { exports: {} }, _i = cn.exports = {};
_i.isIE = function(e) {
  function t() {
    var n = navigator.userAgent.toLowerCase();
    return n.indexOf("msie") !== -1 || n.indexOf("trident") !== -1 || n.indexOf(" edge/") !== -1;
  }
  if (!t())
    return !1;
  if (!e)
    return !0;
  var i = function() {
    var n, o = 3, r = document.createElement("div"), s = r.getElementsByTagName("i");
    do
      r.innerHTML = "<!--[if gt IE " + ++o + "]><i></i><![endif]-->";
    while (s[0]);
    return o > 4 ? o : n;
  }();
  return e === i;
};
_i.isLegacyOpera = function() {
  return !!window.opera;
};
var Mi = { exports: {} }, Bs = Mi.exports = {};
Bs.getOption = Ls;
function Ls(e, t, i) {
  var n = e[t];
  return n == null && i !== void 0 ? i : n;
}
var Rn = Mi.exports, Ws = function(t) {
  t = t || {};
  var i = t.reporter, n = Rn.getOption(t, "async", !0), o = Rn.getOption(t, "auto", !0);
  o && !n && (i && i.warn("Invalid options combination. auto=true and async=false is invalid. Setting async=true."), n = !0);
  var r = Hn(), s, a = !1;
  function l(b, S) {
    !a && o && n && r.size() === 0 && f(), r.add(b, S);
  }
  function c() {
    for (a = !0; r.size(); ) {
      var b = r;
      r = Hn(), b.process();
    }
    a = !1;
  }
  function u(b) {
    a || (b === void 0 && (b = n), s && (g(s), s = null), b ? f() : c());
  }
  function f() {
    s = m(c);
  }
  function g(b) {
    var S = clearTimeout;
    return S(b);
  }
  function m(b) {
    var S = function(I) {
      return setTimeout(I, 0);
    };
    return S(b);
  }
  return {
    add: l,
    force: u
  };
};
function Hn() {
  var e = {}, t = 0, i = 0, n = 0;
  function o(a, l) {
    l || (l = a, a = 0), a > i ? i = a : a < n && (n = a), e[a] || (e[a] = []), e[a].push(l), t++;
  }
  function r() {
    for (var a = n; a <= i; a++)
      for (var l = e[a], c = 0; c < l.length; c++) {
        var u = l[c];
        u();
      }
  }
  function s() {
    return t;
  }
  return {
    add: o,
    process: r,
    size: s
  };
}
var un = "_erd";
function Fs(e) {
  return e[un] = {}, Di(e);
}
function Di(e) {
  return e[un];
}
function Ns(e) {
  delete e[un];
}
var js = {
  initState: Fs,
  getState: Di,
  cleanState: Ns
}, oe = cn.exports, Xs = function(e) {
  e = e || {};
  var t = e.reporter, i = e.batchProcessor, n = e.stateHandler.getState;
  if (!t)
    throw new Error("Missing required dependency: reporter.");
  function o(c, u) {
    function f() {
      u(c);
    }
    if (oe.isIE(8))
      n(c).object = {
        proxy: f
      }, c.attachEvent("onresize", f);
    else {
      var g = a(c);
      if (!g)
        throw new Error("Element is not detectable by this strategy.");
      g.contentDocument.defaultView.addEventListener("resize", f);
    }
  }
  function r(c) {
    var u = e.important ? " !important; " : "; ";
    return (c.join(u) + u).trim();
  }
  function s(c, u, f) {
    f || (f = u, u = c, c = null), c = c || {}, c.debug;
    function g(m, b) {
      var S = r(["display: block", "position: absolute", "top: 0", "left: 0", "width: 100%", "height: 100%", "border: none", "padding: 0", "margin: 0", "opacity: 0", "z-index: -1000", "pointer-events: none"]), I = !1, A = window.getComputedStyle(m), T = m.offsetWidth, z = m.offsetHeight;
      n(m).startSize = {
        width: T,
        height: z
      };
      function v() {
        function d() {
          if (A.position === "static") {
            m.style.setProperty("position", "relative", c.important ? "important" : "");
            var L = function(ot, H, K, y) {
              function M(N) {
                return N.replace(/[^-\d\.]/g, "");
              }
              var R = K[y];
              R !== "auto" && M(R) !== "0" && (ot.warn("An element that is positioned static has style." + y + "=" + R + " which is ignored due to the static positioning. The element will need to be positioned relative, so the style." + y + " will be set to 0. Element: ", H), H.style.setProperty(y, "0", c.important ? "important" : ""));
            };
            L(t, m, A, "top"), L(t, m, A, "right"), L(t, m, A, "bottom"), L(t, m, A, "left");
          }
        }
        function O() {
          I || d();
          function L(H, K) {
            if (!H.contentDocument) {
              var y = n(H);
              y.checkForObjectDocumentTimeoutId && window.clearTimeout(y.checkForObjectDocumentTimeoutId), y.checkForObjectDocumentTimeoutId = setTimeout(function() {
                y.checkForObjectDocumentTimeoutId = 0, L(H, K);
              }, 100);
              return;
            }
            K(H.contentDocument);
          }
          var ot = this;
          L(ot, function(K) {
            b(m);
          });
        }
        A.position !== "" && (d(), I = !0);
        var x = document.createElement("object");
        x.style.cssText = S, x.tabIndex = -1, x.type = "text/html", x.setAttribute("aria-hidden", "true"), x.onload = O, oe.isIE() || (x.data = "about:blank"), n(m) && (m.appendChild(x), n(m).object = x, oe.isIE() && (x.data = "about:blank"));
      }
      i ? i.add(v) : v();
    }
    oe.isIE(8) ? f(u) : g(u, f);
  }
  function a(c) {
    return n(c).object;
  }
  function l(c) {
    if (!!n(c)) {
      var u = a(c);
      !u || (oe.isIE(8) ? c.detachEvent("onresize", u.proxy) : c.removeChild(u), n(c).checkForObjectDocumentTimeoutId && window.clearTimeout(n(c).checkForObjectDocumentTimeoutId), delete n(c).object);
    }
  }
  return {
    makeDetectable: s,
    addListener: o,
    uninstall: l
  };
}, Ys = ln.exports.forEach, Gs = function(e) {
  e = e || {};
  var t = e.reporter, i = e.batchProcessor, n = e.stateHandler.getState;
  e.stateHandler.hasState;
  var o = e.idHandler;
  if (!i)
    throw new Error("Missing required dependency: batchProcessor");
  if (!t)
    throw new Error("Missing required dependency: reporter.");
  var r = u(), s = "erd_scroll_detection_scrollbar_style", a = "erd_scroll_detection_container";
  function l(v) {
    f(v, s, a);
  }
  l(window.document);
  function c(v) {
    var d = e.important ? " !important; " : "; ";
    return (v.join(d) + d).trim();
  }
  function u() {
    var v = 500, d = 500, O = document.createElement("div");
    O.style.cssText = c(["position: absolute", "width: " + v * 2 + "px", "height: " + d * 2 + "px", "visibility: hidden", "margin: 0", "padding: 0"]);
    var x = document.createElement("div");
    x.style.cssText = c(["position: absolute", "width: " + v + "px", "height: " + d + "px", "overflow: scroll", "visibility: none", "top: " + -v * 3 + "px", "left: " + -d * 3 + "px", "visibility: hidden", "margin: 0", "padding: 0"]), x.appendChild(O), document.body.insertBefore(x, document.body.firstChild);
    var L = v - x.clientWidth, ot = d - x.clientHeight;
    return document.body.removeChild(x), {
      width: L,
      height: ot
    };
  }
  function f(v, d, O) {
    function x(K, y) {
      y = y || function(R) {
        v.head.appendChild(R);
      };
      var M = v.createElement("style");
      return M.innerHTML = K, M.id = d, y(M), M;
    }
    if (!v.getElementById(d)) {
      var L = O + "_animation", ot = O + "_animation_active", H = `/* Created by the element-resize-detector library. */
`;
      H += "." + O + " > div::-webkit-scrollbar { " + c(["display: none"]) + ` }

`, H += "." + ot + " { " + c(["-webkit-animation-duration: 0.1s", "animation-duration: 0.1s", "-webkit-animation-name: " + L, "animation-name: " + L]) + ` }
`, H += "@-webkit-keyframes " + L + ` { 0% { opacity: 1; } 50% { opacity: 0; } 100% { opacity: 1; } }
`, H += "@keyframes " + L + " { 0% { opacity: 1; } 50% { opacity: 0; } 100% { opacity: 1; } }", x(H);
    }
  }
  function g(v) {
    v.className += " " + a + "_animation_active";
  }
  function m(v, d, O) {
    if (v.addEventListener)
      v.addEventListener(d, O);
    else if (v.attachEvent)
      v.attachEvent("on" + d, O);
    else
      return t.error("[scroll] Don't know how to add event listeners.");
  }
  function b(v, d, O) {
    if (v.removeEventListener)
      v.removeEventListener(d, O);
    else if (v.detachEvent)
      v.detachEvent("on" + d, O);
    else
      return t.error("[scroll] Don't know how to remove event listeners.");
  }
  function S(v) {
    return n(v).container.childNodes[0].childNodes[0].childNodes[0];
  }
  function I(v) {
    return n(v).container.childNodes[0].childNodes[0].childNodes[1];
  }
  function A(v, d) {
    var O = n(v).listeners;
    if (!O.push)
      throw new Error("Cannot add listener to an element that is not detectable.");
    n(v).listeners.push(d);
  }
  function T(v, d, O) {
    O || (O = d, d = v, v = null), v = v || {};
    function x() {
      if (v.debug) {
        var E = Array.prototype.slice.call(arguments);
        if (E.unshift(o.get(d), "Scroll: "), t.log.apply)
          t.log.apply(null, E);
        else
          for (var $ = 0; $ < E.length; $++)
            t.log(E[$]);
      }
    }
    function L(E) {
      function $(G) {
        var ft = G.getRootNode && G.getRootNode().contains(G);
        return G === G.ownerDocument.body || G.ownerDocument.body.contains(G) || ft;
      }
      return !$(E) || window.getComputedStyle(E) === null;
    }
    function ot(E) {
      var $ = n(E).container.childNodes[0], G = window.getComputedStyle($);
      return !G.width || G.width.indexOf("px") === -1;
    }
    function H() {
      var E = window.getComputedStyle(d), $ = {};
      return $.position = E.position, $.width = d.offsetWidth, $.height = d.offsetHeight, $.top = E.top, $.right = E.right, $.bottom = E.bottom, $.left = E.left, $.widthCSS = E.width, $.heightCSS = E.height, $;
    }
    function K() {
      var E = H();
      n(d).startSize = {
        width: E.width,
        height: E.height
      }, x("Element start size", n(d).startSize);
    }
    function y() {
      n(d).listeners = [];
    }
    function M() {
      if (x("storeStyle invoked."), !n(d)) {
        x("Aborting because element has been uninstalled");
        return;
      }
      var E = H();
      n(d).style = E;
    }
    function R(E, $, G) {
      n(E).lastWidth = $, n(E).lastHeight = G;
    }
    function N(E) {
      return S(E).childNodes[0];
    }
    function U() {
      return 2 * r.width + 1;
    }
    function J() {
      return 2 * r.height + 1;
    }
    function _(E) {
      return E + 10 + U();
    }
    function Z(E) {
      return E + 10 + J();
    }
    function it(E) {
      return E * 2 + U();
    }
    function Q(E) {
      return E * 2 + J();
    }
    function at(E, $, G) {
      var ft = S(E), gt = I(E), bt = _($), xt = Z(G), st = it($), W = Q(G);
      ft.scrollLeft = bt, ft.scrollTop = xt, gt.scrollLeft = st, gt.scrollTop = W;
    }
    function Y() {
      var E = n(d).container;
      if (!E) {
        E = document.createElement("div"), E.className = a, E.style.cssText = c(["visibility: hidden", "display: inline", "width: 0px", "height: 0px", "z-index: -1", "overflow: hidden", "margin: 0", "padding: 0"]), n(d).container = E, g(E), d.appendChild(E);
        var $ = function() {
          n(d).onRendered && n(d).onRendered();
        };
        m(E, "animationstart", $), n(d).onAnimationStart = $;
      }
      return E;
    }
    function ue() {
      function E() {
        var nt = n(d).style;
        if (nt.position === "static") {
          d.style.setProperty("position", "relative", v.important ? "important" : "");
          var pt = function(_t, yt, he, ct) {
            function Zt(h) {
              return h.replace(/[^-\d\.]/g, "");
            }
            var Qt = he[ct];
            Qt !== "auto" && Zt(Qt) !== "0" && (_t.warn("An element that is positioned static has style." + ct + "=" + Qt + " which is ignored due to the static positioning. The element will need to be positioned relative, so the style." + ct + " will be set to 0. Element: ", yt), yt.style[ct] = 0);
          };
          pt(t, d, nt, "top"), pt(t, d, nt, "right"), pt(t, d, nt, "bottom"), pt(t, d, nt, "left");
        }
      }
      function $(nt, pt, _t, yt) {
        return nt = nt ? nt + "px" : "0", pt = pt ? pt + "px" : "0", _t = _t ? _t + "px" : "0", yt = yt ? yt + "px" : "0", ["left: " + nt, "top: " + pt, "right: " + yt, "bottom: " + _t];
      }
      if (x("Injecting elements"), !n(d)) {
        x("Aborting because element has been uninstalled");
        return;
      }
      E();
      var G = n(d).container;
      G || (G = Y());
      var ft = r.width, gt = r.height, bt = c(["position: absolute", "flex: none", "overflow: hidden", "z-index: -1", "visibility: hidden", "width: 100%", "height: 100%", "left: 0px", "top: 0px"]), xt = c(["position: absolute", "flex: none", "overflow: hidden", "z-index: -1", "visibility: hidden"].concat($(-(1 + ft), -(1 + gt), -gt, -ft))), st = c(["position: absolute", "flex: none", "overflow: scroll", "z-index: -1", "visibility: hidden", "width: 100%", "height: 100%"]), W = c(["position: absolute", "flex: none", "overflow: scroll", "z-index: -1", "visibility: hidden", "width: 100%", "height: 100%"]), lt = c(["position: absolute", "left: 0", "top: 0"]), vt = c(["position: absolute", "width: 200%", "height: 200%"]), et = document.createElement("div"), dt = document.createElement("div"), zt = document.createElement("div"), de = document.createElement("div"), mt = document.createElement("div"), jt = document.createElement("div");
      et.dir = "ltr", et.style.cssText = bt, et.className = a, dt.className = a, dt.style.cssText = xt, zt.style.cssText = st, de.style.cssText = lt, mt.style.cssText = W, jt.style.cssText = vt, zt.appendChild(de), mt.appendChild(jt), dt.appendChild(zt), dt.appendChild(mt), et.appendChild(dt), G.appendChild(et);
      function Ht() {
        var nt = n(d);
        nt && nt.onExpand ? nt.onExpand() : x("Aborting expand scroll handler: element has been uninstalled");
      }
      function Jt() {
        var nt = n(d);
        nt && nt.onShrink ? nt.onShrink() : x("Aborting shrink scroll handler: element has been uninstalled");
      }
      m(zt, "scroll", Ht), m(mt, "scroll", Jt), n(d).onExpandScroll = Ht, n(d).onShrinkScroll = Jt;
    }
    function Ce() {
      function E(st, W, lt) {
        var vt = N(st), et = _(W), dt = Z(lt);
        vt.style.setProperty("width", et + "px", v.important ? "important" : ""), vt.style.setProperty("height", dt + "px", v.important ? "important" : "");
      }
      function $(st) {
        var W = d.offsetWidth, lt = d.offsetHeight, vt = W !== n(d).lastWidth || lt !== n(d).lastHeight;
        x("Storing current size", W, lt), R(d, W, lt), i.add(0, function() {
          if (!!vt) {
            if (!n(d)) {
              x("Aborting because element has been uninstalled");
              return;
            }
            if (!G()) {
              x("Aborting because element container has not been initialized");
              return;
            }
            if (v.debug) {
              var dt = d.offsetWidth, zt = d.offsetHeight;
              (dt !== W || zt !== lt) && t.warn(o.get(d), "Scroll: Size changed before updating detector elements.");
            }
            E(d, W, lt);
          }
        }), i.add(1, function() {
          if (!n(d)) {
            x("Aborting because element has been uninstalled");
            return;
          }
          if (!G()) {
            x("Aborting because element container has not been initialized");
            return;
          }
          at(d, W, lt);
        }), vt && st && i.add(2, function() {
          if (!n(d)) {
            x("Aborting because element has been uninstalled");
            return;
          }
          if (!G()) {
            x("Aborting because element container has not been initialized");
            return;
          }
          st();
        });
      }
      function G() {
        return !!n(d).container;
      }
      function ft() {
        function st() {
          return n(d).lastNotifiedWidth === void 0;
        }
        x("notifyListenersIfNeeded invoked");
        var W = n(d);
        if (st() && W.lastWidth === W.startSize.width && W.lastHeight === W.startSize.height)
          return x("Not notifying: Size is the same as the start size, and there has been no notification yet.");
        if (W.lastWidth === W.lastNotifiedWidth && W.lastHeight === W.lastNotifiedHeight)
          return x("Not notifying: Size already notified");
        x("Current size not notified, notifying..."), W.lastNotifiedWidth = W.lastWidth, W.lastNotifiedHeight = W.lastHeight, Ys(n(d).listeners, function(lt) {
          lt(d);
        });
      }
      function gt() {
        if (x("startanimation triggered."), ot(d)) {
          x("Ignoring since element is still unrendered...");
          return;
        }
        x("Element rendered.");
        var st = S(d), W = I(d);
        (st.scrollLeft === 0 || st.scrollTop === 0 || W.scrollLeft === 0 || W.scrollTop === 0) && (x("Scrollbars out of sync. Updating detector elements..."), $(ft));
      }
      function bt() {
        if (x("Scroll detected."), ot(d)) {
          x("Scroll event fired while unrendered. Ignoring...");
          return;
        }
        $(ft);
      }
      if (x("registerListenersAndPositionElements invoked."), !n(d)) {
        x("Aborting because element has been uninstalled");
        return;
      }
      n(d).onRendered = gt, n(d).onExpand = bt, n(d).onShrink = bt;
      var xt = n(d).style;
      E(d, xt.width, xt.height);
    }
    function Pe() {
      if (x("finalizeDomMutation invoked."), !n(d)) {
        x("Aborting because element has been uninstalled");
        return;
      }
      var E = n(d).style;
      R(d, E.width, E.height), at(d, E.width, E.height);
    }
    function ut() {
      O(d);
    }
    function fe() {
      x("Installing..."), y(), K(), i.add(0, M), i.add(1, ue), i.add(2, Ce), i.add(3, Pe), i.add(4, ut);
    }
    x("Making detectable..."), L(d) ? (x("Element is detached"), Y(), x("Waiting until element is attached..."), n(d).onRendered = function() {
      x("Element is now attached"), fe();
    }) : fe();
  }
  function z(v) {
    var d = n(v);
    !d || (d.onExpandScroll && b(S(v), "scroll", d.onExpandScroll), d.onShrinkScroll && b(I(v), "scroll", d.onShrinkScroll), d.onAnimationStart && b(d.container, "animationstart", d.onAnimationStart), d.container && v.removeChild(d.container));
  }
  return {
    makeDetectable: T,
    addListener: A,
    uninstall: z,
    initDocument: l
  };
}, re = ln.exports.forEach, qs = Os, Us = ks, Vs = Rs, Ks = Hs, Js = $s, $n = cn.exports, Zs = Ws, Ct = js, Qs = Xs, ta = Gs;
function Bn(e) {
  return Array.isArray(e) || e.length !== void 0;
}
function Ln(e) {
  if (Array.isArray(e))
    return e;
  var t = [];
  return re(e, function(i) {
    t.push(i);
  }), t;
}
function Wn(e) {
  return e && e.nodeType === 1;
}
var ea = function(e) {
  e = e || {};
  var t;
  if (e.idHandler)
    t = {
      get: function(T) {
        return e.idHandler.get(T, !0);
      },
      set: e.idHandler.set
    };
  else {
    var i = Vs(), n = Ks({
      idGenerator: i,
      stateHandler: Ct
    });
    t = n;
  }
  var o = e.reporter;
  if (!o) {
    var r = o === !1;
    o = Js(r);
  }
  var s = Pt(e, "batchProcessor", Zs({ reporter: o })), a = {};
  a.callOnAdd = !!Pt(e, "callOnAdd", !0), a.debug = !!Pt(e, "debug", !1);
  var l = Us(t), c = qs({
    stateHandler: Ct
  }), u, f = Pt(e, "strategy", "object"), g = Pt(e, "important", !1), m = {
    reporter: o,
    batchProcessor: s,
    stateHandler: Ct,
    idHandler: t,
    important: g
  };
  if (f === "scroll" && ($n.isLegacyOpera() ? (o.warn("Scroll strategy is not supported on legacy Opera. Changing to object strategy."), f = "object") : $n.isIE(9) && (o.warn("Scroll strategy is not supported on IE9. Changing to object strategy."), f = "object")), f === "scroll")
    u = ta(m);
  else if (f === "object")
    u = Qs(m);
  else
    throw new Error("Invalid strategy name: " + f);
  var b = {};
  function S(T, z, v) {
    function d(K) {
      var y = l.get(K);
      re(y, function(R) {
        R(K);
      });
    }
    function O(K, y, M) {
      l.add(y, M), K && M(y);
    }
    if (v || (v = z, z = T, T = {}), !z)
      throw new Error("At least one element required.");
    if (!v)
      throw new Error("Listener required.");
    if (Wn(z))
      z = [z];
    else if (Bn(z))
      z = Ln(z);
    else
      return o.error("Invalid arguments. Must be a DOM element or a collection of DOM elements.");
    var x = 0, L = Pt(T, "callOnAdd", a.callOnAdd), ot = Pt(T, "onReady", function() {
    }), H = Pt(T, "debug", a.debug);
    re(z, function(y) {
      Ct.getState(y) || (Ct.initState(y), t.set(y));
      var M = t.get(y);
      if (H && o.log("Attaching listener to element", M, y), !c.isDetectable(y)) {
        if (H && o.log(M, "Not detectable."), c.isBusy(y)) {
          H && o.log(M, "System busy making it detectable"), O(L, y, v), b[M] = b[M] || [], b[M].push(function() {
            x++, x === z.length && ot();
          });
          return;
        }
        return H && o.log(M, "Making detectable..."), c.markBusy(y, !0), u.makeDetectable({ debug: H, important: g }, y, function(N) {
          if (H && o.log(M, "onElementDetectable"), Ct.getState(N)) {
            c.markAsDetectable(N), c.markBusy(N, !1), u.addListener(N, d), O(L, N, v);
            var U = Ct.getState(N);
            if (U && U.startSize) {
              var J = N.offsetWidth, _ = N.offsetHeight;
              (U.startSize.width !== J || U.startSize.height !== _) && d(N);
            }
            b[M] && re(b[M], function(Z) {
              Z();
            });
          } else
            H && o.log(M, "Element uninstalled before being detectable.");
          delete b[M], x++, x === z.length && ot();
        });
      }
      H && o.log(M, "Already detecable, adding listener."), O(L, y, v), x++;
    }), x === z.length && ot();
  }
  function I(T) {
    if (!T)
      return o.error("At least one element is required.");
    if (Wn(T))
      T = [T];
    else if (Bn(T))
      T = Ln(T);
    else
      return o.error("Invalid arguments. Must be a DOM element or a collection of DOM elements.");
    re(T, function(z) {
      l.removeAllListeners(z), u.uninstall(z), Ct.cleanState(z);
    });
  }
  function A(T) {
    u.initDocument && u.initDocument(T);
  }
  return {
    listenTo: S,
    removeListener: l.removeListener,
    removeAllListeners: l.removeAllListeners,
    uninstall: I,
    initDocument: A
  };
};
function Pt(e, t, i) {
  var n = e[t];
  return n == null && i !== void 0 ? i : n;
}
const na = {
  name: "GridLayout"
}, ia = /* @__PURE__ */ Fn({
  ...na,
  props: {
    autoSize: { type: Boolean, default: !0 },
    colNum: { default: 12 },
    rowHeight: { default: 100 },
    maxRows: { default: 1 / 0 },
    margin: { default: () => [10, 10] },
    isDraggable: { type: Boolean, default: !0 },
    isResizable: { type: Boolean, default: !0 },
    isMirrored: { type: Boolean, default: !1 },
    isBounded: { type: Boolean, default: !1 },
    useCssTransforms: { type: Boolean, default: !0 },
    verticalCompact: { type: Boolean, default: !0 },
    restoreOnDrag: { type: Boolean, default: !1 },
    layout: null,
    responsive: { type: Boolean, default: !1 },
    responsiveLayouts: { default: () => ({}) },
    transformScale: { default: 1 },
    breakpoints: { default: () => ({ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }) },
    cols: { default: () => ({ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }) },
    preventCollision: { type: Boolean, default: !1 },
    useStyleCursor: { type: Boolean, default: !0 }
  },
  emits: ["layout-created", "layout-before-mount", "layout-mounted", "layout-updated", "layout-ready", "update:layout", "breakpoint-changed"],
  setup(e, { expose: t, emit: i }) {
    const n = e, o = P(null), r = P({}), s = P(0), a = P(!1), l = P({ x: 0, y: 0, w: 0, h: 0, i: -1 }), c = P({}), u = P(null), f = P(null), g = P(null), m = P(), b = P({}), S = P(), I = Ps();
    Hi("eventBus", I);
    function A(y) {
      if (!y)
        L();
      else {
        const { eventType: M, i: R, x: N, y: U, h: J, w: _ } = y;
        L(M, R, N, U, J, _);
      }
    }
    function T(y) {
      if (!y)
        x();
      else {
        const { eventType: M, i: R, x: N, y: U, h: J, w: _ } = y;
        x(M, R, N, U, J, _);
      }
    }
    I.on("resizeEvent", A), I.on("dragEvent", T), i("layout-created", n.layout), Nn(() => {
      I.off("resizeEvent", A), I.off("dragEvent", T), io("resize", d), g.value && g.value.uninstall(b.value);
    }), $i(() => {
      i("layout-before-mount", n.layout);
    }), jn(() => {
      i("layout-mounted", n.layout), St(function() {
        Vi(n.layout), f.value = n.layout, St(() => {
          H(), d(), no("resize", d), Gt(n.layout, n.verticalCompact), i("layout-updated", n.layout), v(), St(() => {
            g.value = ea({
              strategy: "scroll",
              callOnAdd: !1
            }), g.value.listenTo(b.value, function() {
              d();
            });
          });
        });
      });
    }), F(o, (y, M) => {
      St(() => {
        I.emit("updateWidth", y), M === null && St(() => {
          i("layout-ready", n.layout);
        }), v();
      });
    }), F(
      () => n.layout,
      () => {
        z();
      }
    ), F(
      () => n.layout.length,
      () => {
        z();
      }
    ), F(
      () => n.colNum,
      (y) => {
        I.emit("setColNum", y);
      }
    ), F(
      () => n.rowHeight,
      (y) => {
        I.emit("setRowHeight", y);
      }
    ), F(
      () => n.isDraggable,
      (y) => {
        I.emit("setDraggable", y);
      }
    ), F(
      () => n.isResizable,
      (y) => {
        I.emit("setResizable", y);
      }
    ), F(
      () => n.isBounded,
      (y) => {
        I.emit("setBounded", y);
      }
    ), F(
      () => n.transformScale,
      (y) => {
        I.emit("setTransformScale", y);
      }
    ), F(
      () => n.responsive,
      (y) => {
        y || (i("update:layout", f.value || []), I.emit("setColNum", n.colNum)), d();
      }
    ), F(
      () => n.maxRows,
      (y) => {
        I.emit("setMaxRows", y);
      }
    ), F(
      () => n.margin,
      () => {
        v();
      }
    );
    function z() {
      if (n.layout !== void 0 && f.value !== null) {
        if (n.layout.length !== f.value.length) {
          let y = K(n.layout, f.value);
          y.length > 0 && (n.layout.length > f.value.length ? f.value = f.value.concat(y) : f.value = f.value.filter((M) => !y.some((R) => M.i === R.i))), s.value = n.layout.length, H();
        }
        Gt(n.layout, n.verticalCompact), I.emit("updateWidth", o.value), v(), i("layout-updated", n.layout);
      }
    }
    function v() {
      r.value = {
        height: O()
      };
    }
    function d() {
      b.value !== null && b.value !== void 0 && (o.value = b.value.offsetWidth), I.emit("resizeEvent");
    }
    function O() {
      return n.autoSize ? Fi(n.layout) * (n.rowHeight + n.margin[1]) + n.margin[1] + "px" : "";
    }
    function x(y, M, R, N, U, J) {
      let _ = hn(n.layout, M);
      _.x && (_.x = R), _.y && (_.y = N), _ == null && (_ = { x: 0, y: 0 }), y === "dragstart" && !n.verticalCompact && (m.value = n.layout.reduce(
        (it, { i: Q, x: at, y: Y }) => ({
          ...it,
          [Q]: { x: at, y: Y }
        }),
        {}
      )), y === "dragmove" || y === "dragstart" ? (l.value.i = M, l.value.x = R, l.value.y = N, l.value.w = J, l.value.h = U, St(function() {
        a.value = !0;
      }), I.emit("updateWidth", o.value)) : St(function() {
        a.value = !1;
      });
      const Z = qe(n.layout, _, R, N, !0, n.preventCollision);
      i("update:layout", Z), n.restoreOnDrag ? (_.static = !0, Gt(n.layout, n.verticalCompact, m.value), _.static = !1) : Gt(n.layout, n.verticalCompact), I.emit("compact"), v(), y === "dragend" && (m.value = void 0, i("layout-updated", Z));
    }
    function L(y, M, R, N, U, J) {
      let _ = hn(n.layout, M);
      _ == null && (_ = { h: 0, w: 0 }), J = Number(J), U = Number(U);
      let Z;
      if (n.preventCollision) {
        const it = Gn(n.layout, { ..._, w: J, h: U }).filter(
          (Q) => Q.i !== (_ == null ? void 0 : _.i)
        );
        if (Z = it.length > 0, Z) {
          let Q = 1 / 0, at = 1 / 0;
          it.forEach((Y) => {
            Y.x > Number(_ == null ? void 0 : _.x) && (Q = Math.min(Q, Y.x)), Y.y > Number(_ == null ? void 0 : _.y) && (at = Math.min(at, Y.y));
          }), Number.isFinite(Q) && (_.w = Q - _.x), Number.isFinite(at) && (_.h = at - _.y);
        }
      }
      Z || (_.w = J, _.h = U), y === "resizestart" || y === "resizemove" ? (l.value.i = M, l.value.x = R, l.value.y = N, l.value.w = _.w, l.value.h = _.h, St(function() {
        a.value = !0;
      }), I.emit("updateWidth", o.value)) : St(function() {
        a.value = !1;
      }), n.responsive && ot(), Gt(n.layout, n.verticalCompact), I.emit("compact"), v(), y === "resizeend" && i("layout-updated", n.layout);
    }
    function ot() {
      let y = Zi(n.breakpoints, o.value), M = Ue(y, n.cols);
      u.value != null && !c.value[u.value] && (c.value[u.value] = Ge(n.layout));
      let R = Qi(
        f.value,
        c.value,
        n.breakpoints,
        y,
        u.value,
        M,
        n.verticalCompact
      );
      c.value[y] = R, u.value !== y && i("breakpoint-changed", y, R), i("update:layout", R), u.value = y, I.emit("setColNum", Ue(y, n.cols));
    }
    function H() {
      c.value = Object.assign({}, n.responsiveLayouts);
    }
    function K(y, M) {
      let R = y.filter(function(U) {
        return !M.some(function(J) {
          return U.i === J.i;
        });
      }), N = M.filter(function(U) {
        return !y.some(function(J) {
          return U.i === J.i;
        });
      });
      return R.concat(N);
    }
    return t({
      ...n,
      width: o,
      mergeStyle: r,
      lastLayoutLength: s,
      isDragging: a,
      placeholder: l,
      layouts: c,
      lastBreakpoint: u,
      originalLayout: f,
      erd: g,
      defaultGridItem: S,
      dragEvent: x
    }), (y, M) => (je(), Xe("div", {
      ref_key: "this$refsLayout",
      ref: b,
      class: "vue-grid-layout",
      style: Ye(r.value)
    }, [
      Xn(y.$slots, "default"),
      Bi(Li(zi, {
        ref_key: "defaultGridItem",
        ref: S,
        class: "vue-grid-placeholder",
        x: l.value.x,
        y: l.value.y,
        w: l.value.w,
        h: l.value.h,
        i: l.value.i
      }, null, 8, ["x", "y", "w", "h", "i"]), [
        [Wi, a.value]
      ])
    ], 4));
  }
});
const oa = [ia, zi], aa = {
  install(e) {
    oa.forEach((t) => {
      e.component(t.name, t);
    });
  }
};
export {
  zi as GridItem,
  ia as GridLayout,
  aa as default
};
