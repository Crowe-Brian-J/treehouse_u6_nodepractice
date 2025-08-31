const https = require('https')
//const http = require('http')

// Print the data
const printMessage = (username, badgeCount, points) => {
  const message = `${username} has ${badgeCount} total badge(s) and ${points} points in JavaScript`
  console.log(message)
}
const printError = (error) => {
  console.error(error.message)
}

const getProfile = (username) => {
  // Connect to the API URL (https://teamtreehouse.com/profiles/csalgado.json)
  const request = https.get(
    `https://teamtreehouse.com/profiles/${username}.json`,
    (response) => {
      let body = ''
      // Read the data
      response.on('data', (data) => {
        body += data.toString()
      })
      response.on('end', () => {
        try {
          // Parse the data
          let profile = JSON.parse(body)

          printMessage(
            username,
            profile.badges.length,
            profile.points.JavaScript
          )
        } catch (error) {
          printError(error)
        }
      })
    }
  )
  request.on('error', (error) => printError(error))
}
const users = process.argv.slice(2)
users.forEach(getProfile)
