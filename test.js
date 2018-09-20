const whenReasonable = require('./')
const idleish = require('./idleish.js')

const test = require('zora')
const makeDeferred = require('p-defer')
const delay = require('delay')

const nextIdleCallback = () => {
	const deferred = makeDeferred()

	idleish(deferred.resolve, 2000)

	return deferred.promise
}

test('Calls the function eventually', async t => {
	const deferred = makeDeferred()

	const getValue = whenReasonable(() => {
		t.ok('Function was called')
		deferred.resolve()

		return 1
	})

	await Promise.race([
		delay(2000).then(() => t.fail(`Didn't get called within 1000ms`)),
		deferred.promise,
	])

	t.equal(getValue(), 1)
})

test('Returns the value if requested before the idle callback', async t => {
	let called = 0

	const getValue = whenReasonable(() => {
		called++

		t.equal(called, 1)

		return 1
	})

	t.equal(called, 0)
	t.equal(getValue(), 1)

	await nextIdleCallback()

	t.equal(called, 1)
})

