const builder = require('botbuilder')

const { users } = require('../users.json')

const library = new builder.Library('updateUserInfo')

library.dialog(
  'email',
  new builder.IntentDialog().onBegin((session, args) => {
    const {
      selectedUser: { email }
    } = session.conversationData

    console.log('COMPLETE UPDATE EMAIL!!!')
  })
)

module.exports = library
