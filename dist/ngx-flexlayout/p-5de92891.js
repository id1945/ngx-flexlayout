let e,t,n=!1;const l="undefined"!=typeof window?window:{},s=l.document||{head:{}},o={t:0,l:"",jmp:e=>e(),raf:e=>requestAnimationFrame(e),ael:(e,t,n,l)=>e.addEventListener(t,n,l),rel:(e,t,n,l)=>e.removeEventListener(t,n,l),ce:(e,t)=>new CustomEvent(e,t)},i=e=>Promise.resolve(e),c=(()=>{try{return new CSSStyleSheet,"function"==typeof(new CSSStyleSheet).replace}catch(e){}return!1})(),r=(e,t,n)=>{n&&n.map((([n,l,s])=>{const i=e,c=a(t,s),r=u(n);o.ael(i,l,c,r),(t.o=t.o||[]).push((()=>o.rel(i,l,c,r)))}))},a=(e,t)=>n=>{try{256&e.t?e.i[t](n):(e.u=e.u||[]).push([t,n])}catch(e){te(e)}},u=e=>0!=(2&e),f="http://www.w3.org/1999/xlink",d=new WeakMap,h=e=>"sc-"+e.h,p={},y=e=>"object"==(e=typeof e)||"function"===e,m=(e,t,...n)=>{let l=null,s=null,o=!1,i=!1,c=[];const r=t=>{for(let n=0;n<t.length;n++)l=t[n],Array.isArray(l)?r(l):null!=l&&"boolean"!=typeof l&&((o="function"!=typeof e&&!y(l))&&(l+=""),o&&i?c[c.length-1].p+=l:c.push(o?$(null,l):l),i=o)};if(r(n),t){t.key&&(s=t.key);{const e=t.className||t.class;e&&(t.class="object"!=typeof e?e:Object.keys(e).filter((t=>e[t])).join(" "))}}if("function"==typeof e)return e(null===t?{}:t,c,w);const a=$(e,null);return a.m=t,c.length>0&&(a.$=c),a.v=s,a},$=(e,t)=>({t:0,g:e,p:t,k:null,$:null,m:null,v:null}),b={},w={forEach:(e,t)=>e.map(v).forEach(t),map:(e,t)=>e.map(v).map(t).map(g)},v=e=>({vattrs:e.m,vchildren:e.$,vkey:e.v,vname:e.S,vtag:e.g,vtext:e.p}),g=e=>{if("function"==typeof e.vtag){const t=Object.assign({},e.vattrs);return e.vkey&&(t.key=e.vkey),e.vname&&(t.name=e.vname),m(e.vtag,t,...e.vchildren||[])}const t=$(e.vtag,e.vtext);return t.m=e.vattrs,t.$=e.vchildren,t.v=e.vkey,t.S=e.vname,t},k=(e,t,n,s,i,c)=>{if(n!==s){let r=ee(e,t),a=t.toLowerCase();if("class"===t){const t=e.classList,l=j(n),o=j(s);t.remove(...l.filter((e=>e&&!o.includes(e)))),t.add(...o.filter((e=>e&&!l.includes(e))))}else if("style"===t){for(const t in n)s&&null!=s[t]||(t.includes("-")?e.style.removeProperty(t):e.style[t]="");for(const t in s)n&&s[t]===n[t]||(t.includes("-")?e.style.setProperty(t,s[t]):e.style[t]=s[t])}else if("key"===t);else if("ref"===t)s&&s(e);else if(r||"o"!==t[0]||"n"!==t[1]){const l=y(s);if((r||l&&null!==s)&&!i)try{if(e.tagName.includes("-"))e[t]=s;else{let l=null==s?"":s;"list"===t?r=!1:null!=n&&e[t]==l||(e[t]=l)}}catch(e){}let o=!1;a!==(a=a.replace(/^xlink\:?/,""))&&(t=a,o=!0),null==s||!1===s?!1===s&&""!==e.getAttribute(t)||(o?e.removeAttributeNS(f,t):e.removeAttribute(t)):(!r||4&c||i)&&!l&&(s=!0===s?"":s,o?e.setAttributeNS(f,t,s):e.setAttribute(t,s))}else t="-"===t[2]?t.slice(3):ee(l,a)?a.slice(2):a[2]+t.slice(3),n&&o.rel(e,t,n,!1),s&&o.ael(e,t,s,!1)}},S=/\s/,j=e=>e?e.split(S):[],C=(e,t,n,l)=>{const s=11===t.k.nodeType&&t.k.host?t.k.host:t.k,o=e&&e.m||p,i=t.m||p;for(l in o)l in i||k(s,l,o[l],void 0,n,t.t);for(l in i)k(s,l,o[l],i[l],n,t.t)},M=(t,n,l)=>{let o,i,c=n.$[l],r=0;if(null!==c.p)o=c.k=s.createTextNode(c.p);else if(o=c.k=s.createElement(c.g),C(null,c,!1),null!=e&&o["s-si"]!==e&&o.classList.add(o["s-si"]=e),c.$)for(r=0;r<c.$.length;++r)i=M(t,c,r),i&&o.appendChild(i);return o},O=(e,n,l,s,o,i)=>{let c,r=e;for(r.shadowRoot&&r.tagName===t&&(r=r.shadowRoot);o<=i;++o)s[o]&&(c=M(null,l,o),c&&(s[o].k=c,r.insertBefore(c,n)))},x=(e,t,n,l,s)=>{for(;t<=n;++t)(l=e[t])&&(s=l.k,L(l),s.remove())},P=(e,t)=>e.g===t.g&&e.v===t.v,E=(e,t)=>{const n=t.k=e.k,l=e.$,s=t.$,o=t.p;null===o?("slot"===t.g||C(e,t,!1),null!==l&&null!==s?((e,t,n,l)=>{let s,o,i=0,c=0,r=0,a=0,u=t.length-1,f=t[0],d=t[u],h=l.length-1,p=l[0],y=l[h];for(;i<=u&&c<=h;)if(null==f)f=t[++i];else if(null==d)d=t[--u];else if(null==p)p=l[++c];else if(null==y)y=l[--h];else if(P(f,p))E(f,p),f=t[++i],p=l[++c];else if(P(d,y))E(d,y),d=t[--u],y=l[--h];else if(P(f,y))E(f,y),e.insertBefore(f.k,d.k.nextSibling),f=t[++i],y=l[--h];else if(P(d,p))E(d,p),e.insertBefore(d.k,f.k),d=t[--u],p=l[++c];else{for(r=-1,a=i;a<=u;++a)if(t[a]&&null!==t[a].v&&t[a].v===p.v){r=a;break}r>=0?(o=t[r],o.g!==p.g?s=M(t&&t[c],n,r):(E(o,p),t[r]=void 0,s=o.k),p=l[++c]):(s=M(t&&t[c],n,c),p=l[++c]),s&&f.k.parentNode.insertBefore(s,f.k)}i>u?O(e,null==l[h+1]?null:l[h+1].k,n,l,c,h):c>h&&x(t,i,u)})(n,l,t,s):null!==s?(null!==e.p&&(n.textContent=""),O(n,null,t,s,0,s.length-1)):null!==l&&x(l,0,l.length-1)):e.p!==o&&(n.data=o)},L=e=>{e.m&&e.m.ref&&e.m.ref(null),e.$&&e.$.map(L)},D=e=>X(e).j,F=(e,t,n)=>{const l=D(e);return{emit:e=>R(l,t,{bubbles:!!(4&n),composed:!!(2&n),cancelable:!!(1&n),detail:e})}},R=(e,t,n)=>{const l=o.ce(t,n);return e.dispatchEvent(l),l},T=(e,t)=>{t&&!e.C&&t["s-p"]&&t["s-p"].push(new Promise((t=>e.C=t)))},U=(e,t)=>{if(e.t|=16,!(4&e.t))return T(e,e.M),fe((()=>W(e,t)));e.t|=512},W=(e,t)=>{const n=e.i;let l;return t&&(e.t|=256,e.u&&(e.u.map((([e,t])=>_(n,e,t))),e.u=null),l=_(n,"componentWillLoad")),z(l,(()=>A(e,n,t)))},A=async(e,t,n)=>{const l=e.j,o=l["s-rc"];n&&(e=>{const t=e.O,n=e.j,l=t.t,o=((e,t)=>{let n=h(t),l=se.get(n);if(e=11===e.nodeType?e:s,l)if("string"==typeof l){let t,o=d.get(e=e.head||e);o||d.set(e,o=new Set),o.has(n)||(t=s.createElement("style"),t.innerHTML=l,e.insertBefore(t,e.querySelector("link")),o&&o.add(n))}else e.adoptedStyleSheets.includes(l)||(e.adoptedStyleSheets=[...e.adoptedStyleSheets,l]);return n})(n.shadowRoot?n.shadowRoot:n.getRootNode(),t);10&l&&(n["s-sc"]=o,n.classList.add(o+"-h"),2&l&&n.classList.add(o+"-s"))})(e);H(e,t),o&&(o.map((e=>e())),l["s-rc"]=void 0);{const t=l["s-p"],n=()=>q(e);0===t.length?n():(Promise.all(t).then(n),e.t|=4,t.length=0)}},H=(n,l)=>{try{l=l.render(),n.t&=-17,n.t|=2,((n,l)=>{const s=n.j,o=n.O,i=n.P||$(null,null),c=(e=>e&&e.g===b)(l)?l:m(null,null,l);t=s.tagName,o.L&&(c.m=c.m||{},o.L.map((([e,t])=>c.m[t]=s[e]))),c.g=null,c.t|=4,n.P=c,c.k=i.k=s.shadowRoot||s,e=s["s-sc"],E(i,c)})(n,l)}catch(e){te(e,n.j)}return null},q=e=>{const t=e.j,n=e.i,l=e.M;_(n,"componentDidRender"),64&e.t?_(n,"componentDidUpdate"):(e.t|=64,B(t),_(n,"componentDidLoad"),e.D(t),l||V()),e.F(t),e.C&&(e.C(),e.C=void 0),512&e.t&&ue((()=>U(e,!1))),e.t&=-517},N=e=>{{const t=X(e),n=t.j.isConnected;return n&&2==(18&t.t)&&U(t,!1),n}},V=()=>{B(s.documentElement),ue((()=>R(l,"appload",{detail:{namespace:"ngx-flexlayout"}})))},_=(e,t,n)=>{if(e&&e[t])try{return e[t](n)}catch(e){te(e)}},z=(e,t)=>e&&e.then?e.then(t):t(),B=e=>e.classList.add("hydrated"),G=(e,t,n)=>{if(t.R){e.watchers&&(t.T=e.watchers);const l=Object.entries(t.R),s=e.prototype;if(l.map((([e,[l]])=>{31&l||2&n&&32&l?Object.defineProperty(s,e,{get(){return((e,t)=>X(this).U.get(t))(0,e)},set(n){((e,t,n,l)=>{const s=X(e),o=s.j,i=s.U.get(t),c=s.t,r=s.i;if(n=((e,t)=>null==e||y(e)?e:4&t?"false"!==e&&(""===e||!!e):2&t?parseFloat(e):1&t?e+"":e)(n,l.R[t][0]),!(8&c&&void 0!==i||n===i)&&(s.U.set(t,n),r)){if(l.T&&128&c){const e=l.T[t];e&&e.map((e=>{try{r[e](n,i,t)}catch(e){te(e,o)}}))}2==(18&c)&&U(s,!1)}})(this,e,n,t)},configurable:!0,enumerable:!0}):1&n&&64&l&&Object.defineProperty(s,e,{value(...t){const n=X(this);return n.W.then((()=>n.i[e](...t)))}})})),1&n){const n=new Map;s.attributeChangedCallback=function(e,t,l){o.jmp((()=>{const t=n.get(e);if(this.hasOwnProperty(t))l=this[t],delete this[t];else if(s.hasOwnProperty(t)&&"number"==typeof this[t]&&this[t]==l)return;this[t]=(null!==l||"boolean"!=typeof this[t])&&l}))},e.observedAttributes=l.filter((([e,t])=>15&t[0])).map((([e,l])=>{const s=l[1]||e;return n.set(s,e),512&l[0]&&t.L.push([e,s]),s}))}}return e},I=e=>{_(e,"connectedCallback")},J=(e,t={})=>{const n=[],i=t.exclude||[],a=l.customElements,u=s.head,f=u.querySelector("meta[charset]"),d=s.createElement("style"),p=[];let y,m=!0;Object.assign(o,t),o.l=new URL(t.resourcesUrl||"./",s.baseURI).href,e.map((e=>{e[1].map((t=>{const l={t:t[0],h:t[1],R:t[2],A:t[3]};l.R=t[2],l.A=t[3],l.L=[],l.T={};const s=l.h,u=class extends HTMLElement{constructor(e){super(e),Z(e=this,l),1&l.t&&e.attachShadow({mode:"open"})}connectedCallback(){y&&(clearTimeout(y),y=null),m?p.push(this):o.jmp((()=>(e=>{if(0==(1&o.t)){const t=X(e),n=t.O,l=()=>{};if(1&t.t)r(e,t,n.A),I(t.i);else{t.t|=1;{let n=e;for(;n=n.parentNode||n.host;)if(n["s-p"]){T(t,t.M=n);break}}n.R&&Object.entries(n.R).map((([t,[n]])=>{if(31&n&&e.hasOwnProperty(t)){const n=e[t];delete e[t],e[t]=n}})),(async(e,t,n,l,s)=>{if(0==(32&t.t)){{if(t.t|=32,(s=le(n)).then){const e=()=>{};s=await s,e()}s.isProxied||(n.T=s.watchers,G(s,n,2),s.isProxied=!0);const e=()=>{};t.t|=8;try{new s(t)}catch(e){te(e)}t.t&=-9,t.t|=128,e(),I(t.i)}if(s.style){let e=s.style;const t=h(n);if(!se.has(t)){const l=()=>{};((e,t,n)=>{let l=se.get(e);c&&n?(l=l||new CSSStyleSheet,l.replace(t)):l=t,se.set(e,l)})(t,e,!!(1&n.t)),l()}}}const o=t.M,i=()=>U(t,!0);o&&o["s-rc"]?o["s-rc"].push(i):i()})(0,t,n)}l()}})(this)))}disconnectedCallback(){o.jmp((()=>(()=>{if(0==(1&o.t)){const e=X(this),t=e.i;e.o&&(e.o.map((e=>e())),e.o=void 0),_(t,"disconnectedCallback")}})()))}componentOnReady(){return X(this).H}};l.q=e[0],i.includes(s)||a.get(s)||(n.push(s),a.define(s,G(u,l,1)))}))})),d.innerHTML=n+"{visibility:hidden}.hydrated{visibility:inherit}",d.setAttribute("data-styles",""),u.insertBefore(d,f?f.nextSibling:u.firstChild),m=!1,p.length?p.map((e=>e.connectedCallback())):o.jmp((()=>y=setTimeout(V,30)))},K=(e,t)=>t,Q=new WeakMap,X=e=>Q.get(e),Y=(e,t)=>Q.set(t.i=e,t),Z=(e,t)=>{const n={t:0,j:e,O:t,U:new Map};return n.W=new Promise((e=>n.F=e)),n.H=new Promise((e=>n.D=e)),e["s-p"]=[],e["s-rc"]=[],r(e,n,t.A),Q.set(e,n)},ee=(e,t)=>t in e,te=(e,t)=>(0,console.error)(e,t),ne=new Map,le=e=>{const t=e.h.replace(/-/g,"_"),n=e.q,l=ne.get(n);return l?l[t]:import(`./${n}.entry.js`).then((e=>(ne.set(n,e),e[t])),te)},se=new Map,oe=[],ie=[],ce=(e,t)=>l=>{e.push(l),n||(n=!0,t&&4&o.t?ue(ae):o.raf(ae))},re=e=>{for(let t=0;t<e.length;t++)try{e[t](performance.now())}catch(e){te(e)}e.length=0},ae=()=>{re(oe),re(ie),(n=oe.length>0)&&o.raf(ae)},ue=e=>i().then(e),fe=ce(ie,!0);export{K as F,b as H,J as b,F as c,N as f,D as g,m as h,i as p,Y as r}