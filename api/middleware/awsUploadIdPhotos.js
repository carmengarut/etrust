const AWS = require('aws-sdk')

const { s3Config, s3Region } = require('./configIdPhotos')

AWS.config.update(s3Config)
AWS.config.region = s3Region

const s3 = new AWS.S3({ params: { Bucket: process.env.BUCKET_ID_PHOTOS } })

module.exports = { s3 }
