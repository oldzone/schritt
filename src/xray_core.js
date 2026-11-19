/* ===== CÜMLE RÖNTGENİ: cümle çözümleme ===== */
const XP={// zamir: kişi, hâl, Türkçe
 ich:[0,"N","ben"],mich:[0,"A","beni"],mir:[0,"D","bana"],du:[1,"N","sen"],dich:[1,"A","seni"],dir:[1,"D","sana"],
 er:[2,"N","o (erkek / eril isim)"],ihn:[2,"A","onu (erkek)"],ihm:[2,"D","ona (erkek / nötr)"],es:[2,"NA","o (nötr) / kişisiz özne"],
 man:[2,"N","insan, kişi (genel özne)"],wir:[3,"N","biz"],uns:[3,"AD","bizi / bize"],euch:[4,"AD","sizi / size"],
 Sie:[5,"NA","Siz (resmi) / onlar"],Ihnen:[5,"D","size (resmi)"],ihnen:[5,"D","onlara"],sich:[-1,"AD","kendini / kendine"]};
const XREFL={0:"mich",1:"dich",2:"sich",3:"uns",4:"euch",5:"sich"},XREFLD={0:"mir",1:"dir",2:"sich",3:"uns",4:"euch",5:"sich"};
const CASE_TR={N:"Nominativ (yalın hâl: kim? ne?)",A:"Akkusativ (-i hâli: kimi? neyi?)",D:"Dativ (-e hâli: kime? nerede?)",G:"Genitiv (-in hâli: kimin?)"};
const CASE_S={N:"Nom.",A:"Akk.",D:"Dat.",G:"Gen."};
const G_TR={m:"eril (der)",f:"dişil (die)",n:"nötr (das)",pl:"çoğul (die)"};
const XPREP={durch:["A","içinden, -den geçerek"],für:["A","için"],gegen:["A","-e karşı"],ohne:["A","-sız, -meden"],um:["A","etrafında / saat …'de"],bis:["A","-e kadar"],entlang:["A","boyunca"],
 aus:["D","-den (içinden çıkış / memleket)"],bei:["D","-de, yanında"],mit:["D","ile"],nach:["D","-e (şehir/ülke) / -den sonra"],seit:["D","-den beri"],von:["D","-den / -in"],zu:["D","-e (kişiye/yere)"],gegenüber:["D","karşısında"],ab:["D","-den itibaren"],außer:["D","-den başka"],
 an:["W","-de/-e (kenar, dikey yüzey, gün)"],auf:["W","üstünde / üstüne"],hinter:["W","arkasında / arkasına"],in:["W","içinde / içine"],neben:["W","yanında / yanına"],über:["W","üstünde / hakkında"],unter:["W","altında / altına"],vor:["W","önünde / önce"],zwischen:["W","arasında / arasına"],
 wegen:["G","yüzünden"],trotz:["G","-e rağmen"],während:["G","sırasında"],statt:["G","yerine"],innerhalb:["G","içinde (süre)"]};
const XCONTR={im:["in","dem"],ins:["in","das"],am:["an","dem"],ans:["an","das"],zum:["zu","dem"],zur:["zu","der"],vom:["von","dem"],beim:["bei","dem"],aufs:["auf","das"]};
const XSUB={dass:"-dığını / ki",weil:"çünkü",wenn:"-ince / eğer",ob:"-ip -mediğini",obwohl:"-mesine rağmen",damit:"-sin diye",bevor:"-meden önce",nachdem:"-dikten sonra",als:"-dığında (geçmişte bir kez)",während:"-irken",falls:"eğer, olur da",bis:"-ene kadar",seit:"-den beri",seitdem:"-den beri",sodass:"öyle ki",da:"-dığı için",sobald:"-ir -mez",solange:"-dığı sürece",indem:"-erek",ehe:"-meden önce",wie:"nasıl (dolaylı soru)",wo:"nerede (dolaylı soru)",warum:"neden (dolaylı soru)",wer:"kim (dolaylı soru)",was:"ne (dolaylı soru)",wann:"ne zaman (dolaylı soru)"};
const XCOORD={und:"ve",oder:"veya",aber:"ama",denn:"çünkü",sondern:"bilakis, aksine"};
const XQW={was:"ne",wer:"kim",wen:"kimi",wem:"kime",wessen:"kimin",wie:"nasıl",wo:"nerede",wohin:"nereye",woher:"nereden",wann:"ne zaman",warum:"neden",wieso:"neden",weshalb:"neden",welcher:"hangi",welche:"hangi",welches:"hangi",welchen:"hangi",welchem:"hangi"};
const XTIME=new Set("heute morgen gestern jetzt nun bald später früher immer oft manchmal selten nie niemals schon noch dann danach vorher zuerst endlich abends morgens mittags nachts täglich wöchentlich gerade sofort wieder lange montags sonntags gleich bisher damals inzwischen zurzeit mittlerweile übermorgen vorgestern".split(" "));
const XPLACE=new Set("hier da dort oben unten links rechts draußen drinnen zuhause hause überall irgendwo hin her vorne hinten nebenan".split(" "));
const XNEG=new Set(["nicht","nie","niemals","nichts","niemand"]);
const XNONV=new Set("bitte danke gern gerne mal doch ja nein sehr auch noch schon nur etwa ganz mehr viel wenig etwas alle alles beide eben halt wohl sogar fast genug zusammen allein leider vielleicht natürlich wirklich echt einfach schnell langsam gut schlecht neu alt groß klein lange zu so".split(" "));
const XTIMEN=new Set("Abend Morgen Mittag Nachmittag Vormittag Nacht Tag Woche Monat Jahr Wochenende Montag Dienstag Mittwoch Donnerstag Freitag Samstag Sonntag Sommer Winter Herbst Frühling".split(" "));
const XDETEND={"":[["m","N"],["n","N"],["n","A"]],e:[["f","N"],["f","A"],["pl","N"],["pl","A"]],en:[["m","A"],["pl","D"]],em:[["m","D"],["n","D"]],er:[["f","D"],["f","G"],["pl","G"]],es:[["m","G"],["n","G"]]};
const XDEF={der:[["m","N"],["f","D"],["f","G"],["pl","G"]],die:[["f","N"],["f","A"],["pl","N"],["pl","A"]],das:[["n","N"],["n","A"]],den:[["m","A"],["pl","D"]],dem:[["m","D"],["n","D"]],des:[["m","G"],["n","G"]]};
const XDIES={er:[["m","N"],["f","D"],["f","G"],["pl","G"]],e:[["f","N"],["f","A"],["pl","N"],["pl","A"]],es:[["n","N"],["n","A"],["m","G"],["n","G"]],en:[["m","A"],["pl","D"]],em:[["m","D"],["n","D"]]};
const XPOSS={mein:"benim",dein:"senin",sein:"onun (erkek/nötr)",ihr:"onun (kadın) / onların",unser:"bizim",euer:"sizin",eur:"sizin",Ihr:"sizin (resmi)",ein:"bir",kein:"hiç … yok (olumsuz artikel)"};
function xDet(w,next){const lw=w.toLowerCase();
  if(XDEF[lw])return{k:"def",o:XDEF[lw],tr:"belirli artikel (the)"};
  for(const st of ["kein","mein","dein","sein","ihr","unser","euer","eur","ein"]){if(lw.startsWith(st)){const end=lw.slice(st.length);if(XDETEND[end]!==undefined&&(st!=="euer"||end==="")&&(st!=="eur"||end!=="")){
     if((st==="sein"||st==="ihr")&&!(next&&/^\p{Lu}/u.test(next)))return null;
     return{k:st==="ein"?"indef":st==="kein"?"neg":"poss",o:XDETEND[end],tr:XPOSS[w==="Ihr"||w==="Ihre"||w==="Ihren"||w==="Ihrem"||w==="Ihrer"?"Ihr":st],stem:st};}}}
  for(const st of ["dies","jed","welch","manch","all","solch"]){if(lw.startsWith(st)){const end=lw.slice(st.length);if(XDIES[end])return{k:"dem",o:XDIES[end],tr:{dies:"bu",jed:"her",welch:"hangi",manch:"bazı",all:"bütün",solch:"böyle"}[st]};}}
  return null;}
function xNoun(w){const r=findLex(w);if(!r)return{tr:"",g:null};const fr=String(r.e.fr||""),m=fr.match(/^(der|die|das)\s/i);
  let g=m?{der:"m",die:"f",das:"n"}[m[1].toLowerCase()]:null;let pl=false;
  if(LANG.plurRe&&LANG.plurRe.test(fr))pl=true;else if(g&&lk(noArt(fr))!==lk(w)&&!lk(w).startsWith(lk(noArt(fr)).slice(0,-1)+"s"))pl=/(en|n|e|er|s)$/i.test(w)&&lk(w).length>lk(noArt(fr)).length;
  return{tr:r.e.tr,g,pl,lemma:fr};}
