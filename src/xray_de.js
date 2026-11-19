/* ===== CÜMLE RÖNTGENİ: Almanca çekim motoru ===== */
// inf|3.tekil şimdiki|Präteritum 3.tekil|Partizip II|yardımcı (h/s)
const STRONG=`backen|backt|backte|gebacken|h
beginnen|beginnt|begann|begonnen|h
beißen|beißt|biss|gebissen|h
bieten|bietet|bot|geboten|h
binden|bindet|band|gebunden|h
bitten|bittet|bat|gebeten|h
bleiben|bleibt|blieb|geblieben|s
braten|brät|briet|gebraten|h
brechen|bricht|brach|gebrochen|h
brennen|brennt|brannte|gebrannt|h
bringen|bringt|brachte|gebracht|h
denken|denkt|dachte|gedacht|h
dürfen|darf|durfte|gedurft|h
empfehlen|empfiehlt|empfahl|empfohlen|h
essen|isst|aß|gegessen|h
fahren|fährt|fuhr|gefahren|s
fallen|fällt|fiel|gefallen|s
fangen|fängt|fing|gefangen|h
finden|findet|fand|gefunden|h
fliegen|fliegt|flog|geflogen|s
fliehen|flieht|floh|geflohen|s
fließen|fließt|floss|geflossen|s
fressen|frisst|fraß|gefressen|h
frieren|friert|fror|gefroren|h
geben|gibt|gab|gegeben|h
gehen|geht|ging|gegangen|s
gelingen|gelingt|gelang|gelungen|s
gelten|gilt|galt|gegolten|h
genießen|genießt|genoss|genossen|h
geschehen|geschieht|geschah|geschehen|s
gewinnen|gewinnt|gewann|gewonnen|h
gießen|gießt|goss|gegossen|h
gleichen|gleicht|glich|geglichen|h
graben|gräbt|grub|gegraben|h
greifen|greift|griff|gegriffen|h
haben|hat|hatte|gehabt|h
halten|hält|hielt|gehalten|h
hängen|hängt|hing|gehangen|h
heben|hebt|hob|gehoben|h
heißen|heißt|hieß|geheißen|h
helfen|hilft|half|geholfen|h
kennen|kennt|kannte|gekannt|h
klingen|klingt|klang|geklungen|h
kommen|kommt|kam|gekommen|s
können|kann|konnte|gekonnt|h
laden|lädt|lud|geladen|h
lassen|lässt|ließ|gelassen|h
laufen|läuft|lief|gelaufen|s
leiden|leidet|litt|gelitten|h
leihen|leiht|lieh|geliehen|h
lesen|liest|las|gelesen|h
liegen|liegt|lag|gelegen|h
lügen|lügt|log|gelogen|h
meiden|meidet|mied|gemieden|h
messen|misst|maß|gemessen|h
mögen|mag|mochte|gemocht|h
müssen|muss|musste|gemusst|h
nehmen|nimmt|nahm|genommen|h
nennen|nennt|nannte|genannt|h
raten|rät|riet|geraten|h
reiten|reitet|ritt|geritten|s
rennen|rennt|rannte|gerannt|s
riechen|riecht|roch|gerochen|h
rufen|ruft|rief|gerufen|h
scheinen|scheint|schien|geschienen|h
schieben|schiebt|schob|geschoben|h
schießen|schießt|schoss|geschossen|h
schlafen|schläft|schlief|geschlafen|h
schlagen|schlägt|schlug|geschlagen|h
schließen|schließt|schloss|geschlossen|h
schneiden|schneidet|schnitt|geschnitten|h
schreiben|schreibt|schrieb|geschrieben|h
schreien|schreit|schrie|geschrien|h
schweigen|schweigt|schwieg|geschwiegen|h
schwimmen|schwimmt|schwamm|geschwommen|s
sehen|sieht|sah|gesehen|h
sein|ist|war|gewesen|s
senden|sendet|sandte|gesandt|h
singen|singt|sang|gesungen|h
sinken|sinkt|sank|gesunken|s
sitzen|sitzt|saß|gesessen|h
sollen|soll|sollte|gesollt|h
sprechen|spricht|sprach|gesprochen|h
springen|springt|sprang|gesprungen|s
stehen|steht|stand|gestanden|h
stehlen|stiehlt|stahl|gestohlen|h
steigen|steigt|stieg|gestiegen|s
sterben|stirbt|starb|gestorben|s
stoßen|stößt|stieß|gestoßen|h
streiten|streitet|stritt|gestritten|h
tragen|trägt|trug|getragen|h
treffen|trifft|traf|getroffen|h
treiben|treibt|trieb|getrieben|h
treten|tritt|trat|getreten|s
trinken|trinkt|trank|getrunken|h
tun|tut|tat|getan|h
vergessen|vergisst|vergaß|vergessen|h
verlieren|verliert|verlor|verloren|h
wachsen|wächst|wuchs|gewachsen|s
waschen|wäscht|wusch|gewaschen|h
weisen|weist|wies|gewiesen|h
wenden|wendet|wandte|gewandt|h
werden|wird|wurde|geworden|s
werfen|wirft|warf|geworfen|h
wiegen|wiegt|wog|gewogen|h
wissen|weiß|wusste|gewusst|h
wollen|will|wollte|gewollt|h
ziehen|zieht|zog|gezogen|h
zwingen|zwingt|zwang|gezwungen|h`.split("\n").reduce((o,l)=>{const a=l.split("|");o[a[0]]={p3:a[1],pt:a[2],pp:a[3],aux:a[4]};return o;},{});
// zayıf ama sein alan fiiller
const SEIN_W=new Set(["reisen","wandern","landen","passieren","aufwachen","umziehen","folgen","joggen","klettern","rasen","segeln","stolpern","verreisen","einschlafen","aufstehen","erscheinen","verschwinden","entstehen","vergehen","entkommen","umsteigen","einsteigen","aussteigen","ankommen","abfahren","zurückkommen","mitkommen","weggehen","ausgehen","hinfallen","aufwachsen","wegfahren","zurückfahren","vorbeikommen","losfahren","starten"]);
const HABEN_OV=new Set(["bekommen","verstehen","bestehen","gefallen","verlassen","besitzen","erfahren","empfangen","überfahren","bekommen","beginnen","gewinnen","verbringen","besuchen","beraten"]);
const INSEP=["miss","emp","ent","zer","ver","be","er","ge","hinter","über","unter","wider"];
const SEPX=["zurück","vorbei","weiter","zusammen","fest","fern","heim","los","weg","nach","vor","mit","aus","auf","ein","an","ab","bei","dar","her","hin","um","zu","teil","statt","kennen","spazieren","fertig","sauber","statt"];
const PERS=["ich","du","er/sie/es","wir","ihr","sie/Sie"];
const PRON_P={ich:0,du:1,er:2,es:2,man:2,wir:3,ihr:4,Sie:5};
const P_TR=["ben","sen","o","biz","siz","onlar / Siz (resmi)"];
const MOD_TR={können:"-ebilmek (yapabilir)",müssen:"-malı, zorunda olmak",wollen:"istemek (niyet)",sollen:"-malı (biri öyle istiyor)",dürfen:"izinli olmak (-ebilir)",mögen:"sevmek / hoşlanmak","möchten":"istemek (kibar: -mek isterim)"};
const MODALS=new Set(["können","müssen","wollen","sollen","dürfen","mögen","möchten"]);
const MOD_PRES={können:["kann","kannst","kann","können","könnt","können"],müssen:["muss","musst","muss","müssen","müsst","müssen"],wollen:["will","willst","will","wollen","wollt","wollen"],sollen:["soll","sollst","soll","sollen","sollt","sollen"],dürfen:["darf","darfst","darf","dürfen","dürft","dürfen"],mögen:["mag","magst","mag","mögen","mögt","mögen"],möchten:["möchte","möchtest","möchte","möchten","möchtet","möchten"],wissen:["weiß","weißt","weiß","wissen","wisst","wissen"],sein:["bin","bist","ist","sind","seid","sind"],haben:["habe","hast","hat","haben","habt","haben"],werden:["werde","wirst","wird","werden","werdet","werden"],tun:["tue","tust","tut","tun","tut","tun"]};
const PRAT_IRR={sein:["war","warst","war","waren","wart","waren"],haben:["hatte","hattest","hatte","hatten","hattet","hatten"],werden:["wurde","wurdest","wurde","wurden","wurdet","wurden"]};
function splitVerb(inf){inf=inf.replace(/^sich\s+/,"");
  for(const p of SEPX){if(inf.startsWith(p)&&inf.length>p.length+3){const b=inf.slice(p.length);const V=typeof LEX!=="undefined"?verbSet():null;const bb=b.replace(/^(be|ver|er|ent|emp|zer|ge|miss)/,"");if(STRONG[b]||STRONG[bb]||V&&(V.has(b)))return{sep:p,base:b,ins:""};}}
  for(const p of INSEP){if(inf.startsWith(p)&&inf.length>p.length+3){const b=inf.slice(p.length);return{sep:"",base:b,ins:p};}}
  return{sep:"",base:inf,ins:""};}
