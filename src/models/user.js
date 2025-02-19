const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: String,
    userId: String,
    phone: String,
    password: String,
    transactionPassword: String,
});

module.exports = mongoose.model("User", UserSchema);
