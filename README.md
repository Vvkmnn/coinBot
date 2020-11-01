# coinBot

![](./clown.jpg)

A script to [farm fake coins on the internet](http://dankmemer.lol/); forked from [this](https://github.com/spaceface777/DankMemerBotBot).

### Features
- [Concurrency](https://www.npmjs.com/package/concurrently) for active
    horizontal scaling
- [Background Process](https://pm2.keymetrics.io/) for even fancier background
    management
- Argument toggling for profiles
- ++ `pls hunt` and possibly more later

### Disclaimer(s)
 - Using a user account as a bot is technically against Discord's ToS.  
 - This is for eductional purposes / jokes only; if you get banned from
     anything, I told you so.
 - Also got a few accounts justifiably blacklisted for throttling while testing, so yeah; go easy.

### Donate
If you had fun, donate to the [Dank Memer
team](https://www.patreon.com/dankmemerbot) for a cool bot, and something to
push imaginary numbers with.

### Usage
 1. Make a copy of `config.example.json` into `config.json`
 2. Edit `config.json` and put in your account's [Discord token](https://github.com/Tyrrrz/DiscordChatExporter/wiki/Obtaining-Token-and-Channel-IDs#how-to-get-a-user-token)
 3. Edit any other config params you wish to change in `index.js`, such as
    timeouts
 4. Run the script: `$ npm start`, or the concurrent version with `$ npm run
    dev'
 5. Go to the Discord channel where you want your bot to work and try `$start` (or `$s`)
 6. ???
 7. Profit 

 ### Todo
 - [ ] Add more of
 [these](https://gist.github.com/bharadwaj6/ad759a0d9f9d56d3fa371d2b995e0fc3)
 - [ ] Robbing mechanics using global public leaderboard?
