
import AWS from 'aws-sdk'

AWS.config.update({
  accessKeyId: process.env.REACT_APP_ACCESS_KEY_AWS,
  secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY_AWS
})

const myBucket = new AWS.S3({
  params: { Bucket: process.env.REACT_APP_BUCKET },
  region: 'eu-west-3'
})

export default function uploadPdfToAws (newObject) {
  const { base64, contractTitle } = newObject
  const base64Data = Buffer.from(base64.replace(/^data:image\/\w+;base64,/, ''), 'base64')

  const params = {
    Body: base64Data,
    Bucket: process.env.REACT_APP_BUCKET, // quiza esto canbiarlo por mybucket
    Key: contractTitle,
    ContentEncoding: 'base64',
    ContentType: 'application/pdf'
  }

  myBucket.putObject(params)
  // .on('httpUploadProgress', (evt) => {
  //   setProgress(Math.round((evt.loaded / evt.total) * 100))
  // })
    .send((err) => {
      if (err) console.error(err)
    })
  return params.Key
}
