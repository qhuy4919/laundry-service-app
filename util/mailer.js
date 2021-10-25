const nodeMailer = require('nodemailer')

const adminEmail = process.env.EMAIL;
const adminPassword = process.env.EMAIL_PASSWORD;
const mailHost = 'smtp.gmail.com'
const mailPort = 587


const sendMail = (to, body) => {
    const transporter = nodeMailer.createTransport({
        host: mailHost,
        port: mailPort,
        secure: false,
        auth: {
            user: adminEmail,
            pass: adminPassword
        }
    })

    var options = {
        from: adminEmail,
        to: to,
        subject: 'ITJP2 - Online Laundry App',
        text: "",
    }
    if (body) {
        options.subject += " | " + body.subject;
        options.text = body.content;
    }

    return transporter.sendMail(options)
}

module.exports = {
    sendMail: sendMail
}