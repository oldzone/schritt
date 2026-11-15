import sys
from playwright.sync_api import sync_playwright
with sync_playwright() as p:
    b=p.chromium.launch(executable_path="/usr/bin/google-chrome")
    for L in sys.argv[1:]:
        pg=b.new_page(viewport={"width":390,"height":844});errs=[];pg.on("pageerror",lambda e:errs.append(str(e)))
        key="schritt-v1"+("" if L=="de" else "-"+L)
        pg.add_init_script(f'localStorage.setItem("{key}",JSON.stringify({{onb:true,pass:{{"A1-1":1,"A1-2":1,"A1-3":1,"A1-4":1}}}}))')
        pg.goto(f"file:///home/claude/multi/index.html?lang={L}");pg.wait_for_timeout(700)
        res={}
        # hang: press keys until end
        pg.evaluate("startGame('hang')");pg.wait_for_timeout(200)
        for i in range(200):
            if pg.query_selector(".gscore"):break
            ks=pg.query_selector_all("#kb .wk:not([disabled])")
            if not ks: pg.wait_for_timeout(500);continue
            ks[0].click();pg.wait_for_timeout(30)
        pg.wait_for_timeout(2500);res["hang"]=pg.inner_text(".gscore") if pg.query_selector(".gscore") else "?"
        if L=="de":pg.evaluate("startGame('hang')");pg.wait_for_timeout(300);pg.screenshot(path="/tmp/g_hang.png")
        pg.evaluate("startGame('tf')");pg.wait_for_timeout(300)
        if L=="de":pg.screenshot(path="/tmp/g_tf.png")
        for i in range(15):
            pg.click("#ty");pg.wait_for_timeout(1900)
        res["tf"]=pg.inner_text(".gscore") if pg.query_selector(".gscore") else "?"
        pg.evaluate("startGame('blank')");pg.wait_for_timeout(300)
        if L=="de":pg.screenshot(path="/tmp/g_blank.png")
        n=pg.evaluate("document.querySelectorAll('#bo .opt').length")
        pg.evaluate("startGame('search')");pg.wait_for_timeout(300)
        if L=="de":pg.screenshot(path="/tmp/g_search.png")
        # solve search using internal? click hint & first/last cells via placed not exposed; just verify grid
        cells=pg.evaluate("document.querySelectorAll('.wsc').length")
        pg.evaluate("startGame('rain')");pg.wait_for_timeout(1500);pg.evaluate("stopGame()")
        print(L,res,"blank opts",n,"cells",cells,errs)
