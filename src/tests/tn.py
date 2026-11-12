from playwright.sync_api import sync_playwright
mock="""(()=>{window.__log=[];window.Android={store:j=>__log.push(['store',j.length]),load:()=>'null',
voices:()=>JSON.stringify([{id:'de-x-a',name:'Anna',g:'f',q:3},{id:'de-x-m',name:'Markus',g:'m',q:2},{id:'de-x-r',name:'Robo',g:'?',q:0}]),
speak:j=>{const o=JSON.parse(j);__log.push(['speak',o.t,o.v,o.cb]);if(o.cb)setTimeout(()=>window.__spoken(o.cb),50);},stop:j=>__log.push(['stop']),remind:j=>__log.push(['remind',j])};})()"""
with sync_playwright() as p:
    b=p.chromium.launch(executable_path="/usr/bin/google-chrome")
    pg=b.new_page(viewport={"width":375,"height":812})
    errs=[];pg.on("pageerror",lambda e:errs.append(str(e)))
    pg.add_init_script(mock)
    pg.goto("file:///home/claude/multi/index.html");pg.wait_for_timeout(600)
    print("sync",pg.evaluate("SYNC"),"voice",pg.evaluate("voice&&voice.id"))
    pg.evaluate("tab='me';render()");pg.wait_for_timeout(200)
    pg.click('[data-vg="m"]');pg.wait_for_timeout(300);print("m",pg.evaluate("voice.id"))
    pg.click("#rmb");pg.wait_for_timeout(100)
    pg.query_selector("#rmt").fill("08:30");pg.dispatch_event("#rmt","change");pg.wait_for_timeout(100)
    pg.query_selector("#rmb").scroll_into_view_if_needed();pg.screenshot(path="/tmp/n1.png")
    # reader
    pg.evaluate("tab='books';render()");pg.wait_for_timeout(200)
    pg.click('[data-book="a1-berlin"]')
    pg.wait_for_timeout(300);pg.click("#pl");pg.wait_for_timeout(1500)
    print("si",pg.evaluate("RD.si"),"p",pg.evaluate("RD.p"))
    pg.click("#pl");pg.wait_for_timeout(100)
    log=pg.evaluate("__log");print([l for l in log if l[0]!='store'][:12]);print(len(log))
    print(errs)
