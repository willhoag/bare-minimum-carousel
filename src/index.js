function add (x, y) {
  return x + y
}

export default function carousel (elem) {
  let currentIndex = 0
  let intervalID = null
  let children = null
  let childrenWidths = null
  updateChildren()
  goTo(0)

  function updateChildren () {
    children = Array.prototype.slice
      .call(elem.children)
    childrenWidths = children.map((x) => x.offsetWidth)
  }

  function next (by=1) {
    const endIndex = children.length - getShowing() + 1
    const i = (currentIndex + by + endIndex) % endIndex
    goTo(i)
  }

  function recalc () {
    updateChildren()
    next(0)
  }

  function goTo (index=0) {
    let translateX = 0
    childrenWidths // get translateX for current index
      .some((width, i) => {
        if (i >= index) return true
        translateX += width
      })
    elem.style.transform = `translateX(-${translateX}px)`
    currentIndex = index
  }

  function isPlaying () {
    return !!intervalID
  }

  function getShowing () {
    return Math.round((elem.offsetWidth / childrenWidths.reduce(add)) * children.length)
  }

  function isShowingAll () {
    updateChildren()
    return getShowing() >= children.length
  }

  function start (interval=4000) {
    if (intervalID === null) {
      updateChildren()
      next()
      intervalID = setInterval(function () {
        updateChildren()
        next()
      }, interval)
    }
  }

  function stop () {
    if (intervalID) {
      clearInterval(intervalID)
      intervalID = null
    }
  }

  return Object.freeze({
    start,
    stop,
    next: function (by) {
      updateChildren()
      next(by)
    },
    goTo: function (i) {
      updateChildren()
      goTo(i)
    },
    isPlaying,
    isShowingAll,
    recalc
  })
}
