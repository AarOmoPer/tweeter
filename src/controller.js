const twitApi = require('twit');

const twitKey = {
  consumer_key: 'pvJvlXErXCjEeGTLaQctaC2Uy',
  consumer_secret: 'PylGjv2qvQ7QFG3s90CtPpjdjTJ7UtVsTwoWQAqCKJVpPBGk1n',
  access_token: '101251087-mjice9Rw9HcsTYgS9vvlFPlDUH0e0Fj7ovH2HLu5',
  access_token_secret: '5ChMPWrTgTJWIBB4IxhDwMDQ4ml75iFmSswD4QnQhezLD',
  timeout_ms: 60 * 1000,
}

const twit = new twitApi({
  consumer_key: process.env.consumer_key || twitKey['consumer_key'],
  consumer_secret: process.env.consumer_secret || twitKey['consumer_secret'],
  access_token: process.env.access_token || twitKey['access_token'],
  access_token_secret: process.env.access_token_secret || twitKey['access_token_secret'],
  timeout_ms: 60 * 1000, // optional HTTP request timeout to apply to all requests. 
})


const getUserTweets = (handle, count = 5, cb) => {
  twit.get(
    'statuses/user_timeline', 
    {screen_name: handle, count}, 
    (err, data, resp) => console.log(err, data, resp)
  )
}

module.exports = {
    getUserTweets
}