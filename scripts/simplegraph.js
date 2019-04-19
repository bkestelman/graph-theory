/**
 * SimpleGraph
 * Stores a Set of vertices and a Set of edges 
 * Vertices do not maintain adjacency lists
 */

/** 
 * SimpleGraph Module
 */
var SimpleGraph = function() {
	var my = {}

	my.Vertex = function() {
	}
	my.Edge = function(vertices) {
		this.vertices = vertices || new Set()
	}
	my.Edge.prototype.isAdj = function(v) {
		for (var _v of this.vertices) {
			if (v === _v) return true
		}
		return false
	}
	my.Graph = function() {
		this.vertices = new Set() 
		this.edges = new Set() 
	}
	my.Graph.prototype.addV = function(v) { this.vertices.add(v) }
	my.Graph.prototype.addE = function(e) { this.edges.add(e) }
	my.Graph.prototype.delV = function(v) { // Also delete adjacent Edges
		console.log('deleting v')
		this.vertices.delete(v)
		console.log('deleting adj edges')
		for (var e of this.edges) {
			if (e.isAdj(v)) {
				this.edges.delete(e)
			}
		}
	}
	my.Graph.prototype.delE = function(e) { this.edges.delete(e) }

	return my
}

module.exports.SimpleGraph = SimpleGraph
//export {SimpleGraph}
