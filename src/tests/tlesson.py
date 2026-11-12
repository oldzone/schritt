from playwright.sync_api import sync_playwright
import json
with sync_playwright() as p:
    b=p.chromium.launch(executable_path="/usr/bin/google-chrome")
    pg=b.new_page(viewport={"width":390,"height":844})
    errs=[];pg.on("pageerror",lambda e:errs.append(str(e)))
    import sys
    L=sys.argv[1] if len(sys.argv)>1 else "de"
    pg.goto("file:///home/claude/multi/index.html?lang="+L);pg.wait_for_timeout(400)
    pg.screenshot(path="/tmp/l0.png")
    pg.evaluate("if(window.ONB){S.onb=true;window.ONB=false;IN_LESSON=false;tab='learn';render()}");pg.click("#go");pg.wait_for_timeout(200);pg.screenshot(path="/tmp/l1.png",full_page=True)
    pg.click("#nx");pg.wait_for_timeout(200);pg.screenshot(path="/tmp/l2.png",full_page=True)
    shots=0;types={};wrong=1
    for step in range(400):
        if pg.query_selector("#spi"):
            snk=globals().get("snk",0)+1;globals()["snk"]=snk
            if snk==1: pg.screenshot(path="/tmp/snack.png")
            pg.click("#skip");pg.wait_for_timeout(60);continue
        if pg.query_selector("#nx") and not pg.query_selector(".opt") and not pg.query_selector("#bank"):
            pg.click("#nx");pg.wait_for_timeout(30);continue
        if pg.query_selector(".mt2"):
            n=len(pg.query_selector_all(".mcol:first-child .mt2"))
            for i in range(n):
                l=pg.query_selector(f'.mcol:first-child .mt2[data-i="{i}"]');r=pg.query_selector(f'.mcol:last-child .mt2[data-i="{i}"]')
                l.click();r.click();pg.wait_for_timeout(30)
            if shots<1: pg.screenshot(path="/tmp/match.png");shots+=1
            pg.click("#go");pg.wait_for_timeout(30);continue
        q=pg.evaluate("window.__q&&{t:window.__q.t,ans:window.__q.ans,tokens:window.__q.tokens||null}")
        if pg.query_selector(".opt") or pg.query_selector("#bank") or pg.query_selector("#inp"):
            t=q["t"];types[t]=types.get(t,0)+1
            if types[t]==1: pg.screenshot(path=f"/tmp/ex_{L}_{t}.png")
            if pg.query_selector(".opt"):
                if wrong and t=="de2tr":
                    pg.click(f'.opt:not([data-o="{q["ans"]}"])');wrong=0
                    pg.screenshot(path="/tmp/wrong.png")
                else:
                    pg.evaluate("a=>{[...document.querySelectorAll('.opt')].find(x=>x.dataset.o===a).click()}",q["ans"])
            elif pg.query_selector("#bank"):
                ans=q["ans"].split(" ");used=set()
                for tok in ans:
                    els=pg.query_selector_all("#bank .tile:not(.used)")
                    for el in els:
                        if el.inner_text()==tok: el.click();break
                pg.click("#chk")
            else:
                pg.fill("#inp",q["ans"]);pg.click("#chk")
            pg.wait_for_timeout(30)
            if pg.query_selector("#go"): pg.click("#go");pg.wait_for_timeout(30)
            continue
        if pg.query_selector("#h") and not pg.query_selector(".opt"): break
    pg.screenshot(path="/tmp/done.png")
    st=pg.evaluate("JSON.stringify({pass:S.pass,best:S.best,lp:S.lp,xp:S.xp})")
    print(types,st,errs)
    # resume test: start lesson 2, exit after grammar+1 intro
    pg.click("#h");pg.wait_for_timeout(100)
    pg.click("#go");pg.click("#nx");pg.wait_for_timeout(50);pg.click("#nb");pg.wait_for_timeout(100)
    pg.reload();pg.wait_for_timeout(400);pg.screenshot(path="/tmp/resume.png")
    print(pg.evaluate("JSON.stringify(S.lp)"),errs)
    b.close()