function xUpper(w){return /^\p{Lu}/u.test(w);}
function xrayDe(s){
  const raw=toks(s),T=[];let wi=0;raw.forEach(t=>{if(isW(t))T.push({w:t,i:wi++,r:"X",tr:"",info:[],lw:t.toLowerCase()});else if(/[,;:.!?—–]/.test(t)&&T.length)T[T.length-1].punct=(T[T.length-1].punct||"")+t.trim();});
  if(!T.length)return null;
  const q=/\?\s*$/.test(s),ex=/!\s*$/.test(s);
  // yan cümle sınırları
  const clauses=[];let cur={start:0,sub:null,toks:[]};
  T.forEach((t,i)=>{const prevP=i>0&&T[i-1].punct&&/[,;:—–]/.test(T[i-1].punct);
    if(i>0&&(prevP||(XSUB[t.lw]&&!["wie","wo","was","wer","wann","warum","bis","seit","während","da","als"].includes(t.lw)))&&(XSUB[t.lw]||XCOORD[t.lw]||prevP)){
      if(cur.toks.length){clauses.push(cur);}cur={start:i,sub:XSUB[t.lw]&&(prevP||i>0)&&!XCOORD[t.lw]?t.lw:null,toks:[]};
      if(prevP&&/^(der|die|das|dem|den|deren|dessen|denen)$/.test(t.lw)&&i>1)cur.sub="rel:"+t.lw;
      if(prevP&&t.lw==="um")cur.sub="um";if(prevP&&t.lw==="zu")cur.sub="zu";}
    cur.toks.push(t);t.cl=clauses.length;});
  clauses.push(cur);
  for(let k=clauses.length-1;k>=2;k--){const c=clauses[k],pv=clauses[k-1];if(!c.sub&&pv.sub&&pv.sub.startsWith("rel")){const host=clauses.slice(0,k-1).reverse().find(x=>!x.sub);
      if(host&&!host.toks.some(t=>!xUpper(t.w)&&!XDEF[t.lw]&&!xDet(t.w,"")&&findVerb(t.w,""))){host.toks.push(...c.toks);c.toks.forEach(t=>t.cl=clauses.indexOf(host));clauses.splice(k,1);}}}
  clauses.forEach((c,ix)=>c.toks.forEach(t=>t.cl=ix));
  if(clauses[0].toks.length&&XSUB[clauses[0].toks[0].lw]&&!q&&!["wie","wo","was","wer","wann","warum","da"].includes(clauses[0].toks[0].lw))clauses[0].sub=clauses[0].toks[0].lw;
  // ayrılabilen ön ek: ana cümlenin son kelimesi
  clauses.forEach(c=>{const last=c.toks[c.toks.length-1];if(!c.sub&&last&&SEPX.includes(last.lw)&&c.toks.length>2&&!XPREP[last.lw]||(!c.sub&&last&&["an","auf","aus","ein","mit","zu","ab","vor","um","nach","zurück","weg","los","fern","vorbei","her","hin","fest"].includes(last.lw)&&c.toks.length>2&&!(c.toks[c.toks.length-2]&&XPREP[c.toks[c.toks.length-2].lw]))){c.sepT=last;}});
  // kelime kelime
  const V=verbSet();
  T.forEach((t,i)=>{const lw=t.lw,nx=T[i+1]&&T[i+1].w,c=clauses[t.cl];
    if(XCONTR[lw]){const [p,a]=XCONTR[lw];t.r="P";t.prep=p;t.contr=a;t.tr=(XPREP[p]||["",""])[1];t.info.push(`<b>${p} + ${a}</b> birleşmiş hâli`);return;}
    if(t===c.sepT){t.r="V2";t.sepPart=1;return;}
    if(i===c.start&&c.sub==="um"&&lw==="um"){t.r="C";t.tr="-mek için";t.umzu=1;return;}
    if(i===c.start&&c.sub&&!c.sub.startsWith("rel")&&XSUB[lw]){t.r="C";t.tr=XSUB[lw];t.subord=1;return;}
    if(c.sub&&c.sub.startsWith("rel")&&i===c.start){t.r="C";t.tr="ki o / -en (ilgi zamiri)";t.rel=1;return;}
    if(XCOORD[lw]){t.r="C";t.tr=XCOORD[lw];t.coord=1;return;}
    if(i===0&&XQW[lw]&&q){t.r="Q";t.tr=XQW[lw];return;}
    if(XNEG.has(lw)){t.r="N";t.tr={nicht:"değil, -me",nie:"asla",niemals:"asla",nichts:"hiçbir şey",niemand:"hiç kimse"}[lw];return;}
    if(lw==="zu"&&T[i+1]&&!xUpper(T[i+1].w)&&findVerb(T[i+1].w,"")&&!/^(dem|der|den)$/.test(T[i+1].lw)){t.r="V2";t.zu=1;t.tr="mastar eki (-mek)";return;}
    if(XPREP[w2(lw)]&&!(lw==="bis"&&c.sub==="bis")){t.r="P";t.prep=lw;t.tr=XPREP[lw][1];return;}
    const d=xDet(t.w,nx);if(d&&!(XP[t.w]||XP[lw])||d&&(lw==="ihr"&&nx&&xUpper(nx)&&i>0)){t.det=d;t.r="DET";t.tr=d.tr;return;}
    if((XP[t.w]||XP[lw]&&!(lw==="sie"))&&!(t.w==="Sie"&&i===0)){const p=XP[t.w]||XP[lw];t.pron=p;t.tr=p[2];t.r=p[1].includes("N")?"S?":p[1].includes("A")?"O":"D";return;}
    if(lw==="sie"||t.w==="Sie"&&i===0){t.pron=[-2,"NA","o (kadın / dişil isim) ya da onlar"];t.tr=t.pron[2];t.r="S?";return;}
    if(xUpper(t.w)&&!(i===0)){const n=xNoun(t.w);t.noun=n;t.tr=n.tr;t.r="NP";return;}
    if(i===0&&xUpper(t.w)){const n=xNoun(t.w);const nv=T[1]&&!xUpper(T[1].w)&&findVerb(T[1].w,"");if((n.g||nv&&!XQW[lw]&&!XP[lw]&&!XSUB[lw]&&!XCOORD[lw]&&!XTIME.has(lw)&&!XDEF[lw]&&!xDet(t.w,T[1].w)&&!(lw==="sie"))&&!findVerb(t.w,"")){t.noun=n;t.tr=n.tr;t.r="NP";return;}}
    const sepTail=c.sepT&&!c.sepUsed?c.sepT.lw:"";
    const v=XNONV.has(lw)?null:findVerb(t.w,sepTail);
    if(v&&!(XTIME.has(lw)||XPLACE.has(lw))){t.verb=v;t.r="VERB";if(sepTail&&v.inf.startsWith(sepTail))c.sepUsed=1;return;}
    if(XTIME.has(lw)){t.r="T";const r=findLex(t.w);t.tr=r?r.e.tr:FUNC[lw]||"";return;}
    if(XPLACE.has(lw)){t.r="P";const r=findLex(t.w);t.tr=r?r.e.tr:"";t.adv=1;return;}
    if(i===0&&XQW[lw]){t.r="Q";t.tr=XQW[lw];return;}
    const r=findLex(t.w);t.tr=r?r.e.tr:(FUNC[lw]||FUNC[t.w]||"");if(r&&lk(r.e.fr)!==lw)t.lem=r.e.fr;t.r="A";});
  function w2(x){return x;}
  clauses.forEach(c=>{if(c.toks.some(t=>t.r==="VERB"))return;const pos=an0q(c);const t=c.toks[pos];
    if(t&&t.r==="A"&&/^[a-zäöüß]+(e|st|t|en)$/.test(t.w)&&!XNONV.has(t.lw)){const stem=t.lw.replace(/(e|st|est|et|t|en)$/,"");const inf=stem+"en";t.verb={inf,forms:[{t:"pres",p:/st$/.test(t.lw)?1:/e$/.test(t.lw)?0:/en$/.test(t.lw)?3:2}],guess:1};t.r="VERB";}});
  function an0q(c){if(c.sub)return c.toks.length-1;const f=c.toks[0];if(f&&(f.r==="Q"||q&&c===clauses[0]))return f.r==="Q"?1:0;let k=1;if(f&&f.r==="DET"){k=1;while(c.toks[k]&&c.toks[k].r!=="NP")k++;k++;}return k;}
  // fiil rolleri: çekimli fiil / ikinci parça
  clauses.forEach(c=>{const vs=c.toks.filter(t=>t.r==="VERB");if(!vs.length)return;
    let fin;
    if(c.sub&&c.sub!=="um"&&c.sub!=="zu"){fin=vs[vs.length-1];const fins=vs.filter(v=>v.verb.forms.some(f=>/pres|prat|k2/.test(f.t)));if(fins.length)fin=fins[fins.length-1];}
    else if(c.sub==="um"||c.sub==="zu"){fin=null;}
    else{fin=vs.find(v=>v.verb.forms.some(f=>/pres|prat|k2|imp/.test(f.t)))||vs[0];}
    vs.forEach(v=>{if(v===fin){v.r="V";c.fin=v;}else{v.r="V2";c.rest=(c.rest||[]).concat([v]);}});});
  // özne, nesne, hâl
  clauses.forEach(c=>{const fin=c.fin;let subj=null;
    c.toks.forEach((t,k)=>{if(t.r==="S?"){if(!subj&&t.pron[1].includes("N")){t.r="S";subj=t;}else t.r=t.pron[1].includes("A")?"O":"D";
        if(t.r!=="S"&&t.pron[0]===-2){t.tr="onu (kadın) / onları";}}});
    c.subj=subj;
    // isim öbekleri
    let prep=null;
    c.toks.forEach((t,k)=>{if(t.r==="P"&&(t.prep)){prep=t;if(t.contr){const d=XDEF[t.contr];t.npCase=null;t.pendingDet={k:"def",o:d};}return;}
      if(t.r==="DET"||t.r==="NP"||(t.r==="A"&&k+1<c.toks.length&&(c.toks[k+1].r==="NP")&&!/(lich|ig|isch)$/.test("")&&prep===null&&false)){}
      if(t.r==="DET"){t.np={det:t,prep,parts:[t]};let j=k+1;while(j<c.toks.length&&(c.toks[j].r==="A")){t.np.parts.push(c.toks[j]);j++;}if(j<c.toks.length&&c.toks[j].r==="NP"){t.np.parts.push(c.toks[j]);t.np.noun=c.toks[j];c.toks[j].inNP=t.np;}
        t.np.parts.forEach(x=>{if(x!==t)x.inNP=t.np;});prep=null;}
      else if(t.r==="NP"&&!t.inNP){t.np={det:null,prep,parts:[t],noun:t};t.inNP=t.np;if(prep&&prep.pendingDet){t.np.det={det:prep.pendingDet};t.np.contr=prep;}prep=null;}
      else if(t.r!=="A")prep=null;});
    const nps=[];c.toks.forEach(t=>{if(t.np&&!nps.includes(t.np))nps.push(t.np);});
    nps.forEach(np=>{const n=np.noun&&np.noun.noun||{};let opts=(np.det&&(np.det.det?np.det.det.o:np.det.o))||[["?","?"]];
      if(n.g)opts=opts.filter(o=>o[0]===(n.pl?"pl":n.g)||(o[0]==="pl"&&n.pl));if(!opts.length)opts=(np.det&&(np.det.det?np.det.det.o:np.det.o))||[];
      const pc=np.prep?XPREP[np.prep.prep]:np.contr?XPREP[np.contr.prep]:null;let caseW=null;
      if(pc){if(pc[0]==="W"){const cs=opts.map(o=>o[1]).filter(x=>x==="A"||x==="D");caseW=cs.includes("D")&&!cs.includes("A")?"D":cs.includes("A")&&!cs.includes("D")?"A":(np.contr&&np.contr.contr==="dem"?"D":np.contr&&np.contr.contr==="das"?"A":"D");np.wechsel=caseW;}else caseW=pc[0];
        opts=opts.filter(o=>o[1]===caseW);if(!opts.length&&np.det)opts=[[n.g||"?",caseW]];}
      else{const hasN=opts.some(o=>o[1]==="N"),hasA=opts.some(o=>o[1]==="A");
        if(hasN&&hasA){opts=opts.filter(o=>o[1]===(subj?"A":"N"));}
        else if(opts.length>1&&opts.some(o=>o[1]==="G")&&opts.some(o=>o[1]!=="G")){const prevNoun=c.toks[c.toks.indexOf(np.parts[0])-1];if(!(prevNoun&&prevNoun.r==="NP"))opts=opts.filter(o=>o[1]!=="G");}}
      const o=opts[0]||[n.g||"?",caseW||(subj?"A":"N")];np.g=n.pl?"pl":(n.g||o[0]);np.c=caseW||o[1];
      if(!np.det&&!pc){np.c=subj?"A":"N";}
      if(np.c==="N"&&!subj&&!np.prep&&!np.contr){subj=np;c.subj=np;}
      const role=np.prep||np.contr?"P":np.c==="N"?"S":np.c==="A"?"O":np.c==="D"?"D":"A";
      np.parts.forEach(x=>{x.r=role;x.np=np;});if(np.prep)np.prep.np=np;if(np.contr)np.contr.np=np;});
    // yer/zaman kaba ayrımı
    c.toks.forEach(t=>{if(t.r==="P"&&t.prep&&t.np&&["seit","bis","ab","vor","nach","während","um"].includes(t.prep)&&t.np.noun&&/^(Jahr|Jahre|Jahren|Monat|Monaten|Woche|Wochen|Tag|Tagen|Stunde|Stunden|Minute|Minuten|Uhr|Montag|Dienstag|Mittwoch|Donnerstag|Freitag|Samstag|Sonntag|Morgen|Abend|Mittag|Nacht|Sommer|Winter|Urlaub|Essen|Arbeit|Unterricht|Januar|Februar|März|April|Mai|Juni|Juli|August|September|Oktober|November|Dezember)$/.test(t.np.noun.w)){t.r="T";t.np.parts.forEach(x=>x.r="T");}});
    c.toks.forEach((t,k)=>{if(t.np&&!t.np.prep&&!t.np.contr&&t.np.noun&&XTIMEN.has(t.np.noun.w)&&(t.np.det||k>0&&c.toks[k-1].r==="T")){t.r="T";t.np.timeAkk=1;}});
    if(fin&&["sein","werden","bleiben","heißen"].includes(fin.verb.inf)){c.toks.forEach(t=>{if(t.np&&t.np.c==="N"&&t.np!==c.subj&&!t.np.prep){t.r="A";t.inNP=t.np;t.np.pred=1;}});}
    // kişi
    if(fin){let p=null;const sj=c.subj;
      if(sj&&sj.pron){p=sj.pron[0];if(p===-2){const f=fin.verb.forms.find(f=>f.p!==undefined);p=f&&(f.p===5||f.p===3)?5:2;sj.tr=p===5?"onlar":"o (kadın / dişil isim)";}}
      else if(sj&&sj.g)p=sj.g==="pl"?5:2;
      const fs=fin.verb.forms.filter(f=>f.p!==undefined);if(p===null&&fs.length)p=fs[0].p;
      fin.person=p;c.person=p;}});
  // zaman ve yapı
  const main=clauses.find(c=>!c.sub)||clauses[0];
  clauses.forEach(c=>{const fin=c.fin;if(!fin){c.tense=c.sub==="um"||c.sub==="zu"?"zu":"none";return;}
    const L=fin.verb.inf,rest=c.rest||[],rf=rest.map(r=>r.verb.forms.map(f=>f.t)).flat(),ff=fin.verb.forms.map(f=>f.t);
    const pt=ff.includes("prat")&&!ff.includes("pres");
    if((L==="haben"||L==="sein")&&rf.some(x=>x==="pp"||x==="pp-sep"))c.tense=pt?"Plusquamperfekt":"Perfekt";
    else if(L==="werden"&&rf.some(x=>x==="pp"||x==="pp-sep"))c.tense=ff.includes("k2")?"Konjunktiv II Passiv":pt?"Präteritum Passiv":"Passiv";
    else if(L==="werden"&&ff.includes("k2")&&rest.length)c.tense="würde";
    else if(L==="werden"&&rest.length)c.tense="Futur";
    else if(MODALS.has(L)&&rest.length)c.tense=ff.includes("k2")?"Modal K2":pt?"Modal Prät":"Modal";
    else if(ff.includes("k2"))c.tense="Konjunktiv II";
    else if(pt)c.tense="Präteritum";
    else if(fin.i===0&&ex&&!q)c.tense="Imperativ";
    else c.tense="Präsens";
    if(c.sepT){c.sep=1;}});
  const ty=q?(T[0].r==="Q"?"W":"JN"):(main.fin&&main.fin.i===0&&!q?(ex||T.find(t=>t.lw==="Sie"&&t.i===1)?"IMP":"V1"):"A");
  return{s,T,clauses,main,q,ex,ty};}

