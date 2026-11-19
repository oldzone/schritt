from playwright.sync_api import sync_playwright
with sync_playwright() as p:
    b=p.chromium.launch(executable_path="/usr/bin/google-chrome")
    pg=b.new_page(viewport={"width":390,"height":844});errs=[];pg.on("pageerror",lambda e:errs.append(str(e)))
    pg.add_init_script('localStorage.setItem("schritt-v1",JSON.stringify({onb:true,name:"Mahsun",pass:{"A1-1":1,"A1-2":1},best:{"A1-1":95,"A1-2":75},xp:340,streak:4,lp:{"A1-3":2}}))')
    pg.goto("file:///home/claude/multi/index.html?lang=de");pg.wait_for_timeout(1200)
    pg.evaluate("window.scrollTo(0,0)");pg.wait_for_timeout(200);pg.screenshot(path="/tmp/j0.png")
    pg.evaluate("window.scrollTo(0,700)");pg.wait_for_timeout(300);pg.screenshot(path="/tmp/j1.png")
    pg.evaluate("lesson(4)");pg.wait_for_timeout(600)
    shot=0
    for i in range(30):
        if pg.query_selector("#nx") and not pg.query_selector("#ab.ok,#ab.bad"):pg.click("#nx");pg.wait_for_timeout(150);continue
        if pg.query_selector(".opt"):pg.click(".opt");pg.wait_for_timeout(250)
        elif pg.query_selector("#inp"):pg.fill("#inp","x");pg.click("#chk");pg.wait_for_timeout(250)
        elif pg.query_selector("#bank [data-j]"):pg.click("#bank [data-j]");pg.click("#chk");pg.wait_for_timeout(250)
        if pg.query_selector("#ab.ok,#ab.bad") and shot<2:pg.screenshot(path=f"/tmp/jf{shot}.png");shot+=1
        g=pg.query_selector("#go")
        if g:g.click();pg.wait_for_timeout(150)
    pg.evaluate("comboToast(5)");pg.wait_for_timeout(400);pg.screenshot(path="/tmp/jc.png")
    print(errs)
