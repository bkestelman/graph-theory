/** 
 * Canvas
 * This file handles canvas events
 * Uses CanvasGraph for drawing
 * Broadcasts updates through socket
 */
var Canvas = (function(Socket) {
	var my = {}
	my.canvas = document.getElementById('canvas')
	my.ctx = canvas.getContext('2d')
	my.CG = CanvasGraph(SimpleGraph(), my.ctx)
	my.graph = new my.CG.CanvasGraph()
	my.sock = Socket(my.CG, my.graph)

	canvas.addEventListener('click', function(event) {
		var x = event.offsetX
		var y = event.offsetY 
		var clickedV = my.graph.getV(x, y) 
		if (clickedV) { // if we clicked an existing Vertex
			if (my.CG.drawer.lastDrawn) {
				my.sock.broadcast({ close: clickedV }) 
				var newe = my.graph.close(clickedV) // "close" the graph
			}
			else { 
				my.CG.drawer.lastDrawn = clickedV
			}
		}
		else { // otherwise add a new Vertex
			var newv = new my.CG.CanvasVertex(x, y)
			my.sock.broadcast({ addV: newv })
			my.graph.addV(newv) 
		}
	})
	canvas.addEventListener('contextmenu', function(event) { // right click
		event.preventDefault() // don't open menu
		var x = event.offsetX
		var y = event.offsetY 
		var clickedV = my.graph.getV(x, y)
		my.sock.broadcast({ delV: clickedV })
		my.graph.delV(clickedV)
		return false
	})
	canvas.addEventListener('mousemove', function(event) {
		my.ctx.mousex = event.offsetX
		my.ctx.mousey = event.offsetY
	})
	my.colorPicker = document.getElementById('color')
	my.colorPicker.addEventListener('change', function(event) {
		my.CG.defaultColor = event.target.value
	})

	my.draw = function() { // clear canvas and draw graph
		my.ctx.clearRect(0, 0, canvas.width, canvas.height)
		my.graph.draw()
		window.requestAnimationFrame(my.draw) 
	}
	window.requestAnimationFrame(my.draw) 
	
	return my
})(Socket)