/* ---- açıklama metinleri ---- */
function xTenseInfo(c){const f=c.fin;if(!f)return"";const L=f.verb.inf;
  return{Perfekt:`<b>Perfekt (konuşmada geçmiş zaman)</b>: ${L==="sein"?"<b>sein</b>":"<b>haben</b>"} 2. sırada çekilir + asıl fiilin <b>Partizip II</b> hali en sona gider. Türkçe: <i>-dı / -miş</i>.${L==="sein"?" Yer değiştirme ya da durum değişimi bildiren fiiller (gehen, fahren, kommen, aufstehen…) <b>sein</b> alır.":""}`,
   Plusquamperfekt:`<b>Plusquamperfekt (geçmişin geçmişi)</b>: hatte/war + Partizip II. Türkçe: <i>-mıştı</i>.`,
   Passiv:`<b>Edilgen (Passiv)</b>: werden + Partizip II. İşi yapan değil, işin kendisi önemli. Türkçe: <i>-ılır / -ılıyor</i>.`,
   "Präteritum Passiv":`<b>Geçmiş edilgen</b>: wurde + Partizip II. Türkçe: <i>-ıldı</i>.`,
   würde:`<b>Konjunktiv II (würde + mastar)</b>: dilek, hayal, kibar istek. Türkçe: <i>-ardı / -ar mıydı</i>.`,
   Futur:`<b>Futur I</b>: werden + mastar (en sonda). Türkçe: <i>-ecek</i>. Günlük dilde çoğu zaman şimdiki zaman + zaman zarfı kullanılır.`,
   Modal:`<b>Modal fiil</b> (${esc(L)} = ${esc(MOD_TR[L]||"")}) 2. sırada çekilir, asıl fiil <b>mastar hâlinde en sona</b> gider. Türkçede de fiil sonda: <i>yapmalıyım, yapabilirim</i>.`,
   "Modal Prät":`<b>Modal fiilin geçmişi</b> (${esc(L)}): konnte/musste/wollte… + mastar en sonda. Türkçe: <i>yapabildim, yapmak zorunda kaldım</i>.`,
   "Modal K2":`<b>Kibar/varsayım modal</b> (könnte, müsste, dürfte…): + mastar en sonda. Türkçe: <i>yapabilir miydiniz, yapmalıydı</i>.`,
   "Konjunktiv II":`<b>Konjunktiv II</b> (hätte, wäre, könnte…): dilek, kibarlık, gerçek dışı durum. Türkçe: <i>olsaydı, olurdu</i>.`,
   Präteritum:`<b>Präteritum (yazı dilinde geçmiş)</b>: fiilin geçmiş biçimi 2. sırada. sein/haben/modal fiillerde konuşmada da kullanılır (war, hatte, konnte). Türkçe: <i>-dı</i>.`,
   Imperativ:`<b>Emir kipi</b>: fiil başa gelir, du için özne düşer (Komm!), Sie için özne kalır (Kommen Sie!).`,
   Präsens:`<b>Präsens (şimdiki/geniş zaman)</b>: fiil kişiye göre ek alır. Türkçedeki <i>-iyor</i> ve <i>-ir</i> ikisini de karşılar; yakın geleceği de anlatır (Morgen fahre ich…).`}[c.tense]||"";}
