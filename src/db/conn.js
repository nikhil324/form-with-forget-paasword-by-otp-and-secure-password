const mongoose = require("mongoose");
const connection = async () => {
    try {
        const con = await mongoose.connect("mongodb://localhost:27017/loginreg", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connection Successfull");
    }
    catch (err) {
        console.log(err);
    }
}
connection();