const builder = require('botbuilder')

const UserModel = require('../models/User')
const library = new builder.Library('addUser')

library.dialog('/', [
  session => {
    session.beginDialog('getUserInfo:/')
  },
  async (session, result) => {
    const { email, firstName, lastName } = result.response
    const user = new UserModel({ email, firstName, lastName })

    try {
      await user.save()
      session.send('User saved successfully.')
      session.endDialog()
    } catch (error) {
      console.log('ERROR: ', error)
    }
  }
])

module.exports = library
