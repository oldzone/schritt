# mock claude.use db; checks save reaches db on hide, retry after failure, and fresh second user gets own doc
from playwright.sync_api import sync_playwright
mock='''(()=>{const store=window.__DB={};let fail=%d;const uid="%s";
const doc=p=>({get:async()=>{if(fail>0){fail--;throw {code:"unavailable"};}return {exists:p in store,data:()=>store[p]}},set:async d=>{store[p]=d;}});
window.claude={use:async n=>n==="db"?{doc}:n==="user"?{id:async()=>uid,me:async()=>({name:"Test"})}:null};})();'''
with sync_playwright() as p:
    b=p.chromium.launch(executable_path="/usr/bin/google-chrome")
    for fail,uid in [(0,"u_wife"),(2,"u2")]:
        pg=b.new_page(viewport={"width":390,"height":844});errs=[];pg.on("pageerror",lambda e:errs.append(str(e)))
        pg.add_init_script(mock%(fail,uid));pg.goto("file:///home/claude/multi/index.html?lang=de");pg.wait_for_timeout(1500)
        pg.evaluate("if(window.ONB){S.onb=true;window.ONB=false;IN_LESSON=false;tab='learn';render()}")
        print(uid,"note shown:",bool(pg.query_selector("text=sadece bu cihazda")) or bool(pg.query_selector("text=kaydedilemiyor")))
        pg.wait_for_timeout(fail*4000+1500)
        pg.evaluate("S.pass['A1-1']=1;S.xp=(S.xp||0)+10;save();document.dispatchEvent(new Event('visibilitychange'));flushNow()");pg.wait_for_timeout(400)
        print(uid,"SYNC",pg.evaluate("SYNC"),"db keys",pg.evaluate("Object.keys(window.__DB)"),"saved pass",pg.evaluate("Object.values(window.__DB).map(d=>JSON.parse(d.s).pass||null)"),errs)
