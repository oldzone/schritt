from playwright.sync_api import sync_playwright
with sync_playwright() as p:
    b=p.chromium.launch(executable_path="/usr/bin/google-chrome")
    pg=b.new_page();errs=[];pg.on("pageerror",lambda e:errs.append(str(e)))
    pg.add_init_script('if(!localStorage.getItem("schritt-v1"))localStorage.setItem("schritt-v1",JSON.stringify({pass:{"A1-1":1,"A1-2":1,"A1-3":1},xp:300,onb:true}))')
    pg.goto("file:///home/claude/multi/index.html?lang=de");pg.wait_for_timeout(600)
    link="https://oldzone.github.io/schritt/#imp="+pg.evaluate("packAll()")
    q=b.new_page();q.on("pageerror",lambda e:errs.append(str(e)))
    q.add_init_script('if(!localStorage.getItem("schritt-v1"))localStorage.setItem("schritt-v1",JSON.stringify({onb:true}))')
    q.goto("file:///home/claude/multi/index.html?lang=de");q.wait_for_timeout(600)
    q.evaluate("tab='me';render()");q.wait_for_timeout(200);q.click("#imb");q.wait_for_timeout(300)
    q.fill("#iml",link);q.click("#imgo");q.wait_for_timeout(600);q.screenshot(path="/tmp/imp2.png");q.click("#imok");q.wait_for_timeout(1200)
    print(q.evaluate("[S.xp,Object.keys(S.pass).length]"),errs)
