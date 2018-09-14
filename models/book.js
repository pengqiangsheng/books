var mongoose = require('mongoose')
var BookSchema = require('../Schemas/book')
var Book = mongoose.model('Book',BookSchema)

module.exports = Book