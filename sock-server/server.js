//import {SimpleGraph} from '../scripts/simplegraph.js'
//import {CanvasGraph} from '../scripts/simplegraph.js'
var port = process.env.NODEJS_PORT || 3000

var io = require('socket.io')(port)
console.log('listening on port ' + port)

var SimpleGraph = require('../scripts/simplegraph.js').SimpleGraph
console.log(SimpleGraph)
var CanvasGraph = require('../scripts/canvasgraph.js').CanvasGraph(SimpleGraph(), storePath=false)
var fullgraph = new CanvasGraph.CanvasGraph()

io.on('connection', function(socket) {
	console.log('New connection!')
	socket.on('update', function(update) { 
		console.log('received update')
		console.log(update)
		socket.broadcast.emit('update', update)
		// from index.html (TODO: separate this out into another module)
		if (update.drawer.lastDrawn) {
			update.drawer.lastDrawn = fullgraph.getV(update.drawer.lastDrawn.x, update.drawer.lastDrawn.y)
		}
		if (update.addV) {
			fullgraph.addV( new CanvasGraph.CanvasVertex(update.addV.x, update.addV.y), update.drawer )
		}
		else if (update.close) {
			update.close = fullgraph.getV(update.close.x, update.close.y) 
			fullgraph.close( update.close, update.drawer )
		}
		else if (update.delV) {
			fullgraph.delV( fullgraph.getV(update.delV.x, update.delV.y) )
		}
	})

	if (fullgraph) {
		socket.emit('init', fullgraph)
	}
})
