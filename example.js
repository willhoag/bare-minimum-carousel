import carousel from './'

const elem = document.querySelector('.js-carousel')

const c = carousel(elem) // returns a carousel object
c.start(2000) // starts the carousel changing every 2 seconds
c.stop() // stops the carousel
c.next(2) // moves two itmes forward
c.goTo(1) // goes to the 2nd item

// recalc on resize change
window.addEventListener('resize', c.recalc.bind(c))
