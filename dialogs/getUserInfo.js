const builder = require('botbuilder')
const jsonQuery = require('json-query')

const users = require('../users.json')

const library = new builder.Library('getUserInfo')

const ChangeUsername: 'Change username'
const ChangePassword: 'Change password'
const ChangeEmail: 'ChangeEmail'

library.dialog('/', [
  session => {
    session.beginDialog('validators:email', {
      promptText: 'Enter the email for the user you are looking for:',
      retryPromptText: 'The email you entered is not valid, please try again.',
      maxRetries: 2
    })
  },
  (session, result) => {
    const selectedEmail = result.response

    const foundUsers = jsonQuery(`users[**][*email=${selectedEmail}]`, {
      data: users
    }).value

    const user = foundUsers[0]

    session.conversationData.selectedUser = user

    const promptMessage = `I found a user with that email, his name is ${
      user.name
    }, what would you like to do with this user?`

    builder.Prompts.choice(session, promptMessage, [
      ChangeUsername,
      ChangePassword,
      ChangeEmail
    ])
  },
  (session, result) => {
    const { entity } = result.response

    switch (entity) {
      case ChangeUsername: {
        console.log('CHANGE USERNAME!')
        break
      }
      case ChangePassword: {
        console.log('CHANGE PASSWORD!')
        break
      }
      case ChangeEmail: {
        console.log('CHANGE EMAIL!')
        break
      }
    }
  }
])

module.exports = library
