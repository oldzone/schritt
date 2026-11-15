from playwright.sync_api import sync_playwright
import json
with sync_playwright() as p:
    b=p.chromium.launch(executable_path="/usr/bin/google-chrome");ctx=b.new_context(accept_downloads=True);pg=ctx.new_page();errs=[];pg.on("pageerror",lambda e:errs.append(str(e)))
    pg.add_init_script('if(!sessionStorage.getItem("x")){sessionStorage.setItem("x",1);localStorage.setItem("schritt-v1",JSON.stringify({onb:true,xp:777,pass:{"A1-1":1}}));}')
    pg.goto("file:///home/claude/multi/index.html");pg.wait_for_timeout(700)
    pg.evaluate("exportSheet()");pg.wait_for_timeout(300)
    with pg.expect_download() as d: pg.click("#exf")
    path=d.value.path();o=json.load(open(path));print("file",d.value.suggested_filename,o["langs"]["de"]["xp"])
    pg.evaluate("localStorage.setItem('schritt-v1',JSON.stringify({onb:true,xp:1}));location.reload()");pg.wait_for_timeout(800)
    pg.evaluate("document.querySelectorAll('.sheetbg').forEach(x=>x.remove());importSheet()");pg.wait_for_timeout(200)
    pg.set_input_files("#imf",path);pg.wait_for_timeout(500)
    pg.click("#imok");pg.wait_for_timeout(1200)
    print("xp after",pg.evaluate("JSON.parse(localStorage.getItem('schritt-v1')).xp"),errs)
