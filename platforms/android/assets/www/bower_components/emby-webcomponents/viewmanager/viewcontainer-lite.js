define(["browser","css!./viewcontainer-lite"],function(e){function n(){return e.tv?!1:e.operaTv?!1:!0}function t(e){if(!e.cancel){f();var n=w,t=-1==n?null:p[n],o=n+1;o>=g&&(o=0);var s=document.createElement("div");e.type&&s.setAttribute("data-type",e.type),s.innerHTML=e.view;var c=p[o],u=s;return s.classList.add("mainAnimatedPage"),c?(d(c),h.replaceChild(s,c)):h.appendChild(s),p[o]=s,v&&v(s,!1,e),i(p,o,n),a(u,t,e.transition,e.isBack).then(function(){return w=o,y[o]=e.url,!e.cancel&&t&&r(p,o),s})}}function i(e,n,t){for(var i=0,r=e.length;r>i;i++)n==i||t==i||e[i].classList.add("hide")}function r(e,n){for(var t=0,i=e.length;i>t;t++)n==t||e[t].classList.add("hide")}function a(e,t,i,r){if(n()&&t&&e.animate){if("slide"==i)return o(e,t,i,r);if("fade"==i)return s(e,t,i,r)}return Promise.resolve()}function o(e,n,t,i){return new Promise(function(t){var r={duration:450,iterations:1,easing:"ease-out",fill:"both"},a=[];if(n){var o=i?"100%":"-100%";a.push(n.animate([{transform:"none",offset:0},{transform:"translate3d("+o+", 0, 0)",offset:1}],r))}var s=i?"-100%":"100%";a.push(e.animate([{transform:"translate3d("+s+", 0, 0)",offset:0},{transform:"none",offset:1}],r)),b=a,a[a.length-1].onfinish=t})}function s(e,n){return new Promise(function(t){var i={duration:300,iterations:1,easing:"ease-out",fill:"both"},r=[];n&&r.push(n.animate([{opacity:1,offset:0},{opacity:0,offset:1}],i)),r.push(e.animate([{opacity:0,offset:0},{opacity:1,offset:1}],i)),b=r,r[r.length-1].onfinish=t})}function f(){for(var e=b,n=0,t=e.length;t>n;n++)c(e[n])}function c(e){try{e.cancel()}catch(n){}}function u(e){v=e}function l(e){var n=e.url,t=y.indexOf(n);if(-1!=t){var o=p[t],s=o;if(s){if(e.cancel)return;f();var c=w,u=-1==c?null:p[c];return v&&v(s,!0,e),i(p,t,c),o.classList.remove("hide"),a(o,u,e.transition,e.isBack).then(function(){return w=t,!e.cancel&&u&&r(p,t),s})}}return Promise.reject()}function d(e){e.dispatchEvent(new CustomEvent("viewdestroy",{cancelable:!1}))}function m(){p=[],y=[],h.innerHTML="",w=-1}var v,h=document.querySelector(".mainAnimatedPages"),p=[],y=[],g=3,w=-1,b=[];return n()&&!document.documentElement.animate&&require(["webAnimations"]),{loadView:t,tryRestoreView:l,reset:m,setOnBeforeChange:u}});