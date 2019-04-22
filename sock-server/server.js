var port = process.env.NODEJS_PORT || 3000

var io = require('socket.io')(port)
console.log('listening on port ' + port)

var updates = []

io.on('connection', function(socket) {
	console.log('New connection!')

	socket.emit('init', updates)

	socket.on('update', function(update) { 
		socket.broadcast.emit('update', update)
		updates.push(update)
	})
})
