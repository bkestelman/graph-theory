var port = process.env.NODEJS_PORT || 3000

var io = require('socket.io')(port)
console.log('listening on port ' + port)

var fullgraph 

io.on('connection', function(socket) {
	console.log('New connection!')
	socket.on('update', function(updates) { 
		socket.broadcast.emit('update', updates)
	})

	if (fullgraph) {
		socket.emit('update', fullgraph)
	}
})
