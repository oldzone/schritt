from playwright.sync_api import sync_playwright
import json
with sync_playwright() as p:
    b=p.chromium.launch(executable_path="/usr/bin/google-chrome")
    pg=b.new_page(viewport={"width":375,"height":812})
    errs=[];pg.on("pageerror",lambda e:errs.append(str(e)+" @ "+str(e.stack)[:400]))
    pg.goto("file:///home/claude/multi/index.html");pg.wait_for_timeout(500)
    pg.evaluate("UNITS.slice(0,4).forEach(u=>S.pass[u.key]=1);S.xp=620;S.streak=4;save();tab='learn';render()")
    pg.wait_for_timeout(300);pg.screenshot(path="/tmp/g_learn.png")
    pg.click("#ghub");pg.wait_for_timeout(400);pg.screenshot(path="/tmp/g_hub.png",full_page=True)
    ow=pg.evaluate("document.documentElement.scrollWidth");print("hub width",ow)
    # Ninja
    pg.click('[data-g="ninja"]');pg.wait_for_timeout(300);pg.screenshot(path="/tmp/g_ninja.png")
    for i in range(12):
        a=pg.evaluate("(()=>{const b=document.querySelector('#nc b');return b?b.textContent:''})()")
        art=pg.evaluate("(()=>{const t=document.querySelector('#nc b').textContent;const n=gNouns().find(w=>noArt(w[0])===t);return n?n[0].split(' ')[0]:'der'})()")
        pg.click(f'.njb.{art}');pg.wait_for_timeout(320)
    pg.screenshot(path="/tmp/g_ninja2.png")
    pg.evaluate("GM.timers.forEach(clearInterval);endGame('ninja',120,'test')");pg.wait_for_timeout(300);pg.screenshot(path="/tmp/g_end.png")
    # Rain
    pg.click("#gh");pg.wait_for_timeout(200);pg.click('[data-g="rain"]');pg.wait_for_timeout(1500)
    for i in range(5):
        pg.evaluate("(()=>{const d=document.querySelectorAll('.ropt');})()")
        ans=pg.evaluate("(()=>{const ds=[...document.querySelectorAll('.drop:not(.pop):not(.splash)')];if(!ds.length)return null;return null})()")
        pg.wait_for_timeout(700)
    pg.screenshot(path="/tmp/g_rain.png")
    pg.wait_for_timeout(16000);print("rain state",pg.evaluate("GM&&GM.ended"), pg.evaluate("S.games"))
    pg.screenshot(path="/tmp/g_rain_end.png")
    # Memory
    pg.click("#gh");pg.wait_for_timeout(200);pg.click('[data-g="memory"]');pg.wait_for_timeout(300)
    pg.screenshot(path="/tmp/g_mem.png")
    cards=pg.evaluate("[...document.querySelectorAll('.mcard')].map(b=>b.querySelector('.back').textContent)")
    pairs=pg.evaluate("(()=>{const ws=gWords();return null})()")
    # brute force: flip pairs using internal knowledge not exposed -> try all pairs
    n=len(cards)
    done=set()
    for i in range(n):
        if i in done: continue
        for j in range(i+1,n):
            if j in done: continue
            pg.click(f'.mcard[data-k="{i}"]');pg.click(f'.mcard[data-k="{j}"]');pg.wait_for_timeout(350)
            got=pg.evaluate(f"document.querySelector('.mcard[data-k=\"{i}\"]').classList.contains('got')")
            if got: done|={i,j};break
            pg.wait_for_timeout(800)
        if pg.evaluate("GM&&GM.ended"):break
    pg.wait_for_timeout(1200);print("mem",pg.evaluate("S.games"));pg.screenshot(path="/tmp/g_mem_end.png")
    # Wortle
    pg.click("#gh");pg.wait_for_timeout(200);pg.click('[data-g="wortle"]');pg.wait_for_timeout(300)
    for k in "HALLO": pg.click(f'.wk[data-k="{k}"]')
    pg.click('.wk[data-k="↵"]');pg.wait_for_timeout(1200);pg.click("#wh");pg.screenshot(path="/tmp/g_wortle.png")
    # Hör
    pg.click("#gx");pg.wait_for_timeout(200);pg.click('[data-g="hoer"]');pg.wait_for_timeout(400);pg.screenshot(path="/tmp/g_hoer.png")
    for i in range(10):
        pg.click("#ho .opt");pg.wait_for_timeout(1250)
    pg.wait_for_timeout(500);print("hoer",pg.evaluate("S.games"))
    # Race
    pg.click("#gh");pg.wait_for_timeout(200);pg.click('[data-g="race"]');pg.wait_for_timeout(300);pg.screenshot(path="/tmp/g_race.png")
    for r in range(2):
        n=len(pg.query_selector_all("#bank [data-j]"))
        for j in range(n): pg.click(f'#bank [data-j="{j}"]');pg.wait_for_timeout(40)
        pg.wait_for_timeout(700)
    print("race score",pg.evaluate("document.querySelector('#hud').textContent"))
    pg.screenshot(path="/tmp/g_race2.png")
    pg.click("#gx");pg.wait_for_timeout(300)
    print("dq",pg.evaluate("S.dq"),"badges",pg.evaluate("S.badges"))
    pg.evaluate("S.dq.seg=2;S.dq.read=3;render()");pg.wait_for_timeout(200)
    pg.click("#chest");pg.wait_for_timeout(600);pg.screenshot(path="/tmp/g_chest.png")
    print("freeze",pg.evaluate("S.freeze"),"chest",pg.evaluate("S.dq.chest"))
    # freeze test
    print(pg.evaluate("(()=>{S.last=day()-2;S.streak=5;S.freeze=1;touch();return [S.streak,S.freeze]})()"))
    pg.evaluate("tab='learn';render()");pg.wait_for_timeout(300);pg.screenshot(path="/tmp/g_learn2.png")
    print("errs",errs)
