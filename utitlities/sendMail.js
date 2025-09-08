const nodemailer = require("nodemailer")
const {createWelcomeEmailTemplate} = require("./emailTemplate")

exports.sendEmail = async (to, subject, html) => {
    const transporter = nodemailer.createTransport({
        service : process.env.EMAIL_SERVICE,
        auth:{
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    })
    const mailOptions= {
        from: `Desserts Factory`,
        to,
        subject,
        html,
    }
    try {
        await transporter.sendMail(mailOptions);
        console.log("Email sent successfully to",to);
    } catch (error) {
        console.error("Email sending failed", error.message);
    }
}
exports.sendWelcomeEmail = async (name,client_url,email)=>{
    const subject = "Welcome to Desserts Factory"
    const html= createWelcomeEmailTemplate(name,client_url)

    await exports.sendEmail(email, subject,html)
}