from playwright.sync_api import sync_playwright
with sync_playwright() as p:
    b=p.chromium.launch(executable_path="/usr/bin/google-chrome")
    pg=b.new_page();errs=[];pg.on("pageerror",lambda e:errs.append(str(e)))
    pg.goto("file:///home/claude/multi/index.html?lang=de");pg.wait_for_timeout(700);print(errs)
