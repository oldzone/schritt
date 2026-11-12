import sys,json
from playwright.sync_api import sync_playwright
lang=sys.argv[1]
with sync_playwright() as p:
    b=p.chromium.launch(executable_path="/usr/bin/google-chrome")
    pg=b.new_page()
    errs=[];pg.on("pageerror",lambda e:errs.append(str(e)))
    pg.goto(f"file:///home/claude/multi/index.html?lang={lang}");pg.wait_for_timeout(600)
    r=pg.evaluate("""(()=>{const miss={};BOOKS.forEach(b=>b.p.forEach(pg=>{const ws=toks(pg).filter(isW);ws.forEach(w=>{const k=lk(w);if(/^\\d/.test(k))return;if(!findLex(w))miss[k]=(miss[k]||0)+1;});}));return Object.keys(miss).sort();})()""")
    print(len(r));open(f"/tmp/miss_{lang}.txt","w").write("\n".join(r))
    print("LANG",pg.evaluate("LANG.code"),"units",pg.evaluate("UNITS.length"),"books",pg.evaluate("BOOKS.length"),"conj",pg.evaluate("CONJ.length"),errs)
