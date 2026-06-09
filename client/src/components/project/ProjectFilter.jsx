export default function ProjectFilter({ subjects, activeId, onChange }) {
  const chips = subjects.map(s => (
    <button
      key={s.id}
      onClick={() => onChange(s.id)}
      className={`font-display font-bold uppercase bg-transparent border-none p-0 text-left cursor-pointer
        text-sm lg:text-xl transition-opacity duration-200
        ${activeId === s.id ? 'text-accent opacity-100' : 'text-text-primary opacity-60 hover:opacity-100'}`}
    >
      {s.name}
    </button>
  ))

  return (
    <>
      {/* 모바일: 가로 스크롤 */}
      <div className="lg:hidden overflow-x-auto pb-2">
        <div className="flex gap-5 w-max">{chips}</div>
      </div>

      {/* 데스크탑: 세로 사이드 */}
      <aside className="hidden lg:flex flex-col gap-3 shrink-0">
        {chips}
      </aside>
    </>
  )
}
