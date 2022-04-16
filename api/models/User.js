
const { Schema, model } = require('mongoose')

const userSchema = new Schema({
  email: String,
  type: String,
  name: String,
  surname: String,
  documentType: String,
  documentNumber: String,
  issuingCountry: String,
  idFrontPhoto: String,
  idBackPhoto: String,
  selfie: String,
  passwordHash: String,
  profileImg: String,
  trustRate: Number,
  creationDate: Date,
  invitationDate: Date,
  status: String,
  deals: [{
    type: Schema.Types.ObjectId,
    ref: 'Deal'
  }],
  ratings: [{
    type: Schema.Types.ObjectId,
    ref: 'Rating'
  }]
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
  }
})

const User = model('User', userSchema)

module.exports = User
