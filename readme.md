# idle-until-urgent

Fetch resources lazily - either whenever the browser is next idle, or when you request the resource.

In a browser that doesn't support [requestIdleCallback](https://caniuse.com/#feat=requestidlecallback), or in node.js where the API is not available, falls back to `setTimeout(fn, 1000)`.

Inspired directly by [this 💯 post by Philip Walton](https://philipwalton.com/articles/idle-until-urgent/), but uses a function-based API instead of classes.  It's also about a third the size of [`idlize/defineIdleProperty.mjs`](https://github.com/GoogleChromeLabs/idlize/blob/master/defineIdleProperty.mjs) (after minification) by avoiding classes and using the dumbest possible `requestIdleTimeout` fallback.


## Install

```sh
npm i idle-until-urgent
```

```
const makeIdleGetter = require('idle-until-urgent')
```

## Usage

<!--js
const makeIdleGetter = require('./')
-->

```js
const getFormatter = makeIdleGetter(() => new Intl.DateTimeFormat('en-US', {
	timeZone: 'America/Los_Angeles',
}))

// later in your code, presumably not during the first tick...

getFormatter().format(new Date(1537452915210)) // => '9/20/2018'

```

## License

[WTFPL](http://wtfpl2.com)
