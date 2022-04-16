const multer = require('multer')
const multerS3 = require('multer-s3')
const AWS = require('aws-sdk')

const { s3Config, s3Region, s3Bucket } = require('./config')

AWS.config.update(s3Config)
AWS.config.region = s3Region

const s3 = new AWS.S3()

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: s3Bucket,
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname })
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString() + '-' + file.originalname)
    }
  })
})

module.exports = { upload, s3 }
