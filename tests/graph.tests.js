import { testy, describe, test, expect } from 'http://192.81.214.140:8080/testy.js'
describe('SimpleGraph Unit Test', function() { 
	graphTests(SimpleGraph)
})
describe('CanvasGraph Unit Test', function() { 
	graphTests(CanvasGraph)
})
function graphTests(Graph) {
	var graph = new Graph()
	test('Starts empty', function() {
		expect( graph.vertices.size === 0 )
		expect( graph.edges.size === 0 ) 
	})
	var addCount = 5
	test('Add new vertices', function() {
		for (var i = 0; i < addCount; i++) { // TODO: implement flexible way to run same test multiple times (e.g. through parameter)
			graph.addV( new Graph.prototype.Vertex({ x: i*Graph.vrad*2, y: i*Graph.vrad*2 }) ) 
			expect( graph.vertices.size === i+1 , 'Expected graph to have ' + (i+1) + ' vertices after ' + (i+1) + ' calls to addV' )
			if (Graph === SimpleGraph) {
				expect( graph.edges.size === 0 , 'Expected graph to have 0 edges after calls to addV' )
			}
			else if (Graph === CanvasGraph) {
				expect( graph.edges.size === i , 'Expected graph to have ' + i + ' edges after ' + (i+1) + ' calls to addV' )
			}
		}
	})
	test('Delete vertices', function() {
		var sizeV = graph.vertices.size 
		var sizeE = graph.edges.size 
		for (var v of graph.vertices) {
			graph.delV(v)
			sizeV -= 1
			expect( graph.vertices.size === sizeV , 'Expected ' + sizeV + ' vertices after ' + (addCount-sizeV) + ' deletions' )
			if (Graph === SimpleGraph) {
				expect( graph.edges.size === 0 , 'Expected graph to have 0 edges' )
			}
			else if (Graph === CanvasGraph) {
				if (sizeV > 0) {
					expect( graph.edges.size === sizeV-1 , 'Expected graph to have ' + (sizeV-1) + ' edges' )
				}
				else {
					expect( graph.edges.size === 0 , 'Expected graph to have 0 edges' )
				}
			}
		}
	})
	test('Delete a vertex not in graph', function() {
		//TODO: add way to specify initial state this test depends on (or warn and skip test if state is different)
		var size = graph.vertices.size 
		graph.delV( new Graph.prototype.Vertex({ x: 0, y: 0}) )
		expect( graph.vertices.size === size , 'Expected no change in size' ) 
	})
	test('Add existing vertex to graph (i.e. add same vertex twice)', function() {
		var v = new Graph.prototype.Vertex({ x: 0, y: 0 })
		graph.addV(v)
		var sizeV = graph.vertices.size
		var sizeE = graph.edges.size
		graph.addV(v)
		expect( graph.vertices.size === sizeV , 'Expected no change in size' ) 
		expect( graph.edges.size === sizeE , 'Expected no change in size' ) 
	}) // consider adding .then to test, to tightly couple to next test when they are dependent 
	var v1, v2
	test('Add edge connecting vertices', function() {
		var sizeV = graph.vertices.size
		var sizeE = graph.edges.size
		v1 = new Graph.prototype.Vertex({ x: Graph.vrad*2, y: Graph.vrad*2 })
		v2 = new Graph.prototype.Vertex({ x: Graph.vrad*4, y: Graph.vrad*4 })
		graph.addV(v1)
		graph.addV(v2)
		graph.addE(new Graph.prototype.Edge([v1, v2]))
		expect( graph.vertices.size === sizeV+2 , 'Expected graph to have 2 more vertices (actually has ' + (graph.vertices.size - sizeV) + ' more)' )
		expect( graph.edges.size === sizeE+1 , 'Expected graph to have 1 more edge (actually has ' + (graph.edges.size - sizeE) + ' more)' )
	})
	test('Delete vertex with edge', function() {
		var sizeV = graph.vertices.size
		var sizeE = graph.edges.size
		graph.delV(v1)
		expect( graph.vertices.size === sizeV-1 , 'Expected graph to have 1 fewer vertex' )
		expect( graph.edges.size === sizeE-1 , 'Expected graph to have 1 fewer edge' )
	})
}
testy.run()
