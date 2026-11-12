// node tests/chk.js LEVEL lang...
const fs=require('fs');const h=fs.readFileSync(__dirname+'/../index.html','utf8');
const m=h.match(/<script>\n(window\.PACK[\s\S]*?)<\/script>/);global.window=global;window.PACK={};eval(m[1]);
const [lv,...ls]=process.argv.slice(2);
for(const l of ls){PACK[l]();const L=LV.find(x=>x.id===lv);let bad=[];
L.units.forEach((u,i)=>{if(u.w.length!==12||u.p.length!==5)bad.push(i);const x=X[lv+'-'+(i+1)];if(!x||x.length!==12)bad.push('x'+i)});
console.log(l,lv,L.units.length,BANK.filter(b=>b.lv===lv).length,bad)}
