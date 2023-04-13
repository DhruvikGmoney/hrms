const { user, password } = require("../Config/Config");
const nodemailer = require("nodemailer");

let sendMail = async (to, otp) => {
    try {
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: user,
                pass: password
            }
        });

        var mailOptions = {
            from: user,
            to: to,
            subject: 'Verification From HRMS ✔',
            text: 'For Verify Email',
            html: `<P>This is OTP For Verify Email</p><b>${otp}</b> `,
        };
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
                console.log('Email MessageId: ' + info.messageId);
            }
        });
    } catch (err) {
        return res
            .status(500)
            .json({ status: false, message: 'Server Error', error: err.message || err.toString() });
    }

}

module.exports = { sendMail }