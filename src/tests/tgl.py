from playwright.sync_api import sync_playwright
with sync_playwright() as p:
    b=p.chromium.launch(executable_path="/usr/bin/google-chrome")
    pg=b.new_page(viewport={"width":390,"height":844});errs=[];pg.on("pageerror",lambda e:errs.append(str(e)))
    pg.add_init_script('localStorage.setItem("schritt-v1",JSON.stringify({onb:true,pass:{"A1-1":1,"A1-2":1,"A1-3":1}}))')
    pg.goto("file:///home/claude/multi/index.html?lang=de");pg.wait_for_timeout(700)
    pg.evaluate("tab='bank';render()");pg.wait_for_timeout(300)
    pg.evaluate("freeReview(0)");pg.wait_for_timeout(300)
    hit=0
    for i in range(15):
        if pg.query_selector("#inp"):pg.fill("#inp","xyz");pg.click("#chk")
        else:pg.click(".opt")
        pg.wait_for_timeout(100)
        tw=pg.query_selector_all("#ab .tw")
        if tw:
            tw[0].click();pg.wait_for_timeout(150);ys=pg.query_selector_all("#ab .ybtn");hit2=len(ys)
            if pg.query_selector("#gloss"):
                hit+=1
                pg.screenshot(path=f"/tmp/gl{hit}.png")
        pg.click("#nx");pg.wait_for_timeout(100)
        assert not pg.query_selector("#gloss")
    print("hits",hit,errs)
