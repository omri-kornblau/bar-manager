exports.smtpTransportConf = {
  secure: true,
  service: 'gmail',
  auth: {
    user: 'gseinstestnew@gmail.com',
    pass: process.env.EMAIL_PASSWORD
  }
};
