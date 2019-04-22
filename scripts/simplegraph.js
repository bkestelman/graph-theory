/**
 * SimpleGraph
 * Stores a Set of vertices and a Set of edges 
 * Vertices do not maintain adjacency lists
 * Order of updates does not matter
 */
var SimpleGraph = function() {
	var my = {}

	my.Vertex = function() {
	}
	my.Edge = function(vertices) { // vertices can be any iterable
		this.vertices = new Set(vertices) 
	}
	my.Edge.prototype.isAdj = function(v) {
		for (var _v of this.vertices) {
			if (v === _v) return true
		}
		return false
	}
	my.Edge.prototype.equals = function(e) {
		for (var v of e.vertices) {
			if (! this.vertices.has(v)) return false
		}
		return true
	}
	my.Graph = function(g) { 
		g = g || { vertices: [], edges: [] }
		this.vertices = new Set(g.vertices) 
		this.edges = new Set(g.edges)
	}
	my.Graph.prototype.addV = function(v) { this.vertices.add(v) }
	my.Graph.prototype.addE = function(e) { 
		for (var _e of this.edges) { // don't add if edge already exists
			if (e.equals(_e)) return
		}
		this.edges.add(e) 
	}
	my.Graph.prototype.delV = function(v) { // Also deletes adjacent Edges
		this.vertices.delete(v)
		for (var e of this.edges) {
			if (e.isAdj(v)) {
				this.edges.delete(e)
			}
		}
	}
	my.Graph.prototype.delE = function(e) { this.edges.delete(e) }

	return my
}

//module.exports.SimpleGraph = SimpleGraph
