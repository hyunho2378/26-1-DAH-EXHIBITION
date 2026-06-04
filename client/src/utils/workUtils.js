export function getWorkById(works, id) {
  return works.find(w => w.id === id) ?? null
}

export function filterBySubject(works, subjectId) {
  return subjectId === 'all' ? works : works.filter(w => w.subjectId === subjectId)
}

const EXCELLENCE_ORDER = ['010','052','003','018','020','077','015','062','063','073','036','026','088']

export function getAwardWorks(works) {
  const rest = works
    .filter(w => w.award && w.award !== 'grand')
    .sort((a, b) => {
      const ai = EXCELLENCE_ORDER.indexOf(a.id)
      const bi = EXCELLENCE_ORDER.indexOf(b.id)
      return (ai === -1 ? 999 : ai) - (bi === -1 ? 999 : bi)
    })
  return {
    grand: works.filter(w => w.award === 'grand'),
    rest,
    none:  works.filter(w => !w.award),
  }
}
