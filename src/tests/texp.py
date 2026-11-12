from playwright.sync_api import sync_playwright
with sync_playwright() as p:
    b=p.chromium.launch(executable_path="/usr/bin/google-chrome")
    pg=b.new_page();errs=[];pg.on("pageerror",lambda e:errs.append(str(e)))
    pg.add_init_script('if(!localStorage.getItem("schritt-v1")){localStorage.setItem("schritt-v1",JSON.stringify({pass:{"A1-1":1,"A1-2":1},xp:120,streak:3,onb:true}));localStorage.setItem("schritt-v1-fr",JSON.stringify({pass:{"A1-1":1},xp:40,onb:true}));}')
    pg.goto("file:///home/claude/multi/index.html?lang=de");pg.wait_for_timeout(600)
    code=pg.evaluate("packAll()");print("len",len(code))
    pg2=b.new_page();pg2.on("pageerror",lambda e:errs.append(str(e)))
    pg2.goto("file:///home/claude/multi/index.html?lang=de#imp="+code);pg2.wait_for_timeout(900);pg2.screenshot(path="/tmp/imp.png")
    pg2.click("#imok");pg2.wait_for_timeout(1200)
    print(pg2.evaluate("[S.xp,Object.keys(S.pass),JSON.parse(localStorage.getItem('schritt-v1-fr')).xp,location.hash]"),errs)
