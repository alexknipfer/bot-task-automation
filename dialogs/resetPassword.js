const builder = require('botbuilder')

const library = new builder.Library('resetPassword')

library.dialog('/', [
  session => {
    session.beginDialog('validators:phonenumber', {
      promptText: 'Please enter your phone number:',
      retryPromptText:
        'The value you entered is not a valid phone number, please try again.',
      maxRetries: 2
    })
  },
  (session, result) => {
    session.dialogData.phoneNumber = result.response
    session.send('The phone number you provided is: ' + result.response)

    builder.Prompts.choice(session, 'Is this the correct phone number', [
      'Yes',
      'No'
    ])
  },
  (session, results) => {
    const { entity } = results.response

    switch (entity) {
      case 'Yes': {
        session.send('Ok, great, lets continue with your phone number.')
        break
      }
      case 'No': {
        session.replaceDialog('resetPassword:/')
        break
      }
    }
  }
])

module.exports = library
