(()=>{"use strict";const t="start-node",e="target-node",a="wall-node";function s(t,e,a,s,n,o,i){s.changeState(e,"active"),s.state(e).active&&(n.style.cursor="pointer",a.style.cursor="pointer",o.className=`${e}`,setTimeout((()=>{n.addEventListener("click",(t=>{!function(t){if(l(t,s,i),"TD"===t.target.tagName){let[a,l]=t.target.className.match(/\d+/g),n=document.querySelector(`td.${e}`);n&&n.classList.remove(e),t.target.classList.add(e),s.state(e).location=[a,l]}s.changeState(e,"active"),s.anyActive()||(n.style.cursor="auto",o.className="",a.style.cursor="pointer")}(t)}),{once:!0,capture:!0})}),0))}function l(s,l,n){if("TD"===s.target.tagName&&s.target.classList.length>2){let o=[...s.target.classList],[i,r]=s.target.className.match(/\d+/g);o[2]===t?(l.state(t).location=null,s.target.classList.remove(t)):o[2]===e?(l.state(e).location=null,s.target.classList.remove(e)):o[2]===a&&(n.removeWall(i,r),s.target.classList.remove(a))}}const n=document.getElementById("body"),o=document.getElementById("table"),i=document.getElementById("start-node"),r=document.getElementById("target-node"),c=document.getElementById("wall-node"),d=new class{constructor(){this.startNode={active:!1,location:null},this.targetNode={active:!1,location:null},this.wallNode={active:!1,location:new Set}}state(s){switch(s){case t:return this.startNode;case e:return this.targetNode;case a:return this.wallNode;default:throw new Error("given name value could not match any given case")}}changeState(s,l,n=null){switch(s){case t:this.startNode[l]=null===n?!this.startNode[l]:n;break;case e:this.targetNode[l]=null===n?!this.targetNode[l]:n;break;case a:null===n?this.wallNode[l]=!this.wallNode[l]:"location"===l?this.wallNode.location.push(n):this.wallNode[l]=n;break;default:throw new Error("given name value could not match any given case")}}anyActive(){return!!(this.startNode.active||this.targetNode.active||this.wallNode.active)}};!function(t,e){for(let e=0;e<25;e++){let a=document.createElement("tr");a.className=`row row-${e}`;for(let t=0;t<40;t++){let s=document.createElement("td");s.className=`col ${e}-${t}`,a.appendChild(s)}t.appendChild(a)}e.appendChild(t)}(o,n),function(t){window.onload=()=>{let e=t.clientWidth;t.style.height=.625*e},window.addEventListener("resize",(()=>{let e=t.clientWidth;t.style.height=.625*e}))}(o),i.addEventListener("click",(e=>s(0,t,i,d,n,o,h))),r.addEventListener("click",(t=>s(0,e,r,d,n,o,h))),c.addEventListener("click",(t=>function(t,e,a,s,n,o,i){function r(t){if(l(t,s,i),"TD"!==t.target.tagName)return;let[a,n]=t.target.className.match(/\d+/g),o=`${a}-${n}`;s.state(e).location.has(o)||(t.target.classList.add(e),i.addWall(a,n))}s.changeState(e,"active"),s.state(e).active&&(n.style.cursor="pointer",a.style.cursor="pointer",o.className="wall-node",n.addEventListener("mousedown",(t=>{r(t),n.addEventListener("mousemove",r)}),{once:!0,capture:!0}),n.addEventListener("mouseup",(function(t){n.removeEventListener("mousemove",r),s.changeState(e,"active"),s.anyActive()||(n.style.cursor="auto",o.className="",a.style.cursor="pointer")}),{once:!0}))}(0,a,c,d,n,o,h))),n.addEventListener("dblclick",(t=>{console.log("start node",d.startNode),console.log("target node",d.targetNode),console.log(h.vertices),console.log(d)}));let h=new class{constructor(t,e){this.vertices=[],this.totalRows=t,this.totalColumns=e,this.initializeGraph()}initializeGraph(){for(let t=0;t<this.totalRows;t++){let e=[];for(let a=0;a<this.totalColumns;a++){let s=[],l=[[t,a-1],[t,a+1],[t-1,a],[t+1,a]].filter((t=>!!this.validateCoordinate(t[0],t[1])));for(let t=0;t<l.length;t++)s.push(l[t]);e.push(s)}this.vertices.push(e)}}validateCoordinate(t,e){return!(t<0||t>=this.totalRows||e<0||e>=this.totalColumns)}addWall(t,e){t=parseInt(t),e=parseInt(e);let a=[[t,e-1],[t,e+1],[t-1,e],[t+1,e]].filter((t=>!(!this.validateCoordinate(t[0],t[1])||null===this.vertices[t[0]][t[1]])),this);this.vertices[t][e]=null,a.forEach((a=>{let[s,l]=a;s=parseInt(s),l=parseInt(l),this.vertices[s][l]=this.vertices[s][l].filter((a=>{let[s,l]=a;return s=parseInt(s),l=parseInt(l),s!==t||l!==e}))}))}removeWall(t,e){t=parseInt(t),e=parseInt(e);let a=[[t,e-1],[t,e+1],[t-1,e],[t+1,e]].filter((t=>{let[e,a]=t;return e=parseInt(e),a=parseInt(a),!(!this.validateCoordinate(e,a)||null===this.vertices[e][a])}),this);a.forEach((a=>{let[s,l]=a;s=parseInt(s),l=parseInt(l),this.vertices[s][l].push([t,e])})),this.vertices[t][e]=a}adj(t){if(null==t||t<0||t>=this.V)throw new Error("v is not valid (adj(v))");return this.vertices[t]}toString(){for(let t=0;t<this.V;t++)for(let e=0;e<this.vertices[t].length;e++)console.log(`${t} --\x3e ${this.vertices[t][e]}`)}}(40,25)})();