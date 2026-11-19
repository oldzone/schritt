from playwright.sync_api import sync_playwright
with sync_playwright() as p:
    b=p.chromium.launch(executable_path="/usr/bin/google-chrome")
    pg=b.new_page(viewport={"width":390,"height":844});errs=[];pg.on("pageerror",lambda e:errs.append(str(e)))
    pg.add_init_script('localStorage.setItem("schritt-v1",JSON.stringify({onb:true,pass:{"A1-1":1,"A1-2":1,"A1-3":1},games:{ninja:120}}))')
    pg.goto("file:///home/claude/multi/index.html?lang=de");pg.wait_for_timeout(900)
    pg.click("[data-tab=games]");pg.wait_for_timeout(300);pg.evaluate("document.querySelector('.ggrid').scrollIntoView()");pg.wait_for_timeout(300);pg.screenshot(path="/tmp/gg.png")
    pg.click("[data-g=ninja]");pg.wait_for_timeout(400);pg.screenshot(path="/tmp/gi.png")
    pg.click("#gigo");pg.wait_for_timeout(2600);pg.wait_for_timeout(1500);pg.screenshot(path="/tmp/gp.png")
    pg.evaluate("endGame('ninja',90,'5/7 doğru')");pg.wait_for_timeout(900);pg.screenshot(path="/tmp/ge.png")
    pg.evaluate("startGame('memory',1)");pg.wait_for_timeout(2200);pg.screenshot(path="/tmp/gm.png")
    print(errs)
