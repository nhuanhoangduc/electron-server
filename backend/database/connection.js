const mongoose = require('mongoose');

mongoose.connect('mongodb://root:root@localhost:27017/admin', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});


module.exports = mongoose;