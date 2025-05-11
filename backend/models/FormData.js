const mongoose = require('mongoose');

const FormDataSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    profileImage: {
        type: String, // This will store the image filename or URL
        default: ''
    },
    college: {
        type: String,
        default: ''
    },
    branch: {
        type: String,
        default: ''
    }
});

const FormDataModel = mongoose.model('log_reg_form', FormDataSchema);

module.exports = FormDataModel;
