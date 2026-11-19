from playwright.sync_api import sync_playwright
with sync_playwright() as p:
    b=p.chromium.launch(executable_path="/usr/bin/google-chrome")
    pg=b.new_page(viewport={"width":390,"height":844})
    pg.add_init_script('localStorage.setItem("schritt-v1",JSON.stringify({onb:true}))')
    pg.goto("file:///home/claude/multi/index.html?lang=de");pg.wait_for_timeout(700)
    pg.evaluate("verbQuiz(10)");pg.wait_for_timeout(200)
    if pg.query_selector("#vin"):pg.fill("#vin","x");pg.click("#vchk")
    else:pg.click(".opt")
    pg.wait_for_timeout(200)
    print(pg.evaluate("[...document.querySelectorAll('#vnx,#ab')].map(b=>{const r=b.getBoundingClientRect();return [b.id,Math.round(r.top),Math.round(r.bottom),getComputedStyle(b).position]})"))
    print(pg.evaluate("[...document.querySelectorAll('#fin,#ab')].length"))