function xVerbNote(t,c){const v=t.verb,inf=v.inf,cj=conjDe(inf),forms=v.forms.map(f=>f.t),notes=[];
  const trv=(findLex(inf)||{e:{tr:""}}).e.tr||({sein:"olmak",haben:"sahip olmak",werden:"olmak, -ecek",können:"-ebilmek",müssen:"-malı",wollen:"istemek",sollen:"-malı",dürfen:"izinli olmak",möchten:"istemek",mögen:"sevmek",wissen:"bilmek",tun:"yapmak"}[inf]||"");
  if(t.r==="V"){const p=t.person;const pt=forms.includes("prat")&&!forms.includes("pres");const k2=forms.includes("k2");
    notes.push(`sözlük biçimi: <b>${esc(inf)}</b>${trv?" ("+esc(trv)+")":""}`);
    if(p!==null&&p!==undefined&&cj){const tense=k2?"Konjunktiv II":pt?"Präteritum":"Präsens";const tbl=k2?null:pt?cj.prat:cj.pres6;
      notes.push(`${PERS[p]} için ${tense} hâli${tbl?": "+esc(inf)+" → <b>"+esc((tbl[p]||"").split(" ")[0])+"</b>":""}`);
      if(!pt&&!k2&&!MOD_PRES[cj.base]){const st=vstem(cj.base),f=(cj.pres[p]||"");if(f.startsWith(st))notes.push(`kök <b>${esc(st)}</b> + ek <b>-${esc(f.slice(st.length)||"∅")}</b> (${["ich -e","du -st","er/sie/es -t","wir -en","ihr -t","sie/Sie -en"][p]})`);else notes.push(`düzensiz fiil: kök değişir (${esc(st)} → ${esc(f)})`);}
      else if(MOD_PRES[cj.base]&&!pt)notes.push("düzensiz fiil: bu çekimi ezberle (tablo aşağıda)");}
    if(c.sep&&cj&&cj.sep)notes.push(`ayrılabilen fiil: ön ek <b>${esc(cj.sep)}</b> kopup cümlenin sonuna gider`);}
  else{if(forms.includes("pp")||forms.includes("pp-sep"))notes.push(`<b>Partizip II</b> (${esc(inf)}${trv?": "+esc(trv):""})${cj&&cj.strong?" — düzensiz, ezberlenir":cj&&/ieren$/.test(inf)?" — -ieren fiilleri ge- almaz":cj&&cj.sep?" — ön ek + ge + kök + t/en":" — ge + kök + t"}`);
    else if(forms.includes("inf")||forms.includes("inf-sep"))notes.push(`<b>mastar</b> (${esc(trv||inf)}): modal/werden/zu ile en sona gider`);
    else if(forms.includes("zuinf"))notes.push(`<b>zu + mastar</b> (${esc(inf)})`);
    else notes.push(`fiil: ${esc(inf)}${trv?" ("+esc(trv)+")":""}`);}
  return notes;}
