from playwright.sync_api import sync_playwright
MOCK='''window.__NATIVE_AI={ok:true};window.__NATIVE_REC=true;window.__NATIVE_VOICES=[];window.__LOG=[];
const H=n=>({postMessage:p=>{window.__LOG.push([n,p]);
 if(n==="ai")setTimeout(()=>window.__aiDone(p.id,JSON.stringify({say:"Hallo? Wie geht's?",tr:"Nasılsın?",fix:"",tip:""}),""),50);
 if(n==="speak"&&p.cb)setTimeout(()=>window.__spoken&&window.__spoken(p.cb),50);
 if(n==="listen"){setTimeout(()=>window.__recPartial("mir geht"),50);setTimeout(()=>window.__recEnd("mir geht es gut",""),150);}}});
window.webkit={messageHandlers:{store:H("store"),speak:H("speak"),stop:H("stop"),remind:H("remind"),haptic:H("haptic"),ai:H("ai"),listen:H("listen"),unlisten:H("unlisten")}};'''
with sync_playwright() as p:
    b=p.chromium.launch(executable_path="/usr/bin/google-chrome");pg=b.new_page(viewport={"width":390,"height":844});errs=[];pg.on("pageerror",lambda e:errs.append(str(e)))
    pg.add_init_script('window.__NATIVE_STATE={v:2,cur:"de",langs:{de:{onb:true}}};'+MOCK)
    pg.goto("file:///home/claude/multi/index.html");pg.wait_for_timeout(900)
    pg.evaluate("tab='games';render()");pg.wait_for_timeout(300)
    has=pg.query_selector('[data-sp="call"]') is not None
    pg.click('[data-sp="call"]');pg.wait_for_timeout(1500)
    n=pg.evaluate("CL&&CL.n");cap=pg.inner_text("#clcap")
    kinds=pg.evaluate("[...new Set(__LOG.map(x=>x[0]))]")
    print("callbtn",has,"turns",n,"cap",cap,kinds,errs)
