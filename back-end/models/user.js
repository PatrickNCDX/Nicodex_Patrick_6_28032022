const mongoose = require('mongoose');
const uniqueUser = require('mongoose-unique-validator');

const schemaUser = mongoose.Schema({
    email: { type: String, required: true, unique: true }, // Une adresse mail = un seul compte.
    password: { type: String, required: true }
});

schemaUser.plugin(uniqueUser);
module.exports = mongoose.model("user", schemaUser)