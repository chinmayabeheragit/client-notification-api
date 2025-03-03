const User = require("../models/User");

const getUserById = async (userId) => {
    return await User.findOne({ userId });
};

module.exports = { getUserById };
