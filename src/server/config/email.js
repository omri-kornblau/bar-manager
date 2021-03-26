const fs = require('fs');
const Path = require('path');

exports.smtpTransportConf = {
  service: 'gmail',
  auth: {
    user: 'gseinstestnew@gmail.com',
    pass: '1qaz@WSX3edc',
    //pass: process.env.EMAIL_PASSWORD 
  }
};

exports.logoBase64 = fs.readFileSync(Path.resolve(__dirname, '..', '..', 'client', 'src', 'assets', 'img', 'gse-logo-wt.png'), {encoding: 'base64'});
exports.logoCid = 'logo@gse.org';

exports.emailTemplate = (name, message) => `
שלום ${name},<br/>
${message}<br/>
<br/>
<img src="cid:${exports.logoCid}"/>
<br/>
צוות GSE Insurance`;

exports.emailContent = {
  NewMessage: {
    subject: 'התקבלה הודעה חדשה',
    message: ({id, from}) => `התקבלה הודעה חדשה לבקשה ${id} מ${from}`,
  },
  TenderProcedureWithoutOffers: {
    subject: 'בקשה הגיע לסיום הליך מכרזי',
    message: ({id}) => `בקשה ${id} הגיע לסיום הליך מכרזי בלי שום הצעה`,
  },
  StatusUpdated: {
    subject: 'בקשה שינתה סטאטוס',
    message: ({id, status}) => `בקשה ${id} עברה לסטאטוס ${status}`,
  },
  OfferLose: {
    subject: 'ההצעה שלך הפסידה במכרז',
    message: ({id, price}) => `ההצעה ${id} על סך ${price} אלף ש"ח הפסידה במכרז`,
  },
  OfferSet: {
    subject: 'התקבלה הצעה חדשה',
    message: ({id, price}) => `התקבלה הצעה חדשה על סך ${price} אלף ש"ח לבקשה ${id}`,
  },
}
