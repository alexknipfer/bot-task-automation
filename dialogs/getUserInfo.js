const builder = require('botbuilder')

const library = new builder.Library('getUserInfo')

library.dialog('/', [
  session => {
    session.beginDialog('validators:email', {
      promptText: 'Enter the users email:'
    })
  },
  (session, result) => {
    const email = result.response

    session.dialogData.email = email

    builder.Prompts.text(session, 'Enter the users first name:')
  },
  (session, result) => {
    const firstName = result.response

    session.dialogData.firstName = result.response

    builder.Prompts.text(session, 'Enter the users last name:')
  },
  (session, result) => {
    const lastName = result.response

    const { email, firstName } = session.dialogData

    const userInfo = {
      email,
      firstName,
      lastName
    }

    session.endDialogWithResult({ response: userInfo })
  }
])

module.exports = library
