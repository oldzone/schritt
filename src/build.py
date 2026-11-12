#!/usr/bin/env python3
"""Motor + dil paketlerini tek index.html'e birleştirir."""
import os,glob,re,sys
B='/home/claude/multi'
HDR=r'''window.LV=[];window.BANK=[];window.CONJ=[];window.CONJ_THEORY=[];window.X={};window.BOOKS=[];window.BGL="";window.LFUNC={};window.LIRR={};window.LEXTRA=[];
function H(lv,cat,t){BANK.push({lv:lv,cat:cat,t:t});}
function C(w,f,lv,tr,ex,note,st){let ans=null,q=null;const pe=ex.replace(/\*\*/g,'');
 if(w.indexOf('…')<0){const re=new RegExp('(^|[^\\p{L}])('+w.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')+')(?![\\p{L}])','iu');const m=pe.match(re);
  if(m){ans=pe.substr(m.index+m[1].length,m[2].length);q=pe.slice(0,m.index+m[1].length)+'___'+pe.slice(m.index+m[1].length+m[2].length)}}
 CONJ.push([w,f,lv,tr,ex,note||'',st||'',ans,q]);}
'''
ORDER=['lessons','x_','bank','conj','books','bgl','lex']
def files(lang):
    fs=sorted(glob.glob(f'{B}/packs/{lang}/*.js'))
    key=lambda f:(next((i for i,p in enumerate(ORDER) if os.path.basename(f).startswith(p)),99),os.path.basename(f))
    return sorted(fs,key=key)
def pack(lang):
    if lang=='de':
        body=open(f'{B}/packs/de/data.js').read()+'\n'+'\n'.join(open(f).read() for f in files('de') if not f.endswith('data.js'))
        return 'window.PACK.de=function(){window.CONJ=[];window.CONJ_THEORY=[];window.X={};window.BOOKS=[];window.BGL="";\n'+body+'\n};\n'
    fs=files(lang)
    if not fs:return ''
    body=HDR+'\n'.join(open(f).read() for f in fs)
    return f'window.PACK.{lang}=function(){{\n'+body+'\n};\n'
def main():
    eng=open(f'{B}/engine.html').read()
    READY=[l for l in open(f'{B}/READY').read().split()] if os.path.exists(f'{B}/READY') else ['de','en','fr','it']
    packs=''.join(pack(l) for l in READY)
    out=eng.replace('<!--PACKS-->','<script>\n'+packs+'</script>')
    open(f'{B}/index.html','w').write(out)
    # sözdizimi kontrolü
    import subprocess,tempfile
    for i,m in enumerate(re.findall(r'<script>(.*?)</script>',out,re.S)):
        p=f'/tmp/b{i}.js';open(p,'w').write(m)
        r=subprocess.run(['node','-e',f"new Function(require('fs').readFileSync('{p}','utf8'))"],capture_output=True,text=True)
        if r.returncode:print('SYNTAX ERROR in script',i,r.stderr[:800]);sys.exit(1)
    print('ok',len(out),'bytes; packs:',[l for l in ['de','en','fr','it'] if f'PACK.{l}=' in out])
main()
