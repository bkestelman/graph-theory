/**
 * SimpleGraph Constructor
 * Stores a Set of Vertices and a Set of Edges 
 * Vertices do not maintain adjacency lists
 * The order of updates does not matter
 */
var SimpleGraph = function(spec) {
	spec = spec || { vertices: [], edges: [] }
	this.vertices = new Set(spec.vertices)
	this.edges = new Set(spec.edges)
}
SimpleGraph.prototype.addV = function(v) { this.vertices.add(v) }
SimpleGraph.prototype.addE = function(e) { 
	for (var _e of this.edges) { // don't add if edge exists
		if (e.equals(_e)) return
	}
	this.edges.add(e) 
}
SimpleGraph.prototype.delV = function(v) { 
	this.vertices.delete(v)
	for (var e of this.edges) { // delete adjacent edges
		if (e.isAdj(v)) {
			this.edges.delete(e)
		}
	}
}
SimpleGraph.prototype.delE = function(e) { this.edges.delete(e) }

SimpleGraph.prototype.Vertex = function() {
}
SimpleGraph.prototype.Edge = function(vertices) { 
	this.vertices = new Set(vertices) 
}
SimpleGraph.prototype.Edge.prototype.isAdj = function(v) {
	for (var _v of this.vertices) {
		if (v === _v) return true
	}
	return false
}
SimpleGraph.prototype.Edge.prototype.equals = function(e) {
	for (var v of e.vertices) {
		if (! this.vertices.has(v)) return false
	}
	return true
}
