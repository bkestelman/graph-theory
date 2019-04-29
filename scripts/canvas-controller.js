/** 
 * Listen for Canvas events -> update Graph
 * Constantly refresh Canvas to include Graph updates
 */
var CanvasController = (function() {
	var my = {}
	my.canvas = document.getElementById('canvas')
	my.ctx = canvas.getContext('2d')
	GraphService.prototype = Object.create(CanvasGraph.prototype) // TODO: this belongs somewhere else
	my.graph = new GraphService(CanvasGraph, Server, my.ctx)

	canvas.addEventListener('click', function(event) {
		var x = event.offsetX
		var y = event.offsetY 
		my.graph.addV(x, y)
	})
	canvas.addEventListener('contextmenu', function(event) { // right click
		event.preventDefault() // don't open menu
		var x = event.offsetX
		var y = event.offsetY 
		my.graph.delV(x, y)
		return false
	})
	canvas.addEventListener('mousemove', function(event) {
		my.ctx.mousex = event.offsetX
		my.ctx.mousey = event.offsetY
	})
	my.colorPicker = document.getElementById('color')
	my.colorPicker.addEventListener('change', function(event) {
		my.graph.setColor(event.target.value)
	})

	my.redraw = function() { // clear canvas and draw graph
		my.ctx.clearRect(0, 0, canvas.width, canvas.height)
		my.graph.draw()
		window.requestAnimationFrame(my.redraw) 
	}
	window.requestAnimationFrame(my.redraw) 
	
	return my
}())
