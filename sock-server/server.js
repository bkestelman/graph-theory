//import {SimpleGraph} from '../scripts/simplegraph.js'
//import {CanvasGraph} from '../scripts/simplegraph.js'
var port = process.env.NODEJS_PORT || 5000

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
