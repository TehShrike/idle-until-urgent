import idleish from './idleish.mjs';

const UNLOADED = {}

export default workFn => {
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

