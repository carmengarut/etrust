const mailjet = require ('node-mailjet')
 .connect(process.env.MJ_APIKEY_PUBLIC, process.env.MJ_APIKEY_PRIVATE)


const sendProposeChangeEmail = (senderName, receiverName, receiverEmail,  contractTitle) => {
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
                     "Name": receiverName
                 }
             ],
             "TemplateID": 3455877,
             "TemplateLanguage": true,
             "Subject": contractTitle,
             "Variables": {
   "contract_title": contractTitle,
   "receiver_name": receiverName,
   "modifier_name": senderName
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

const sendContractCreatedEmail =  (contractTitle, receiverName, receiverEmail, senderName, senderSurname) => {
    const request = mailjet
	.post("send", {'version': 'v3.1'})
	.request({
		"Messages":[
			{
				"From": {
					"Email": "contracts@etrustapp.com",
					"Name": senderName + " " + senderSurname
				},
				"To": [
					{
						"Email": receiverEmail,
						"Name": receiverName
					}
				],
				"TemplateID": 3451333,
				"TemplateLanguage": true,
				"Subject": contractTitle,
				"Variables": {
      "contract_title": contractTitle,
      "receiver_name": receiverName || receiverEmail,
      "sender_name": senderName + " " + senderSurname
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

const sendContractSignedEmail = (receiverEmail, receiverName ,signerName, signerSurname, contractTitle) => {
    const request = mailjet
	.post("send", {'version': 'v3.1'})
	.request({
		"Messages":[
			{
				"From": {
					"Email": "contracts@etrustapp.com",
					"Name": "eTrust"
				},
				"To": [
					{
						"Email": receiverEmail,
						"Name": receiverName
					}
				],
				"TemplateID": 3610996,
				"TemplateLanguage": true,
				"Subject": signerName + " ha firmado el contrato " + contractTitle,
				"Variables": {
      "contract_title": contractTitle,
      "receiver_email": receiverName,
      "signer_name": signerName + " " + signerSurname
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

const sendRatingReceivedEmail = (receiverEmail, receiverName, signerName, signerSurname, contractTitle) => {
    const request = mailjet
	.post("send", {'version': 'v3.1'})
	.request({
		"Messages":[
			{
				"From": {
					"Email": "contracts@etrustapp.com",
					"Name": "eTrust"
				},
				"To": [
					{
						"Email": receiverEmail,
						"Name": receiverName
					}
				],
				"TemplateID": 3611404,
				"TemplateLanguage": true,
				"Subject": signerName + " te ha puntuado en el cumplimiento del contrato " + contractTitle,
				"Variables": {
      "contract_title": contractTitle,
      "receiver_email": receiverName,
      "signer_name": signerName + " " + signerSurname
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



module.exports = {sendProposeChangeEmail, sendContractCreatedEmail, sendContractSignedEmail, sendRatingReceivedEmail}