const root = typeof window != 'undefined' ? window : global

module.exports = (fn, timeoutFallbackMs = 1000) => {
	if ('requestIdleCallback' in root) {
		const handle = requestIdleCallback(fn)
		return () => cancelIdleCallback(handle)
	} else {
		const handle = setTimeout(fn, timeoutFallbackMs)
		return () => clearTimeout(handle)
	}
}
