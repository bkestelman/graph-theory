/** 
 * Socket
 * High level interface for exchanging updates with server through web socket
 */
var Socket = function(CG, graph) {
	var my = {}, socket = io('${HOST_IP}:${NODEJS_PORT}')

	my.applyUpdate = function(update) { // apply an update received from server to client's graph
		if (update.drawer.lastDrawn) {
			update.drawer.lastDrawn = graph.getV(update.drawer.lastDrawn.x, update.drawer.lastDrawn.y)
		}
		if (update.addV) {
			graph.addV( new CG.CanvasVertex(update.addV.x, update.addV.y), update.drawer )
		}
		else if (update.close) {
			update.close = graph.getV(update.close.x, update.close.y) 
			graph.close( update.close, update.drawer )
		}
		else if (update.delV) {
			graph.delV( graph.getV(update.delV.x, update.delV.y) )
		}
	}
	my.broadcast = function(update) { // send update to server
		update.drawer = CG.drawer
		socket.emit('update', update)
	}

	socket.on('update', function(update) {
		my.applyUpdate(update)
	})
	socket.on('init', function(updates) { // retrieve full update history from server
		for (var u of updates) {
			my.applyUpdate(u)
		}
	})

	return my
}
