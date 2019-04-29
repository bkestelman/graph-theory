var Testy = {
	descs: {}, 
	testCounter: 0
}
Testy.run = function(delay=0) { // TODO: add option to run immediately on page load, instead of manually calling run
	var i = 0
	for (var name in Testy.descs) {
		console.log('***' + name)
		//setTimeout(descs[name].tests, delay*i)
		Testy.descs[name]()
		i += 1
	}
}
export function describe(name, tests) {
	Testy.descs[name] = tests
}
export function test(name, test) {
	console.log('Test ' + Testy.testCounter + ': ' + name)
	Testy.testCounter += 1
	test()
}
export function expect(expr, msg) {
	console.assert(expr, 'FAILED - ' + msg)
}

export { Testy }
