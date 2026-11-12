/* ===== Diller ===== */
const LANGS={
 de:{code:"de",name:"Almanca",si:"Almancası",sini:"Almancasını",flag:"🇩🇪",brand:"Schritt für Schritt",logo:"S",tts:"de-DE",loc:"de-DE",
  artRe:/^(der |die |das |ein |eine )/i,nounRe:/^(der|die|das) \p{Lu}/u,plurRe:/^die (Eltern|Großeltern|Geschwister|Leute|Kenntnisse|Unterlagen|Kosten|Nachrichten|Schuhe|Socken|Haare|Nudeln|Reste|Überstunden|Kleidung|sozialen)/,
  artCls:{der:"m",die:"f",das:"nt"},arts:["der","die","das"],artName:"artikel",
  kb:["QWERTZUIOPÜ","ASDFGHJKLÖÄ","↵YXCVBNMß⌫"],w5:/^[A-Za-zÄÖÜäöüß]{5}$/,keyRe:/^[a-zäöüß]$/i,
  vf:/anna|helena|petra|marlene|vicki|katja|amala|seraphina|louisa|elke|hedda|ingrid|female|frau|google deutsch|sabine|lena|lisa|julia|klara|greta/i,
  vm:/markus|yannick|viktor|martin|hans|conrad|killian|florian|stefan|ralf|bernd|kasper|jonas|\bmale\b|mann|lukas|felix|tobias/i,
  good:/anna|markus|helena|petra|yannick|viktor|marlene|katja|conrad|amala|killian|seraphina|florian/i,
  ninja:{t:"Artikel Ninja",d:"der, die, das — 60 saniye"},
  dl:"Ayarlar → Erişilebilirlik → Seslendirilen İçerik → Sesler → Almanca. Kadın için <b>Anna (Premium)</b> veya <b>Helena/Petra (Premium)</b>, erkek için <b>Markus</b> veya <b>Yannick (Premium)</b>"},
 en:{code:"en",name:"İngilizce",si:"İngilizcesi",sini:"İngilizcesini",flag:"🇬🇧",brand:"Step by Step",logo:"E",tts:"en-GB",loc:"en-GB",
  artRe:/^(the |a |an )/i,nounRe:null,plurRe:null,artCls:{},arts:null,artName:"",
  kb:["QWERTYUIOP","ASDFGHJKL","↵ZXCVBNM⌫"],w5:/^[A-Za-z]{5}$/,keyRe:/^[a-z]$/i,
  vf:/samantha|ava|allison|susan|karen|moira|tessa|serena|kate|stephanie|martha|zoe|fiona|victoria|libby|sonia|emma|female|amy|joanna|salli|kimberly|google uk english female|google us english/i,
  vm:/daniel|alex|tom|aaron|arthur|oliver|gordon|rishi|nathan|evan|\bmale\b|brian|ryan|guy|thomas|google uk english male/i,
  good:/serena|daniel|kate|oliver|arthur|martha|ava|zoe|evan|nathan|sonia|ryan|libby/i,
  ninja:null,
  dl:"Ayarlar → Erişilebilirlik → Seslendirilen İçerik → Sesler → İngilizce. İngiliz aksanı için <b>Serena / Kate (Premium)</b> veya erkek <b>Daniel / Oliver (Gelişmiş)</b>, Amerikan için <b>Ava / Zoe (Premium)</b> veya <b>Evan / Nathan</b>"},
 fr:{code:"fr",name:"Fransızca",si:"Fransızcası",sini:"Fransızcasını",flag:"🇫🇷",brand:"Pas à pas",logo:"P",tts:"fr-FR",loc:"fr-FR",
  artRe:/^(le |la |l'|l’|les |un |une )/i,nounRe:/^(le|la) \p{L}/u,plurRe:null,
  artCls:{le:"m",la:"f",un:"m",une:"f","l'":"","les":""},arts:["le","la"],artName:"artikel",
  kb:["AZERTYUIOP","QSDFGHJKLM","↵WXCVBNÉÈ⌫"],w5:/^[A-Za-zÀ-ÿ]{5}$/,keyRe:/^[a-zà-ÿ]$/i,
  vf:/amélie|amelie|audrey|aurélie|aurelie|marie|virginie|joëlle|joelle|céline|celine|juliette|denise|eloise|vivienne|female|femme|google français/i,
  vm:/thomas|jacques|nicolas|henri|daniel|rémy|remy|\bmale\b|homme|paul|antoine|claude/i,
  good:/amélie|audrey|aurélie|marie|thomas|jacques|nicolas|denise|henri|vivienne/i,
  ninja:{t:"Genre Ninja",d:"le mı, la mı? — 60 saniye"},
  dl:"Ayarlar → Erişilebilirlik → Seslendirilen İçerik → Sesler → Fransızca. Kadın için <b>Audrey / Amélie (Premium)</b>, erkek için <b>Thomas (Gelişmiş)</b> veya <b>Jacques</b>"},
 it:{code:"it",name:"İtalyanca",si:"İtalyancası",sini:"İtalyancasını",flag:"🇮🇹",brand:"Passo dopo passo",logo:"P",tts:"it-IT",loc:"it-IT",
  artRe:/^(il |lo |la |l'|l’|i |gli |le |un |uno |una |un')/i,nounRe:/^(il |lo |la |l')\p{L}/u,plurRe:null,
  artCls:{il:"m",lo:"m",la:"f",un:"m",uno:"m",una:"f","un'":"f",i:"m",gli:"m",le:"f","l'":""},arts:["il","lo","la","l'"],artName:"artikel",
  kb:["QWERTYUIOP","ASDFGHJKLÈ","↵ZXCVBNMÀÙ⌫"],w5:/^[A-Za-zÀ-ÿ]{5}$/,keyRe:/^[a-zà-ÿ]$/i,
  vf:/alice|federica|paola|emma|isabella|elsa|silvia|chiara|female|donna|google italiano/i,
  vm:/luca|diego|giorgio|cosimo|pietro|\bmale\b|uomo|marco|giuseppe/i,
  good:/alice|federica|paola|luca|emma|silvia/i,
  ninja:{t:"Articolo Ninja",d:"il, lo, la, l' — 60 saniye"},
  dl:"Ayarlar → Erişilebilirlik → Seslendirilen İçerik → Sesler → İtalyanca. Kadın için <b>Alice / Federica (Premium)</b> veya <b>Emma</b>, erkek için <b>Luca (Gelişmiş)</b>"}
};
const LANG=LANGS[window.CUR_LANG]||LANGS.de;
document.documentElement.lang=LANG.code;try{document.title=LANG.brand+" · "+LANG.name;}catch(e){}
const artOf=w=>{const m=String(w).match(LANG.artRe);return m?m[1].trim().toLowerCase().replace("’","'"):"";};
const isNounStr=s=>!!(LANG.nounRe&&LANG.nounRe.test(s)&&!(LANG.plurRe&&LANG.plurRe.test(s)));
