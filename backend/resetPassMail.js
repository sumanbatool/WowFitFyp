const nodemailer = require('nodemailer');
const sendConfirmationEmail = async (email) => {
    try {
      //create a transporter object that specifies the email,service to use and authentication credentials
      let transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: 'sumanbatool223@gmail.com',
          pass: 'bojvilkrilagghft',
        },
      });
      let info = await transporter.sendMail({
        from: 'sumanbatool223@gmail.com',
        to: email,
        subject: 'Your password has been reset',
        html: `
        <div>
        <h2 style="color: #333;">Reset Password</h2>
        <p>Hi ${email},This is a confirmation that the password for your account at our app has just been changed.</p>
        </div>`,
      });
      console.log('A confirmation Email has been sent');
    } catch (error) {
      console.log(error,'Confirmation  Mail failed to send');
    }
  };
  module.exports = sendConfirmationEmail;
  
  
    