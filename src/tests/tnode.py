from playwright.sync_api import sync_playwright
with sync_playwright() as p:
    b=p.chromium.launch(executable_path="/usr/bin/google-chrome")
    pg=b.new_page(viewport={"width":390,"height":844},device_scale_factor=2)
    pg.add_init_script('localStorage.setItem("schritt-v1",JSON.stringify({onb:true,name:"Mahsun",pass:{"A1-1":1,"A1-2":1,"A1-3":1},best:{"A1-1":95,"A1-2":75,"A1-3":60},xp:340,streak:4,lp:{"A1-4":3}}))')
    pg.goto("file:///home/claude/multi/index.html?lang=de");pg.wait_for_timeout(1200)
    pg.evaluate("document.querySelectorAll('.toast').forEach(t=>t.remove());window.scrollTo(0,330)");pg.wait_for_timeout(300);pg.screenshot(path="/tmp/n0.png")
    pg.evaluate("window.scrollTo(0,1100)");pg.wait_for_timeout(300);pg.screenshot(path="/tmp/n1.png")
