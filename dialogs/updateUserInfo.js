const builder = require('botbuilder')
const fs = require('fs')

let { users } = require('../users.json')

const library = new builder.Library('updateUserInfo')

library.dialog('email', [
  session => {
    builder.Prompts.text(
      session,
      'What is the email you would like to change it to?'
    )
  },
  (session, result) => {
    const { selectedUser } = session.conversationData
    const newEmail = result.response

    const foundIndex = users.findIndex(user => user._id === selectedUser._id)

    users[foundIndex].email = newEmail

    const updatedUsers = { users }

    const strigified = JSON.stringify(updatedUsers)

    console.log('stringified; ', strigified)

    fs.writeFile('../users.json', strigified, err => {
      if (err) {
        console.log('Error saving file.')
        session.send('There was an error updating the user! Please try again.')
        session.replaceDialog('updateUserInfo:email')
      }

      session.endDialog('Updated user successfully!')
    })
  }
])

module.exports = library
