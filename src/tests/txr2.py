from playwright.sync_api import sync_playwright
with sync_playwright() as p:
    b=p.chromium.launch(executable_path="/usr/bin/google-chrome")
    pg=b.new_page(viewport={"width":390,"height":844});errs=[];pg.on("pageerror",lambda e:errs.append(str(e)))
    pg.add_init_script('localStorage.setItem("schritt-v1",JSON.stringify({onb:true}))')
    pg.goto("file:///home/claude/multi/index.html?lang=de");pg.wait_for_timeout(800)
    pg.evaluate("structSheet('Morgen fahre ich mit dem Zug nach Berlin.')");pg.wait_for_timeout(600)
    print(pg.evaluate("xSiblings(xAnalyze('Morgen fahre ich mit dem Zug nach Berlin.'),4).list.map(o=>o.s)"))
    sh=pg.query_selector(".sheet");
    for k in range(4):
        pg.screenshot(path=f"/tmp/x{k}.png");pg.evaluate(f"document.querySelector('.sheet').scrollTop={k+1}*760")
    pg.click("#xdrill");pg.wait_for_timeout(300);pg.fill("#xin","Morgen fährt er mit Zug nach Berlin.");pg.click("#xok");pg.wait_for_timeout(300);pg.evaluate("document.querySelector('.sheet').scrollTop=0");pg.screenshot(path="/tmp/xd.png")
    for L,s in [("en","I have been working here since 2020."),("fr","Je ne mange pas de viande."),("it","Ho comprato un libro ieri.")]:
        pg.goto(f"file:///home/claude/multi/index.html?lang={L}");pg.wait_for_timeout(700);pg.evaluate(f"structSheet({s!r})");pg.wait_for_timeout(400);pg.screenshot(path=f"/tmp/x{L}.png")
    print(errs)