function xWordNotes(t,c,an){const out=[];
  if(t.r==="V"||t.r==="V2"&&t.verb)return xVerbNote(t,c);
  if(t.sepPart){const cj=c.fin&&conjDe(c.fin.verb.inf);return[`ayrılabilen fiilin ön eki${cj&&cj.sep?`: <b>${esc(cj.sep)}</b> + ${esc(cj.base)} = <b>${esc(cj.inf)}</b>`:""}`,"ana cümlede çekimli fiilden kopup en sona gider"];}
  if(t.zu)return["mastardan önce gelen <b>zu</b> (Türkçe -mek)"];
  if(t.contr){const np=t.np;return[`<b>${t.prep} + ${t.contr}</b> = ${esc(t.w)}`,`${t.prep}: ${esc(XPREP[t.prep][1])}`,XPREP[t.prep][0]==="W"?(t.contr==="dem"?"<b>Wo?</b> (nerede?) → Dativ":"<b>Wohin?</b> (nereye?) → Akkusativ"):`${t.prep} → hep ${CASE_TR[XPREP[t.prep][0]]}`];}
  if(t.prep){const P=XPREP[t.prep];if(P[0]==="W"){const cs=t.np&&t.np.c;return[`anlamı: ${esc(P[1])}`,`iki yönlü edat: <b>Wo?</b> (nerede, durum) → Dativ, <b>Wohin?</b> (nereye, hareket) → Akkusativ`,cs?`burada: <b>${CASE_S[cs]}</b> ${cs==="D"?"(durum: nerede?)":"(hareket: nereye?)"}`:""].filter(Boolean);}
    return[`anlamı: ${esc(P[1])}`,`<b>${esc(t.w)}</b> kendinden sonraki ismi hep <b>${CASE_TR[P[0]]}</b> yapar`];}
  if(t.subord)return[`yan cümle bağlacı: ${esc(XSUB[t.lw])}`,"yan cümlede çekimli fiil <b>en sona</b> gider (Türkçe gibi!)"];
  if(t.rel)return["ilgi zamiri (Türkçe <i>-en, -dığı</i>)","cinsiyeti önceki isimden, hâli yan cümledeki görevinden gelir; fiil en sonda"];
  if(t.coord)return[`bağlaç: ${esc(XCOORD[t.lw])}`,"sırayı değiştirmez: arkasından normal cümle gelir (0. pozisyon)"];
  if(t.pron){const p=t.pron;const cs=t.r==="S"?"N":t.r==="O"?"A":t.r==="D"?"D":p[1][0];return[`kişi zamiri: ${esc(t.tr)}`,`${CASE_TR[cs]||""}`,t.lw==="sich"?"dönüşlü zamir: özne ile aynı kişiyi gösterir":""].filter(Boolean);}
  if(t.det){const np=t.np||{};const g=np.g,cs=np.c;const base=t.det.k==="def"?{m:"der",f:"die",n:"das",pl:"die"}[g]:t.det.stem?(t.det.stem+(g==="f"||g==="pl"?"e":"")):"";
    const a=[`${esc(t.det.tr)}`];if(g&&cs)a.push(`isim ${G_TR[g]||""} · ${CASE_TR[cs]||""}`);
    if(base&&cs&&cs!=="N"&&lk(base)!==t.lw)a.push(`<b>${esc(base)} → ${esc(t.w)}</b>: ${cs==="A"?"nesne olunca (Akkusativ) sadece eril değişir: der→den, ein→einen":cs==="D"?"Dativ'de: der/das→dem, die→der, çoğul→den (+isme -n)":"Genitiv: des/der"}`);
    else if(cs==="N"&&g)a.push("yalın hâl: sözlükteki artikel değişmez");
    return a;}
  if(t.noun||t.r==="S"||t.r==="O"||t.r==="D"||t.r==="T"&&t.np){const n=t.noun||{};const a=[];if(n.tr)a.push(`anlamı: ${esc(n.tr)}`);if(n.lemma)a.push(`sözlük: <b>${esc(n.lemma)}</b>${n.pl?" (burada çoğul)":""}`);else if(xUpper(t.w))a.push("büyük harf: Almancada bütün isimler büyük harfle yazılır");
    if(t.np&&t.np.timeAkk)a.push("zaman ifadesi: artikelli olunca <b>Akkusativ</b> (jeden Tag, nächste Woche)");else if(t.np&&t.np.pred)a.push("<b>sein/werden/heißen</b> sonrası: yalın hâl (Nominativ) kalır, nesne değildir");else if(t.np&&t.np.c&&!t.np.det)a.push(CASE_TR[t.np.c]);if(t.np&&t.np.c==="D"&&t.np.g==="pl"&&/n$/.test(t.w))a.push("çoğul Dativ: isme <b>-n</b> eklenir");return a;}
  if(t.r==="A"&&t.inNP){const a=[];if(t.tr)a.push(`anlamı: ${esc(t.tr)}`);const m=t.lw.match(/(e|en|er|es|em)$/);if(m)a.push(`isimden önce sıfat <b>-${m[1]}</b> eki alır (artikel ve hâle göre)`);return a;}
  if(t.r==="T")return[t.tr?`anlamı: ${esc(t.tr)}`:"","zaman bildirir: Almancada <b>Zaman – Neden – Nasıl – Yer</b> sırası (TeKaMoLo)"].filter(Boolean);
  if(t.r==="N")return[`anlamı: ${esc(t.tr)}`,t.lw==="nicht"?"fiili/sıfatı/belirli şeyi olumsuz yapar; çoğunlukla sona ya da olumsuzladığı kelimenin önüne gelir. İsim artikelsizse <b>kein</b> kullanılır":""].filter(Boolean);
  if(t.r==="Q")return[`soru kelimesi: ${esc(t.tr)}`,"W-sorusu: <b>soru kelimesi + fiil + özne</b>"];
  if(t.tr)out.push(`anlamı: ${esc(t.tr)}`);if(t.lem)out.push(`sözlük: ${esc(t.lem)}`);return out;}
function xRoleOf(t){if(t.r==="DET"||t.r==="NP")return"X";if(t.r==="S?")return"S";if(t.r==="VERB")return"V";if(t.r==="A"&&!t.inNP)return t.adv?"P":"M";return t.r;}
function xRules(an){const R=[],m=an.main,c0=an.clauses;
  if(an.ty==="A"&&m.fin){const pre=m.toks.filter(t=>t.i<m.fin.i);const subjFirst=m.subj&&(m.subj.i===0||m.subj.parts&&m.subj.parts[0].i===0||m.subj.np&&m.subj.np.parts[0].i===0);
    R.push(`<b>Fiil 2. sırada</b> (V2 kuralı): ana cümlede çekimli fiil (<b>${esc(m.fin.w)}</b>) her zaman ikinci "yeri" tutar.`);
    if(pre.length&&!subjFirst&&m.subj&&!m.toks[0].coord)R.push(`Başa <b>${esc(pre.map(t=>t.w).join(" "))}</b> geldiği için özne (<b>${esc(m.subj.w||(m.subj.parts||[]).map(x=>x.w).join(" "))}</b>) fiilin <b>arkasına</b> geçti (devrik cümle). Türkçede böyle bir kural yok, bu yüzden dikkat!`);}
  if(an.ty==="W")R.push(`<b>W-sorusu</b>: soru kelimesi başta, fiil 2. sırada, özne fiilden sonra.`);
  if(an.ty==="JN")R.push(`<b>Evet/hayır sorusu</b>: çekimli fiil <b>en başa</b> geçer, özne arkasından gelir. Türkçedeki <i>mı/mi</i> ekinin işini fiilin yeri yapar.`);
  if(an.ty==="IMP")R.push(`<b>Emir/rica</b>: fiil başta. ${an.T.some(t=>t.lw==="sie"||t.w==="Sie")?"Sie ile resmi rica.":"du'ya emir: özne düşer, fiil eksiz kökle kalır."}`);
  c0.forEach(c=>{const ti=xTenseInfo(c);if(ti&&!R.includes(ti))R.push(ti);});
  c0.filter(c=>c.sub).forEach(c=>{if(c.sub==="um"||c.sub==="zu")R.push(`<b>um … zu + mastar</b>: "-mek için". Özne yok, mastar en sonda.`);
    else if(c.sub.startsWith("rel"))R.push(`<b>İlgi cümlesi</b> (der/die/das …): Türkçedeki <i>-en / -dığı</i> yapısı. Fiil yan cümlenin <b>sonuna</b> gider.`);
    else R.push(`<b>Yan cümle</b> (<b>${esc(c.sub)}</b> = ${esc(XSUB[c.sub]||"")}): çekimli fiil (${esc(c.fin?c.fin.w:"")}) <b>en sona</b> gider. Yan cümle başta gelirse ana cümle <b>fiille</b> başlar (… , dann/fiil + özne).`);});
  if(m.sep)R.push(`<b>Ayrılabilen fiil</b>: ${esc(conjDe(m.fin.verb.inf).inf)} → çekimli kısım 2. sırada, ön ek (<b>${esc(m.sepT.w)}</b>) en sonda. Yan cümlede ve mastarda bitişik yazılır.`);
  const nps=new Set();an.T.forEach(t=>{if(t.np)nps.add(t.np);});
  [...nps].forEach(np=>{if(np.prep&&XPREP[np.prep.prep]&&XPREP[np.prep.prep][0]==="W")R.push(`<b>${esc(np.prep.w)}</b> iki yönlü edat: burada <b>${np.c==="D"?"Dativ (nerede? – durum)":"Akkusativ (nereye? – hareket)"}</b>.`);});
  if(an.T.some(t=>t.r==="N"&&t.lw==="nicht"))R.push(`<b>nicht</b> nereye? Fiili olumsuzlarken sona yakın (ama 2. parça fiilden önce); belirli bir kelimeyi olumsuzlarken onun hemen önüne. Artikelsiz/ein'li isimler için <b>kein</b>.`);
  if(an.T.some(t=>t.det&&t.det.k==="neg"))R.push(`<b>kein</b> = "ein/artikelsiz ismin olumsuzu" (hiç … yok). ein gibi çekilir: kein, keine, keinen, keinem.`);
  const tk=an.T.filter(t=>t.r==="T").length,pl=an.T.filter(t=>t.r==="P").length;if(tk&&pl)R.push(`Zaman, yerden <b>önce</b> gelir: <b>Te-Ka-Mo-Lo</b> (temporal, kausal, modal, lokal).`);
  return R;}
function xFormula(an){const out=[];const m=an.main;
  const slot=t=>{const r=xRoleOf(t);return YROLE[r]?YROLE[r][0]:"";};
  const seen=new Set();an.T.forEach(t=>{const key=t.np?"np"+an.T.indexOf(t.np.parts[0]):"t"+t.i;if(seen.has(key))return;seen.add(key);let lab=slot(t);if(t.r==="V"&&t.cl===an.clauses.indexOf(m))lab="Fiil (2. yer)";if(t.r==="V"&&an.clauses[t.cl].sub)lab="Fiil (yan cümle sonu)";if(t.r==="V2")lab="Fiil sonu";if(t.r==="C")lab="Bağlaç";out.push(lab);});
  const comp=[];out.forEach(x=>{if(comp[comp.length-1]!==x)comp.push(x);});return comp.join(" + ");}
