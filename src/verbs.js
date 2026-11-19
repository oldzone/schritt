/* ===== FİİL ATÖLYESİ: düzenli / düzensiz fiil ezberi ===== */
const VTR={sein:"olmak",haben:"sahip olmak",werden:"olmak, -ecek",können:"-ebilmek",müssen:"-malı",wollen:"istemek",sollen:"-malı (gerekli)",dürfen:"izinli olmak",mögen:"sevmek",wissen:"bilmek",
 gehen:"gitmek",kommen:"gelmek",sehen:"görmek",geben:"vermek",nehmen:"almak",finden:"bulmak",bleiben:"kalmak",stehen:"ayakta durmak",liegen:"yatmak, bulunmak",sitzen:"oturmak (durum)",
 lesen:"okumak",schreiben:"yazmak",sprechen:"konuşmak",essen:"yemek",trinken:"içmek",fahren:"(araçla) gitmek",fliegen:"uçmak",laufen:"koşmak, yürümek",schlafen:"uyumak",helfen:"yardım etmek",
 treffen:"buluşmak",tragen:"taşımak, giymek",waschen:"yıkamak",halten:"tutmak, durmak",lassen:"bırakmak, -tirmek",vergessen:"unutmak",verlieren:"kaybetmek",gewinnen:"kazanmak",beginnen:"başlamak",bringen:"getirmek",
 denken:"düşünmek",kennen:"tanımak",nennen:"adlandırmak",rennen:"koşmak",brennen:"yanmak",senden:"göndermek",wenden:"çevirmek",rufen:"seslenmek",heißen:"adı … olmak",fallen:"düşmek",
 fangen:"yakalamak",hängen:"asılı olmak",tun:"yapmak",ziehen:"çekmek, taşınmak",springen:"zıplamak",singen:"şarkı söylemek",schwimmen:"yüzmek",sinken:"batmak",klingen:"kulağa gelmek",zwingen:"zorlamak",
 binden:"bağlamak",bitten:"rica etmek",bieten:"sunmak",beißen:"ısırmak",braten:"kızartmak",brechen:"kırmak",empfehlen:"tavsiye etmek",fliehen:"kaçmak",fließen:"akmak",fressen:"(hayvan) yemek",
 frieren:"üşümek, donmak",gelingen:"başarılmak",gelten:"geçerli olmak",genießen:"tadını çıkarmak",geschehen:"olmak (olay)",gießen:"dökmek, sulamak",gleichen:"benzemek",graben:"kazmak",greifen:"kavramak",heben:"kaldırmak",
 laden:"yüklemek",leiden:"acı çekmek",leihen:"ödünç vermek",lügen:"yalan söylemek",meiden:"kaçınmak",messen:"ölçmek",raten:"tavsiye etmek, tahmin etmek",reiten:"ata binmek",riechen:"koklamak",scheinen:"parlamak, görünmek",
 schieben:"itmek",schießen:"ateş etmek",schlagen:"vurmak",schließen:"kapatmak",schneiden:"kesmek",schreien:"bağırmak",schweigen:"susmak",stehlen:"çalmak",steigen:"tırmanmak, binmek",sterben:"ölmek",
 stoßen:"itmek, çarpmak",streiten:"tartışmak",treiben:"sürmek, yapmak (spor)",treten:"basmak, adım atmak",wachsen:"büyümek",weisen:"göstermek",werfen:"atmak",wiegen:"tartmak",backen:"fırında pişirmek",
 anfangen:"başlamak",aufstehen:"kalkmak",ankommen:"varmak",anrufen:"telefon etmek",einladen:"davet etmek",verstehen:"anlamak",bekommen:"almak (elde etmek)",fernsehen:"televizyon izlemek",mitnehmen:"yanına almak",einschlafen:"uykuya dalmak",
 aussteigen:"(araçtan) inmek",einsteigen:"(araca) binmek",umziehen:"taşınmak",ausgehen:"dışarı çıkmak",abfahren:"hareket etmek (araç)",zurückkommen:"geri gelmek",vorschlagen:"önermek",beschreiben:"tarif etmek",unterschreiben:"imzalamak",entscheiden:"karar vermek",
 kaufen:"satın almak",machen:"yapmak",arbeiten:"çalışmak",wohnen:"oturmak (ikamet)",lernen:"öğrenmek",spielen:"oynamak",hören:"duymak",fragen:"sormak",sagen:"söylemek",brauchen:"ihtiyaç duymak",
 kochen:"pişirmek",reisen:"seyahat etmek",warten:"beklemek",zeigen:"göstermek",suchen:"aramak",bezahlen:"ödemek",besuchen:"ziyaret etmek",studieren:"üniversitede okumak",telefonieren:"telefonla konuşmak",tanzen:"dans etmek",
 leben:"yaşamak",lieben:"sevmek",öffnen:"açmak",antworten:"cevap vermek",erklären:"açıklamak",erzählen:"anlatmak",bestellen:"sipariş etmek",einkaufen:"alışveriş yapmak",aufräumen:"toplamak (oda)",passieren:"olmak (olay)"};
