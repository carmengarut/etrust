const filesRouter = require('express').Router()
const userExtractor = require('../middleware/userExtractor')
const { upload, s3} = require('../middleware/awsUpload')
const { s3Bucket } = require('../middleware/config')
// const SignaturitClient = require('signaturit-sdk');
const fs = require('fs')
var _ = require('lodash');


filesRouter.post('/upload', userExtractor, upload.single('files'), async (request, response) => {
  const file = _.get(request, 'file', [])
  console.log('file', file)
  response.json(file)
})

filesRouter.get('/:key', userExtractor, (request, response) => {
  const { key } = request.params
  
  const parametersGetObject = {
    Bucket: s3Bucket,
    Key: key,
    Expires: 3600,
    ResponseContentDisposition :  `attachment; filename="${key}"`
  }

  // response.attachment(key)
  // var fileStream = s3.getObject(parametersGetObject).createReadStream()
  // fileStream.pipe(response)

  var url = s3.getSignedUrl('getObject', parametersGetObject)
  return response.json(url)
})

// filesRouter.post('/create-signature', userExtractor, async (request, response) => {
//   const body = request.body
//   console.log(body)
//   client = new SignaturitClient(process.env.SIGNATURIT_APIKEY, false);
//   const data = await client.createSignature("./file.pdf", {
//       name: 'John',
//       email: 'john.doe@gmail.com'
//   }, {
//       delivery_type: 'url'
//   });
//   console.log(data)
//   response.json(data)
// })

module.exports = filesRouter
