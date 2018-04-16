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
const ResetPasswordOption = 'Reset Password Option'

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
      console.log('RESULT: ', result.response)
    }
  }
])

bot.set('storage', new builder.MemoryBotStorage())

app.post('/api/messages', connector.listen())