function xKey(an){const m=an.main,ks=[];
  an.clauses.forEach(c=>{if(c.sub&&!c.sub.startsWith("rel"))ks.push("sub:"+c.sub);else if(c.sub)ks.push("rel");});
  if(m.tense&&m.tense!=="Präsens")ks.push("t:"+m.tense);if(m.sep)ks.push("sep");if(an.ty!=="A")ks.push("ty:"+an.ty);
  an.T.forEach(t=>{if(t.prep&&XPREP[t.prep]&&XPREP[t.prep][0]==="W"&&t.np)ks.push("w:"+t.np.c);else if(t.prep)ks.push("p:"+XPREP[t.prep][0]);if(t.det&&t.det.k==="neg")ks.push("kein");if(t.lw==="nicht")ks.push("nicht");if(t.np&&t.np.c==="A"&&t.det&&/^(den|einen|keinen|meinen|deinen|seinen|ihren|unseren)$/.test(t.lw))ks.push("akk-m");if(t.np&&t.np.c==="D"&&!t.np.prep&&!t.np.contr&&t.r==="D")ks.push("dat-obj");if(t.lw==="sich"||XREFL[m.person]===t.lw&&t.r==="O"&&m.subj&&m.subj.pron)ks.push("refl");});
  if(m.fin&&an.ty==="A"&&m.subj&&m.toks[0]&&m.toks[0].r!=="C"){const si=m.subj.parts?m.subj.parts[0].i:m.subj.i;if(si>m.fin.i)ks.push("inv");}
  return[...new Set(ks)];}
/* ---- aynı kalıp, başka biçimler (üretici) ---- */
function xJoin(arr){let o="";arr.forEach((w,i)=>{if(!w)return;o+=(o&&!/^[,.!?;:]/.test(w)?" ":"")+w;});return o;}
function xCap(s){return s?s[0].toUpperCase()+s.slice(1):s;}
function xVariants(an){const out=[];const m=an.main;if(!m||!m.fin||an.clauses.length>1)return out;
  const fin=m.fin,cj=conjDe(fin.verb.inf);if(!cj)return out;const sj=m.subj;if(!(sj&&sj.pron&&sj.pron[0]>=0||sj&&sj.pron&&sj.pron[0]===-2))return out;
  const p0=fin.person;if(p0===null||p0===undefined)return out;
  if(sj.lw==="es"||fin.verb.guess)return out;if(sj.w==="Sie"&&fin.i<sj.i&&!an.q)return out;
  if(an.T.some(t=>t.coord&&an.T.some(u=>u.i>t.i&&(u.r==="V"||u.r==="VERB"))))return out;const ff=fin.verb.forms.map(f=>f.t);const pt=ff.includes("prat")&&!ff.includes("pres");if(ff.includes("k2")&&!pt)return out;
  const words=an.T.map(t=>t.w),punct=an.T.map(t=>t.punct||"");const endP=(punct[punct.length-1]||".").replace(/[,;]/g,"")||".";
  const build=(ws,ps,end)=>{let s=xJoin(ws.map((w,i)=>w+(i<ws.length-1?(ps[i]||"").replace(/[.!?]/g,""):"")));return xCap(s)+end;};
  const SUBJ=["ich","du","er","wir","ihr","sie"],SUBJTR=["ben","sen","o","biz","siz","onlar"];
  const finTab=pt?cj.prat:(MOD_PRES[cj.base]||cj.pres);
  // 1) kişi değiştir
  const targets=[0,1,2,3,4,5].filter(p=>p!==p0);const pick=[2,0,3,1,5,4].filter(p=>targets.includes(p)).slice(0,3);
  const usedP=new Set(an.T.filter(t=>t.pron&&t!==sj&&t.pron[0]>=0&&!(t.lw===XREFL[p0]||t.lw===XREFLD[p0])).map(t=>t.pron[0]));
  const pick2=[2,0,3,1,5,4].filter(p=>targets.includes(p)&&!usedP.has(p)).slice(0,3);
  pick2.forEach(p=>{const ws=words.slice();ws[sj.i]=sj.i===0?xCap(SUBJ[p]):SUBJ[p];
    let f=(finTab[p]||"").split(" ")[0];if(!f)return;ws[fin.i]=fin.i===0?xCap(f):f;
    an.T.forEach(t=>{if(t.i!==sj.i&&(t.lw===XREFL[p0]||t.lw===XREFLD[p0])&&(t.r==="O"||t.r==="D")&&t.pron){ws[t.i]=t.lw===XREFLD[p0]&&XREFLD[p0]!==XREFL[p0]?XREFLD[p]:XREFL[p];}});
    out.push({s:build(ws,punct,endP),lab:`özne <b>${SUBJ[p]}</b> (${SUBJTR[p]}) → fiil <b>${esc(f)}</b>`,k:"p"});});
  if(an.ty!=="A"||pt)return out;
  const simple=m.tense==="Präsens";
  const sjFirst=sj.i===0&&fin.i===1;
  // 2) soru
  if(sjFirst&&!(p0===0&&usedP.has(1))){const p=p0===0?1:p0;const ws=words.slice();const f=(MOD_PRES[cj.base]||cj.pres)[p]||"";const sjw=p0===0?"du":sj.lw==="Sie"?"Sie":sj.lw;
    let rest=ws.slice(2);if(p0===0)rest=rest.map((w,k)=>{const t=an.T[k+2];if(t&&t.pron&&(t.lw==="mich"||t.lw==="mir"))return t.lw==="mich"?"dich":"dir";if(t&&t.det&&/^mein/.test(t.lw))return t.w.replace(/^mein/,"dein");return w;});
    const nw=[xCap(f.split(" ")[0]),sjw,...rest];out.push({s:build(nw,["",""].concat(punct.slice(2)),"?"),lab:`<b>evet/hayır sorusu</b>: fiil başa → <i>…mı?</i>`,k:"q"});}
  // 3) Perfekt
  if(simple&&sjFirst&&!["sein","haben"].includes(cj.base)&&!MODALS.has(cj.base)&&cj.pp){const aux=(cj.aux==="sein"?MOD_PRES.sein:MOD_PRES.haben)[p0];
    let mid=words.slice(2);if(m.sep)mid=mid.slice(0,-1);const ws=[words[0],aux,...mid,cj.pp];const ps=[punct[0],""].concat(punct.slice(2,2+mid.length)).concat([""]);
    out.push({s:build(ws,ps,endP),lab:`<b>Perfekt (geçmiş)</b>: ${cj.aux} → <b>${esc(aux)}</b> + <b>${esc(cj.pp)}</b> sonda → <i>-dı</i>`,k:"perf"});}
  // 4) modal
  if(simple&&sjFirst&&!MODALS.has(cj.base)&&cj.base!=="werden"){const md=["müssen","können","möchten"][(an.s.length)%3];const mf=MOD_PRES[md][p0];let mid=words.slice(2);if(m.sep)mid=mid.slice(0,-1);
    if(!(cj.base==="sein"||cj.base==="haben")||true){const ws=[words[0],mf,...mid,cj.inf];out.push({s:build(ws,[punct[0],""].concat(punct.slice(2,2+mid.length)).concat([""]),endP),lab:`<b>${md}</b> (${esc(MOD_TR[md])}) 2. yerde, <b>${esc(cj.inf)}</b> mastar olarak sonda`,k:"mod"});}}
  // 5) olumsuz
  if(simple&&!an.T.some(t=>t.r==="N"||t.det&&t.det.k==="neg")){const ws=words.slice();let done=false;
    for(const t of an.T){if(t.det&&t.det.k==="indef"&&t.np&&t.np.c!=="N"){ws[t.i]="k"+t.lw;done=true;break;}}
    if(!done){const bare=an.T.find(t=>t.np&&t.np.noun===t&&!t.np.det&&!t.np.prep&&!t.np.contr&&t.r==="O"&&t.noun&&t.noun.g);
      if(bare){const g=bare.noun.pl?"pl":bare.noun.g;ws.splice(bare.i,0,{m:"keinen",f:"keine",n:"kein",pl:"keine"}[g]);punct.splice(bare.i,0,"");done=true;}}
    let lab="<b>kein</b>: ein → kein (hiç … yok)";
    if(!done){let pos=an.T.length;if(m.sep)pos=m.sepT.i;const pp=an.T.find(t=>t.i>fin.i&&(t.prep||t.contr||t.r==="A"&&!t.inNP||t.r==="P"&&t.adv));if(pp&&pp.i<pos)pos=pp.i;
      ws.splice(pos,0,"nicht");punct.splice(pos,0,"");lab="<b>nicht</b>: fiili olumsuz yapar (edat öbeğinin/sıfatın önüne, yoksa sona)";}
    if(ws.length>2)out.push({s:build(ws,punct,endP),lab,k:"neg"});}
  return out;}
