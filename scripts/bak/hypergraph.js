/**
 * Hypergraph
 * Abstraction of classical graph, where edges may connect any number of vertices
 * Uses adjacency lists, where each Vertex has a list of adjacent Edges and vice versa
 */
var VertexCollection = function(vertices) { 
	var col = new Collection(vertices) 
	this.elements = col.elements
	this.vertices = this.elements // Rename the adjacency list for convenience
}
VertexCollection.prototype = new Collection()
var EdgeCollection = function(edges) {
	var col = new Collection(edges)
	this.elements = col.elements 
	this.edges = this.elements // Rename the adjacency list for convenience
}
EdgeCollection.prototype = new Collection()
var Vertex = function(v) {
	var v = v || {}
	this.edges = v.edges || new EdgeCollection()
}
var Edge = function(e) {
	var e = e || {}
	this.vertices = e.vertices || new VertexCollection() 
}
var Hypergraph = function(g) {
	g = g || {} 
	this.vertices = g.vertices || new VertexCollection()
	this.edges = g.edges || new EdgeCollection()
}
/** 
 * Add a Vertex and its adjacent Edges
 * Assumes adjacent Edges are already in the Hypergraph
 */
Hypergraph.prototype.addV = function(v) { 
	for (var e of v.edges) { 
		e.vertices.add(v) // Add to adjacent Edges' adjacency lists
	} 
	this.vertices.add(v) 
}
/**
 * Add an Edge
 * Assumes adjacent Vertices are already in the Hypergraph
 */
Hypergraph.prototype.addE = function(e) { 
	for (var v of e.vertices) {
		v.edges.add(e) // Add to adjacent Vertices' adjacency lists
	}
	this.edges.add(e) 
}
/** 
 * Delete a Vertex
 * Because this is a Hypergraph, does not delete the Vertex's adjacent Edges
 */
Hypergraph.prototype.delV = function(v) { 
	for (var e of v.edges) {
		e.vertices.del(v) // Update adjacent Edges
	}
	return this.vertices.del(v) 
}
/**
 * Delete an Edge
 * Does not delete adjacent Vertices
 */
Hypergraph.prototype.delE = function(e) { 
	console.log('in Hypergraph.delE')
	console.log('edges before')
	console.log(this.edges)
	for (var v of e.vertices) {
		v.edges.del(e) // Update adjacent Vertices
	}
	var e = this.edges.del(e) 
	console.log('edges after')
	console.log(this.edges)
	return e
}
Hypergraph.prototype.countV = function() { return this.vertices.count() }
Hypergraph.prototype.countE = function() { return this.edges.count() }

Vertex.prototype.addTo = function(g) { return g.addV(this) }
Edge.prototype.addTo = function(g) { return g.addE(this) }
Vertex.prototype.delFrom = function(g) { return g.delV(this) }
Edge.prototype.delFrom = function(g) { return g.delE(this) }


