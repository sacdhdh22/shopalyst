const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    profile :{
        fullName : String,
        dob : Date
    },
    accountStatus: {
        createdOn: Date
    }
});

const User = mongoose.model('user', userSchema);
module.exports = User;
