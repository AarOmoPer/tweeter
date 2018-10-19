import * as twitApi from 'twit';

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


const getUserTweets = (screenName, count = 5, cb) => {
  twit.get(
    'statuses/user_timeline', 
    {screen_name: screenName, count}, 
    (err, data, resp) => console.log(err, data, resp)
  )
}



const tweets = {
  0: {
    body: "Fake news",
    author: "Donald Trump",
    handle: "@realDonaldTrump",
    likes: 2000,
    retweets: 500
  },
  1: {
    body: "Bootilicious",
    author: "Kim Kardashian",
    handle: "@kimK",
    likes: 2004,
    retweets: 900
  },
  2: {
    body: "Danger Zone!",
    author: "Sterling Archer",
    handle: "@dutchess",
    likes: 3009,
    retweets: 9000
  },
  3: {
    body: "Bet ya a signed dollar it's true",
    author: "Elon Musk",
    handle: "@muskyBoi",
    likes: 1982,
    retweets: 6000
  },
  4: {
    body: "I'm a dark skinned white man as far as I know.",
    author: "Kanye West",
    handle: "@Yeezy",
    likes: 369,
    retweets: 900
  }
}

const getNewTweetAndTweeters = () => {
  const randomInt = Math.floor(Math.random() * 5)
  const tweet = tweets[randomInt]
  return {
    tweet,
    tweeters: getNewTweeters({author: tweet.author, handle: tweet.handle})
  }
}

const getNewTweeters = tweeter => {
  const tweeters = [tweeter];
  while (tweeters.length < 4){
    const randomInt = Math.floor(Math.random() * 5)
    const existingHandles = tweeters.map(tweeter => tweeter.handle);
    const nextTweeter = tweets[randomInt]
    if (!existingHandles.includes(nextTweeter.handle)){
      tweeters.push({
        author: nextTweeter.author,
        handle: nextTweeter.handle
      })
    }
  }
  return shuffleArray(tweeters)
}

const shuffleArray = a => {
  let j, x, i;
  for (i = a.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = a[i];
      a[i] = a[j];
      a[j] = x;
  }
  return a;
}


export {
  getNewTweetAndTweeters,
  getUserTweets
}