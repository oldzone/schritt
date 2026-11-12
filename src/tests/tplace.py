# python3 tests/tplace.py LANG : answers correctly through A1..A2, wrong at B1 -> expect B1
from playwright.sync_api import sync_playwright
import sys
L=sys.argv[1]
with sync_playwright() as p:
    b=p.chromium.launch(executable_path="/usr/bin/google-chrome")
    pg=b.new_page(viewport={"width":390,"height":844});errs=[];pg.on("pageerror",lambda e:errs.append(str(e)))
    pg.goto("file:///home/claude/multi/index.html?lang="+L);pg.wait_for_timeout(500)
    # count question types per level
    print(L,pg.evaluate("PL_LV.map(l=>{const q=plQs(l);return l+':'+q.map(x=>x.t).join('')})"))
    pg.evaluate("tab='learn';render()");pg.wait_for_timeout(200);print("card",bool(pg.query_selector("#plst")));pg.screenshot(path=f"/tmp/pl_{L}_card.png");pg.evaluate("placement()");pg.wait_for_timeout(200)
    for i in range(40):
        st=pg.evaluate("PL&&!PL.done&&[PL_LV[PL.li],PL.qi]")
        if not st: break
        if i==3: pg.screenshot(path=f"/tmp/pl_{L}_q.png")
        lv=st[0]
        if lv in("A1","A2"): pg.evaluate("(()=>{const q=PL.qs[PL.qi];const j=q.opts.indexOf(q.ans);document.querySelector(`#plq .opt[data-j='${j}']`).click()})()")
        else: pg.evaluate("document.querySelector('#pldk').click()")
        pg.wait_for_timeout(1000)
    pg.screenshot(path=f"/tmp/pl_{L}_r.png");print(pg.evaluate("JSON.stringify(S.placed)"),errs)
    pg.click("#plgo");pg.wait_for_timeout(300);print("lv",pg.evaluate("S.lv"))
