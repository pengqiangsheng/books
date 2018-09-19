var mongoose = require('mongoose')
var bcrypt = require('bcrypt')//存储密码的算法
var SALT_WIRK_FACTOR = 10

var UserSchema = new mongoose.Schema({
	name: String,
	pwd: String, 
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
UserSchema.pre('save', function (next) {
	var user = this
	
	if (this.isNew) {
		this.meta.creatAt = this.meta.updateAt = Date.now()
	}else {
		this.meta.updateAt = Date.now()
	}
	
	//密码加盐
	bcrypt.genSalt(SALT_WIRK_FACTOR, function(err, salt) {
		if(err) return next(err)

		bcrypt.hash(user.pwd, salt, function(err, hash) {
			if(err) return next(err)

			user.pwd = hash
			console.log(user.pwd)
			next()
		})
	})
})

UserSchema.methods = {
	comparePwd: function(_pwd, cb) {
		bcrypt.compare(_pwd, this.pwd, function(err, isMatch) {
			if (err) return cb(err)

			cb(null, isMatch)
		})
	}
}

UserSchema.statics = {
	fetch: function(cb) {
		return this
			.find({})
			.sort('meta.updateAt')
			.exec(cb)
	}
}

module.exports = UserSchema
