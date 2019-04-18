/**
 * Graph 
 * Standard "2-graph" (each edge connects exactly two vertices) 
 * Augments Hypergraph
 */
var Graph = function(g) {
	var base = new Hypergraph(g)
	this.vertices = base.vertices
	this.edges = base.edges
}
Graph.prototype = new Hypergraph()
/**
 * Delete a Vertex
 * Unlike in a Hypergraph, Edges of a Graph must be adjacent to two Vertices, so when a Vertex is deleted, its Edges can no longer exist
 */
Graph.prototype.delV = function(v) { 
	for (var e of v.edges) {
		this.edges.del(e)
	}
	return this.vertices.del(v) 
}
