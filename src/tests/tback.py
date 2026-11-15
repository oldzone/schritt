from playwright.sync_api import sync_playwright
with sync_playwright() as p:
    b=p.chromium.launch(executable_path="/usr/bin/google-chrome");pg=b.new_page(viewport={"width":390,"height":844});errs=[];pg.on("pageerror",lambda e:errs.append(str(e)))
    pg.add_init_script('localStorage.setItem("schritt-v1",JSON.stringify({onb:true,nosnk:1}))')
    pg.goto("file:///home/claude/multi/index.html?lang=de");pg.wait_for_timeout(800)
    pg.evaluate("lesson(0,true)");pg.wait_for_timeout(200)
    def nt(): return pg.inner_text(".nt")
    log=[]
    for i in range(6):
        if pg.query_selector("#nx"): pg.click("#nx")
        elif pg.query_selector(".opt"): pg.click(".opt");pg.wait_for_timeout(80);pg.click("#go")
        elif pg.query_selector("#skip"): pg.click("#skip");pg.wait_for_timeout(80);pg.click("#go")
        elif pg.query_selector("#bank .tile"): pg.click("#bank .tile");pg.click("#chk");pg.wait_for_timeout(80);pg.click("#go")
        pg.wait_for_timeout(120)
    cur=pg.inner_text(".page")[:40]
    pg.click("#hb");pg.wait_for_timeout(150);log.append(("back1",nt()))
    pg.click("#hb");pg.wait_for_timeout(150);log.append(("back2",nt()))
    pg.screenshot(path="/tmp/back.png")
    # go forward twice
    for i in range(2):
        if pg.query_selector("#nx"): pg.click("#nx")
        elif pg.query_selector(".opt"): pg.click(".opt");pg.wait_for_timeout(80);pg.click("#go")
        elif pg.query_selector("#skip"): pg.click("#skip");pg.wait_for_timeout(80);pg.click("#go")
        elif pg.query_selector("#bank .tile"): pg.click("#bank .tile");pg.click("#chk");pg.wait_for_timeout(80);pg.click("#go")
        pg.wait_for_timeout(150)
    log.append(("fwd",nt(),pg.inner_text(".page")[:40]==cur))
    print(log,errs)
