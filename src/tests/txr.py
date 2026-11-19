from playwright.sync_api import sync_playwright
import json,sys
S=["Ich kaufe einen Apfel.","Morgen fahre ich mit dem Zug nach Berlin.","Ich rufe dich heute Abend an.","Kannst du mir bitte helfen?","Wo wohnst du?","Ich habe gestern einen Film gesehen.","Er ist um sieben Uhr aufgestanden.","Ich lerne Deutsch, weil ich in Wien arbeiten möchte.","Das Buch liegt auf dem Tisch.","Ich lege das Buch auf den Tisch.","Sie hat keine Zeit.","Wir gehen heute nicht ins Kino.","Ich wasche mich jeden Morgen.","Der Mann, der dort steht, ist mein Vater.","Ich gebe meiner Mutter ein Geschenk.","Komm schnell!","Ich würde gern nach Italien fahren.","Das Haus wurde 1990 gebaut.","Ich fahre morgen in die Stadt, um einzukaufen.","Meine Schwester studiert Medizin in München."]
with sync_playwright() as p:
    b=p.chromium.launch(executable_path="/usr/bin/google-chrome")
    pg=b.new_page(viewport={"width":390,"height":844});errs=[];pg.on("pageerror",lambda e:errs.append(str(e)));pg.on("console",lambda m:errs.append(m.text) if m.type=="error" else None)
    pg.add_init_script('localStorage.setItem("schritt-v1",JSON.stringify({onb:true}))')
    pg.goto("file:///home/claude/multi/index.html?lang=de");pg.wait_for_timeout(800)
    for s in S:
        r=pg.evaluate("""s=>{const a=xAnalyze(s);const m=a.main;return {roles:a.T.map(t=>t.w+':'+xRoleOf(t)+(t.np&&t.np.c?'/'+t.np.c+(t.np.g||''):'')+(t.verb?'['+t.verb.inf+']':'')).join(' '),tense:a.clauses.map(c=>c.tense+(c.sub?'('+c.sub+')':'')).join('|'),ty:a.ty,p:m.fin?m.fin.person:null,key:xKey(a).join(','),var:xVariants(a).map(v=>v.s),sib:xSiblings(a,3).list.map(o=>o.s)}}""",s)
        print(s);print("  ",r['roles']);print("  ",r['ty'],r['tense'],'p',r['p'],'|',r['key']);[print("   v:",v) for v in r['var']];print("   sib:",r['sib'])
    print(errs[:5])
