from playwright.sync_api import sync_playwright
import sys
with sync_playwright() as p:
    b=p.chromium.launch(executable_path="/usr/bin/google-chrome")
    for L in sys.argv[1:]:
        pg=b.new_page(viewport={"width":390,"height":844});errs=[];pg.on("pageerror",lambda e:errs.append(str(e)))
        key="schritt-v1"+("" if L=="de" else "-"+L)
        pg.add_init_script(f'localStorage.setItem("{key}",JSON.stringify({{onb:true,pass:{{"A1-1":1,"A1-2":1,"A1-3":1}}}}))')
        pg.goto(f"file:///home/claude/multi/index.html?lang={L}");pg.wait_for_timeout(700)
        pg.evaluate("tab='bank';render()");pg.wait_for_timeout(300)
        btn=pg.inner_text("#free")
        pg.click("#free");pg.wait_for_timeout(300)
        kinds={}
        for i in range(30):
            lab=pg.inner_text(".pill.blue");kinds[lab]=kinds.get(lab,0)+1
            if L=="de" and lab not in [k for k in kinds if kinds[k]>1]:pg.screenshot(path=f"/tmp/fr_{i}.png")
            if pg.query_selector("#inp"):
                pg.fill("#inp","xyz");pg.click("#chk")
            else:pg.click(".opt")
            pg.wait_for_timeout(80);pg.click("#nx");pg.wait_for_timeout(80)
        pg.click("#fx");pg.wait_for_timeout(200);sm=pg.inner_text(".h2")
        print(L,btn,kinds,sm,errs)
