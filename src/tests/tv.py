from playwright.sync_api import sync_playwright
mock="""(()=>{const vs=[["Eddy (Deutsch (Deutschland))","de-DE"],["Flo (Deutsch (Deutschland))","de-DE"],["Anna","de-DE"],["Anna (Premium)","de-DE"],["Markus (Erweitert)","de-DE"],["Yannick (Premium)","de-DE"],["Grandpa (Deutsch (Deutschland))","de-DE"],["Samantha","en-US"]].map(([name,lang])=>({name,lang,localService:true,default:false}));
speechSynthesis.getVoices=()=>vs;window.__said=[];const sp=speechSynthesis.speak.bind(speechSynthesis);speechSynthesis.speak=u=>{__said.push([u.voice&&u.voice.name,u.rate,u.text]);};})()"""
with sync_playwright() as p:
    b=p.chromium.launch(executable_path="/usr/bin/google-chrome")
    pg=b.new_page(viewport={"width":375,"height":812})
    errs=[];pg.on("pageerror",lambda e:errs.append(str(e)))
    pg.add_init_script(mock)
    pg.goto("file:///home/claude/multi/index.html");pg.wait_for_timeout(700)
    print("default",pg.evaluate("voice&&voice.name"))
    pg.evaluate("tab='me';render()");pg.wait_for_timeout(300)
    el=pg.query_selector(".vseg");el.scroll_into_view_if_needed();pg.screenshot(path="/tmp/v1.png")
    pg.click('[data-vg="m"]');pg.wait_for_timeout(400);print("male",pg.evaluate("voice.name"),pg.evaluate("__said"))
    pg.query_selector(".vseg").scroll_into_view_if_needed();pg.screenshot(path="/tmp/v2.png")
    pg.click('[data-vn="Markus (Erweitert)"]');pg.wait_for_timeout(300);print(pg.evaluate("voice.name"))
    print(pg.evaluate("(()=>{try{speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(\"x\");u.voice=voice;speechSynthesis.speak(u);return __said}catch(e){return String(e)}})()"))
    print(errs)
