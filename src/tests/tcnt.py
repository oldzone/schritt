from playwright.sync_api import sync_playwright
with sync_playwright() as p:
    b=p.chromium.launch(executable_path="/usr/bin/google-chrome")
    for L in ["de","en","fr","it"]:
        pg=b.new_page();pg.goto(f"file:///home/claude/multi/index.html?lang={L}");pg.wait_for_timeout(700)
        print(L,pg.evaluate("""()=>{const n=x=>lk(noArt(x));const U=new Set(UNITS.flatMap(u=>u.w.map(w=>n(w[0]))));const B=new Set(BW.map(w=>n(w.fr)));const all=new Set([...U,...B]);
          const lvB={};BANK.forEach(c=>{lvB[c.lv]=(lvB[c.lv]||0)+c.items.length});return {units:U.size,bank:B.size,union:all.size,lex:LEX.size,bankByLv:lvB}}"""))
        pg.close()
