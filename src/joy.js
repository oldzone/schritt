/* ===== NEŞE: maskot, yol, seri kutlaması ===== */
function mascot(mood,sz){mood=mood||"happy";sz=sz||90;
  const eye=(x)=>mood==="happy"?`<path d="M${x-7} 46 q7 -8 14 0" stroke="#1d1d2b" stroke-width="4" fill="none" stroke-linecap="round"/>`
    :mood==="sad"?`<circle cx="${x}" cy="47" r="6" fill="#1d1d2b"/><path d="M${x-8} 37 l14 4" stroke="#1d1d2b" stroke-width="3" stroke-linecap="round" transform="${x<60?"":"scale(-1,1) translate(-"+(2*x)+",0)"}"/>`
    :mood==="think"?`<circle cx="${x}" cy="45" r="6.5" fill="#1d1d2b"/><circle cx="${x+2}" cy="43" r="2" fill="#fff"/>`
    :`<circle cx="${x}" cy="45" r="8.5" fill="#1d1d2b"/><circle cx="${x+3}" cy="42" r="3" fill="#fff"/>`;
  const mouth=mood==="sad"?`<path d="M52 66 q8 -5 16 0" stroke="#c2410c" stroke-width="3" fill="none" stroke-linecap="round"/>`:mood==="wow"?`<ellipse cx="60" cy="67" rx="6" ry="7" fill="#c2410c"/>`:"";
  return `<svg class="masc m-${mood}" width="${sz}" height="${sz}" viewBox="0 0 120 120" aria-hidden="true">
   <ellipse cx="60" cy="112" rx="30" ry="5" fill="rgba(0,0,0,.12)"/>
   <path d="M52 20 q-4 -16 6 -16 q-2 10 2 16z" fill="#ff5d8f"/><path d="M60 18 q4 -17 14 -10 q-8 6 -8 13z" fill="#ffc53d"/><path d="M47 24 q-14 -8 -8 -16 q4 8 12 12z" fill="#7c5cff"/>
   <ellipse cx="60" cy="64" rx="40" ry="42" fill="url(#mg)"/>
   <ellipse cx="60" cy="80" rx="25" ry="24" fill="#ffe08a"/>
   <path d="M21 64 q-12 18 4 32 q6 -14 2 -30z" fill="#0f8fa3"/><path d="M99 64 q12 18 -4 32 q-6 -14 -2 -30z" fill="#0f8fa3"/>
   <circle cx="44" cy="46" r="13" fill="#fff"/><circle cx="76" cy="46" r="13" fill="#fff"/>${eye(44)}${eye(76)}
   <path d="M52 55 q8 -6 16 0 q-2 10 -8 13 q-6 -3 -8 -13z" fill="#ff8a3d"/>${mouth}
   <circle cx="33" cy="60" r="5" fill="#ff8fb1" opacity=".55"/><circle cx="87" cy="60" r="5" fill="#ff8fb1" opacity=".55"/>
   <path d="M48 104 l-4 8 M52 104 l0 8 M68 104 l0 8 M72 104 l4 8" stroke="#ff8a3d" stroke-width="3.5" stroke-linecap="round"/>
   <defs><linearGradient id="mg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2fd0e0"/><stop offset="1" stop-color="#139bb5"/></linearGradient></defs></svg>`;}
const JOY_OK=["Harika!","Süpersin!","Tam isabet!","Bravo!","Çok iyi!","Aynen böyle!","Mükemmel!"],JOY_BAD=["Olsun, bir dahakine!","Neredeyse!","Az kaldı!","Bu da öğrenmenin parçası."];
function homeBubble(){const due=dueItems().length,st=S.streak||0,dx=dailyXP(),g=goal(),nm=firstName();
  if(dx>=g)return `Bugünkü hedef tamam! 🎉 ${nm?esc(nm)+", ":""}istersen biraz daha.`;
  if(due>=10)return `${due} kelime seni özledi. Kısa bir tekrar? 🔁`;
  if(st>=2)return `🔥 ${st} günlük seri! Bugün de devam edelim mi?`;
  if(!Object.keys(S.pass||{}).length)return `Merhaba${nm?" "+esc(nm):""}! Ben Baz. İlk dersine hazır mısın?`;
  return pick([`Bugün ${g-dx} XP daha, hedef tamam!`,`Bir ders = 5 dakika. Hadi! 💪`,`Yeni kelimeler seni bekliyor ✨`]);}
