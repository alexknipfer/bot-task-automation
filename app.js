const express = require('express')
const bodyParser = require('body-parser')
const builder = require('botbuilder')
require('dotenv').config()

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const port = process.env.PORT || 3978
app.listen(port, () => {
  console.log('Server listening on port %s', port)
})

const connector = new builder.ChatConnector()

const ChangePasswordOption = 'Change Password'
const ResetPasswordOption = 'Reset Password'

const bot = new builder.UniversalBot(connector, [
  session => {
    builder.Prompts.choice(
      session,
      'What do you want to do today?',
      [ChangePasswordOption, ResetPasswordOption],
      { listStyle: builder.ListStyle.button }
    )
  },
  (session, result) => {
    if (result.response) {
      switch (result.response.entity) {
        case ChangePasswordOption: {
          session.send('Implement Change Password')
          break
        }
        case ResetPasswordOption: {
          session.beginDialog('resetPassword:/')
          break
        }
      }
    }
  }
])

bot.set('storage', new builder.MemoryBotStorage())

bot.library(require('./dialogs/resetPassword'))
bot.library(require('./validators'))

app.post('/api/messages', connector.listen())
