/** 
 * Canvas
 * This file handles canvas events
 * Uses CanvasGraph for drawing
 * Broadcasts updates through socket
 */
(function(Socket) {
	var canvas = document.getElementById('canvas')
	var ctx = canvas.getContext('2d')
	var CG = CanvasGraph(SimpleGraph(), ctx)
	var graph = new CG.CanvasGraph()
	var sock = Socket(CG, graph)

	canvas.addEventListener('click', function(event) {
		var x = event.offsetX
		var y = event.offsetY 
		var clickedV = graph.getV(x, y) 
		if (clickedV) { // if we clicked an existing Vertex
			if (CG.drawer.lastDrawn) {
				sock.broadcast({ close: clickedV }) 
				var newe = graph.close(clickedV) // "close" the graph
			}
			else { 
				CG.drawer.lastDrawn = clickedV
			}
		}
		else { // otherwise add a new Vertex
			var newv = new CG.CanvasVertex(x, y)
			sock.broadcast({ addV: newv })
			graph.addV(newv) 
		}
	})
	canvas.addEventListener('contextmenu', function(event) { // right click
		event.preventDefault() // don't open menu
		var x = event.offsetX
		var y = event.offsetY 
		var clickedV = graph.getV(x, y)
		sock.broadcast({ delV: clickedV })
		graph.delV(clickedV)
		return false
	})
	canvas.addEventListener('mousemove', function(event) {
		ctx.mousex = event.offsetX
		ctx.mousey = event.offsetY
	})

	function draw() { // clear canvas and draw graph
		ctx.clearRect(0, 0, canvas.width, canvas.height)
		graph.draw()
		window.requestAnimationFrame(draw) 
	}
	window.requestAnimationFrame(draw) 
})(Socket)
