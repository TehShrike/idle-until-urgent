const idleish = require('./idleish.js')

const UNLOADED = {}

module.exports = workFn => {
	let result = UNLOADED

	const clear = idleish(() => {
		result = workFn()
	})

	return () => {
		if (result === UNLOADED) {
			result = workFn()
			clear()
		}

		return result
	}
}

