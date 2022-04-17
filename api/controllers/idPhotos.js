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

// idPhotosRouter.get('/:key', userExtractor, async (request, response) => {
//   const { key } = request.params
//   const parametersGetObject = {
//     Bucket: s3Bucket,
//     Key: key,
//   }

//   const getImage = async () => {
//     const data =  s3.getObject(parametersGetObject).promise();
//     return data;
//   }

//   const data = await getImage()
  
//   const type = key.split('.')
//   const buf = Buffer.from(data.Body);
//   const base64 = buf.toString('base64');
//   const src = `data:image/${type[type.length - 1]};base64,` + base64;
//   return response.json(src)
// })

idPhotosRouter.get('/:key', userExtractor, (request, response) => {
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

module.exports = idPhotosRouter