/* ---- kurstan aynı kalıpta örnekler ---- */
let XCACHE=null;
function xCorpus(){if(XCACHE)return XCACHE;XCACHE=[];const seen=new Set();
  (typeof ALLS!=="undefined"?ALLS:[]).forEach(o=>{const k=lk(o.de);if(seen.has(k)||!o.tr)return;seen.add(k);XCACHE.push({s:o.de,tr:o.tr,lv:o.u&&o.u.lv,key:null});});return XCACHE;}
function xSiblings(an,n){if(LANG.code!=="de")return xSiblingsGen(an,n);const keys=xKey(an);const pri=keys.filter(k=>!/^p:|^akk/.test(k)),sec=keys.filter(k=>/^p:|^akk/.test(k));const want=pri.length?pri:sec;if(!want.length)return{want:[],list:[]};
  const C=xCorpus(),me=lk(an.s),lvs=["A1","A2","B1","B2","C1"],ul=lvs.indexOf(S.lv||"A1");const hits=[];
  for(const o of C){if(lk(o.s)===me)continue;if(!o.key){try{const a=xrayDe(o.s);o.key=a?xKey(a):[];}catch(e){o.key=[];}}
    const sc=want.filter(k=>o.key.includes(k)).length+(pri.length?sec.filter(k=>o.key.includes(k)).length*.3:0)-o.key.filter(k=>!keys.includes(k)&&!/^p:|^akk/.test(k)).length*.4;if(!want.some(k=>o.key.includes(k)))continue;const lvp=Math.abs(lvs.indexOf(o.lv)-ul);hits.push({o,sc:sc*10-lvp*2-Math.abs(o.s.length-an.s.length)/20});
    if(hits.length>400)break;}
  hits.sort((a,b)=>b.sc-a.sc);return{want,list:hits.slice(0,n||6).map(h=>h.o)};}
function xSiblingsGen(an,n){const ws=toks(an.s).filter(isW).map(w=>w.toLowerCase());const fw=ws.filter(w=>FUNC[w]&&w.length>1);if(!fw.length)return{want:[],list:[]};
  const C=xCorpus(),me=lk(an.s),hits=[];for(const o of C){if(lk(o.s)===me)continue;const ow=toks(o.s).filter(isW).map(w=>w.toLowerCase());const sc=fw.filter(w=>ow.includes(w)).length;if(sc)hits.push({o,sc:sc*10-Math.abs(o.s.length-an.s.length)/20});}
  hits.sort((a,b)=>b.sc-a.sc);return{want:fw.slice(0,3),list:hits.slice(0,n||6).map(h=>h.o)};}
const XKEY_TR=k=>({"t:Perfekt":"Perfekt (geçmiş)","t:Modal":"modal fiil + mastar","t:Futur":"Futur","t:Präteritum":"Präteritum","t:Passiv":"edilgen","t:würde":"würde + mastar","t:Konjunktiv II":"Konjunktiv II",sep:"ayrılabilen fiil",rel:"ilgi cümlesi","ty:W":"W-sorusu","ty:JN":"evet/hayır sorusu","ty:IMP":"emir/rica",kein:"kein",nicht:"nicht","w:D":"iki yönlü edat + Dativ","w:A":"iki yönlü edat + Akkusativ","p:D":"Dativ edatı","p:A":"Akkusativ edatı","dat-obj":"Dativ nesne",refl:"dönüşlü fiil","akk-m":"eril Akkusativ (den/einen)",inv:"devrik sıra"}[k]||(k.startsWith("sub:")?k.slice(4)+" yan cümlesi":k.startsWith("t:")?k.slice(2):k));
/* ---- diğer diller için hafif çözümleme ---- */
function xrayGen(s){const raw=toks(s),T=[];let wi=0;raw.forEach(t=>{if(isW(t))T.push({w:t,i:wi++,lw:t.toLowerCase(),info:[]});});
  T.forEach(t=>{const lw=t.lw;if(FUNC[lw]){t.tr=FUNC[lw];t.r="C";t.fn=1;}else{const r=findLex(t.w);t.tr=r?r.e.tr:"";if(r&&lk(r.e.fr)!==lw)t.lem=r.e.fr;
      t.r=r&&/(mek|mak)\b/.test(r.e.tr)?"V":r&&LANG.nounRe&&LANG.nounRe.test(r.e.fr)?"O":"X";}});
  return{s,T,clauses:[],main:{},gen:1,ty:/\?\s*$/.test(s)?"Q":"A"};}
function xAnalyze(s){try{return LANG.code==="de"?xrayDe(s):xrayGen(s);}catch(e){console.error(e);return xrayGen(s);}}
/* ---- çekim tablosu ---- */
function xConjTable(inf){const c=conjDe(inf);if(!c)return"";const tr=(findLex(c.inf)||{e:{tr:""}}).e.tr;
  const row=(p,i)=>`<tr><td>${PERS[i]}</td><td><b>${esc(c.pres6[i])}</b></td><td>${esc(c.perf[i]||"")}</td><td>${esc(c.prat?c.prat[i]:"")}</td></tr>`;
  return `<div class="sec-h" style="margin-left:2px">Fiil kartı: ${esc(c.inf)}${tr?" · "+esc(tr):""}</div><div class="card" style="padding:10px 12px"><div class="tw"><table class="xct"><tr><th></th><th>Präsens</th><th>Perfekt</th><th>Präteritum</th></tr>${PERS.map(row).join("")}</table></div>
   <div class="sub" style="font-size:13px;margin-top:6px">${c.strong?"Düzensiz (güçlü) fiil: kök değişir, Partizip <b>"+esc(c.pp)+"</b> ezberlenir.":"Düzenli fiil: kök + ek. Partizip: <b>"+esc(c.pp)+"</b>."} Perfekt yardımcısı: <b>${c.aux}</b>.${c.imp?" Emir (du): <b>"+esc(xCap(c.imp))+"!</b>":""}${c.sep?" Ayrılabilen: ön ek <b>"+esc(c.sep)+"</b> ana cümlede sona gider.":""}</div></div>`;}
/* ---- ekran ---- */
function xRender(s,tr,an,siblings){const parts=an.T;
  const card=t=>{const c=an.clauses[t.cl]||{};const R=xRoleOf(t),Y=YROLE[R]||YROLE.X;const notes=an.gen?[t.tr?`anlamı: ${esc(t.tr)}`:"",t.lem?`sözlük: ${esc(t.lem)}`:""].filter(Boolean):xWordNotes(t,c,an);
    const lab=an.gen?(t.fn?"işlev kelimesi":R==="V"?"fiil":R==="O"?"isim":""):(t.r==="DET"?"artikel":Y[0]);
    return `<div class="xw" style="--yc:${Y[1]}"><div class="xwh"><b>${esc(t.w)}</b><span class="yrl">${esc(lab||"")}</span><button class="sbtn sm" data-say="${esc(t.w)}" aria-label="Dinle">${I.spk}</button></div>${notes.length?`<ul>${notes.map(n=>`<li>${n}</li>`).join("")}</ul>`:""}</div>`;};
  const groups=[];if(!an.gen){const seen=new Set();parts.forEach(t=>{const np=t.np&&t.np.parts?t.np:null;const k=np?np:t;if(seen.has(k))return;seen.add(k);
    if(np&&(t.prep||t.contr)&&!np.parts.includes(t)){groups.push([t,...np.parts]);return;}groups.push(np?np.parts:[t]);});}
  const chips=an.gen?"":`<div class="yparts">${groups.map((g,i)=>{const t=g[g.length-1].r==="P"&&g[0].prep?g[0]:g[0];const R=xRoleOf(g.find(x=>x.r!=="DET"&&x.r!=="A")||t)||"X";const Y=YROLE[R]||YROLE.X;
      return `<div class="ypart" style="--yc:${Y[1]}"><div class="ypn">${i+1}</div><b>${esc(g.map(x=>x.w).join(" "))}</b><span class="yrl">${esc(Y[0])}</span><small>${esc(g.map(x=>x.tr).filter(Boolean).slice(0,2).join(" · "))}</small></div>`;}).join("")}</div>`;
  const rules=an.gen?((yOffline(s)||{}).why||[]):xRules(an);
  const formula=an.gen?"":xFormula(an);
  const vs=an.gen?[]:xVariants(an);
  const mv=!an.gen&&an.main&&an.main.fin?an.main.fin.verb.inf:null;
  const sb=siblings||{list:[]};
  return `<div class="h2" style="font-size:22px;margin-bottom:4px">🧩 Cümle röntgeni</div>
  <div class="ybig">${tapS(s)} <button class="sbtn sm" data-say="${esc(s)}" aria-label="Dinle">${I.spk}</button></div>${tr?`<div class="sub">${esc(tr)}</div>`:""}
  ${chips}
  ${formula?`<div class="yform">${esc(formula)}</div>`:""}
  ${!an.gen?`<div class="sub" style="font-size:13px;margin:8px 2px 0">Türkçede sıra: <b>Özne + Zaman + Yer + Nesne + Fiil</b> (fiil hep sonda). Almancada ana cümlede fiil <b>2. yerde</b>, yan cümlede <b>sonda</b>.</div>`:""}
  ${rules.length?`<div class="sec-h" style="margin-left:2px">Neden böyle kuruldu?</div><div class="gram"><ul class="ywhy">${rules.map(w=>`<li>${w}</li>`).join("")}</ul></div>`:""}
  <div class="sec-h" style="margin-left:2px">Kelime kelime</div><div class="xws">${parts.map(card).join("")}</div>
  ${mv?xConjTable(mv):""}
  ${vs.length?`<div class="sec-h" style="margin-left:2px">Aynı cümle, başka biçimlerde</div><div class="card stack">${vs.map((v,i)=>`${i?'<div class="hr"></div>':""}<div class="wordline ex"><div style="flex:1;min-width:0"><div class="fr">${tapS(v.s)}</div><div class="tr">${v.lab}</div></div><button class="sbtn sm" data-say="${esc(v.s)}">${I.spk}</button></div>`).join("")}</div>
    <button class="btn" id="xdrill" style="margin-top:10px">✍️ Kendin dönüştür (${vs.length} alıştırma)</button>`:""}
  ${sb.list.length?`<div class="sec-h" style="margin-left:2px">Kurstan aynı kalıpta ${sb.list.length} örnek${sb.want&&sb.want.length&&!an.gen?" · "+esc(sb.want.slice(0,2).map(XKEY_TR).join(", ")):""}</div><div class="card stack">${sb.list.map((o,i)=>`${i?'<div class="hr"></div>':""}<div class="wordline ex"><div style="flex:1;min-width:0"><div class="fr">${tapS(o.s)}</div><div class="tr">${esc(o.tr)}</div><button class="ybtn" data-yapi="${esc(o.s)}" data-ytr="${esc(o.tr)}">🧩 Röntgen</button></div><button class="sbtn sm" data-say="${esc(o.s)}">${I.spk}</button></div>`).join("")}</div>`:""}
  <div id="xai"></div>
  ${ART_RULES[LANG.code]?`<button class="btn sec" id="yart" style="margin-top:14px">${LANG.code==="de"?"der/die/das":"Cinsiyet"} kurallarını gör</button>`:""}`;}
