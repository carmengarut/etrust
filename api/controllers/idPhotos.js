/* eslint-disable */

const idPhotosRouter = require('express').Router()
const userExtractor = require('../middleware/userExtractor')
const { s3 } = require('../middleware/awsUploadIdPhotos')
const { s3Bucket } = require('../middleware/configIdPhotos')

idPhotosRouter.post('/upload', userExtractor, (request, response) => {
  const { base64, userId, side } = request.body
  const base64Data = new Buffer.from(base64.replace(/^data:image\/\w+;base64,/, ''), 'base64')

  const type = base64.split(';')[0].split('/')[1]
  const data = {
    Key: userId + `-${side}.${type}`,
    Body: base64Data,
    ContentEncoding: 'base64',
    ContentType: `image/${type}`
  }

  s3.putObject(data, (err, data) => {
    if (err) {
      console.log(err)

      console.log('Error uploading data: ', data)
    } else {
      console.log('succesfully uploaded the image!')
    }
  })
  response.json()
})

idPhotosRouter.get('/:key', userExtractor, (request, response) => {
  const { key } = request.params

  const parametersGetObject = {
    Bucket: s3Bucket,
    Key: key,
    Expires: 3600,
    ResponseContentDisposition: `attachment; filename="${key}"`
  }

  const url = s3.getSignedUrl('getObject', parametersGetObject)
  return response.json(url)
})

module.exports = idPhotosRouter
