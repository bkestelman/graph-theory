/** 
 * my.CanvasGraph
 * Augments SimpleGraph with functionality for drawing on an HTML my.Canvas
 * Reconstructable from the "updates" which created another Graph
 * On client, use storePath=true so client can draw the Graph
 * On server, use storePath=false (server just needs coordinate data and functions, but won't draw) 
 */
var CanvasGraph = function(Graph, ctx, storePath=true) {
	var my = {}, vrad = 12 

	my.CanvasVertex = function(x, y) {
		this.x = x
		this.y = y
		if (storePath) { // draw circle
			this.path = new Path2D() 
			this.path.arc(x, y, vrad, 0, 2 * Math.PI)
		}
	}
	my.CanvasVertex.prototype = new Graph.Vertex()
	my.CanvasVertex.prototype.contains = function(x, y) {
		return (this.x-x)*(this.x-x) + (this.y-y)*(this.y-y) <= vrad*vrad
	}
	my.CanvasEdge = function(vertices) {
		this.vertices = new Set(vertices)
		if (storePath) { // draw line
			this.path = new Path2D()
			this.path.moveTo(vertices[0].x, vertices[0].y)
			this.path.lineTo(vertices[1].x, vertices[1].y)
		}
	}
	my.CanvasEdge.prototype = new Graph.Edge()

	my.Drawer = function() { // keep track of multiple users drawing on one Graph
		this.lastDrawn // last Vertex drawn by this Drawer
	}
	my.drawer = new my.Drawer() 

	my.CanvasGraph = function(g) {
		var base = new Graph.Graph(g)
		this.vertices = base.vertices
		this.edges = base.edges
	}
	my.CanvasGraph.prototype = new Graph.Graph()
	my.CanvasGraph.prototype.addV = function(v, drawer=my.drawer) {
		Graph.Graph.prototype.addV.call(this, v) 
		if (drawer.lastDrawn) { // if we're currently drawing, add Edge
			Graph.Graph.prototype.addE.call( this, new my.CanvasEdge([ drawer.lastDrawn, v ]) )
		}
		drawer.lastDrawn = v
		return v
	}
	my.CanvasGraph.prototype.delV = function(v) {
		if (!v) return
		if (v === my.drawer.lastDrawn) { 
			my.drawer.lastDrawn = undefined
		}
		Graph.Graph.prototype.delV.call(this, v)
	}
	my.CanvasGraph.prototype.close = function(v, drawer=my.drawer) { // "close" a graph 
		if (v === drawer.lastDrawn) return
		Graph.Graph.prototype.addE.call( this, new my.CanvasEdge([ drawer.lastDrawn, v ]) ) 
		drawer.lastDrawn = undefined
	}
	my.CanvasGraph.prototype.draw = function() {
		for (var v of this.vertices) {
			if (v.contains(ctx.mousex, ctx.mousey)) {
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
	my.CanvasGraph.prototype.getV = function(x, y) {
		for (var v of this.vertices) {
			if (v.contains(x, y)) {
				return v
			}
		}
	}
	return my
}

//module.exports.CanvasGraph = CanvasGraph
