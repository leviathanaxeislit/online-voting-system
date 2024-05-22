const mongoose = require('mongoose');

const User = new mongoose.Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    dob:{ type: Date, required: true },
    aadhaar_number:{ type: Number, required: true },
    voter_id:{ type: Number, required: true },
    gender: { type: String, required: true },
    email: { type: String, required: true , unique: true},
    username: { type: String, required: true , unique: true},
    password: { type: String, required: true },
    vote: { type: String, required: true },
    admin: { type: Boolean, default: false },
},
    {collection: 'Users'}
);

const model = mongoose.model('UserData', User);

module.exports = model;



