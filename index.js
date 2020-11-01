require('console-stamp')(console, 'HH:MM:ss')
const Discordie = require('discordie')
const triviaAnswers = require('./trivia.json')

const client = new Discordie() //{ autoReconnect: true })
// console.log(client.Channels.map(c => console.log(c)))

if (process.argv[2] == '2') {
  CONFIG = require('./config_alt2.json')
  var profile = 'alt2'
} else if (process.argv[2] == '1') {
  CONFIG = require('./config_alt.json')
  var profile = 'alt1'
} else {
  CONFIG = require('./config_main.json')
  var profile = 'main'
}

console.log(`Loading ${profile} profile`)

let myUsername
let listenChannel = null
let running = false

function createInterval(cmd, time, delay, offset) {
  function i() {
    if (!running || !listenChannel) return

    console.log(`Sending '${cmd}'`)
    listenChannel.sendMessage(cmd)
    setTimeout(i, time + (Math.random() * 2 - 1) * delay)
  }

  setTimeout(i, offset)  // Run the interval once
}

client.connect({ token: CONFIG.TOKEN })

client.Dispatcher.on('GATEWAY_READY', () => {
  let { username, discriminator } = client.User
  myUsername = username


  console.log(`Logged in to Discord as ${username}#${discriminator}`)
  console.log('-----------------------------' + '-'.repeat(username.length))
})

