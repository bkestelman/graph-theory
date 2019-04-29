/**
 * GraphingService
 * Exposes functions to update Graph
 * Sends updates to Server
 * Listens for updates from Server -> updates Graph
 */
var GraphService = function(Graph, Server, ctx) {
	Graph.call(this, ctx)
	this.Graph = Graph
	// called by CanvasController
	this.addV = function(x, y) {
		console.log('GraphingService addV')
		var v = { x: x, y: y, color: Graph.defaultColor }
		this.broadcast({ addV: v, drawer: this.drawer }) 
		v = Graph.prototype.addV.call(this, v)
	}
	this.delV = function(x, y) {
		console.log('GraphingService delV')
		var v = { x: x, y: y }
		this.broadcast({ delV: v }) 
		Graph.prototype.delV.call(this, v)
	}
	// server 
	this.broadcast = function(update) {
		console.log('broadcasting')
		console.log(update)
		server.broadcast(update)
	}
	var that = this
	this.applyUpdate = function(update) { // apply update received from server to client's graph
		console.log('applying update')
		console.log(update)
		if (update.addV) {
			Graph.prototype.addV.call(that, update.addV, update.drawer)
		}
		else if (update.delV) {
			Graph.prototype.delV.call(that, update.delV)
		}
	}
	this.applyUpdates = function(updates) {
		console.log('received updates')
		console.log(updates)
		for (var u of updates) {
			that.applyUpdate(u)
		}
	}
	server = new Server()
	server.onUpdate(this.applyUpdate).onInit(this.applyUpdates).connect()
	//server = new StubServer() // to test client only
}
var StubServer = function() {
	this.broadcast = function() {}
}
