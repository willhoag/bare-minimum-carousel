# bare-minimum-carousel

A **bare minimum responsive carousel** for the browser. It calculates the width of
the children and only applies a `transform: translateX` to the wrapper element.
The CSS is up to you!

[![npm version](https://badge.fury.io/js/bare-minimum-carousel.svg)](http://badge.fury.io/js/bare-minimum-carousel )

If you use any of my plugins, please star them on github. It’s a great way of getting feedback and gives me the kick to put more time into their development. If you encounter any bugs or have feature requests, just open an issue report on Github.

Follow me on Twitter [@devhoag](http://twitter.com/willhoag)

## Installation

Download node at [nodejs.org](http://nodejs.org) and install it, if you haven't already.

```sh
npm install bare-minimum-carousel --save
```

## Usage
index.html
```html
<div style="overflow: hidden;">
    <div class="js-carousel" style="white-space: nowrap; transition: transform 1s; width: 100px;">
        <img src="image1.jpg" width="100px" style="display: inline-block">
        <img src="image2.jpg" width="100px" style="display: inline-block">
        <img src="image3.jpg" width="100px" style="display: inline-block">
    </div>
</div>
```

main.js
```js
// require module
const carousel = require('bare-minimum-carousel');

const elem = document.querySelector('.js-carousel')

const c = carousel(elem) // returns a carousel object
c.start(2000, { skipFirst: true }) // starts the carousel changing every 2 seconds and skip first invocation
c.stop() // stops the carousel
c.next(2) // moves two itmes forward
c.goTo(1) // goes to the 2nd item

// recalc on window resize
window.addEventListener('resize', c.recalc.bind(c))
```

## API

- `carousel(elem:dom element)` returns a carousel object
- `c.start(interval:int, options:obj)` starts the carousel with specified interval (default:
  4000)
  - `options:obj`
    - `skipFirst:` skips first invocation on start
- `c.stop()` stops the carousel
- `c.next(by:int)` changes to the next item in the carousel by relative index
  (default: 1)
- `c.goTo(index:int)` changes to the specified index in the carousel (default: 0)
- `c.recalc()` recalculates translateX for the current index

## License

ISC
