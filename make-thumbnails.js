// scripts/make-thumbnails.js
// 큰 이미지만 골라서 썸네일 생성.
// 사용법:
//   1) cd client (또는 프로젝트 루트)
//   2) npm install sharp --save-dev
//   3) node scripts/make-thumbnails.js
//
// 동작:
//   - public/works/ 안의 모든 .webp 스캔
//   - "큰 것"만 골라(긴 변 > THUMB_TRIGGER_PX 또는 용량 > TRIGGER_KB) 썸네일 생성
//   - 썸네일은 public/works/thumbs/ 에 같은 파일명으로 저장 (긴 변 THUMB_PX)
//   - 작은 이미지는 건너뜀 (이미 가벼움)
//   - 이미 썸네일이 있으면 건너뜀 (재실행 안전)

import sharp from 'sharp'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// ── 설정 ──────────────────────────────
const WORKS_DIR  = path.resolve(__dirname, '../public/works')
const THUMBS_DIR = path.resolve(WORKS_DIR, 'thumbs')

const THUMB_TRIGGER_PX = 1200   // 긴 변이 이 픽셀 초과면 "큰 것"
const TRIGGER_KB       = 500    // 또는 용량이 이 KB 초과면 "큰 것"
const THUMB_PX         = 600    // 썸네일 긴 변 목표 픽셀
const THUMB_QUALITY    = 78     // WebP 품질
const SKIP_EXISTING    = true   // 이미 만든 썸네일 건너뛰기
// ──────────────────────────────────────

async function run() {
  if (!fs.existsSync(WORKS_DIR)) {
    console.error('❌ works 폴더 없음:', WORKS_DIR)
    process.exit(1)
  }
  if (!fs.existsSync(THUMBS_DIR)) fs.mkdirSync(THUMBS_DIR, { recursive: true })

  const files = fs.readdirSync(WORKS_DIR).filter(f => /\.webp$/i.test(f))
  if (files.length === 0) {
    console.log('처리할 .webp 없음.')
    return
  }

  let made = 0, skippedSmall = 0, skippedExist = 0, failed = 0
  const report = []

  for (const file of files) {
    const src = path.join(WORKS_DIR, file)
    const out = path.join(THUMBS_DIR, file)

    try {
      const stat = fs.statSync(src)
      const sizeKB = stat.size / 1024
      const meta = await sharp(src).metadata()
      const longSide = Math.max(meta.width || 0, meta.height || 0)

      const isBig = longSide > THUMB_TRIGGER_PX || sizeKB > TRIGGER_KB
      if (!isBig) {
        skippedSmall++
        report.push(`  small  ${file}  (${longSide}px, ${sizeKB.toFixed(0)}KB) → 건너뜀`)
        continue
      }

      if (SKIP_EXISTING && fs.existsSync(out)) {
        skippedExist++
        report.push(`  exist  ${file} → 이미 있음`)
        continue
      }

      await sharp(src)
        .resize({ width: longSide === meta.width ? THUMB_PX : null,
                  height: longSide === meta.height ? THUMB_PX : null,
                  fit: 'inside', withoutEnlargement: true })
        .webp({ quality: THUMB_QUALITY })
        .toFile(out)

      const outKB = fs.statSync(out).size / 1024
      made++
      report.push(`  ✅ BIG ${file}  ${sizeKB.toFixed(0)}KB → ${outKB.toFixed(0)}KB`)
    } catch (e) {
      failed++
      report.push(`  ❌ FAIL ${file}: ${e.message}`)
    }
  }

  console.log(report.join('\n'))
  console.log('\n──────────────')
  console.log(`총 ${files.length}개`)
  console.log(`썸네일 생성: ${made}`)
  console.log(`작아서 스킵: ${skippedSmall}`)
  console.log(`이미 있음:   ${skippedExist}`)
  console.log(`실패:        ${failed}`)
  console.log(`\n썸네일 위치: public/works/thumbs/`)
  console.log('큰 이미지는 thumbs/ 의 같은 파일명, 작은 이미지는 원본을 그대로 쓰면 됨.')
}

run()