// sıklık sırası (önce en çok kullanılanlar)
const VORDER="sein haben werden können müssen wollen sollen dürfen mögen wissen gehen kommen machen sagen sehen geben nehmen finden bleiben stehen liegen sitzen lesen schreiben sprechen essen trinken fahren fliegen laufen schlafen helfen treffen tragen waschen halten lassen vergessen verlieren gewinnen beginnen bringen denken kennen rufen heißen fallen tun ziehen springen singen schwimmen anfangen aufstehen ankommen anrufen einladen verstehen bekommen fernsehen mitnehmen einschlafen aussteigen einsteigen umziehen ausgehen abfahren zurückkommen vorschlagen beschreiben unterschreiben entscheiden kaufen arbeiten wohnen lernen spielen hören fragen brauchen kochen reisen warten zeigen suchen bezahlen besuchen studieren telefonieren tanzen leben lieben öffnen antworten erklären erzählen bestellen einkaufen aufräumen passieren".split(" ");
let FVLIST=null;
function vList(){if(FVLIST)return FVLIST;const set=new Set([...VORDER,...Object.keys(STRONG)]);FVLIST=[];
  set.forEach(inf=>{const c=conjDe(inf);if(!c||!c.prat)return;const tr=VTR[inf]||(findLex(inf)||{e:{tr:""}}).e.tr||"";
    const kind=MODALS.has(inf)||["sein","haben","werden","wissen"].includes(inf)?"özel":c.strong?(/te$/.test((c.prat[2]||"").split(" ")[0])?"karışık":"düzensiz"):"düzenli";
    FVLIST.push({inf,tr,c,kind,er:c.pres6[2],pt:c.prat[2],pp:c.pp,aux:c.aux,perf:c.perf[2],pat:vPat(inf,c)});});
  const rank=v=>{const i=VORDER.indexOf(v.inf);return i<0?999:i;};FVLIST.sort((a,b)=>rank(a)-rank(b));return FVLIST;}
function vVowel(w){const m=String(w).match(/(ei|ie|eu|äu|au|ai|[aeiouäöü])/);return m?m[1]:"";}
function vPat(inf,c){if(!c.strong)return"";const base=c.base.replace(/^(be|ver|er|ent|emp|zer|ge|miss|an|auf|aus|ein|mit|zurück|vor|unter|ab|um|fern|zu)(?=[a-zäöüß]{3})/,"");
  const s=STRONG[base]||STRONG[c.base];if(!s)return"";const ppCore=s.pp.replace(/^ge/,"");return `${vVowel(base)} → ${vVowel(s.pt)} → ${vVowel(ppCore)}`;}
function vRow(v){return `<div class="wordline vrow" data-vinf="${esc(v.inf)}"><div style="flex:1;min-width:0"><div class="fr"><b>${esc(v.inf)}</b> <span class="sub" style="font-size:13px">· ${esc(v.tr)}</span></div>
  <div class="vforms"><span>${esc(v.er)}</span><span>${esc(v.pt)}</span><span>${esc(v.perf)}</span></div></div><button class="sbtn sm" data-say="${esc(v.inf+", "+v.pt+", "+v.perf)}" aria-label="Dinle">${I.spk}</button></div>`;}
