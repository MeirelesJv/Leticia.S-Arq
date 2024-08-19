const nodemailer = require('nodemailer');
const key = require('../../Keys');

let transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com",
    port: 587,
    secure: false,
    tls: {
      ciphers: "SSLv3",
    },
    auth: {
        user: key.Email,
        pass: key.emailPassword
    },
    from: key.Email,
});

module.exports = transporter;