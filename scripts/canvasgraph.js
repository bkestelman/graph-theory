/** 
 * CanvasGraph Constructor 
 * Designed for HTML Canvas
 * Detects if a Vertex already exists when adding
 * Functions accept Vertex/Edge objects or their specs
 */
var CanvasGraph = function(ctx, spec) {
	SimpleGraph.call(this, spec)
	this.ctx = ctx
	this.drawer = {}
}
CanvasGraph.prototype = Object.create(SimpleGraph.prototype)
CanvasGraph.defaultColor = 'white' // TODO: these should probably not be static
CanvasGraph.vrad = 12
CanvasGraph.prototype.createV = function(spec) { // should be a method of Vertex or static
	var newv = new this.Vertex({ x: spec.x, y: spec.y })
	return newv
}
CanvasGraph.prototype.equalV = function(a, b) {
	if (!a || !b) return false
	if (a.x === b.x && a.y === b.y) return true
	return false
}
CanvasGraph.prototype.getOrCreateV = function(v) {
	if (!v) return 
	if (v.x !== undefined && v.y !== undefined) {
		return this.getV(v.x, v.y) || this.createV(v)
	}
}
CanvasGraph.prototype.getV = function(x, y) {
	for (var v of this.vertices) {
		if (v.contains(x, y)) {
			return v } } }
CanvasGraph.prototype.addV = function(v, drawer) {
	if (drawer) drawer.lastDrawn = this.getOrCreateV(drawer.lastDrawn)
	else drawer = this.drawer
	v = this.getOrCreateV(v)
	if (this.equalV(drawer.lastDrawn, v)) { // if "adding" v from itself...
		drawer.lastDrawn = undefined // unset lastDrawn 
		return // do nothing
	}
	SimpleGraph.prototype.addV.call(this, v) 
	if (drawer.lastDrawn) { // add edge (lastDrawn--v)
		this.addE(new this.Edge([ drawer.lastDrawn, v ])) 
	}
	drawer.lastDrawn = v
	return v
}
CanvasGraph.prototype.delV = function(v) {
	v = this.getV(v.x, v.y)
	if (!v) return
	if (v === this.drawer.lastDrawn) { 
		this.drawer.lastDrawn = undefined
	}
	SimpleGraph.prototype.delV.call(this, v)
}
CanvasGraph.prototype.draw = function() {
	for (var v of this.vertices) {
		if (v.contains(this.ctx.mousex, this.ctx.mousey)) {
			this.ctx.strokeStyle = 'cyan'
		}
		else {
			this.ctx.strokeStyle = 'black'
		}
		this.ctx.stroke(v.path)
		this.drawHookV(v)
	}
	this.ctx.strokeStyle = 'black'
	for (var e of this.edges) {
		this.ctx.stroke(e.path)
	}
}
CanvasGraph.prototype.drawHookV = function(v) {}
CanvasGraph.VertexHook = function(v) {}
CanvasGraph.prototype.Vertex = function(spec) { 
	SimpleGraph.prototype.Vertex.call(this)
	this.x = spec.x
	this.y = spec.y
	//this.color = CanvasGraph.defaultColor.slice(0)
	this.path = new Path2D() 
	this.path.arc(this.x, this.y, CanvasGraph.vrad, 0, 2 * Math.PI) // circle
	CanvasGraph.VertexHook(this)
}
CanvasGraph.prototype.Vertex.prototype = Object.create(SimpleGraph.prototype.Vertex.prototype) // this is ugly - reconsider inheritance structure
CanvasGraph.prototype.Vertex.prototype.contains = function(x, y) {
	return (this.x-x)*(this.x-x) + (this.y-y)*(this.y-y) <= CanvasGraph.vrad*CanvasGraph.vrad
}
CanvasGraph.prototype.Edge = function(vertices) {
	SimpleGraph.prototype.Edge.call(this, vertices)
	this.path = new Path2D()
	this.path.moveTo(vertices[0].x, vertices[0].y)
	this.path.lineTo(vertices[1].x, vertices[1].y)
}
CanvasGraph.prototype.Edge.prototype = Object.create(SimpleGraph.prototype.Edge.prototype)
