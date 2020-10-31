# coinBot

A script to farm fake coins on the internet; forked from [this](https://github.com/spaceface777/DankMemerBotBot).

### Features
- [Concurrency](https://www.npmjs.com/package/concurrently) for active smurf scaling
- [Background Process](https://pm2.keymetrics.io/) for even fancier background
    scaling
- Argument toggling for profiles
- ++ `pls hunt` and possibly more later

### Disclaimer(s)
 - Using a user account as a bot is technically against Discord's ToS.  
 - This is for eductional purposes / jokes only; if you get banned from
     anything, I told you so.

### Usage
 1. Make a copy of `config.example.json` into `config.json`
 2. Edit `config.json` and put in your account's [Discord token](https://github.com/Tyrrrz/DiscordChatExporter/wiki/Obtaining-Token-and-Channel-IDs#how-to-get-a-user-token)
 3. Edit any other config params you wish to change in `index.js`, such as
    timeouts
 4. Run the script: `$ npm start`, or the concurrent version with `$ npm run
    dev'
 5. Go to the Discord channel where you want your bot to work and send `$start` (or `$s`)
 6. ???
 7. Profit 
