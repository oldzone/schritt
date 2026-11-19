from playwright.sync_api import sync_playwright
with sync_playwright() as p:
    b=p.chromium.launch(executable_path="/usr/bin/google-chrome")
    pg=b.new_page();errs=[];pg.on("pageerror",lambda e:errs.append(str(e)))
    pg.add_init_script("""window.__calls=[];const mk=n=>({postMessage:x=>__calls.push([n,x.k,(x.d||'').length])});window.webkit={messageHandlers:{speak:mk('speak'),stop:mk('stop'),store:mk('store'),haptic:mk('haptic'),sfx:mk('sfx'),sfxload:mk('sfxload')}};window.__NATIVE_SFX=true;localStorage.setItem("schritt-v1",JSON.stringify({onb:true}))""")
    pg.goto("file:///home/claude/multi/index.html?lang=de");pg.wait_for_timeout(4000)
    pg.evaluate("sfx('ok');sfx('bad')");pg.wait_for_timeout(200)
    print(pg.evaluate("__calls.filter(c=>c[0].startsWith('sfx')).map(c=>c.join(':')).join(' ')"),pg.evaluate("String(SFX.ctx)"),errs)
