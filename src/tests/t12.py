from playwright.sync_api import sync_playwright
with sync_playwright() as p:
    b=p.chromium.launch(executable_path="/usr/bin/google-chrome")
    pg=b.new_page(viewport={"width":390,"height":844});errs=[];pg.on("pageerror",lambda e:errs.append(str(e)))
    pg.goto("file:///home/claude/multi/index.html");pg.wait_for_timeout(300)
    pg.evaluate("S.theme='okyanus';applyTheme();tab='books';render()");pg.wait_for_timeout(900);pg.screenshot(path="/tmp/k1.png")
    pg.click('[data-book="a1-familie"]');pg.wait_for_timeout(500);pg.screenshot(path="/tmp/k2.png")
    pg.click("#nx");pg.wait_for_timeout(500)
    pg.click(".rtext .tw >> nth=6");pg.wait_for_timeout(300);pg.screenshot(path="/tmp/k3.png")
    pg.click("#pl");pg.wait_for_timeout(400);pg.screenshot(path="/tmp/k4.png")
    pg.click("#pl");pg.click("#nb");pg.wait_for_timeout(400);pg.screenshot(path="/tmp/k5.png")
    print(pg.evaluate("JSON.stringify(S.bk)"),errs);b.close()
