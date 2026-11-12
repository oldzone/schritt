# python3 tests/tlv.py LANG LEVEL : opens every unit of a level via lesson(gi) and screenshots grammar
from playwright.sync_api import sync_playwright
import sys
L,LVID=sys.argv[1],sys.argv[2]
with sync_playwright() as p:
    b=p.chromium.launch(executable_path="/usr/bin/google-chrome")
    pg=b.new_page(viewport={"width":390,"height":844})
    errs=[];pg.on("pageerror",lambda e:errs.append(str(e)))
    pg.goto("file:///home/claude/multi/index.html?lang="+L);pg.wait_for_timeout(400)
    idx=pg.evaluate(f"(()=>{{let g=0,r=[];for(const l of LV){{for(const u of l.units){{if(l.id==='{LVID}')r.push(g);g++}}}}return r}})()")
    for k,gi in enumerate(idx):
        pg.evaluate(f"lesson({gi})");pg.wait_for_timeout(120)
        if k==0: pg.screenshot(path=f"/tmp/lv_{L}_{LVID}.png",full_page=True)
        txt=pg.inner_text("body")[:80].replace("\n"," | ")
    print(L,LVID,len(idx),"units ok, errors:",errs[:3])
    b.close()
