/**
 * Color Plugin
 */
var ColorPlugin = (function(gs) {
	var Graph = gs.Graph
	Graph.defaultColor = 'white'
	var createV = Graph.prototype.createV
	Graph.prototype.createV = function(spec) {
		var newv = createV.call(gs, spec) 
		newv.color = spec.color || Graph.defaultColor.slice(0)
		return newv
	}
}(CanvasController.graph))