function verbBtn(){return LANG.code==="de"?`<button class="btn sec mt" id="vbx" style="width:100%">🔤 Fiil atölyesi · düzenli & düzensiz fiiller</button><div class="sec-f" style="margin-top:6px">Präsens · Präteritum · Perfekt hallerini tabloda gör, ses kalıplarıyla grupla, yazarak ezberle.</div>`:"";}
function verbHome(filter){const L=vList();filter=filter||"düzensiz";const st=S.vb||{};
  const known=L.filter(v=>st[v.inf]&&st[v.inf].b>=3).length;
  const groups={};L.filter(v=>v.pat).forEach(v=>{(groups[v.pat]=groups[v.pat]||[]).push(v);});
  const gl=Object.entries(groups).filter(g=>g[1].length>=2).sort((a,b)=>b[1].length-a[1].length);
  const body=filter==="kalıp"?gl.map(([p,vs])=>`<div class="sec-h" style="margin-left:4px">${esc(p)} · ${vs.length} fiil</div><div class="card stack">${vs.map((v,i)=>(i?'<div class="hr"></div>':"")+vRow(v)).join("")}</div>`).join("")
    :`<div class="card stack">${L.filter(v=>filter==="hepsi"||v.kind===filter||(filter==="düzensiz"&&v.kind==="karışık")).map((v,i)=>(i?'<div class="hr"></div>':"")+vRow(v)).join("")}</div>`;
  const chip=(k,t)=>`<button class="pill ${filter===k?"blue":""}" data-vf="${k}" style="border:0">${t}</button>`;
  return `<div id="vbox"><div class="h2" style="font-size:24px">🔤 Fiil atölyesi</div>
   <div class="sub" style="margin:4px 0 10px">${L.length} fiil · ezberlenen: <b>${known}</b>. Her satır: <b>er (şimdi)</b> · <b>Präteritum</b> · <b>Perfekt</b>.</div>
   <div class="gram" style="font-size:14px;margin-bottom:10px"><b>Düzenli</b> fiil hiç ezber istemez: kauf-en → kauf<b>te</b> → <b>ge</b>kauf<b>t</b>. <b>Düzensiz</b> fiillerde kök sesi değişir ve Partizip <b>-en</b> ile biter (fahren → fuhr → gefahren). Çoğu aynı <b>ses kalıbını</b> izler: <i>ei → ie → ie</i> (bleiben, schreiben), <i>i → a → u</i> (finden, trinken). Kalıbı öğren, 10 fiili birden öğren.</div>
   <div class="spbtns" style="margin-bottom:10px"><button class="btn" id="vq10">✍️ Ezber testi · 10</button><button class="btn sec" id="vq0">♾️ Sınırsız</button></div>
   <div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:10px">${chip("düzensiz","Düzensiz")}${chip("kalıp","Ses kalıpları")}${chip("özel","sein/haben/modal")}${chip("düzenli","Düzenli")}${chip("hepsi","Hepsi")}</div>
   ${body}</div>`;}
function verbSheet(filter){const old=document.querySelector(".sheetbg #vbox");if(old)old.closest(".sheetbg").remove();sheet(verbHome(filter));const b=$("#vbox");bindSay(b);
  b.querySelectorAll("[data-vf]").forEach(x=>x.onclick=()=>verbSheet(x.dataset.vf));
  b.querySelectorAll("[data-vinf]").forEach(r=>r.onclick=e=>{if(e.target.closest("[data-say]"))return;const v=vList().find(x=>x.inf===r.dataset.vinf);
    b.innerHTML=`<button class="pill" id="vbk" style="border:0">‹ Fiiller</button><div class="h2" style="font-size:26px;margin-top:8px">${esc(v.inf)}</div><div class="sub">${esc(v.tr)} · ${esc(v.kind)}${v.pat?" · ses kalıbı: <b>"+esc(v.pat)+"</b>":""}</div>${xConjTable(v.inf)}${vExamples(v)}`;bindSay(b);bindTap(b);$("#vbk").onclick=()=>verbSheet(filter);});
  $("#vq10").onclick=()=>{b.closest(".sheetbg").remove();verbQuiz(10);};$("#vq0").onclick=()=>{b.closest(".sheetbg").remove();verbQuiz(0);};}
