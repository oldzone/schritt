from playwright.sync_api import sync_playwright
with sync_playwright() as p:
    b=p.chromium.launch(executable_path="/usr/bin/google-chrome")
    pg=b.new_page(viewport={"width":390,"height":844});errs=[];pg.on("pageerror",lambda e:errs.append(str(e)))
    pg.add_init_script('localStorage.setItem("schritt-v1",JSON.stringify({onb:true,pass:{"A1-1":1,"A1-2":1,"A1-3":1,"A1-4":1,"A1-5":1}}))')
    pg.goto("file:///home/claude/multi/index.html?lang=de");pg.wait_for_timeout(800)
    pg.evaluate("freeReview(0)");pg.wait_for_timeout(300)
    got=0
    for i in range(40):
        lab=pg.inner_text(".pill.blue")
        if pg.query_selector("#inp"):pg.fill("#inp","ich weiß nicht");pg.click("#chk")
        else:pg.click(".opt")
        pg.wait_for_timeout(80)
        if "Dönüştür" in lab and got<1:
            got+=1;pg.screenshot(path=f"/tmp/tf{got}.png")
        pg.click("#nx");pg.wait_for_timeout(60)
    print("tf seen",got)
    pg.goto("file:///home/claude/multi/index.html?lang=de");pg.wait_for_timeout(600)
    print(pg.evaluate("unitMore(UNITS[8]).length"), pg.evaluate("unitFocus(UNITS[8])"), pg.evaluate("UNITS[8].t"))
    for k in [20,35,50]:print(UNITS:=pg.evaluate(f"UNITS[{k}].t"),pg.evaluate(f"unitFocus(UNITS[{k}])"))
    print(errs)
