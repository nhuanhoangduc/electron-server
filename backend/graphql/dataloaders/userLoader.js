const UserModel = require('@backend/database/models/UserModel');
const createLoader = require('./createLoader');


module.exports = createLoader(UserModel);
