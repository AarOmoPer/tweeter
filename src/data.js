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
}