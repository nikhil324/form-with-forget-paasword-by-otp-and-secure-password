const mongoose = require("mongoose");
const validator = require("validator");
const registerSchema = new mongoose.Schema({
    "Name": {
        type: String,
        required: true
    },
    "Employee_id": {
        type: Number,
        required: true,
        unique: true
    },
    "Email": {
        type: String,
        required: true,
        unique: true,
        Validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Email is invalid");
            }
        }
    },
    "Age": Number,
    "Address": String,
    "Mobile_no": Number,
    "Password": {
        type: String,
        required: true
    },
    "Confirmpassword": {
        type: String,
        required: true
    }
});

const RegEmployee = new mongoose.model("RegEmployee", registerSchema);

module.exports = RegEmployee;