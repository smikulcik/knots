(()=>{"use strict";var t={523:(t,e,n)=>{n.d(e,{A:()=>c});var o=n(601),r=n.n(o),s=n(314),i=n.n(s)()(r());i.push([t.id,"",""]);const c=i},314:t=>{t.exports=function(t){var e=[];return e.toString=function(){return this.map((function(e){var n="",o=void 0!==e[5];return e[4]&&(n+="@supports (".concat(e[4],") {")),e[2]&&(n+="@media ".concat(e[2]," {")),o&&(n+="@layer".concat(e[5].length>0?" ".concat(e[5]):""," {")),n+=t(e),o&&(n+="}"),e[2]&&(n+="}"),e[4]&&(n+="}"),n})).join("")},e.i=function(t,n,o,r,s){"string"==typeof t&&(t=[[null,t,void 0]]);var i={};if(o)for(var c=0;c<this.length;c++){var a=this[c][0];null!=a&&(i[a]=!0)}for(var u=0;u<t.length;u++){var l=[].concat(t[u]);o&&i[l[0]]||(void 0!==s&&(void 0===l[5]||(l[1]="@layer".concat(l[5].length>0?" ".concat(l[5]):""," {").concat(l[1],"}")),l[5]=s),n&&(l[2]?(l[1]="@media ".concat(l[2]," {").concat(l[1],"}"),l[2]=n):l[2]=n),r&&(l[4]?(l[1]="@supports (".concat(l[4],") {").concat(l[1],"}"),l[4]=r):l[4]="".concat(r)),e.push(l))}},e}},601:t=>{t.exports=function(t){return t[1]}},72:t=>{var e=[];function n(t){for(var n=-1,o=0;o<e.length;o++)if(e[o].identifier===t){n=o;break}return n}function o(t,o){for(var s={},i=[],c=0;c<t.length;c++){var a=t[c],u=o.base?a[0]+o.base:a[0],l=s[u]||0,f="".concat(u," ").concat(l);s[u]=l+1;var d=n(f),h={css:a[1],media:a[2],sourceMap:a[3],supports:a[4],layer:a[5]};if(-1!==d)e[d].references++,e[d].updater(h);else{var p=r(h,o);o.byIndex=c,e.splice(c,0,{identifier:f,updater:p,references:1})}i.push(f)}return i}function r(t,e){var n=e.domAPI(e);return n.update(t),function(e){if(e){if(e.css===t.css&&e.media===t.media&&e.sourceMap===t.sourceMap&&e.supports===t.supports&&e.layer===t.layer)return;n.update(t=e)}else n.remove()}}t.exports=function(t,r){var s=o(t=t||[],r=r||{});return function(t){t=t||[];for(var i=0;i<s.length;i++){var c=n(s[i]);e[c].references--}for(var a=o(t,r),u=0;u<s.length;u++){var l=n(s[u]);0===e[l].references&&(e[l].updater(),e.splice(l,1))}s=a}}},659:t=>{var e={};t.exports=function(t,n){var o=function(t){if(void 0===e[t]){var n=document.querySelector(t);if(window.HTMLIFrameElement&&n instanceof window.HTMLIFrameElement)try{n=n.contentDocument.head}catch(t){n=null}e[t]=n}return e[t]}(t);if(!o)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");o.appendChild(n)}},540:t=>{t.exports=function(t){var e=document.createElement("style");return t.setAttributes(e,t.attributes),t.insert(e,t.options),e}},56:(t,e,n)=>{t.exports=function(t){var e=n.nc;e&&t.setAttribute("nonce",e)}},825:t=>{t.exports=function(t){if("undefined"==typeof document)return{update:function(){},remove:function(){}};var e=t.insertStyleElement(t);return{update:function(n){!function(t,e,n){var o="";n.supports&&(o+="@supports (".concat(n.supports,") {")),n.media&&(o+="@media ".concat(n.media," {"));var r=void 0!==n.layer;r&&(o+="@layer".concat(n.layer.length>0?" ".concat(n.layer):""," {")),o+=n.css,r&&(o+="}"),n.media&&(o+="}"),n.supports&&(o+="}");var s=n.sourceMap;s&&"undefined"!=typeof btoa&&(o+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(s))))," */")),e.styleTagTransform(o,t,e.options)}(e,t,n)},remove:function(){!function(t){if(null===t.parentNode)return!1;t.parentNode.removeChild(t)}(e)}}}},113:t=>{t.exports=function(t,e){if(e.styleSheet)e.styleSheet.cssText=t;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(t))}}}},e={};function n(o){var r=e[o];if(void 0!==r)return r.exports;var s=e[o]={id:o,exports:{}};return t[o](s,s.exports,n),s.exports}n.n=t=>{var e=t&&t.__esModule?()=>t.default:()=>t;return n.d(e,{a:e}),e},n.d=(t,e)=>{for(var o in e)n.o(e,o)&&!n.o(t,o)&&Object.defineProperty(t,o,{enumerable:!0,get:e[o]})},n.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),n.nc=void 0,(()=>{function t(t,e,n,o){t.beginPath(),t.arc(e.x,e.y,n,0,2*Math.PI,!1),t.fillStyle=o,t.fill()}function e(t,e,n,r,s){return o(t,[e,e,n,n],r,s)}function o(t,e,n,o){const[r,s,i,c]=e;t.beginPath(),t.moveTo(r.x,r.y),t.lineWidth=n,t.strokeStyle=o,t.bezierCurveTo(s.x,s.y,i.x,i.y,c.x,c.y),t.stroke()}function r(t){const e=t.toElement.getBoundingClientRect();return{x:t.clientX-e.left,y:t.clientY-e.top}}class s{constructor(t,e,n,o){this.x=t,this.y=e,this.color=n,this.radius=o}draw(e){t(e,{x:this.x,y:this.y},this.radius,this.color)}}class i{constructor(t){this.canvas=t,this.objects=[],this.cursor=new s(0,0,"red",5),t.onmousemove=t=>{const e=r(t);this.cursor.x=e.x,this.cursor.y=e.y,this.objects.forEach((e=>{"function"==typeof e.onmousemove&&e.onmousemove(t)})),this.draw()},t.onmousedown=t=>{this.objects.forEach((e=>{"function"==typeof e.onmousedown&&e.onmousedown(t)})),this.draw()},t.onmouseup=t=>{this.objects.forEach((e=>{"function"==typeof e.onmouseup&&e.onmouseup(t)})),this.draw()}}draw(){var t=this.canvas.getContext("2d");t.fillStyle="#eeeeee",t.strokeStyle="#000000",t.rect(0,0,800,600),t.fill();for(const e of this.objects)e.draw(t);this.cursor.draw(t)}addObject(t){this.objects.push(t)}}const c=[{x:250,y:230,a:{n:{i:1,x:"a"},c1:{x:284.4682713554273,y:223.92231378165744},c2:{x:102.27883704816881,y:256.04722665003953}},b:{n:{i:1,x:"b"},c1:{x:223.95277334996044,y:82.27883704816881},c2:{x:256.07768621834254,y:264.4682713554273}},top:"a"},{x:360,y:230,a:{n:{i:2,x:"a"},c1:{x:507.72116295183116,y:256.04722665003953},c2:{x:325.5317286445727,y:223.92231378165744}},b:{n:{i:2,x:"b"},c1:{x:353.92231378165746,y:264.4682713554273},c2:{x:386.04722665003953,y:82.27883704816881}},top:"b"},{x:300,y:325,a:{n:{i:0,x:"b"},c1:{x:275.2512626584708,y:300.25126265847086},c2:{x:391.9238815542512,y:416.9238815542512}},b:{n:{i:0,x:"a"},c1:{x:208.07611844574882,y:416.9238815542512},c2:{x:324.74873734152914,y:300.25126265847086}},top:"a"}];var a=n(72),u=n.n(a),l=n(825),f=n.n(l),d=n(659),h=n.n(d),p=n(56),y=n.n(p),x=n(540),v=n.n(x),b=n(113),m=n.n(b),w=n(523),g={};function P(t,e){const n=t.length,o=new Array(n*n),r=new Array(n),s=new Array(n);for(let e=0;e<n;e++)o[e]=t[e];for(let t=1;t<n;t++)for(let r=0;r<n-t;r++)o[t*n+r]={x:o[(t-1)*n+r].x*e+o[(t-1)*n+(r+1)].x*(1-e),y:o[(t-1)*n+r].y*e+o[(t-1)*n+(r+1)].y*(1-e)};for(let t=0;t<n;t++)r[t]=o[t*n+0];for(let t=n-1;t>=0;t--){const e=n-1-t;s[e]=o[t*n+e]}return[r,s]}function z(t){const e=Math.sqrt(t.x*t.x+t.y*t.y);return{x:t.x/e,y:t.y/e}}function A(t,e){return{x:t.x-e.x,y:t.y-e.y,z:t.z?t.z-e.z:0}}function E(t,e){return Math.sqrt((e.x-t.x)*(e.x-t.x)+(e.y-t.y)*(e.y-t.y)+((e.z||0)-(t.z||0))*((e.z||0)-(t.z||0)))}g.styleTagTransform=m(),g.setAttributes=y(),g.insert=h().bind(null,"head"),g.domAPI=f(),g.insertStyleElement=v(),u()(w.A,g),w.A&&w.A.locals&&w.A.locals;class j{constructor(t,e){this.knot=t,this.lineWidth=e,this.selected=!1,this.selectablePoint=void 0}onmousedown(t){void 0!==this.selectablePoint&&(this.selected=!0)}onmouseup(t){this.selected=!1}onmousemove(t){const e=r(t);if(this.selected&&this.selectablePoint){this.selectablePoint.p.x=e.x,this.selectablePoint.p.y=e.y;const t=this.knot[this.selectablePoint.i],r=this.knot[this.selectablePoint.i][this.selectablePoint.x]["c1"===this.selectablePoint.c?"c2":"c1"],s=function(t,e){return{x:t.x+e.x,y:t.y+e.y,z:t.z?t.z+e.z:0}}(t,(n=-1*E(r,t),{x:(o=z(A(this.selectablePoint.p,t))).x*n,y:o.y*n,z:o.z?o.z*n:0}));r.x=s.x,r.y=s.y}var n,o;this.selectablePoint=void 0;const s=[];for(const t in this.knot){const e=this.knot[t];s.push({p:e.a.c1,i:t,x:"a",c:"c1"}),s.push({p:e.a.c2,i:t,x:"a",c:"c2"}),s.push({p:e.b.c1,i:t,x:"b",c:"c1"}),s.push({p:e.b.c2,i:t,x:"b",c:"c2"})}let i;s.forEach((t=>{const n=E(t.p,e);n<30&&(void 0===i||n<i)&&(this.selectablePoint=t,i=n)}))}draw(n){const r=this.knot;for(const t of["bottom","top"]){let e={i:0,x:"a"},s=this.lineWidth,i=8;do{const c=r[e.i],a=c[e.x].n,u=r[a.i],l=c[e.x].c1,f=u[a.x].c2,[d,h]=P([c,l,f,u],.5);(c.top!==e.x&&"bottom"===t||c.top===e.x&&"top"===t)&&(o(n,d,s,"#000000"),o(n,d,s-3,"#ffffff")),(u.top!==a.x&&"bottom"===t||u.top===a.x&&"top"===t)&&(o(n,h,s,"#000000"),o(n,h,s-3,"#ffffff")),e=r[e.i][e.x].n,i--}while((0!==e.i||"a"!==e.x)&&i>0)}for(const o of r){const r=o.a.c1,s=o.a.c2,i=o.b.c1,c=o.b.c2;e(n,o,r,1,"#008800"),t(n,r,3,"#008800"),e(n,o,s,1,"#008800"),t(n,s,3,"#008800"),e(n,o,i,1,"#008800"),t(n,i,3,"#008800"),e(n,o,c,1,"#008800"),t(n,c,3,"#008800")}this.selectablePoint&&new s(this.selectablePoint.p.x,this.selectablePoint.p.y,this.selected?"blue":"green",10).draw(n)}}document.body.appendChild(function(){const t=document.createElement("canvas");return t.setAttribute("id","content"),t.setAttribute("width","800"),t.setAttribute("height","600"),t}()),window.onload=()=>{const t=document.getElementById("content"),e=new i(t);e.addObject(new j(c,30)),e.draw()}})()})();