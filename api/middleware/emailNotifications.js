const mailjet = require ('node-mailjet')
 .connect('d4be5b2783645893af69dec0b0ce2283', 'c1b163d2c706cfd00e77b78d8a9bb4f9')

const sendEmail = (senderName, receiverEmail, templateId, subject, contractTitle, receiverName) => {
    const request = mailjet
 .post("send", {'version': 'v3.1'})
 .request({
     "Messages":[
         {
             "From": {
                 "Email": "contracts@etrustapp.com",
                 "Name": senderName
             },
             "To": [
                 {
                     "Email": receiverEmail,
                     "Name": receiverName || ''
                 }
             ],
             "TemplateID": templateId,
             "TemplateLanguage": true,
             "Subject": subject,
             "Variables": {
   "contract_title": contractTitle,
   "email": receiverEmail,
   "name": senderName
 }
         }
     ]
 })

 request
	.then((result) => {
		console.log(result.body)
	})
	.catch((err) => {
		console.log(err.statusCode)
	})
}



module.exports = sendEmail