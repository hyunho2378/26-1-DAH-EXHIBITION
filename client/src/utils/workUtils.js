export function getWorkById(works, id) {
  return works.find(w => w.id === id) ?? null
}

export function filterBySubject(works, subjectId) {
  return subjectId === 'all' ? works : works.filter(w => w.subjectId === subjectId)
}

export function getAwardWorks(works) {
  return {
    grand: works.filter(w => w.award === 'grand'),
    rest:  works.filter(w => w.award && w.award !== 'grand'),
    none:  works.filter(w => !w.award),
  }
}
