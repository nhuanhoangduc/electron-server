const mongoose = require('mongoose');

const UserModel = require('@backend/database/models/UserModel');
const userLoader = require('@backend/graphql/dataloaders/userLoader');


module.exports = {
    Query: {
        users: async (_, { filter, options }) => {
            return await UserModel.find(
                filter || {},
                null,
                options || {}
            );
        },
        user: async (_, { id }) => {
            const mongoId = mongoose.Types.ObjectId(id);
            return await userLoader.load(mongoId);
        },
    },

    Mutation: {
        addUser: async (parent, { user }) => {
            const newUser = await UserModel.create(user);
            return newUser;
        },
    },

    User: {

    },
};