export default workFn => {
	const hasIdleCallback = typeof requestIdleCallback==='function'
	let result = workFn
	let handle

	if (hasIdleCallback) {
		handle = requestIdleCallback(() => {
			result = workFn()
		})
	}
	else {
		handle = setTimeout(() => {
			result = workFn()
		}, 1000)
	}

	return () => {
		if (result === workFn) {
			result = workFn()
			if (hasIdleCallback) cancelIdleCallback(handle)
			else clearTimeout(handle)
		}

		return result
	}
}

