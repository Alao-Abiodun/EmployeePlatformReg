const nodemailer = require('nodemailer');

exports.sendMail = async config => {
  // let account = await nodemailer.createTestAccount();
  // console.log(account)
  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: 'alao43844@gmail.com',
        pass: 'alao1996',
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const info = await transporter.sendMail({
      from: 'UserRegistration@gmail.com',
      ...config,
    });

    return `Preview URL: %s', ${nodemailer.getTestMessageUrl(info)}`;
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
};
