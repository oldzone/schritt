import sys
from playwright.sync_api import sync_playwright
MOCK='''window.claude={use:async n=>{if(n==="sample"){let k=0;const f=async(msgs,o)=>{k++;await new Promise(r=>setTimeout(r,120));window.__M=msgs;
 const P=msgs[0].content;
 if(P.includes("vocabulary drill"))return{text:JSON.stringify(k===1?{say:"Hallo! Was trinkst du morgens?",tr:"Sabah ne içersin?",word:"der Kaffee",wtr:"kahve",used:null,fix:"",tip:"",hint:"Ich trinke Kaffee."}:{say:"Super! Wo wohnst du?",tr:"",word:"die Stadt",wtr:"şehir",used:true,fix:"",tip:"",hint:""})};
 if(msgs[msgs.length-1].content.includes("hung up"))return{text:'{"sum":"Çok iyiydin."}'};
 return{text:JSON.stringify({say:k===1?"Hallo? Wie geht es dir?":"Toll! Was machst du heute?",tr:"Nasılsın?",fix:k>1?"Mir geht es gut.":"",tip:k>1?"gehen fiili":""})};};return f;}return null;}};'''
with sync_playwright() as p:
    b=p.chromium.launch(executable_path="/usr/bin/google-chrome")
    pg=b.new_page(viewport={"width":390,"height":844});errs=[];pg.on("pageerror",lambda e:errs.append(str(e)))
    pg.add_init_script('localStorage.setItem("schritt-v1",JSON.stringify({onb:true,pass:{"A1-1":1,"A1-2":1}}));'+MOCK)
    pg.goto("file:///home/claude/multi/index.html?lang=de");pg.wait_for_timeout(900)
    pg.evaluate("tab='games';render()");pg.wait_for_timeout(300);pg.screenshot(path="/tmp/c0.png")
    pg.click('[data-sp="call"]');pg.wait_for_timeout(600);
    pg.evaluate("callSend('mir gehts gut')");pg.wait_for_timeout(500);pg.screenshot(path="/tmp/c1.png")
    pg.evaluate("callSend('ich arbeite')");pg.wait_for_timeout(500)
    pg.click("#clend");pg.wait_for_timeout(600);pg.screenshot(path="/tmp/c2.png")
    pg.evaluate("document.querySelector('.sheetbg')&&document.querySelector('.sheetbg').click()");pg.wait_for_timeout(300)
    pg.evaluate("tab='games';render()");pg.wait_for_timeout(200)
    pg.click('[data-sp="words"]');pg.wait_for_timeout(500);pg.fill("#ci","ich trinke kafee");pg.click("#csend");pg.wait_for_timeout(500);pg.screenshot(path="/tmp/c3.png")
    print(pg.evaluate("CH.good"),errs)
    # typo tolerance
    print(pg.evaluate("[nearEq('der Tish','der Tisch'),nearEq('die Tisch','der Tisch'),nearEq('Kafee','Kaffee'),nearEq('Haus','Hund'),wcompare('Ich trinke Kaffee','ich trinke kafee').sc]"))
