import sys
from playwright.sync_api import sync_playwright
L=sys.argv[1]
with sync_playwright() as p:
    b=p.chromium.launch(executable_path="/usr/bin/google-chrome")
    pg=b.new_page(viewport={"width":390,"height":844})
    errs=[];pg.on("pageerror",lambda e:errs.append(str(e)))
    pg.goto(f"file:///home/claude/multi/index.html?lang={L}");pg.wait_for_timeout(600)
    pg.evaluate("UNITS.slice(0,7).forEach(u=>S.pass[u.key]=1);save();tab='learn';render()");pg.wait_for_timeout(300)
    pg.screenshot(path=f"/tmp/{L}_learn.png")
    print("nouns",pg.evaluate("gNouns().length"),pg.evaluate("gNouns().slice(0,8).map(w=>w[0])"))
    pg.evaluate("tab='games';render()");pg.wait_for_timeout(300);pg.screenshot(path=f"/tmp/{L}_games.png")
    if pg.query_selector('[data-g="ninja"]'):
        pg.click('[data-g="ninja"]');pg.wait_for_timeout(300)
        for i in range(6):
            a=pg.evaluate("(()=>{const t=document.querySelector('#nc b').textContent;const n=gNouns().find(w=>noArt(w[0])===t);return n?artOf(n[0]):LANG.arts[0]})()")
            pg.click(f'.njb[data-a="{a}"]');pg.wait_for_timeout(320)
        pg.screenshot(path=f"/tmp/{L}_ninja.png")
        pg.evaluate("stopGame()")
    pg.evaluate("lesson(5)");pg.wait_for_timeout(300);pg.screenshot(path=f"/tmp/{L}_g6.png",full_page=True)
    pg.evaluate("tab='conj';render()");pg.wait_for_timeout(300);pg.screenshot(path=f"/tmp/{L}_conj.png")
    print(pg.evaluate("document.querySelector('#ninja')?1:0"),errs)