function vstem(b){return b.endsWith("eln")||b.endsWith("ern")?b.slice(0,-1):b.replace(/e?n$/,"");}
function presBase(b){// sein önek yok
  if(MOD_PRES[b])return MOD_PRES[b].slice();
  const st=vstem(b),st3=STRONG[b]?STRONG[b].p3.replace(/t$/,""):null,dt=/[dt]$|[^lrhmnaeiouäöü][mn]$/.test(st),sz=/[sßzx]$/.test(st);
  const e=dt?"e":"";
  let du=st+e+"st",er=st+e+"t";
  if(STRONG[b]){const p3=STRONG[b].p3;er=p3;const s3=p3.replace(/e?t$/,"");if(s3!==st){du=/[sßzx]$/.test(s3)?s3+"t":(/[dt]$/.test(s3)?s3+"st":s3+"st");if(b==="halten")du="hältst";if(b==="treten")du="trittst";if(b==="laden")du="lädst";if(b==="raten")du="rätst";if(b==="braten")du="brätst";}}
  if(sz&&du===st+"st")du=st+"t";
  if(b.endsWith("eln"))return[st.replace(/el$/,"le"),st+"st",st+"t",b,st+"t",b];
  return[st+"e",du,er,b,st+e+"t",b];}
function conjDe(inf){inf=String(inf||"").toLowerCase().replace(/^sich\s+/,"").trim();if(!inf)return null;
  const {sep,base,ins}=splitVerb(inf),full=ins+base;
  const strong=STRONG[full]||STRONG[base];
  let pres=presBase(STRONG[full]||MOD_PRES[full]?full:base);if(ins&&!STRONG[full]&&!MOD_PRES[full])pres=pres.map(x=>ins+x);
  let pp,aux="h",pt3;
  if(STRONG[full]){pp=STRONG[full].pp;aux=STRONG[full].aux;pt3=STRONG[full].pt;}
  else if(strong){pp=STRONG[base].pp;aux=STRONG[base].aux;pt3=STRONG[base].pt;if(ins){pp=ins+pp.replace(/^ge/,"");pt3=ins+pt3;aux=["entstehen","vergehen","entkommen","gelingen","geschehen","erscheinen","verschwinden","ertrinken","zerfallen","verfallen","entfliehen","erwachen","ersterben","erfrieren","verderben"].includes(full)?"s":"h";}}
  else{const st=vstem(full),e=/[dt]$|[^lrhmnaeiouäöü][mn]$/.test(st)?"e":"";pp=(ins||/ieren$/.test(full)?"":"ge")+st+e+"t";pt3=st+e+"te";}
  if(full==="ieren")pp="iert";
  if(sep){pp=sep+pp;}
  if(SEIN_W.has(inf)||SEIN_W.has(full))aux="s";if(HABEN_OV.has(inf))aux="h";
  if(MOD_PRES[full]&&full!=="sein"&&full!=="haben"&&full!=="werden"&&full!=="tun")pres=MOD_PRES[full].slice();
  const pres6=pres.map(x=>x+(sep?" "+sep:""));
  let prat=PRAT_IRR[full];if(!prat&&pt3){const b=pt3;const strongPt=!/te$/.test(b);prat=strongPt?[b,b+(/[sßzt]$/.test(b)?"est":"st"),b,b+"en",b+(/[dt]$/.test(b)?"et":"t"),b+"en"]:[b,b+"st",b,b+"n",b+"t",b+"n"];if(full==="möchten")prat=["wollte","wolltest","wollte","wollten","wolltet","wollten"];}
  const pratS=prat?prat.map(x=>x+(sep?" "+sep:"")):null;
  const auxF=aux==="s"?MOD_PRES.sein:MOD_PRES.haben;
  let imp=null;if(!MODALS.has(full)&&full!=="wissen"){const st0=vstem(full),du0=pres[1].replace(/e?s?t$/,"").replace(/ß$/,"ß");
    let b=st0;if(STRONG[full]||strong){const d=/[sßzx]$/.test(st0)?pres[1].slice(0,-1):pres[1].slice(0,-2);if(/i/.test(d)&&!/i/.test(st0))b=d;}
    if(/[dt]$|[^lrhmnaeiouäöü][mn]$/.test(b))b+="e";if(/eln$/.test(full))b=st0.replace(/el$/,"le");
    imp={sein:"sei",haben:"hab",werden:"werde",tun:"tu"}[full]||b;if(sep)imp+=" "+sep;}
  if(full==="möchten"){pp="gewollt";}
  return{inf,sep,base:full,pres:pres.slice(),pres6,prat:pratS,pp,aux:aux==="s"?"sein":"haben",perf:auxF.map(a=>a+" "+pp),strong:!!strong,imp,modal:MODALS.has(full)};}
