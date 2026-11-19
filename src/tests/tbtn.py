from playwright.sync_api import sync_playwright
with sync_playwright() as p:
    b=p.chromium.launch(executable_path="/usr/bin/google-chrome")
    pg=b.new_page(viewport={"width":390,"height":844})
    pg.add_init_script('localStorage.setItem("schritt-v1",JSON.stringify({onb:true,pass:{"A1-1":1,"A1-2":1,"A1-3":1,"A1-4":1,"A1-5":1}}))')
    pg.goto("file:///home/claude/multi/index.html?lang=de");pg.wait_for_timeout(700)
    pg.evaluate("freeReview(10)");pg.wait_for_timeout(300)
    if pg.query_selector("#inp"):pg.fill("#inp","xx");pg.click("#chk")
    else:pg.click(".opt")
    pg.wait_for_timeout(200);pg.screenshot(path="/tmp/btn.png")
    print(pg.evaluate("[...document.querySelectorAll('#fin,#nx')].map(b=>{const r=b.getBoundingClientRect();return [b.id,b.textContent,Math.round(r.left),Math.round(r.right)]})"))
