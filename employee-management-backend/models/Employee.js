const { required } = require('joi');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EmployeeSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    mobile: {
        type: String,
        required: true,
        unique: false,

    },
    designation: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    course: {
        type: [String],
        required: true,
    }
})
const EmployeeModel = mongoose.model('employees', EmployeeSchema)
module.exports = EmployeeModel;