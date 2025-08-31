import fetch from 'node-fetch'
import 'dotenv/config'

// Get the word from command line arguments
const args = process.argv.slice(2)

if (args.length === 0) {
  console.error('Usage: node dictionary.js <word>')
  process.exit(1)
}

const word = args[0]

// Replace with actual API key and URL here
const API_KEY = process.env.API_KEY
const url = `https://dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=${API_KEY}`

// Get definition
const getDefinition = async () => {
  try {
    const response = await fetch(url)

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }

    const data = await response.json()

    if (data.length === 0) {
      console.log(`No results found for "${word}".`)
      return
    }

    if (typeof data[0] === 'string') {
      console.log(`Did you mean: ${data.join(', ')}?`)
      return
    }

    console.log(`Definitions for "${word}":\n`)
    data[0].shortdef.forEach((def, i) => {
      console.log(`${i + 1}.${def}`)
    })
  } catch (err) {
    console.error('Error fetching definition:', err.message)
  }
}

getDefinition()
