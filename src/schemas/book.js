var mongoose = require('mongoose')

var BookSchema = new mongoose.Schema({
	title: String,	
	author: String,	
	country: String,
	language: String,		
	year: Number,	
	poster: String,	
	summary: String,
	meta: {
		creatAt:{
			type: Date,
			default: Date.now()
		},
		updateAt:{
			type: Date,
			default: Date.now()
		}
	}
})

//save动作之前的动作
BookSchema.pre('save', function (next) {
	if (this.isNew) {
		this.meta.creatAt = this.meta.updateAt = Date.now()
	}else {
		this.meta.updateAt = Date.now()
	}
	
	next()
})

BookSchema.statics = {
	fetch: function(cb) {
		return this
			.find({})
			.sort('meta.updateAt')
			.exec(cb)
	},
	findById: function(id, cb) {
		return this
			.findOne({_id: id})
			.exec(cb)
	}
}

module.exports = BookSchema
