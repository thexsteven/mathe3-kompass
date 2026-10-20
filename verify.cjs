const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const path=require('node:path');
const Calc=require('./model.js');
const approx=(a,b,t=1e-6)=>assert.ok(Math.abs(a-b)<t,`${a} differs from ${b}`);
test('gradient directional derivative agrees with an independent finite difference',()=>{
 for(const x of [-2,0,1.2])for(const y of [-1,0,1.4])for(const angle of [0,45,90,180]){
  const m=Calc.gradient(x,y,angle),h=1e-5;
  const f=s=>(x+s*m.ux)**2+(y+s*m.uy)**2;
  approx(m.slope,(f(h)-f(-h))/(2*h));
 }
 assert.equal(Calc.gradient(0,0,30).norm,0);
});
test('two chain paths match numerical derivative of the composed function',()=>{
 for(const t of [-1,-.4,0,.8,1.3]){
  const m=Calc.chain(t),h=1e-6;
  approx(m.total,(Math.exp((t+h)**3)-Math.exp((t-h)**3))/(2*h));
 }
 approx(Calc.chain(1).total,3*Math.E);
});
test('circuit exact change matches physical ratio and boundary controls',()=>{
 const r=Calc.circuit(-5,3);assert.equal(r.linear,-1);approx(r.exact,(Math.sqrt(.95*1.03)-1)*100);assert.ok(r.exact < -1);
 for(const l of [-30,0,30])for(const c of [-30,0,30])assert.ok(Number.isFinite(Calc.circuit(l,c).exact));
 approx(Calc.circuit(10,10).exact,10);
});
const context=vm.createContext({localStorage:{getItem:()=>null},Intl,setTimeout,clearTimeout,document:{},window:{},location:{hash:''}});
const app=fs.readFileSync('app.js','utf8');
vm.runInContext(fs.readFileSync('content.js','utf8')+'\n'+app.split("$('#main').addEventListener('click'")[0]+'\nthis.api={TOPICS,home,topic,sources,updateStepper};',context);
const {TOPICS,home,topic,sources,updateStepper}=context.api;
test('all topics render and every declared internal target exists',()=>{
 assert.equal(TOPICS.length,11);assert.equal(new Set(TOPICS.map(t=>t.id)).size,11);
 const dir=fs.mkdtempSync(path.join(require('node:os').tmpdir(),'mathe3-check-'));
 const pages=[['start',home()],['quellen',sources()],...TOPICS.map(t=>[t.id,topic(t)])];
 for(const [id,html]of pages){
  assert.ok(!html.includes('undefined'),id);assert.ok(!html.includes('NaN'),id);
  const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);assert.equal(new Set(ids).size,ids.length,`duplicate ids in ${id}`);
  fs.writeFileSync(path.join(dir,id+'.html'),html);
  for(const [,href]of html.matchAll(/href="#([^"]+)"/g)){
   const [target,anchor]=href.split('/');assert.ok(target==='start'||target==='quellen'||TOPICS.some(t=>t.id===target),href);
   if(anchor){const t=TOPICS.find(t=>t.id===target);assert.ok(anchor==='kernformel'||t.blocks.some(b=>b.id===anchor),href);}
  }
  for(const [,asset]of html.matchAll(/(?:src|href)="(\/?sources\/[^"#]+)(?:#[^"]*)?"/g))assert.ok(fs.existsSync(asset.replace(/^\//,'')),asset);
 }
});
test('step reveal clamps first, last, next and previous states',()=>{
 const steps=Array.from({length:4},(_,i)=>({hidden:i>0}));const controls={back:{},next:{},all:{},count:{}};
 const b={querySelectorAll:()=>steps,querySelector:s=>controls[s.includes('back')?'back':s.includes('next')?'next':s.includes('all')?'all':'count']};
 updateStepper(b,2);assert.equal(steps.filter(s=>!s.hidden).length,2);assert.equal(controls.back.disabled,false);
 updateStepper(b,100);assert.equal(controls.next.disabled,true);assert.equal(steps.filter(s=>!s.hidden).length,4);
 updateStepper(b,-1);assert.equal(controls.back.disabled,true);assert.equal(steps.filter(s=>!s.hidden).length,1);
});
test('search recognizes subscript notation and German spelling',()=>{
 assert.equal(Calc.normalize('fₓᵧ'),Calc.normalize('fxy'));assert.equal(Calc.normalize('Größe'),Calc.normalize('grosse'));
 const match=TOPICS.find(t=>Calc.normalize(t.title+' '+t.keywords).includes(Calc.normalize('fxy')));assert.equal(match.id,'zweite');
});
