const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com",
    port: 587,
    secure: false,
    auth: {
        user: "meirelesdev@hotmail.com",
        pass: "j0@0v1t0r"
    }
});

module.exports = transporter;