const root = typeof window != 'undefined' ? window : global

export default (fn, timeoutFallbackMs = 1000) => {
	if ('requestIdleCallback' in root) {
		const handle = requestIdleCallback(fn)
		return () => cancelIdleCallback(handle)
	} else {
		const handle = setTimeout(fn, timeoutFallbackMs)
		return () => clearTimeout(handle)
	}
}
