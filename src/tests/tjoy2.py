from playwright.sync_api import sync_playwright
with sync_playwright() as p:
    b=p.chromium.launch(executable_path="/usr/bin/google-chrome")
    pg=b.new_page(viewport={"width":390,"height":844});errs=[];pg.on("pageerror",lambda e:errs.append(str(e)))
    pg.add_init_script('localStorage.setItem("schritt-v1",JSON.stringify({onb:true,name:"Mahsun",pass:{"A1-1":1,"A1-2":1,"A1-3":1,"A1-4":1,"A1-5":1},best:{"A1-1":95,"A1-2":75},xp:340,streak:4,lp:{"A1-6":3},bk:{}}))')
    pg.goto("file:///home/claude/multi/index.html?lang=de");pg.wait_for_timeout(1200)
    pg.evaluate("window.scrollTo(0,520)");pg.wait_for_timeout(300);pg.screenshot(path="/tmp/k0.png")
    pg.evaluate("window.scrollTo(0,1350)");pg.wait_for_timeout(300);pg.screenshot(path="/tmp/k1.png")
    print(pg.evaluate("document.querySelectorAll('.pstep').length"))
    for t in ["bank","review","books"]:
        pg.evaluate(f"tab='{t}';render()");pg.wait_for_timeout(400);pg.screenshot(path=f"/tmp/k_{t}.png")
    pg.evaluate("tab='learn';render()");pg.wait_for_timeout(300)
    pg.click('[data-pk]');pg.wait_for_timeout(400);print(pg.inner_text(".nt"))
    pg.evaluate("tab='learn';render()");pg.wait_for_timeout(300)
    pg.evaluate("segDone(UNITS[5],3,8,()=>{},()=>{})");pg.wait_for_timeout(500);pg.screenshot(path="/tmp/k_seg.png")
    print(errs)
