// Telegram
console.log("App initiated...")
process.env.NTBA_FIX_319 = 1;

const TelegramBot = require('node-telegram-bot-api');
const token = 'xxxxxxxxx:xxxxxxxxxxxxxxxxxxxxx';
const bot = new TelegramBot(token, { polling: true });
const chatId = "Your chat id";

// Twitter
var Twit = require('twit')
var T = new Twit({
  consumer_key: 'xxxxxxxxxxxxxxx',
  consumer_secret: 'xxxxxxxxxxxxxxx',
  access_token: 'xxxxx-xxxxxxxxxx',
  access_token_secret: 'xxxxxxxxxxxxxxx',
})

// Twitter handles
let twitterHandles = ['SathishCodes, TheDevelBot', 'TheShutterBot']

// Listen and send
var stream = T.stream('statuses/filter', { track: twitterHandles })

stream.on('tweet', function (tweet) {
  if (!(twitterHandles.includes(tweet.user.name))) {
    if (tweet.in_reply_to_screen_name) {
      bot.sendMessage(chatId, `New Twitter Reply for @${tweet.in_reply_to_screen_name} \n\n By: ${tweet.user.name} (@${tweet.user.screen_name}) \n\n Tweet: ${tweet.text}`);
    } else {
      bot.sendMessage(chatId, `New Twitter Mention \n\n By: ${tweet.user.name} (@${tweet.user.screen_name}) \n\n Tweet: ${tweet.text}`);
    }
  }
})