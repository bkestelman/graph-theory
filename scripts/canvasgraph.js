/** 
 * my.CanvasGraph
 * Augments SimpleGraph with functionality for drawing on an HTML my.Canvas
 */
//var SimpleGraph = require('SimpleGraph').SimpleGraph
var CanvasGraph = function(Graph) {
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
		this.drawer = new my.Drawer()
		this.addV = function(v, drawer=this.drawer) {
			console.log('adding v')
			Graph.Graph.prototype.addV.call(this, v) 
			if (drawer.lastDrawn) { // if we're drawing, add Edge
				Graph.Graph.prototype.addE.call( this, new my.CanvasEdge([ drawer.lastDrawn, v ]) )
			}
			drawer.lastDrawn = v
			return v
		}
		this.delV = function(v) {
			if (!v) return
			if (v === this.drawer.lastDrawn) { 
				this.drawer.lastDrawn = undefined
			}
			Graph.Graph.prototype.delV.call(this, v)
		}
		this.close = function(v, drawer=this.drawer) { // "close" a graph 
			console.log('closing')
			if (v === drawer.lastDrawn) return
			Graph.Graph.prototype.addE.call( this, new my.CanvasEdge([ drawer.lastDrawn, v ]) ) 
			drawer.lastDrawn = undefined
		}
		this.draw = function() {
			for (var v of this.vertices) {
				if (v.contains(mousex, mousey)) {
					ctx.strokeStyle = 'cyan'
				}
				else {
					ctx.strokeStyle = 'black'
				}
				ctx.stroke(v.path)
			}
			ctx.strokeStyle = 'black'
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
	my.Drawer = function(name) { // to keep track of multiple users drawing on one Graph
		this.lastDrawn
	}

	return my
}

module.exports.CanvasGraph = CanvasGraph
//export {CanvasGraph}