// çekimli bir biçimden mastarı bul
let VERBSET=null;
function verbSet(){if(VERBSET)return VERBSET;VERBSET=new Set(Object.keys(STRONG));
  Object.values(MOD_PRES).length;for(const k of Object.keys(MOD_PRES))VERBSET.add(k);
  LEX.forEach((e,k)=>{const fr=String(e.fr||"").replace(/^sich\s+/i,"").trim().toLowerCase(),tr=String(e.tr||"");if(/^[a-zäöüß]+(en|ern|eln|n)$/.test(fr)&&/(mek|mak)\b/.test(tr))VERBSET.add(fr);});
  SEIN_W.forEach(v=>VERBSET.add(v));return VERBSET;}
const FORMIDX={};
function formIndex(inf){if(FORMIDX[inf]!==undefined)return FORMIDX[inf];const c=conjDe(inf);if(!c){FORMIDX[inf]=null;return null;}
  const o={};c.pres.forEach((f,i)=>{(o[f]=o[f]||[]).push({t:"pres",p:i});});(c.prat||[]).forEach((f,i)=>{const x=f.split(" ")[0];(o[x]=o[x]||[]).push({t:"prat",p:i});});
  o[c.pp]=(o[c.pp]||[]).concat([{t:"pp"}]);if(c.sep)o[c.pp.slice(c.sep.length)]=(o[c.pp.slice(c.sep.length)]||[]).concat([{t:"pp-sep"}]);
  o[c.inf]=(o[c.inf]||[]).concat([{t:"inf"}]);if(c.sep){o[c.base]=(o[c.base]||[]).concat([{t:"inf-sep"}]);const zu=c.sep+"zu"+c.base;o[zu]=[{t:"zuinf"}];}
  const k2=c.pres[1].replace(/e?st$/,"");if(!o[k2])o[k2]=[{t:"imp"}];
  if(["sein","haben","werden","können","müssen","dürfen","mögen"].includes(inf)){const K2={sein:["wäre","wärst","wäre","wären","wärt","wären"],haben:["hätte","hättest","hätte","hätten","hättet","hätten"],werden:["würde","würdest","würde","würden","würdet","würden"],können:["könnte","könntest","könnte","könnten","könntet","könnten"],müssen:["müsste","müsstest","müsste","müssten","müsstet","müssten"],dürfen:["dürfte","dürftest","dürfte","dürften","dürftet","dürften"],mögen:["möchte","möchtest","möchte","möchten","möchtet","möchten"]}[inf];K2.forEach((f,i)=>{(o[f]=o[f]||[]).push({t:"k2",p:i});});}
  if(inf==="sein"){["sei","seid"].forEach(f=>{(o[f]=o[f]||[]).push({t:"imp"});});}
  FORMIDX[inf]=o;return o;}
