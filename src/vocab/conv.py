#!/usr/bin/env python3
"""vocab/<lang>/<LV>_*.txt  ->  packs/<lang>/bank_x_<lv>.js  (yinelenenleri ayıklar, hedefe göre keser)"""
import json,glob,os,re,sys,unicodedata
B='/home/claude/multi'
TGT={'A1':650,'A2':700,'B1':1100,'B2':1500,'C1':1500}
ex=json.load(open('/tmp/existing.json'))
cur=json.load(open('/tmp/curcount.json'))
ART=re.compile(r"^(der|die|das|the|a|an|to|le|la|les|l'|un|une|il|lo|gli|i|l’|uno|un')\s*",re.I)
def key(w):
    w=w.strip().lower()
    w=re.sub(r"\s*\(.*?\)\s*","",w)
    w=ART.sub("",w,1) if not w.startswith("l'") else w[2:]
    return unicodedata.normalize("NFC",w.strip())
def run(L):
    seen=set(key(w) for w in ex[L]);stats={}
    for lv in TGT:
        need=TGT[lv]-cur[L].get(lv,0)
        blocks=[];n=0
        for f in sorted(glob.glob(f'{B}/vocab/{L}/{lv}_*.txt')):
            cat=None;items=[]
            for line in open(f):
                line=line.rstrip()
                if not line.strip():continue
                if line.startswith('##'):
                    if cat and items:blocks.append((cat,items))
                    cat=line[2:].strip();items=[];continue
                a=[x.strip() for x in line.split('|')]
                if len(a)<3 or not a[0] or not a[1]:continue
                k=key(a[0])
                if not k or k in seen:continue
                if n>=need:continue
                seen.add(k);items.append('|'.join(a[:3]));n+=1
            if cat and items:blocks.append((cat,items))
        stats[lv]=(n,need)
        out=f'{B}/packs/{L}/bank_x_{lv.lower()}.js'
        if blocks:
            js=''.join(f'H("{lv}",{json.dumps(c,ensure_ascii=False)},`\n'+'\n'.join(i.replace('`',"'") for i in it)+'\n`);\n' for c,it in blocks)
            open(out,'w').write(js)
        elif os.path.exists(out):os.remove(out)
    print(L,stats)
for L in sys.argv[1:]:run(L)
