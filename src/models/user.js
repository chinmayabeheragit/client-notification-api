const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: String,
    userId: String,
    password: String,
    transactionPassword: String,
    phone: String,
});

module.exports = mongoose.model("User", UserSchema);
