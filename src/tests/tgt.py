from playwright.sync_api import sync_playwright
with sync_playwright() as p:
    b=p.chromium.launch(executable_path="/usr/bin/google-chrome")
    pg=b.new_page(viewport={"width":390,"height":844});errs=[];pg.on("pageerror",lambda e:errs.append(str(e)))
    pg.add_init_script('localStorage.setItem("schritt-v1",JSON.stringify({onb:true,pass:{"A1-1":1,"A1-2":1}}))')
    pg.goto("file:///home/claude/multi/index.html?lang=de");pg.wait_for_timeout(900)
    pg.click("[data-tab=games]");pg.wait_for_timeout(400);pg.screenshot(path="/tmp/g0.png")
    pg.evaluate("window.scrollTo(0,900)");pg.wait_for_timeout(300);pg.screenshot(path="/tmp/g1.png")
    print(errs)
