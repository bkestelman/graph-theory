/** 
 * Server 
 * Represents a connection to the server
 * Sends client updates to server to broadcast to other users
 * Listens for updates from the server and runs a given callback
 */
var Server = function() {
	this.socket = io('${HOST_IP}:${NODEJS_PORT}', {
		autoconnect: false // make sure all callbacks are set first
	})
	this.connect = function() {
		this.socket.connect()
		return this
	}
	this.broadcast = function(update) { // send update to server
		console.log('Server broadcasting')
		console.log(update)
		this.socket.emit('update', update)
	}
	this.onUpdate = function(callback) {
		this.socket.on('update', function(update) {
			callback(update)
		})
		return this
	}
	this.onInit = function(callback) {
		this.socket.on('init', function(updates) { // retrieve full update history from server
			callback(updates)
		})
		return this
	}
}
