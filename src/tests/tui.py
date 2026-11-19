from playwright.sync_api import sync_playwright
import sys
out=sys.argv[1] if len(sys.argv)>1 else "u"
with sync_playwright() as p:
    b=p.chromium.launch(executable_path="/usr/bin/google-chrome")
    pg=b.new_page(viewport={"width":390,"height":844},device_scale_factor=1);errs=[];pg.on("pageerror",lambda e:errs.append(str(e)))
    pg.add_init_script('localStorage.setItem("schritt-v1",JSON.stringify({onb:true,pass:{"A1-1":1,"A1-2":1},best:{"A1-1":95,"A1-2":80},xp:340,streak:4,lp:{"A1-3":2}}))')
    pg.goto("file:///home/claude/multi/index.html?lang=de");pg.wait_for_timeout(800)
    tabs=pg.evaluate("[...document.querySelectorAll('#tabs [data-t], #tabs button')].map(b=>b.dataset.t||b.textContent)")
    print(tabs)
    for t in ["learn","bank","review","games","books","dict","me"]:
        try:pg.evaluate(f"tab='{t}';render()");pg.wait_for_timeout(350);pg.screenshot(path=f"/tmp/{out}_{t}.png")
        except Exception as e:print(t,e)
    pg.evaluate("tab='learn';render()");pg.wait_for_timeout(300)
    pg.evaluate("document.querySelector('.unit, [data-u], .node')&&document.querySelector('.unit, [data-u], .node').click()");pg.wait_for_timeout(500);pg.screenshot(path=f"/tmp/{out}_lesson0.png")
    print(errs)
