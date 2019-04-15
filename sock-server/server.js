var port = process.env.NODEJS_PORT || 3000

var io = require('socket.io')(port)
console.log('listening on port ' + port)

var lastgraph

io.on('connection', function(socket) {
	console.log('New connection!')
	socket.on('update', function(graph) { 
		socket.broadcast.emit('update', graph)
		lastgraph = graph // will data get lost if multiple users update the graph at the same time?
	})

	if (lastgraph) {
		socket.emit('update', lastgraph)
	}
})