function findVerb(w,sepTail){const lw=w.toLowerCase(),V=verbSet(),cands=new Set();
  if(IRR[lw]&&V.has(IRR[lw]))cands.add(IRR[lw]);
  lemmas(lw).forEach(c=>{if(V.has(c))cands.add(c);});
  const st=[lw.replace(/(est|st|et|t|e|en|n|te|test|ten|tet)$/,""),lw.replace(/(st|t|e|en|n)$/,"")];
  st.forEach(s=>{[s+"en",s+"n",s.replace(/ie/,"e")+"en",s.replace(/i/,"e")+"en",s.replace(/ä/,"a")+"en",s.replace(/äu/,"au")+"en",s.replace(/ö/,"o")+"en",s+"ern",s+"eln"].forEach(c=>{if(V.has(c))cands.add(c);});});
  const g=lw.match(/^(.*?)ge(.+?)(t|en)$/);if(g){[g[1]+g[2]+"en",g[1]+g[2]+"n"].forEach(c=>{if(V.has(c))cands.add(c);});}
  if(/iert$/.test(lw))cands.add(lw.replace(/iert$/,"ieren"));
  const zu=lw.match(/^(.+?)zu(.+en)$/);if(zu&&V.has(zu[1]+zu[2]))cands.add(zu[1]+zu[2]);
  // tablo: tüm fiillerde biçimi ara (sonek eşleşmesi tutmazsa)
  if(!cands.size){for(const v of Object.keys(STRONG)){const fi=formIndex(v);if(!fi)continue;if(fi[lw]){cands.add(v);continue;}
      for(const f of Object.keys(fi)){if(f.length>2&&lw.length>f.length&&lw.endsWith(f)){const pre=lw.slice(0,-f.length);
        if(INSEP.includes(pre))cands.add(pre+v);else if(pre.endsWith("ge")&&SEPX.includes(pre.slice(0,-2))&&fi[f].some(h=>h.t==="pp"))cands.add(pre.slice(0,-2)+v);
        else if(SEPX.includes(pre)&&fi[f].some(h=>h.t==="inf"||h.t==="pp"))cands.add(pre+v);}}}}
  const out=[];
  for(const inf of cands){const tries=[inf];if(sepTail)tries.unshift(sepTail+inf);
    for(const t of tries){if(t!==inf&&!V.has(t)&&!STRONG[t.slice(sepTail.length)])continue;const fi=formIndex(t);if(!fi)continue;let hit=fi[lw];
      if(!hit&&t!==inf){const fb=formIndex(inf);if(fb&&fb[lw])hit=fb[lw].map(h=>Object.assign({},h,{sepSplit:1}));}
      if(hit){out.push({inf:t,forms:hit});break;}}}
  if(!out.length&&cands.size){const inf=[...cands][0];out.push({inf,forms:[{t:"?"}]});}
  return out[0]||null;}
