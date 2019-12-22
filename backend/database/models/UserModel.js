const mongoose = require('../connection');
const Schema = mongoose.Schema;


const userSchema = new Schema({
    name: { type: String },
    email: { type: String },
});


userSchema.virtual('id').
    get(function() { return this._id }).
    set(function(v) { this._id = v }
);

userSchema.index({ email: 1, }, { unique: true });


module.exports = mongoose.model('users', userSchema);
