function add (x, y) {
  return x + y
}

export default function carousel (elem, {
  startAt=0
} = {}) {
  let currentIndex = 0
  let intervalID = null
  let children = null
  let childrenWidths = null
  let listeners = []
  updateChildren()
  goTo(startAt)

  function updateChildren () {
    children = Array.prototype.slice
      .call(elem.children)
    childrenWidths = children.map((x) => x.offsetWidth)
  }

  function next (by=1) {
    updateChildren()
    const endIndex = children.length - getShowing() + 1
    const i = (currentIndex + by + endIndex) % endIndex
    goTo(i)
  }

  function recalc () {
    updateChildren()
    next(0)
  }

  function goTo (index=0) {
    updateChildren()
    let translateX = 0
    childrenWidths // get translateX for current index
      .some((width, i) => {
        if (i >= index) return true
        translateX += width
      })
    elem.style.transform = `translateX(-${translateX}px)`
    if (currentIndex !== index) {
      currentIndex = index
      listeners.forEach(listener => listener(currentIndex))
    }
  }

  function isPlaying () {
    return !!intervalID
  }

  function getShowing () {
    // or 0 if no children or childrenWidths are zero (NaN). Happens in some browsers when opened in background before layout happens.
    return Math.round((elem.offsetWidth / childrenWidths.reduce(add)) * children.length) || 0;
  }

  function isShowingAll () {
    updateChildren()
    return getShowing() >= children.length
  }

  function onChange (listener) {
    listeners.push(listener)
  }

  function start (interval=4000, {
    skipFirst=false
  }) {
    if (intervalID !== null) return
    updateChildren()
    if (!skipFirst) next()
    intervalID = setInterval(function () {
      updateChildren()
      next()
    }, interval)
  }

  function stop () {
    if (!intervalID) return
    clearInterval(intervalID)
    intervalID = null
  }

  return Object.freeze({
    start,
    stop,
    next,
    goTo,
    isPlaying,
    isShowingAll,
    recalc,
    onChange
  })
}
