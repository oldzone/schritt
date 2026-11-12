from playwright.sync_api import sync_playwright
with sync_playwright() as p:
    b=p.chromium.launch(executable_path="/usr/bin/google-chrome")
    pg=b.new_page(viewport={"width":390,"height":844});errs=[];pg.on("pageerror",lambda e:errs.append(str(e)))
    pg.goto("file:///home/claude/multi/index.html?lang=de");pg.wait_for_timeout(700)
    pg.screenshot(path="/tmp/ob1.png");pg.evaluate("document.querySelector('#obn').click()");pg.wait_for_timeout(200)
    pg.fill("#obnm","Mahsun");pg.evaluate("document.querySelector('[data-og=\"40\"]').click()");pg.screenshot(path="/tmp/ob2.png")
    pg.evaluate("document.querySelector('#obn').click()");pg.wait_for_timeout(200);pg.screenshot(path="/tmp/ob3.png")
    pg.evaluate("document.querySelector('#ob0').click()");pg.wait_for_timeout(300)
    print(pg.evaluate("[S.onb,S.goal,S.name,IN_LESSON,tab]"),errs)
    pg.reload();pg.wait_for_timeout(600);print("after reload onb shown:",pg.evaluate("!!window.ONB"))
    pg.evaluate("S.xp=130;S.dx={d:day(),base:80};S.act={[day()-1]:70,[day()-3]:20};save();tab='me';render()");pg.wait_for_timeout(300)
    pg.evaluate("document.querySelector('.wkx').scrollIntoView({block:'center'})");pg.screenshot(path="/tmp/wk.png");print(errs)
    # existing user: no onboarding
    pg2=b.new_page();pg2.add_init_script('if(!localStorage.getItem("schritt-v1"))localStorage.setItem("schritt-v1",JSON.stringify({pass:{"A1-1":1},xp:50}))')
    pg2.goto("file:///home/claude/multi/index.html?lang=fr");pg2.wait_for_timeout(600);print("existing user onb:",pg2.evaluate("!!window.ONB"))