client.Dispatcher.on('MESSAGE_CREATE', e => {
  const { author, content, channel, embeds } = e.message

  var guild = e.guild

  //  Don't handle messages in different channels  and   only process messages by me or the bot
  if ((listenChannel && channel !== listenChannel) || !(['Dank Memer', myUsername].includes(author.username))) {
    return
  }

  // Show Response
  if (author.username == 'Dank Memer' && content.length > 0) {
    console.log(`🐸 ${content}`)
  }

  // Find command to handle the message
  switch (true) {
    // Start
    case /^\$s(tart)?$/i.test(content): {
      console.log('Starting bot')


      listenChannel = channel
      console.log(listenChannel)
      running = true

      // + 1 sec
      if (CONFIG.TOKEN) createInterval('pls bal', 1000 * 60 * 3, 50, 0)
      if (CONFIG.USE_HOURLY) createInterval('pls hourly', 1000 * 60 * 60, 500, 1500)
      if (CONFIG.USE_DAILY) createInterval('pls daily', 1000 * 60 * 60 * 24, 500, 2500)
      if (CONFIG.USE_WEEKLY) createInterval('pls weekly', 1000 * 60 * 60 * 24 * 7, 500, 3500)
      if (CONFIG.USE_MONTHLY) createInterval('pls monthly', 2000000000, 500, 4500) // NOTE: 1000 * 60 * 60 * 24 * 30 too large for 32 bit Int in setTimeout
      if (CONFIG.USE_YEARLY) createInterval('pls yearly', 2000000000, 500, 5500) // NOTE: 1000 * 60 * 60 * 24 * 365

      // + 2 secs
      if (CONFIG.USE_BEG) createInterval('pls beg', (profile == 'main') ? 1000 * 27 : 1000 * 48, 50, 10000)
      if (CONFIG.DEPOSIT) createInterval('pls deposit all', 1000 * 18, 100, 13000)

      // + 3 secs
      if (CONFIG.USE_FISH) createInterval('pls fish', (profile == 'main') ? 1000 * 34 : 1000 * 49, 100, 16000)
      if (CONFIG.USE_HUNT) createInterval('pls hunt', (profile == 'main') ? 1000 * 43 : 1000 * 63, 100, 22000)

      // +4 secs
      if (CONFIG.USE_SEARCH) createInterval('pls search', (profile == 'main') ? 1000 * 23 : 1000 * 34, 100, 26000)
      if (CONFIG.USE_TRIVIA) createInterval('pls trivia', (profile == 'main') ? 1000 * 25 : 1000 * 30, 100, 31000)
      if (CONFIG.USE_MEMES) createInterval('pls postmeme', (profile == 'main') ? 1000 * 50 : 1000 * 65, 100, 36000)

      break
    }

    // Stop
    case /^\$stop$/i.test(content): {
      console.log('Stopping bot')

      running = false
      listenChannel = null
      break
    }

    // Clear
    case /^\$c(lear)?$/i.test(content) && listenChannel: {
      if (listenChannel) listenChannel.sendMessage('`' + '\n'.repeat(50) + '`')
      break
    }

    // Post meme
    case /type of meme/i.test(content) && listenChannel: {
      listenChannel.sendMessage('d')

      break
    }

    // Search
    case /in chat\.\n`(.+?)`/.test(content) && listenChannel: {
      const places = content
        .split('\n')[1]
        .replace(/`/g, '')
        .split(',')
        .filter(item => !CONFIG.SEARCH_AVOID_PLACES.includes(item.trim()))

      // TODO: Sort places based on the amount of money you win
      // reddit.com/r/dankmemer/comments/fur9k2/sharing_my_stats_on_pls_search
      
      console.log(` ↳ Searching '${places[0] || 'NOWHERE - I DONT WANT TO DIE'}'`)
      listenChannel.sendMessage(places[0] || 'NOWHERE - I DONT WANT TO DIE')

      break
    }

    // Trivia
    case embeds[0] && embeds[0].author && embeds[0].author.name && embeds[0].author.name.indexOf('trivia') !== -1: {
      const { description, author } = embeds[0]
      const question = description.match(/\*\*(.+?)\*\*/)[1]
      const user = author.name.match(/(.+?)'s trivia question/)[1]

      if (question && user === myUsername) {
        const responses = description.match(/[ABCD]\) \*(.+?)\*/g)

        if (Math.random() < (1 - CONFIG.TRIVIA_CORRECT_CHANCE)) {
          console.log(' ↳ Answering trivia randomly')
          listenChannel.sendMessage('abcd'[4 * Math.random() | 0])
        } else {
          console.log(' ↳ Answering trivia correctly')
          const correctAnswer = triviaAnswers.find(e => e.question === question).correct_answer

          listenChannel.sendMessage(responses.find(el => el.indexOf(correctAnswer) > -1)[0].toLowerCase())
        }

        break
      }
    }

    // TODO Auto Powerup ++ Share?
    case /(deposited)/.test(content) && listenChannel:
      //   listenChannel.sendMessage(`pls withdraw 20000`)
      //   listenChannel.sendMessage(`pls give @502632119831363585 20000`)

      // listenChannel.sendMessage(`pls use tidepod`)
      // listenChannel.sendMessage(`y`)
      // listenChannel.sendMessage(`pls use cheese`)
      // listenChannel.sendMessage(`y`)

      // TODO Sell animals?
      listenChannel.sendMessage(`pls sell boar all`)
      listenChannel.sendMessage(`pls sell rarefish all`)
      listenChannel.sendMessage(`pls sell duck all`)
      listenChannel.sendMessage(`pls sell skunk all`)

    // TODO Buy missing items
    case /(don't have a fishing pole)/i.test(content) && listenChannel: {
      listenChannel.sendMessage(`pls withdraw 20000`)
      listenChannel.sendMessage(`pls buy fishing rod`)

      break
    }

    case /(buy a laptop)/i.test(content) && listenChannel: {
      listenChannel.sendMessage(`pls withdraw 5000`)
      listenChannel.sendMessage(`pls buy laptop`)

      break
    }

    case /(don't have a hunting rifle)/i.test(content) && listenChannel: {
      listenChannel.sendMessage(`pls withdraw 20000`)
      listenChannel.sendMessage(`pls buy rifle`)

      break
    }

    // TODO Buy anything on sale??

    // Sell received items
    case /(?:brought back|at least you found|sent you|, and) (?:(\d+)|a) (?:<:\w+:\d+> )?(?::\w+: )?(?:\*\*)?([\w\s]+)/i.test(content) && listenChannel: {
      if (!CONFIG.SELL_ITEMS) break

      const [_, amount = 1, name] = content.match(/(?:brought back|at least you found|sent you|, and) (?:(\d+)|a) (?:<:\w+:\d+> )?(?::\w+: )?(?:\*\*)?([\w\s]+)/i)
      console.log(` ↳ Recieved ${amount} ${name}`)
      listenChannel.sendMessage(`pls use bank note all`)
      listenChannel.sendMessage(`pls use candy all`)


      //TODO: Add whitelist for items to sell
      if (/laptop|note|rifle|fishing|cookie|pink/.test(name)) {
      } else {

        console.log(name.toLowerCase().split(" ").reverse())
        const sell_name = name.toLowerCase().split(" ").reverse()[1];
        console.log(` ↳ Selling ${amount} ${sell_name}`)
        listenChannel.sendMessage(`pls sell ${sell_name} ${amount}`)
      }

      break
    }

    // Type given text (events and prevent fishing rod from breaking)
    case /Typ(?:e|ing) `(.+?)`/i.test(content) && listenChannel: {
      const [_, text] = content.match(/Typ(?:e|ing) `(.+?)`/i)

      console.log(` ↳ Typing '${text}'`)
      listenChannel.sendTyping()
      setTimeout(() => listenChannel.sendMessage(text), 100 + 40 * text.length)

      break
    }

    // Any other message
    default: {
      // console.log(`Message '${content}' ignored`)
    }
  }
})
