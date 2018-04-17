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

const GetUserInfo = 'Get User Info'
const ResetPasswordOption = 'Reset Password'

const bot = new builder.UniversalBot(connector, [
  session => {
    builder.Prompts.choice(
      session,
      'What do you want to do today?',
      [GetUserInfo, ResetPasswordOption],
      { listStyle: builder.ListStyle.button }
    )
  },
  (session, result) => {
    if (result.response) {
      switch (result.response.entity) {
        case GetUserInfo: {
          session.beginDialog('getUserInfo:/')
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
bot.library(require('./dialogs/getUserInfo'))
bot.library(require('./dialogs/updateUserInfo'))

bot.library(require('./validators'))

app.post('/api/messages', connector.listen())
