/**
 * Collection
 * Generic interface for a Collection of elements
 * Provides useful methods like add, del, count
 * Iterable
 */
var Collection = function(elements) { this.elements = elements || [] }
Collection.prototype.add = function(v) { this.elements.push(v); return v }
Collection.prototype.del = function(v) { 
	for (var i = this.elements.length-1; i >= 0; i--) {
		if (this.elements[i] === v) {
			this.elements.splice(i, 1)
			return v
		}
	}
}
Collection.prototype.count = function() { return this.elements.length }
Collection.prototype[Symbol.iterator] = function * () {
	for (var v of this.elements) {
		yield v
	}
}
