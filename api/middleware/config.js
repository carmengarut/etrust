const s3Config = {
  accessKeyId: process.env.ACCESS_KEY_AWS,
  secretAccessKey: process.env.SECRET_ACCESS_KEY_AWS
}

const s3Region = 'eu-west-3'

const s3Bucket = process.env.BUCKET

module.exports = { s3Config, s3Region, s3Bucket }
