/* eslint-disable */

const pdf = require('express').Router()
const userExtractor = require('../middleware/userExtractor')
const { s3 } = require('../middleware/awsUpload')
const { s3Bucket } = require('../middleware/config')

pdf.post('/upload', userExtractor, (request, response) => {
  const { base64, contractTitle } = request.body
  const base64Data = new Buffer.from(base64.replace(/^data:image\/\w+;base64,/, ''), 'base64')

  const data = {
    Bucket: s3Bucket,
    Key: contractTitle,
    Body: base64Data,
    ContentEncoding: 'base64',
    ContentType: 'application/pdf'
  }

  s3.putObject(data, (err, data) => {
    if (err) {
      console.error(err)
      console.error('Error uploading data: ', data)
      next(error)
    } else {
      console.log('succesfully uploaded the image!')
    }
  })
  response.json(data.Key)
})

pdf.get('/:key', userExtractor, (request, response) => {
  const { key } = request.params

  const parametersGetObject = {
    Bucket: s3Bucket,
    Key: key,
    Expires: 3600,
  }

  // response.attachment(key)
  // var fileStream = s3.getObject(parametersGetObject).createReadStream()
  // fileStream.pipe(response)

  const url = s3.getSignedUrl('getObject', parametersGetObject)
  return response.json(url)
})

module.exports = pdf
