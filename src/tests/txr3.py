from playwright.sync_api import sync_playwright
import random,json
with sync_playwright() as p:
    b=p.chromium.launch(executable_path="/usr/bin/google-chrome")
    pg=b.new_page();errs=[];pg.on("pageerror",lambda e:errs.append(str(e)))
    pg.add_init_script('localStorage.setItem("schritt-v1",JSON.stringify({onb:true}))')
    pg.goto("file:///home/claude/multi/index.html?lang=de");pg.wait_for_timeout(800)
    r=pg.evaluate("""()=>{const t0=performance.now();let bad=[],vs=[],nf=0,n=0;for(const o of ALLS){n++;try{const a=xAnalyze(o.de);if(!a.main.fin&&!/^[^ ]+[.!?]?$/.test(o.de))nf++;xRender(o.de,o.tr,a,{list:[]});xVariants(a).forEach(v=>vs.push([o.de,v.k,v.s]));}catch(e){bad.push(o.de+' :: '+e.message);}}
      return {n,ms:performance.now()-t0,bad:bad.slice(0,10),nbad:bad.length,nf,nv:vs.length,vs}}""")
    print(r['n'],int(r['ms']),'ms','errors',r['nbad'],r['bad'],'nofin',r['nf'],'variants',r['nv'])
    random.seed(4);[print(x) for x in random.sample(r['vs'],45)]
    t=pg.evaluate("()=>{const t0=performance.now();xSiblings(xAnalyze('Ich habe gestern einen Film gesehen.'),6);return performance.now()-t0}");print('sib ms',int(t))
