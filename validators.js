const builder = require('botbuilder')

const PhoneRegex = new RegExp(
  /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/
)

const EmailRegex = new RegExp(
  /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/
)

const library = new builder.Library('validators')

library.dialog(
  'phonenumber',
  new builder.IntentDialog()
    .onBegin((session, args) => {
      session.dialogData.retryPromptText = args.retryPromptText
      session.send(args.promptText)
    })
    .matches(PhoneRegex, session => {
      console.log('MATCHES: ', session.message)
      session.endDialogWithResult({ response: session.message.text })
    })
    .onDefault(session => {
      session.send(session.dialogData.retryPromptText)
    })
)

library.dialog(
  'email',
  new builder.IntentDialog()
    .onBegin((session, args) => {
      session.dialogData.retryPromptText = args.retryPromptText
      session.send(args.promptText)
    })
    .matches(EmailRegex, session => {
      console.log('EMAIL MATCHES!!!! ', session.message.text)
      session.endDialogWithResult({ response: session.message.text })
    })
    .onDefault(session => {
      session.send(session.dialogData.retryPromptText)
    })
)

module.exports = library
