/** 
 * my.CanvasGraph
 * Augments SimpleGraph with functionality for drawing on an HTML my.Canvas
 */
var CanvasGraph = (function(Graph) {
	var my = {}, vrad = 12
	my.CanvasVertex = function(x, y) {
		this.x = x
		this.y = y
		this.path = new Path2D() 
		this.path.arc(x, y, vrad, 0, 2 * Math.PI)
		this.contains = function(x, y) {
			return ctx.isPointInPath(this.path, x, y)
		}
	}
	my.CanvasVertex.prototype = new Graph.Vertex()
	my.CanvasEdge = function(vertices) {
		console.log('constructing edge')
		this.vertices = new Set(vertices)
		this.path = new Path2D()
		this.path.moveTo(vertices[0].x, vertices[0].y)
		this.path.lineTo(vertices[1].x, vertices[1].y)
		console.log(this)
	}
	my.CanvasEdge.prototype = new Graph.Edge()
	my.CanvasGraph = function(g) {
		var base = new Graph.Graph(g)
		this.vertices = base.vertices
		this.edges = base.edges
		var lastDrawn
		this.addV = function(v) {
			Graph.Graph.prototype.addV.call(this, v) 
			if (lastDrawn) { // if we're drawing, add Edge
				Graph.Graph.prototype.addE.call( this, new my.CanvasEdge([ lastDrawn, v ]) )
			}
			lastDrawn = v
		}
		this.delV = function(v) {
			if (!v) return
			if (v === lastDrawn) {
				lastDrawn = undefined
			}
			Graph.Graph.prototype.delV.call(this, v)
		}
		this.close = function(v) { // "close" a graph 
			Graph.Graph.prototype.addE.call( this, new my.CanvasEdge([ lastDrawn, v ]) ) // add Edge
			lastDrawn = undefined
		}
		this.draw = function() {
			for (var v of this.vertices) {
				ctx.stroke(v.path)
			}
			for (var e of this.edges) {
				ctx.stroke(e.path)
			}
		}
		this.getV = function(x, y) {
			for (var v of this.vertices) {
				if (v.contains(x, y)) {
					return v
				}
			}
		}
	}
	my.CanvasGraph.prototype = new Graph.Graph()

	return my
}(SimpleGraph))
