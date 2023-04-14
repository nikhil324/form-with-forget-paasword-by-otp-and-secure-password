const express = require("express");
const app = express();
const nodemailer = require("nodemailer");
const Mailgen = require('mailgen');
const RegEmployee = require("../src/models/register.js");
//var email;
var otpgen = Math.floor(Math.random() * 10000);
const mailperform = async (req, res) => {
    const emaildata = req.body.email;
    const result = await RegEmployee.findOne({ Email: emaildata });
    if (result) {
        //'ukxxeyhhugokhgcs'
        //'itsganeshlko02@gmail.com'
        //const { userEmail } = 'karangupta1907@gmail.com';
        const { userEmail } = emaildata;
        let config = {
            service: 'gmail',
            auth: {
                user: 'itsganeshlko02@gmail.com',
                pass: 'ukxxeyhhugokhgcs',
            }
        }
        let transporter = nodemailer.createTransport(config);
        let MailGenerator = new Mailgen({
            theme: "default",
            product: {
                name: "OTP Generator",
                link: 'https://mailgen.js/'
            }
        })
        let response = {
            body: {
                name: ",Your ONE TIME PASSWORD : ",
                table: {
                    data: [
                        {
                            item: otpgen
                        }
                    ]
                },

                outro: "looking forword to do more business"
            }
        }
        let mail = MailGenerator.generate(response)
        let message = {
            from: 'itsganeshlko02@gmail.com',
            //to: 'karangupta1907@gmail.com',
            to: emaildata,
            subject: "OTP Generator",
            html: mail,
        }
        transporter.sendMail(message).then(() => {
            console.log(otpgen)
            return res.status(201).render("otp", { Email: emaildata });
        }).catch((error) => {
            return res.status(500).json({ error })
        })
    }
    else {
        console.log("Wrong email");
    }
    // return emaildata;
}
//console.log(email);


module.exports = { mailperform, otpgen };