function vExamples(v){const fi=formIndex(v.inf)||{};const forms=new Set(Object.keys(fi));if(v.c.sep)forms.add(v.c.pp);const out=[];
  for(const o of (typeof ALLS!=="undefined"?ALLS:[])){if(out.length>=6)break;const ws=toks(o.de).filter(isW).map(w=>w.toLowerCase());if(ws.some(w=>forms.has(w))&&(!v.c.sep||ws.includes(v.c.sep)||ws.some(w=>w===v.c.pp||w===v.inf)))out.push(o);}
  return out.length?`<div class="sec-h" style="margin-left:2px">Kurstan örnekler</div><div class="card stack">${out.map((o,i)=>`${i?'<div class="hr"></div>':""}<div class="wordline ex"><div style="flex:1;min-width:0"><div class="fr">${tapS(o.de)}</div><div class="tr">${esc(o.tr)}</div>${ybtn(o.de,o.tr)}</div><button class="sbtn sm" data-say="${esc(o.de)}">${I.spk}</button></div>`).join("")}</div>`:"";}
const VDAY=()=>Math.floor(Date.now()/864e5);
function verbQuiz(limit){const L=vList().filter(v=>v.kind!=="düzenli"||Math.random()<.25);S.vb=S.vb||{};const st=S.vb,today=VDAY();
  let n=0,ok=0,again=[],recent=[];tabs(false);IN_LESSON=true;
  const pickV=()=>{const due=L.filter(v=>st[v.inf]&&st[v.inf].d<=today&&!recent.includes(v.inf));if(due.length&&Math.random()<.6)return due[Math.random()*Math.min(due.length,8)|0];
    const fresh=L.filter(v=>!st[v.inf]&&!recent.includes(v.inf));if(fresh.length&&Math.random()<.7)return fresh[Math.random()*Math.min(fresh.length,6)|0];
    const pool=L.filter(v=>!recent.includes(v.inf));return pool[Math.random()*pool.length|0];};
  function make(){const ag=again.findIndex(a=>a.w<=0);if(ag>=0)return again.splice(ag,1)[0].q;again.forEach(a=>a.w--);
    const v=pickV();recent.push(v.inf);if(recent.length>6)recent.shift();
    const ts=(MODALS.has(v.inf)?["pt","er","inf"]:["pp","pt","perf","aux","er","inf"]).filter(t=>!(t==="er"&&v.er===v.c.pres6[2]&&!/[äiie]/.test(v.er.replace(vVowel(v.inf),""))&&v.kind==="düzenli"));
    const t=ts[Math.random()*ts.length|0];
    if(t==="pp")return{v,t,ask:"Partizip II yaz",hint:`${v.inf} · ${v.tr}`,ans:v.pp};
    if(t==="pt")return{v,t,ask:"Präteritum yaz (er/sie/es)",hint:`${v.inf} · ${v.tr}`,ans:v.pt};
    if(t==="perf")return{v,t,ask:"Perfekt yaz (er/sie/es)",hint:`${v.inf} · ${v.tr}`,ans:v.perf};
    if(t==="er")return{v,t,ask:"Şimdiki zaman yaz (er/sie/es)",hint:`${v.inf} · ${v.tr}`,ans:v.er};
    if(t==="aux")return{v,t,ask:"Perfekt'te hangisi?",hint:`${v.inf} · ${v.tr} → … ${v.pp}`,ans:v.aux==="sein"?"ist":"hat",opts:["hat","ist"]};
    const d=shuffle(L.filter(x=>x.inf!==v.inf)).slice(0,3).map(x=>x.inf);return{v,t,ask:"Bu hangi fiil?",hint:`${v.pt} · ${v.perf}`,ans:v.inf,opts:shuffle([v.inf,...d])};}
  function show(){if(limit&&n>=limit)return done();const Q=make();window.scrollTo(0,0);
    root().innerHTML=`<div class="nav"><div class="in"><button class="back" id="vx"><span style="width:22px;height:22px;display:grid;place-items:center">${I.x}</span></button><div class="nt">🔤 Fiil ezberi${limit?" · "+(n+1)+"/"+limit:""}</div><div class="cnt"><span style="color:var(--green)">✓${ok}</span> <span style="color:var(--red)">✗${n-ok}</span></div></div><div class="prog"><i style="width:${limit?n/limit*100:0}%"></i></div></div>
     <div class="page" style="padding-bottom:220px"><div class="stack fade"><div><span class="pill blue">${esc(Q.ask)}</span></div><div class="card" style="padding:22px"><div class="word" style="font-size:30px">${esc(Q.hint.split(" · ")[0])}</div><div class="sub" style="margin-top:4px">${esc(Q.hint.split(" · ").slice(1).join(" · "))}</div></div>
     ${Q.opts?`<div class="stack">${Q.opts.map(o=>`<button class="opt" data-o="${esc(o)}">${esc(o)}</button>`).join("")}</div>`:`<input id="vin" class="inp" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" placeholder="Yaz…" style="font:inherit;font-size:22px">`}</div></div>
     <div class="actbar" id="ab"><div class="in">${Q.opts?"":`<button class="btn" id="vchk">Kontrol et</button>`}</div></div>`;
    $("#vx").onclick=done;
    const fin=(good,given)=>{n++;if(good)ok++;sfx(good?"ok":"bad");const s=st[Q.v.inf]||{b:0,d:today};if(good){s.b=Math.min(6,s.b+1);s.d=today+[0,1,2,4,7,14,30][s.b];}else{s.b=0;s.d=today;again.push({q:Q,w:3});}st[Q.v.inf]=s;S.xp=(S.xp||0)+(good?2:0);save();
      say(Q.v.inf+", "+Q.v.pt+", "+Q.v.perf);const v=Q.v,ab=$("#ab");ab.className="actbar "+(good?"ok":"bad");
      ab.innerHTML=`<div class="in" style="display:block"><div class="fbt">${good?"Doğru!":"Doğru cevap: "+esc(Q.ans)}</div><div class="fbs"><div class="vforms big"><span>${esc(v.inf)}</span><span>${esc(v.er)}</span><span>${esc(v.pt)}</span><span>${esc(v.perf)}</span></div>
        <div class="sub" style="font-size:13px;margin-top:6px">${v.kind==="düzenli"?"Düzenli: kök + te / ge + kök + t.":v.pat?`Ses kalıbı <b>${esc(v.pat)}</b>: ${esc(vList().filter(x=>x.pat===v.pat&&x.inf!==v.inf).slice(0,4).map(x=>x.inf).join(", "))} da aynı.`:"Bu fiili ayrıca ezberle."}${v.aux==="sein"?" Hareket/durum değişimi → <b>sein</b>.":""}${!good&&given?` · Senin cevabın: <b>${esc(given)}</b>`:""}</div></div>
        <div style="display:flex;gap:10px;margin-top:10px"><button class="btn sec" id="vfin" style="flex:0 0 auto;width:auto;padding:0 18px">Bitir</button><button class="btn ${good?"green":"red"}" id="vnx" style="flex:1">Devam</button></div></div>`;
      $("#vnx").onclick=show;$("#vfin").onclick=done;$("#vnx").focus();};
    if(Q.opts)root().querySelectorAll(".opt").forEach(b=>b.onclick=()=>{root().querySelectorAll(".opt").forEach(x=>{x.disabled=true;if(x.dataset.o===Q.ans)x.classList.add("ok");});const g=b.dataset.o===Q.ans;if(!g)b.classList.add("bad");fin(g,b.dataset.o);});
    else{const inp=$("#vin");setTimeout(()=>{try{inp.focus();}catch(e){}},60);const chk=()=>{const val=inp.value.trim();if(!val)return;inp.disabled=true;const g=norm(val)===norm(Q.ans)||nearEq(val,Q.ans)&&lev(norm(val),norm(Q.ans))<=1&&Q.ans.length>5;inp.classList.add(g?"ok":"bad");fin(g,val);};
      $("#vchk").onclick=chk;inp.onkeydown=e=>{if(e.key==="Enter")chk();};}}
  function done(){IN_LESSON=false;tabs(true);root().innerHTML="";tab="bank";render();if(n)toast(`Fiil ezberi: ${ok}/${n} doğru`);setTimeout(()=>verbSheet(),50);}
  show();}