function xDrill(src,vs){let i=0,ok=0;const next=()=>{const box=$("#ybox");if(!box)return;if(i>=vs.length){box.innerHTML=`<div class="h2" style="font-size:22px">✍️ Bitti: ${ok}/${vs.length}</div><div class="sub">Her biçimi kendin kurdun. Ezber değil, kural.</div><button class="btn" id="xagain" style="margin-top:12px">Röntgene dön</button>`;$("#xagain").onclick=()=>structSheet(src.s,src.tr,1);return;}
    const v=vs[i];const ask=v.k==="p"?`Özneyi değiştir: ${v.lab.replace(/ → .*$/,"")}`:v.k==="q"?"Soru cümlesine çevir":v.k==="perf"?"Perfekt'e (geçmişe) çevir":v.k==="mod"?`Modal fiil ekle: ${(v.lab.match(/<b>(\w+)<\/b>/)||[])[1]||""}`:"Olumsuz yap";
    box.innerHTML=`<div class="h2" style="font-size:20px">✍️ ${i+1}/${vs.length} · ${ask.replace(/<[^>]+>/g,"")}</div><div class="ybig">${tapS(src.s)}</div><textarea id="xin" class="inp" rows="2" style="font:inherit;font-size:18px;width:100%;margin-top:8px" placeholder="Cümleyi yaz…" autocapitalize="sentences" autocorrect="off" spellcheck="false" style="width:100%;margin-top:8px"></textarea><div id="xres"></div><button class="btn" id="xok" style="margin-top:10px">Kontrol et</button>`;
    bindTap(box);const inp=$("#xin");inp.focus();
    $("#xok").onclick=()=>{if($("#xok").dataset.done){i++;next();return;}const val=inp.value.trim();const good=norm(val)===norm(v.s)||nearEq(val,v.s);if(good)ok++;sfx(good?"ok":"bad");
      $("#xres").innerHTML=`<div class="gram" style="margin-top:10px;border-left:4px solid ${good?"var(--green)":"var(--red)"}"><b>${good?"Doğru!":"Doğrusu:"}</b> ${tapS(v.s)}<div class="sub" style="font-size:13px;margin-top:4px">${v.lab}</div>${good?"":whyWrong(val,v.s)}</div>`;bindTap($("#xres"));
      $("#xok").textContent=i===vs.length-1?"Bitir":"Sonraki";$("#xok").dataset.done=1;};
    inp.onkeydown=e=>{if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();$("#xok").click();}};};next();}
/* ---- Neden yanlış? ---- */
function whyWrong(user,correct){user=String(user||"").trim();if(!user)return"";const U=toks(user).filter(isW),C=toks(correct).filter(isW);if(!C.length)return"";
  const n=U.length,m=C.length,d=[...Array(n+1)].map(()=>Array(m+1).fill(0));for(let i=0;i<=n;i++)d[i][0]=i;for(let j=0;j<=m;j++)d[0][j]=j;
  const same=(a,b)=>a.toLowerCase()===b.toLowerCase();
  for(let i=1;i<=n;i++)for(let j=1;j<=m;j++)d[i][j]=Math.min(d[i-1][j]+1,d[i][j-1]+1,d[i-1][j-1]+(same(U[i-1],C[j-1])?0:1));
  const ops=[];let i=n,j=m;while(i>0||j>0){if(i>0&&j>0&&d[i][j]===d[i-1][j-1]+(same(U[i-1],C[j-1])?0:1)){if(!same(U[i-1],C[j-1]))ops.unshift({u:U[i-1],c:C[j-1],j:j-1});i--;j--;}
    else if(j>0&&d[i][j]===d[i][j-1]+1){ops.unshift({u:null,c:C[j-1],j:j-1});j--;}else{ops.unshift({u:U[i-1],c:null});i--;}}
  if(!ops.length){const ur=U.map(x=>x.toLowerCase()).join(" "),cr=C.map(x=>x.toLowerCase()).join(" ");if(ur===cr)return"";}
  let an=null;try{an=xAnalyze(correct);}catch(e){}
  const tokAt=j=>an&&an.T?an.T[j]:null;
  const li=[];
  // sıra hatası: aynı kelimeler, farklı sıra
  const su=[...U].map(x=>x.toLowerCase()).sort().join(" "),sc=[...C].map(x=>x.toLowerCase()).sort().join(" ");
  if(su===sc&&U.length===C.length){let hint="Kelimeler doğru, <b>sıra</b> yanlış.";if(an&&an.main&&an.main.fin)hint+=an.clauses.some(c=>c.sub)?" Yan cümlede çekimli fiil <b>en sonda</b> olmalı.":an.ty==="JN"?" Evet/hayır sorusunda fiil <b>en başta</b>.":an.ty==="A"?` Ana cümlede çekimli fiil (<b>${esc(an.main.fin.w)}</b>) <b>2. yerde</b> olmalı.`:"";return `<div class="xwhy"><b>Neden yanlış?</b><ul><li>${hint}</li></ul></div>`;}
  ops.slice(0,4).forEach(o=>{const t=o.c!==null&&o.j!==undefined?tokAt(o.j):null;let why="";
    if(t&&LANG.code==="de"){const c=an.clauses[t.cl]||{};const ns=xWordNotes(t,c,an).filter(x=>!/^anlamı/.test(x));why=ns.slice(0,2).join(" · ");}
    else if(t&&t.tr)why="anlamı: "+esc(t.tr);
    if(o.u&&o.c){const close=wclose?wclose(o.u.toLowerCase(),o.c.toLowerCase()):false;li.push(`<b class="bad">${esc(o.u)}</b> → <b class="good">${esc(o.c)}</b>${close?" (yazım farkı)":""}${why?`<br><span class="sub">${why}</span>`:""}`);}
    else if(o.c)li.push(`eksik: <b class="good">${esc(o.c)}</b>${why?`<br><span class="sub">${why}</span>`:""}`);
    else if(o.u)li.push(`fazla: <b class="bad">${esc(o.u)}</b>`);});
  return li.length?`<div class="xwhy"><b>Neden yanlış?</b><ul>${li.map(x=>`<li>${x}</li>`).join("")}</ul></div>`:"";}
