var Tests = new (function() {
	this.tests = []
	this.testNames = []
	this.Util = {}
	this.addTest = function(name, test) {
		this.tests.push(test)
		this.testNames.push(name)
	}
	this.run = function(delay=0) {
		for (var i = 0; i < this.tests.length; i++) {
			console.log('Test ' + i + ': ' + this.testNames[i])
			setTimeout(this.tests[i], delay*i)
		}
	}
	this.expect = function(expected) {
		var state = this.getState() 
		for (var key in expected) {
			console.assert(expected[key] === state[key], 'FAILED - expected ' + key + ' = ' + expected[key] + ' (actual ' + state[key] + ')') // TODO: implement deep comparison
		}
	}
})() 

Tests.getState = function() {
	return { vertices: Canvas.graph.vertices.size, edges: Canvas.graph.edges.size }
}
// TODO: Add tests in separate file
Tests.addTest('Add vertex', function() {
	Tests.Util.click(100, 100)
	Tests.expect( { vertices: 1, edges: 0 } )
})
Tests.addTest('Delete vertex', function() {
	Tests.Util.rightClick(100, 100)
	Tests.expect( { vertices: 0, edges: 0 } )
})
Tests.addTest('Draw line' , function() {
	for (var i = 0; i < 5; i++) {
		Tests.Util.click(100+i*50, 100+i*30)
	}
	Tests.expect( { vertices: 5, edges: 4 } )
})
Tests.addTest('Delete and readd last drawn', function() {
	Tests.Util.rightClickLast() 
	Tests.Util.clickLast()
	Tests.expect( { vertices: 5, edges: 3 } )
})
Tests.addTest('Close single vertex and add new vertex', function() {
	Tests.Util.clickLast()
	Tests.expect( { vertices: 5, edges: 3 } )
	Tests.Util.clickOffset(30, 0)
	Tests.expect( { vertices: 6, edges: 3 } )
})
Tests.addTest('Draw triangle', function() {
	Tests.Util.clickOffset(50, 0)
	Tests.Util.clickOffset(-25, -50)
	Tests.Util.clickOffset(-25, 50)
	Tests.expect( { vertices: 8, edges: 6 } )
})

// TODO: Move util functions to separate file
Tests.Util.click = function(x, y) {
	var e = new Event('click')
	e.offsetX = x
	e.offsetY = y
	Canvas.canvas.dispatchEvent(e)
	Tests.lastClick = { x: x, y: y }
}
Tests.Util.rightClick = function(x, y) {
	var e = new Event('contextmenu')
	e.offsetX = x
	e.offsetY = y
	Canvas.canvas.dispatchEvent(e)
	Tests.lastRightClick = { x: x, y: y }
}
Tests.Util.clickLast = function() {
	Tests.Util.click(Tests.lastClick.x, Tests.lastClick.y)
}
Tests.Util.rightClickLast = function() {
	Tests.Util.rightClick(Tests.lastClick.x, Tests.lastClick.y)
}
Tests.Util.clickOffset = function(deltax, deltay) {
	Tests.Util.click(Tests.lastClick.x + deltax, Tests.lastClick.y + deltay)
}
