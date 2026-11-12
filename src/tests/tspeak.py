import sys,json
from playwright.sync_api import sync_playwright
MOCK='''window.claude={use:async n=>{if(n==="sample"){let k=0;const f=async(msgs,o)=>{k++;await new Promise(r=>setTimeout(r,150));
 const last=msgs[msgs.length-1].content;window.__LASTP=msgs[0].content;
 if(k===1)return{text:JSON.stringify({say:"Hallo! Wie heißt du?",tr:"Merhaba! Adın ne?",fix:"",tip:"",hint:"Ich heiße Ali."})};
 return{text:'Sure: {"say":"Schön! Woher kommst du?","tr":"Güzel! Nerelisin?","fix":"Ich heiße Ali.","tip":"heißen fiili: ich heiße","hint":"Ich komme aus der Türkei."}'};};return f;}return null;}};'''
with sync_playwright() as p:
    b=p.chromium.launch(executable_path="/usr/bin/google-chrome")
    for L in sys.argv[1:]:
        pg=b.new_page(viewport={"width":390,"height":844});errs=[];pg.on("pageerror",lambda e:errs.append(str(e)))
        pg.add_init_script('localStorage.setItem("schritt-v1'+('' if L=='de' else '-'+L)+'",JSON.stringify({onb:true}));'+MOCK)
        pg.goto(f"file:///home/claude/multi/index.html?lang={L}");pg.wait_for_timeout(900)
        pg.evaluate("tab='games';render()");pg.wait_for_timeout(300);pg.screenshot(path=f"/tmp/sp0_{L}.png")
        pg.click('[data-sp="rep"]');pg.wait_for_timeout(300)
        tgt=pg.evaluate("document.querySelector('.spsent').innerText")
        pg.fill("#spi",tgt);pg.click("#chk");pg.wait_for_timeout(200)
        sc=pg.inner_text(".spsc");pg.screenshot(path=f"/tmp/sp1_{L}.png")
        pg.click("#chk");pg.wait_for_timeout(200)  # devam -> item2 (rep mode all)
        pg.fill("#spi","xx yy");pg.click("#chk");pg.wait_for_timeout(200);sc2=pg.inner_text(".spsc")
        pg.screenshot(path=f"/tmp/sp2_{L}.png")
        pg.click("#sx");pg.wait_for_timeout(200)
        pg.click('[data-sp="chat"]');pg.wait_for_timeout(700)
        pg.fill("#ci","ich heisse ali");pg.click("#csend");pg.wait_for_timeout(700)
        pg.screenshot(path=f"/tmp/sp3_{L}.png")
        n=pg.evaluate("CH&&CH.bub.length");fx=pg.evaluate("CH.bub[1].fix")
        # snack in lesson
        pg.click("#cx");pg.wait_for_timeout(200)
        pg.evaluate("S.snc=1;lesson(0,true)");pg.wait_for_timeout(200)
        has=pg.evaluate("typeof snackDue")
        print(L,"rep:",sc,"|",sc2,"| chat bubbles",n,"fix:",fx,"|",has,errs)
