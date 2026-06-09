import sharp from 'sharp'
import fs from 'fs'
import path from 'path'

const WORKS_DIR  = path.resolve('public/works')
const DETAIL_DIR = path.resolve('public/works/detail')
const TRIGGER_PX = 2000   // 긴 변이 이보다 크면 리사이즈
const TARGET_PX  = 2000   // 목표 긴 변
const QUALITY    = 87     // WebP 품질

if (!fs.existsSync(DETAIL_DIR)) fs.mkdirSync(DETAIL_DIR, { recursive: true })

const files = fs.readdirSync(WORKS_DIR).filter(f => /\.webp$/i.test(f) && !f.startsWith('thumbs') && !f.startsWith('detail'))
let made = 0, small = 0, exist = 0, fail = 0

for (const file of files) {
  const src = path.join(WORKS_DIR, file)
  const out = path.join(DETAIL_DIR, file)
  try {
    if (fs.existsSync(out)) { exist++; continue }
    const meta = await sharp(src).metadata()
    const long = Math.max(meta.width||0, meta.height||0)
    if (long <= TRIGGER_PX) {
      small++
      console.log(`small  ${file} (${long}px) → 건너뜀`)
      continue
    }
    await sharp(src)
      .resize({
        width:  long === meta.width  ? TARGET_PX : null,
        height: long === meta.height ? TARGET_PX : null,
        fit: 'inside', withoutEnlargement: true
      })
      .webp({ quality: QUALITY })
      .toFile(out)
    const inKB  = fs.statSync(src).size / 1024
    const outKB = fs.statSync(out).size / 1024
    made++
    console.log(`OK  ${file}  ${inKB.toFixed(0)}KB → ${outKB.toFixed(0)}KB`)
  } catch(e) { fail++; console.log(`FAIL ${file}: ${e.message}`) }
}
console.log(`\n총 ${files.length} / 생성 ${made} / 작아서스킵 ${small} / 이미있음 ${exist} / 실패 ${fail}`)
console.log('detail 위치: public/works/detail/')
