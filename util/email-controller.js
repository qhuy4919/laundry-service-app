const mailer = require('./mailer')

let sendMail = async (req, res, sub) => {
    try {
        const { email } = req.body;
        console.log(sub);
        await mailer.sendMail(email, sub);

    } catch (error) {

        console.log(error)
        res.send(error)
    }
}

module.exports = {
    sendMail: sendMail
}