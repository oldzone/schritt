from playwright.sync_api import sync_playwright
with sync_playwright() as p:
    b=p.chromium.launch(executable_path="/usr/bin/google-chrome")
    pg=b.new_page(viewport={"width":390,"height":844});errs=[];pg.on("pageerror",lambda e:errs.append(str(e)))
    pg.add_init_script('localStorage.setItem("schritt-v1",JSON.stringify({onb:true}))')
    pg.goto("file:///home/claude/multi/index.html?lang=de");pg.wait_for_timeout(700)
    pg.evaluate("sheet(unitMore(UNITS[30]))");pg.wait_for_timeout(300)
    for k in range(3):pg.evaluate(f"document.querySelector('.sheet').scrollTop={k}*1400");pg.screenshot(path=f"/tmp/um{k}.png")
    print(errs)