function segRing(n,done,col,sz,sw){const r=(sz-sw)/2-1,C=2*Math.PI*r,seg=C/n,gap=n>1?Math.min(6,seg*.18):0;let h=`<svg class="sring" width="${sz}" height="${sz}" viewBox="0 0 ${sz} ${sz}">`;
  for(let k=0;k<n;k++)h+=`<circle cx="${sz/2}" cy="${sz/2}" r="${r}" fill="none" stroke="${k<done?col:"var(--sep)"}" stroke-width="${sw}" stroke-linecap="round" stroke-dasharray="${Math.max(1,seg-gap)} ${C}" transform="rotate(${-90+k*360/n+(gap/C*180)} ${sz/2} ${sz/2})"/>`;
  return h+`</svg>`;}
function poolOf(us){const ws=new Map(),ss=new Map();us.forEach(u=>{u.w.forEach(w=>{if(w[0]&&w[1]&&!ws.has(w[0]))ws.set(w[0],{fr:w[0],tr:w[1],pr:w[2]||""});if(w[3]&&w[4])ss.set(w[3],{t:w[3],tr:w[4]});});(u.sents||[]).forEach(x=>{const n=wtok(x[0]).length;if(n>=3&&n<=14)ss.set(x[0],{t:x[0],tr:x[1]});});});return{ws:[...ws.values()],ss:[...ss.values()]};}
const PIC={star:`<svg viewBox="0 0 24 24" width="34" height="34"><path d="M12 2.8l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 16.8l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z" fill="#fff" stroke="#fff" stroke-width="1.5" stroke-linejoin="round"/></svg>`,
 check:`<svg viewBox="0 0 24 24" width="34" height="34"><path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke="#fff" stroke-width="3.6" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
 dumb:`<svg viewBox="0 0 24 24" width="32" height="32" fill="currentColor"><rect x="2" y="9" width="3" height="6" rx="1"/><rect x="5" y="6.5" width="3.2" height="11" rx="1.2"/><rect x="15.8" y="6.5" width="3.2" height="11" rx="1.2"/><rect x="19" y="9" width="3" height="6" rx="1"/><rect x="8" y="10.8" width="8" height="2.4" rx=".6"/></svg>`,
 mic:`<svg viewBox="0 0 24 24" width="30" height="30" fill="currentColor"><rect x="8.5" y="2.5" width="7" height="12" rx="3.5"/><path d="M5.5 11.5a6.5 6.5 0 0 0 13 0" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/><rect x="10.9" y="17.5" width="2.2" height="3.5" rx="1"/></svg>`,
 trophy:`<svg viewBox="0 0 24 24" width="36" height="36" fill="currentColor"><path d="M7 3h10v6.5a5 5 0 0 1-10 0z"/><path d="M7 5H3.5v1.5A3.5 3.5 0 0 0 7 10M17 5h3.5v1.5A3.5 3.5 0 0 1 17 10" fill="none" stroke="currentColor" stroke-width="2"/><rect x="10.8" y="14" width="2.4" height="4"/><rect x="7.5" y="18" width="9" height="3" rx="1"/></svg>`,
 book:`<svg viewBox="0 0 24 24" width="30" height="30"><path d="M4 5.5C6.5 4.3 9.3 4.3 12 6c2.7-1.7 5.5-1.7 8-.5V19c-2.5-1.2-5.3-1.2-8 .5-2.7-1.7-5.5-1.7-8-.5z" fill="currentColor"/><path d="M12 6v13.5" stroke="rgba(0,0,0,.18)" stroke-width="1.4"/></svg>`};
function pathItems(units,lv){const out=[],bks=BOOKS.filter(b=>b.lv===lv);let bi=0;
  units.forEach((u,i)=>{out.push({k:"u",u,i});
    if(i%2===1)out.push({k:"prac",key:"pr:"+units[i-1].key,us:[units[i-1],u],t:"Tekrar"});
    if(i%3===2)out.push({k:"speak",key:"sp:"+u.key,u,t:"Konuşma"});
    if(i%4===3&&bks[bi]){out.push({k:"story",key:"st:"+bks[bi].id,b:bks[bi],t:"Hikâye"});bi++;}
    if(i%5===4)out.push({k:"chest",key:"ch:"+u.key,u,t:"Sandık"});});
  out.push({k:"trophy",key:"tr:"+lv,us:units,t:lv+" büyük tekrar"});return out;}
function pathHTML(units,lv){const col=LVCOLOR[lv]||"var(--blue)";const cur=units.find(u=>S.lp&&S.lp[u.key])||units.find(u=>!S.pass[u.key]);
  const L=LV.find(l=>l.id===lv);const done=units.filter(u=>S.pass[u.key]).length;const pn=S.pn||{};const items=pathItems(units,lv);
  let h=`<div class="lvban" style="--lc:${col}"><div><small>${esc(lv)} · ${done}/${units.length} ders · ${items.length} adım</small><b>${esc(L.name)}</b></div>${mascot(done===units.length?"wow":"happy",58)}</div><div class="path" style="--lc:${col}">`;
  items.forEach((it,i)=>{const x=Math.round(Math.sin(i*.75)*70);
    if(it.k==="u"){const u=it.u,ok=!!S.pass[u.key],lp=S.lp&&S.lp[u.key]||0,isC=u===cur,n=plan(u).length;const best=S.best[u.key]||0,stars=ok?(best>=90?3:best>=70?2:1):0;
      h+=`<div class="pstep" style="--x:${x}px">${isC?`<div class="pbub">${lp?"Devam":"Başla"}</div>`:""}
       <div class="pwrap ${isC?"big":""}">${isC||lp?segRing(n,lp,col,isC?116:104,8):""}<button class="pnode ${ok?"done":isC?"cur":"todo"}" data-u="${u.gi}" aria-label="${esc(u.t)}">${ok?PIC.check:isC?PIC.star:PIC.book}</button></div>
       </div>`;return;}
    const d=!!pn[it.key]||(it.k==="story"&&S.bk&&S.bk[it.b.id]&&S.bk[it.b.id].done);
    const ic={prac:PIC.dumb,speak:PIC.mic,story:PIC.book,chest:d?"📭":"🎁",trophy:PIC.trophy}[it.k];
    const lab=it.k==="story"?it.b.t:it.k==="prac"?"Tekrar: "+it.us.map(u=>u.n+". ders").join(" + "):it.k==="speak"?"Konuş: "+it.u.t:it.t;
    h+=`<div class="pstep" style="--x:${x}px">${it.k==="chest"?`<button class="pchestb ${d?"pd":""}" data-pk="${i}" aria-label="${esc(lab)}">${ic}</button>`:`<button class="pnode sp ${it.k} ${d?"pd":""}" data-pk="${i}" aria-label="${esc(lab)}">${ic}${d?`<em>✓</em>`:""}</button>`}</div>`;});
  return h+`</div>`;}
function pathPop(btn,html,col,act){document.querySelectorAll(".ppop").forEach(x=>{const p=x.closest(".pstep");if(p)p.style.zIndex="";x.remove();});const st=btn.closest(".pstep");st.style.zIndex=30;const d=document.createElement("div");d.className="ppop";d.style.setProperty("--pc",col);
  d.innerHTML=html;st.appendChild(d);const x=parseFloat(getComputedStyle(st).getPropertyValue("--x"))||0;d.style.setProperty("--ax",(-x)+"px");
  d.querySelector(".ppbtn").onclick=e=>{e.stopPropagation();d.remove();act();};sfx("tap");
  setTimeout(()=>{const off=e=>{if(!d.contains(e.target)){d.remove();st.style.zIndex="";document.removeEventListener("click",off,true);}};document.addEventListener("click",off,true);},0);
  const r=d.getBoundingClientRect();if(r.bottom>innerHeight-90)window.scrollBy({top:r.bottom-innerHeight+110,behavior:"smooth"});}
function bindPath(units,lv){const items=pathItems(units,lv);const back=()=>{IN_LESSON=false;tab="learn";render();};const col=LVCOLOR[lv]||"var(--blue)";
  root().querySelectorAll("[data-u]").forEach(b=>b.onclick=e=>{e.stopPropagation();const u=UNITS[+b.dataset.u],ok=!!S.pass[u.key],lp=S.lp&&S.lp[u.key]||0,n=plan(u).length;
    pathPop(b,`<b>${esc(u.t)}</b><span>${esc(u.s||"")}</span><small>${ok?"Tamamlandı · %"+(S.best[u.key]||0)+" · tekrar oynayabilirsin":lp?lp+"/"+n+" bölüm tamam":u.lv+" · "+u.n+". ders · "+n+" bölüm"}</small><button class="ppbtn">${ok?"Tekrar oyna +20 XP":lp?"Devam et":"Başla +70 XP"}</button>`,ok?"#ffc800":b.classList.contains("todo")?"#9aa3b0":col,()=>lesson(u.gi));});
  root().querySelectorAll("[data-pk]").forEach(b=>b.onclick=e=>{e.stopPropagation();const it=items[+b.dataset.pk];
    const lab=it.k==="story"?"📖 "+it.b.t:it.k==="prac"?"🏋️ Tekrar: "+it.us.map(u=>u.n+". ders").join(" + "):it.k==="speak"?"🎤 Konuş: "+it.u.t:it.k==="chest"?"🎁 Sandık":"🏆 "+it.t;
    const sub=it.k==="story"?"Seviyene uygun kısa hikâye. Kelimelere dokun, anlamını gör.":it.k==="prac"?"Bu iki dersin kelime ve cümlelerinden 10 soru.":it.k==="speak"?"Cümleleri sesli söyle, telaffuzunu kontrol et.":it.k==="chest"?"İçinden XP çıkar. Önceki dersi bitirince açılır.":"Seviyedeki tüm derslerden 20 soru.";
    const bt=it.k==="chest"?"Aç":it.k==="story"?"Oku":it.k==="speak"?"Konuş":"Başla";
    const pc={prac:"#ff9600",speak:"#ff4b8b",story:"#a560f2",chest:"#ff9600",trophy:"#ffc800"}[it.k];
    pathPop(b,`<b>${esc(lab)}</b><span>${sub}</span><button class="ppbtn">${bt}</button>`,pc,()=>run(it));});
  function run(it){S.pn=S.pn||{};
    if(it.k==="prac"||it.k==="trophy")return freeReview(it.k==="trophy"?20:10,{P:poolOf(it.us),title:it.k==="trophy"?"🏆 "+it.t:"🏋️ Tekrar",key:it.key,onClose:back});
    if(it.k==="speak")return speakDrill(spItems(it.u,6),{u:it.u,mode:"mix",title:"🎤 "+it.u.t,onDone:()=>{S.pn[it.key]=1;save();back();}});
    if(it.k==="story"){window.RDBACK="learn";return reader(it.b.id);}
    if(it.k==="chest"){if(S.pn[it.key])return toast("Bu sandığı zaten açtın 🎉");if(!S.pass[it.u.key])return toast("Sandığı açmak için önce bu bölümdeki dersleri bitir");
      const xp=20+Math.floor(Math.random()*4)*10;S.pn[it.key]=1;S.xp=(S.xp||0)+xp;touch();save();sfx("win");confetti();
      const d=document.createElement("div");d.className="combo";d.innerHTML=`${mascot("wow",54)}<div><b>🎁 +${xp} XP!</b><span>Sandık açıldı</span></div>`;document.body.appendChild(d);setTimeout(()=>d.remove(),2100);setTimeout(()=>learn(),900);}}}
function segDone(u,si,n,go,home){S.xp=(S.xp||0)+3;save();sfx("ok");window.scrollTo(0,0);const col=LVCOLOR[u.lv]||"var(--blue)";
  root().innerHTML=`<div class="page fade center" style="padding-top:40px;padding-bottom:180px"><div class="segw">${segRing(n,si,col,190,12)}<div class="segm">${mascot(si===n-1?"wow":"happy",110)}</div></div>
   <div class="h2" style="font-size:28px;margin-top:14px">${pick(["Bölüm tamam!","Süper gidiyorsun!","Bir parça daha!","Harika!"])}</div><div class="sub">${esc(u.t)} · ${si}/${n} bölüm${si<n?" · sıradaki: "+esc(segName(plan(u)[si])):""}</div><div class="mt"><span class="pill blue">+3 XP</span></div></div>
   <div class="actbar"><div class="in"><button class="btn sec" id="sgh" style="flex:0 0 auto;width:auto;padding:0 18px">Yola dön</button><button class="btn green" id="sgn">Devam et</button></div></div>`;
  $("#sgn").onclick=go;$("#sgh").onclick=home;try{$("#sgn").focus();}catch(e){}}
function pageHead(title,mood,text){return `<div class="lt">${esc(title)}</div><div class="joyhead">${mascot(mood,78)}<div class="jbub">${text}</div></div>`;}
function jtile(id,emo,t,sub,col,dis){return `<button class="jtile" id="${id}" style="--tc:${col}" ${dis?"disabled":""}><span class="je">${emo}</span><span class="jt"><b>${t}</b><small>${sub}</small></span></button>`;}
function practiceTiles(){const P=seenPool();const n=P.ws.length+P.ss.length;return `<div class="jtiles">${n>=6?jtile("free","♾️","Bildiklerim",`${P.ws.length} kelime · ${P.ss.length} cümle`,"#7c5cff"):""}${LANG.code==="de"?jtile("vbx","🔤","Fiil atölyesi","düzenli & düzensiz","#ff9500"):""}</div>`;}
// geri bildirim çubuğuna maskot + üst üste doğru (combo) kutlaması
let COMBO=0;
function comboToast(n){const d=document.createElement("div");d.className="combo";d.innerHTML=`${mascot("wow",54)}<div><b>🔥 ${n} doğru üst üste!</b><span>${n>=10?"Durdurulamıyorsun!":n>=5?"Alev aldın!":"Böyle devam!"}</span></div>`;document.body.appendChild(d);setTimeout(()=>d.remove(),2100);if(n>=5)try{confetti();}catch(e){}}
new MutationObserver(ms=>{for(const m of ms){const el=m.target;if(!(el instanceof HTMLElement)||!el.classList.contains("actbar"))continue;
    const ok=el.classList.contains("ok"),bad=el.classList.contains("bad");if(!ok&&!bad)continue;if(el.dataset.mj===el.innerHTML.length+"")continue;
    const old=el.querySelector(".fbm");if(old)old.remove();const d=document.createElement("div");d.className="fbm";d.innerHTML=mascot(ok?"happy":"sad",54)+`<span>${pick(ok?JOY_OK:JOY_BAD)}</span>`;el.appendChild(d);el.dataset.mj=el.innerHTML.length+"";
    if(ok){COMBO++;if([3,5,8,10,15,20,30].includes(COMBO))setTimeout(()=>comboToast(COMBO),250);}else COMBO=0;}})
  .observe(document.documentElement,{subtree:true,attributes:true,attributeFilter:["class"]});

