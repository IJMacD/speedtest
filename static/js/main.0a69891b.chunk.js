(this.webpackJsonpspeedtest=this.webpackJsonpspeedtest||[]).push([[0],[,,,,,,function(e,t,n){e.exports=n.p+"static/media/logo.4b033b2e.svg"},function(e,t,n){e.exports=n.p+"static/media/pinging.e8abaee4.svg"},,function(e,t,n){e.exports=n(17)},,,,,function(e,t,n){},function(e,t,n){},,function(e,t,n){"use strict";n.r(t);var r=n(0),a=n.n(r),o=n(5),s=n.n(o),c=(n(14),n(2)),i=n(6),u=n.n(i),p=n(7),l=n.n(p),d=(n(15),n(8)),f=n(1),m=n.n(f),g=n(3);function h(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return new Promise((function(n,r){var a=new XMLHttpRequest;if(a.open(t.method||"GET",e),t.headers)for(var o=0,s=Object.entries(t.headers);o<s.length;o++){var i=Object(c.a)(s[o],2),u=i[0],p=i[1];a.setRequestHeader(u,p)}"include"===t.credentials&&(a.withCredentials=!0),t.progress&&a.addEventListener("progress",(function(e){t.progress(e.loaded/e.total*100)})),t.uploadProgress&&a.upload.addEventListener("progress",(function(e){t.uploadProgress(e.loaded/e.total*100)})),a.addEventListener("load",(function(e){var t={ok:a.status>=200&&a.status<300,text:function(){return Promise.resolve(a.responseText)},json:function(){return Promise.resolve(JSON.parse(a.responseText))}};n(t)})),a.addEventListener("error",r),a.send(t.body)}))}var b="/speedtest",v=b+"/ping.txt",w=[{target:"/speedtest/1MB.bin",size:1e6},{target:"/speedtest/2MB.bin",size:2e6},{target:"/speedtest/10MB.bin",size:1e7}];function x(){return(x=Object(g.a)(m.a.mark((function e(){var t,n,r;return m.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:performance.clearResourceTimings(),t=-10;case 2:if(!(t<50)){e.next=8;break}return e.next=5,fetch(v);case 5:t++,e.next=2;break;case 8:return n=(n=(n=performance.getEntriesByType("resource")).filter((function(e){return e.name.endsWith(v)}))).slice(-50),r=n.map((function(e){return e.responseStart-e.requestStart})),e.abrupt("return",S(r));case 13:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function E(){return(E=Object(g.a)(m.a.mark((function e(){var t,n,r,a,o,s,c=arguments;return m.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t=c.length>0&&void 0!==c[0]?c[0]:null,n=0,r=0,a=0;case 4:if(!(n<1e3&&a<w.length)){e.next=14;break}return o=performance.now(),s=w[a],e.next=9,y(s.target,s.size,t);case 9:r=e.sent,n=performance.now()-o;case 11:a++,e.next=4;break;case 14:return e.abrupt("return",r);case 15:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function y(e,t,n){return k.apply(this,arguments)}function k(){return(k=Object(g.a)(m.a.mark((function e(t,n,r){var a,o;return m.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return performance.clearResourceTimings(),a=performance.now(),e.next=4,h(t,{headers:Object(d.a)({},"Cache-Control","no-cache"),progress:function(e){var t=performance.now()-a;r(n*e/100/t*1e3)}});case 4:return o=performance.getEntriesByType("resource").find((function(e){return e.name.endsWith(t)})),e.abrupt("return",n/o.duration*1e3);case 6:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function j(){return(j=Object(g.a)(m.a.mark((function e(){var t,n,r,a,o,s=arguments;return m.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t=s.length>0&&void 0!==s[0]?s[0]:null,n=0,r=0,a=1e6;case 4:if(!(n<1e3&&a<1e7)){e.next=13;break}return o=performance.now(),e.next=8,O("/speedtest/dev/null",new ArrayBuffer(a),t);case 8:r=e.sent,n=performance.now()-o;case 10:a*=2,e.next=4;break;case 13:return e.abrupt("return",r);case 14:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function O(e,t,n){return B.apply(this,arguments)}function B(){return(B=Object(g.a)(m.a.mark((function e(t,n,r){var a,o,s;return m.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return performance.clearResourceTimings(),(a=new FormData).set("data",new Blob([n])),o=performance.now(),e.next=6,h(t,{method:"post",body:a,progress:function(e){var t=performance.now()-o,a=n.byteLength*e/100;r(a/t*1e3)}});case 6:return s=performance.getEntriesByType("resource").find((function(e){return e.name.endsWith(t)})),e.abrupt("return",n.byteLength/s.duration*1e3);case 8:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function S(e){return e.reduce((function(e,t){return e+t}),0)/e.length}var T=function(){var e=a.a.useState("start"),t=Object(c.a)(e,2),n=t[0],r=t[1],o=a.a.useState(0),s=Object(c.a)(o,2),i=s[0],p=s[1],d=a.a.useState(0),f=Object(c.a)(d,2),m=f[0],g=f[1],h=a.a.useState(0),b=Object(c.a)(h,2),v=b[0],w=b[1],y=a.a.useState(0),k=Object(c.a)(y,2),O=k[0],B=k[1],S=a.a.useState(0),T=Object(c.a)(S,2),M=T[0],L=T[1];return a.a.useEffect((function(){"pinging"===n?function(){return x.apply(this,arguments)}().then((function(e){r("down"),p(e)})):"down"===n?function(){return E.apply(this,arguments)}(w).then((function(e){r("upload"),g(e)})):"upload"===n&&function(){return j.apply(this,arguments)}(L).then((function(e){r("complete"),B(e)}))}),[n]),a.a.createElement("div",{className:"App"},a.a.createElement("header",{className:"App-header"},"start"===n&&a.a.createElement("button",{className:"start-btn",onClick:function(){return r("pinging")}},a.a.createElement("img",{src:u.a,className:"App-logo",alt:"logo"})),"pinging"===n&&a.a.createElement("p",null,"Pinging ",a.a.createElement("br",null),a.a.createElement("img",{src:l.a,width:400})),"down"===n&&a.a.createElement("p",null,"Running Download Test ",a.a.createElement("br",null),(v/1e6).toFixed(1)," MB/s"),"upload"===n&&a.a.createElement("p",null,"Running Upload Test ",a.a.createElement("br",null),(M/1e6).toFixed(1)," MB/s"),i>0&&a.a.createElement("p",null,"Ping Time: ",i.toFixed(6)," ms"),m>0&&a.a.createElement("p",null,"Download Speed: ",(m/1e6).toFixed(1)," MB/s"),O>0&&a.a.createElement("p",null,"Upload Speed: ",(O/1e6).toFixed(1)," MB/s"),"complete"===n&&a.a.createElement("button",{onClick:function(){return r("start"),void p(0)}},"Start Again")))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));s.a.render(a.a.createElement(a.a.StrictMode,null,a.a.createElement(T,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}],[[9,1,2]]]);
//# sourceMappingURL=main.0a69891b.chunk.js.map