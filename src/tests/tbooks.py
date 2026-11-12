import sys
from playwright.sync_api import sync_playwright
with sync_playwright() as p:
    b=p.chromium.launch(executable_path="/usr/bin/google-chrome")
    for L in sys.argv[1:]:
        pg=b.new_page(viewport={"width":390,"height":844});errs=[];pg.on("pageerror",lambda e:errs.append(str(e)))
        pg.add_init_script('localStorage.setItem("schritt-v1'+('' if L=='de' else '-'+L)+'",JSON.stringify({onb:true}))')
        pg.goto(f"file:///home/claude/multi/index.html?lang={L}");pg.wait_for_timeout(500)
        pg.evaluate("tab='books';render()");pg.wait_for_timeout(300);pg.screenshot(path=f"/tmp/bk_{L}.png",full_page=True)
        ids=pg.evaluate("BOOKS.filter(b=>b.lv!=='A1').map(b=>b.id)")
        for i in ids: pg.evaluate(f"reader('{i}')");pg.wait_for_timeout(150)
        pg.evaluate(f"reader('{ids[-1]}')");pg.wait_for_timeout(200)
        w=pg.query_selector(".tw");w.click();pg.wait_for_timeout(200);pg.screenshot(path=f"/tmp/rd_{L}.png")
        print(L,len(ids),errs)
