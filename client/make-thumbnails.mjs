import sharp from 'sharp'
import fs from 'fs'
import path from 'path'

const WORKS_DIR  = path.resolve('public/works')
const THUMBS_DIR = path.resolve('public/works/thumbs')
const THUMB_TRIGGER_PX = 1200
const TRIGGER_KB = 500
const THUMB_PX = 600
const THUMB_QUALITY = 78

if (!fs.existsSync(THUMBS_DIR)) fs.mkdirSync(THUMBS_DIR, { recursive: true })
const files = fs.readdirSync(WORKS_DIR).filter(f => /\.webp$/i.test(f))
let made = 0, small = 0, exist = 0, failed = 0

for (const file of files) {
  const src = path.join(WORKS_DIR, file)
  const out = path.join(THUMBS_DIR, file)
  try {
    const stat = fs.statSync(src)
    const sizeKB = stat.size / 1024
    const meta = await sharp(src).metadata()
    const longSide = Math.max(meta.width || 0, meta.height || 0)
    const isBig = longSide > THUMB_TRIGGER_PX || sizeKB > TRIGGER_KB
    if (!isBig) { small++; console.log(`small  ${file} (${longSide}px, ${sizeKB.toFixed(0)}KB)`); continue }
    if (fs.existsSync(out)) { exist++; console.log(`exist  ${file}`); continue }
    await sharp(src).resize({
      width:  longSide === meta.width  ? THUMB_PX : null,
      height: longSide === meta.height ? THUMB_PX : null,
      fit: 'inside', withoutEnlargement: true
    }).webp({ quality: THUMB_QUALITY }).toFile(out)
    const outKB = fs.statSync(out).size / 1024
    made++; console.log(`OK BIG ${file}  ${sizeKB.toFixed(0)}KB -> ${outKB.toFixed(0)}KB`)
  } catch (e) { failed++; console.log(`FAIL ${file}: ${e.message}`) }
}
console.log(`\n총 ${files.length} / 생성 ${made} / 작아서스킵 ${small} / 이미있음 ${exist} / 실패 ${failed}`)
console.log('썸네일 위치: public/works/thumbs/')
