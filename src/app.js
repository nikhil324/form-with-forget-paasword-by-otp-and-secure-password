const express = require("express");
const app = express();
const path = require("path");
const hbs = require("hbs");
const port = process.env.PORT || 3000;
require("./db/conn.js");
const RegEmployee = require("./models/register.js");
const mailfile = require("../controllers/mailperform.js");
var { mailperform, otpgen } = require("../controllers/mailperform.js");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//const static_path = path.join(__dirname, "../public");
const template_path = path.join(__dirname, "../templates/views");
const partials_path = path.join(__dirname, "../templates/partials");
//console.log(static_path);
//app.use(express.static(static_path));
app.set("view engine", "hbs");
app.set("views", template_path);
hbs.registerPartials(partials_path);
var edata;

app.get("/", (req, res) => {
    res.render("index");
})
app.get("/login", (req, res) => {
    res.render("login");
});
app.post("/registration", async (req, res) => {
    try {
        const data = req.body;
        if (data.pass == data.conpass) {
            const dataObj = new RegEmployee({
                Name: data.name,
                Employee_id: data.empid,
                Email: data.email,
                Age: data.age,
                Address: data.address,
                Password: data.pass,
                Confirmpassword: data.conpass

            });
            const set = await dataObj.save();
            console.log("<h1>User Registered Successfully! </h1>");
            res.send("<h1>User Registered Successfully! </h1>");
        }
        else {
            console.log("<h1>Confirm Password must be same as password !!!!</h1>")
            res.send("<h1>Confirm Password must be same as password !!!!</h1>");
        }
    } catch (err) {
        console.log(err);
        res.send(err);
    }
})
app.get("/registration", (req, res) => {
    res.render("register");
});
app.get("/forget", (req, res) => {
    res.render("forget");
});
app.post("/genrateotp", mailperform);

app.post("/otp", async (req, res) => {
    const otp = req.body.otp;
    const pass = await RegEmployee.findOne({ Email: req.body.email });
    if (otp == otpgen) {
        //console.log(pass);
        otpgen = Math.floor(Math.random() * 10000);
        res.send("<h1> Your Password is : </h1>" + pass.Password);
    }
    else {
        console.log(" your otp is wrong ");
        res.send("<h1> your one time password is wrong </h1>");
    }
})
app.post("/login", async (req, res) => {
    try {
        const data = req.body;
        const userdata = await RegEmployee.findOne({ Email: data.email });
        if (userdata.Password == data.pass) {
            //console.log(userdata);
            res.render("welcome");
        }
        else {
            console.log("Credentials are not valid");
            res.send("<h1>Credentials are not valid</h1>");
        }
    }
    catch (err) {
        console.log(err);
        res.send("<h1>Credentials are not valid</h1>");
    }
})


app.listen(port, () => {
    console.log(`Server is running at port number ${port}`);
});