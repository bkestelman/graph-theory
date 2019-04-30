import { testy, describe, test, expect } from 'http://192.81.214.140:8080/testy.js'
describe('SimpleGraph Unit Test', function() { // TODO: run same set of tests on a different class with the same interface 
	var Graph = SimpleGraph
	var graph = new Graph()
	test('Starts empty', function() {
		expect( graph.vertices.size === 0 )
		expect( graph.edges.size === 0 ) 
	})
	test('Add non-adjacent vertices', function() {
		for (var i = 0; i < 5; i++) { // TODO: implement flexible way to run same test multiple times
			graph.addV(new Graph.prototype.Vertex()) // TODO: per-test imports? 
			expect( graph.vertices.size === i+1 , 'Expected graph to have ' + i + ' vertices after ' + i + ' calls to addV' )
			expect( graph.edges.size === 0 , 'Expected graph to have 0 edges after calls to addV' )
		}
	})
	test('Delete non-adjacent vertices', function() {
		var size = graph.vertices.size // starting size
		for (var v of graph.vertices) {
			graph.delV(v)
			size -= 1
			expect( graph.vertices.size === size , 'Expected ' + size + ' vertices after ' + (5-size) + ' deletions' )
			expect( graph.edges.size === 0 , 'Expected graph to have 0 edges' )
		}
	})
	test('Delete a vertex not in graph', function() {
		//TODO: add way to specify initial state this test depends on
		var size = graph.vertices.size // starting size
		graph.delV(new Graph.prototype.Vertex())
		expect( graph.vertices.size === size , 'Expected no change in size' ) 
	})
	test('Add existing vertex to graph (i.e. add same vertex twice)', function() {
		var v = new Graph.prototype.Vertex()
		graph.addV(v)
		var size = graph.vertices.size
		graph.addV(v)
		expect( graph.vertices.size === size , 'Expected no change in size' ) 
	})
	test('Add adjacent vertices', function() {
		var sizeV = graph.vertices.size
		var sizeE = graph.edges.size
		var v1 = new Graph.prototype.Vertex()
		var v2 = new Graph.prototype.Vertex()
		graph.addV(v1)
		graph.addV(v2)
		graph.addE(new Graph.prototype.Edge([v1, v2]))
		expect( graph.vertices.size === sizeV+2 , 'Expected graph to have 2 more vertices' )
		expect( graph.edges.size === sizeE+1 , 'Expected graph to have 1 more edge' )
	})
	test('Delete vertex with edge', function() {
		var v1 = new Graph.prototype.Vertex()
		var v2 = new Graph.prototype.Vertex()
		graph.addV(v1)
		graph.addV(v2)
		graph.addE(new Graph.prototype.Edge([v1, v2]))
		var sizeV = graph.vertices.size
		var sizeE = graph.edges.size
		graph.delV(v1)
		expect( graph.vertices.size === sizeV-1 , 'Expected graph to have 1 fewer vertex' )
		expect( graph.edges.size === sizeE-1 , 'Expected graph to have 1 fewer edge' )
	})
})
testy.run()
/*
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
}*/
