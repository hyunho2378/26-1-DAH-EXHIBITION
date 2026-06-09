import sharp from 'sharp'
import fs from 'fs'
import path from 'path'

const WORKS_DIR  = path.resolve('public/works')
const THUMBS_DIR = path.resolve('public/works/thumbs')
const OUT = path.resolve('public/works/keycolors.json')
const SAMPLE = 64
const FALLBACK = '#F5C518'

function isMainImage(name) {
  if (!/\.webp$/i.test(name)) return false
  return !/_[0-9]+\.webp$/i.test(name)
}
function rgbToHsl(r, g, b) {
  r/=255; g/=255; b/=255
  const max=Math.max(r,g,b), min=Math.min(r,g,b)
  let h=0,s=0; const l=(max+min)/2; const d=max-min
  if(d!==0){ s=l>0.5?d/(2-max-min):d/(max+min)
    switch(max){case r:h=((g-b)/d+(g<b?6:0));break;case g:h=(b-r)/d+2;break;case b:h=(r-g)/d+4;break}
    h/=6 }
  return [h,s,l]
}
const toHex=(r,g,b)=>'#'+[r,g,b].map(v=>Math.round(v).toString(16).padStart(2,'0')).join('')

async function keyColorOf(file){
  const thumb=path.join(THUMBS_DIR,file)
  const src=fs.existsSync(thumb)?thumb:path.join(WORKS_DIR,file)
  const {data,info}=await sharp(src).resize(SAMPLE,SAMPLE,{fit:'inside'}).removeAlpha().raw().toBuffer({resolveWithObject:true})
  const ch=info.channels
  const buckets=new Map()
  for(let i=0;i<data.length;i+=ch){
    const r=data[i],g=data[i+1],b=data[i+2]
    const [h,s,l]=rgbToHsl(r,g,b)
    if(s<0.18)continue
    if(l<0.12||l>0.92)continue
    const key=Math.round(h*24)
    const cur=buckets.get(key)||{count:0,r:0,g:0,b:0,sat:0}
    cur.count++;cur.r+=r;cur.g+=g;cur.b+=b;cur.sat+=s
    buckets.set(key,cur)
  }
  if(buckets.size===0)return FALLBACK
  let best=null,bestScore=-1
  for(const v of buckets.values()){
    const avgSat=v.sat/v.count
    const score=v.count*(0.5+avgSat)
    if(score>bestScore){bestScore=score;best=v}
  }
  return toHex(best.r/best.count,best.g/best.count,best.b/best.count)
}
async function run(){
  const files=fs.readdirSync(WORKS_DIR).filter(isMainImage)
  const result={}
  let ok=0,fail=0
  for(const file of files){
    const keyName=file.replace(/\.webp$/i,'')
    try{ const color=await keyColorOf(file); result[keyName]=color; ok++; console.log(keyName+'  '+color) }
    catch(e){ result[keyName]=FALLBACK; fail++; console.log(keyName+'  FAIL → '+FALLBACK) }
  }
  fs.writeFileSync(OUT,JSON.stringify(result,null,2),'utf-8')
  console.log('\n총 '+files.length+' / 성공 '+ok+' / 실패 '+fail)
  console.log('저장: '+OUT)
}
run()
