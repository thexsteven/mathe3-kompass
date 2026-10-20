'use strict';
const Calc = Object.freeze({
 gradient(x,y,angle){const a=angle*Math.PI/180;return {value:x*x+y*y,gx:2*x,gy:2*y,slope:2*x*Math.cos(a)+2*y*Math.sin(a),norm:Math.hypot(2*x,2*y),ux:Math.cos(a),uy:Math.sin(a)};},
 chain(t){const x=t*t,y=t,z=Math.exp(x*y),viaX=y*z*2*t,viaY=x*z;return {x,y,z,viaX,viaY,total:viaX+viaY};},
 circuit(l,c){return {linear:(l+c)/2,exact:(Math.sqrt((1+l/100)*(1+c/100))-1)*100};},
 normalize(s){return s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/ß/g,'ss').replace(/[ₓᵧₐₜᵤᵥ₀₁₂₃]/g,c=>({'ₓ':'x','ᵧ':'y','ₐ':'a','ₜ':'t','ᵤ':'u','ᵥ':'v','₀':'0','₁':'1','₂':'2','₃':'3'}[c])).replace(/∇/g,'gradient').replace(/∂/g,'d').replace(/[^a-z0-9]+/g,' ').trim();},
 classify(a,b,c){const d=a*c-b*b;return d<0?'Sattelpunkt':d===0?'Keine Entscheidung':a>0?'Minimum':'Maximum';}
});
if(typeof module !== 'undefined') module.exports=Calc;
