var Tests = new (function() {
	this.tests = []
	this.testNames = []
	this.addTest = function(name, test) {
		this.tests.push(test)
		this.testNames.push(name)
	}
	this.run = function() {
		for (var i = 0; i < this.tests.length; i++) {
			console.log('Test ' + i + ': ' + this.testNames[i])
			this.tests[i]()
		}
	}
})() 

Tests.addTest('Add vertex', function() {
	var click = new Event('click')
	click.offsetX = 100
	click.offsetY = 100

	Canvas.canvas.dispatchEvent(click)
	console.assert(Canvas.graph.vertices.size == 1, 'FAILED - Graph should have 1 Vertex!')
	console.assert(Canvas.graph.edges.size == 0, 'FAILED - Graph should have 0 Edges!')
})

Tests.addTest('Delete vertex', function() {
	var rightclick = new Event('contextmenu')
	rightclick.offsetX = 100
	rightclick.offsetY = 100

	Canvas.canvas.dispatchEvent(rightclick)
	console.assert(Canvas.graph.vertices.size == 0, 'FAILED - Graph should have 1 Vertex!')
	console.assert(Canvas.graph.edges.size == 0, 'FAILED - Graph should have 0 Edges!')
})
