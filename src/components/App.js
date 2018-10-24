import React from 'react';

// getUserTweets('@realDonaldTrump')

class App extends React.Component {
  state = {
    streak: 0,
    tweet: {},
    tweeters: [],
    timerRemaining: 10,
    restart: false
  }

  componentDidMount() {
    this.getNewTweet()
  }

  render() {
    const { streak, tweet, tweeters, restart, timerRemaining} = this.state;
    return (
      <section>
        <h2 className='main-header'>Tweeter</h2>
        {!restart
          ? <section>
            <h3>Your streak: {streak}</h3>
            <h3>Seconds left: {timerRemaining}</h3>

            <p className='tweet-container' style={{ border: "1px solid black", padding: "10px" }}>{tweet.text}</p>

            <p className='helper-container'>Who tweeted it?</p>

            <section className='tweeter-container'>
              {
                tweeters.map((tweeterData, ind) => {
                  const tweeter = tweeterData.data[0]
                  return (
                    <button
                      key={ind}
                      onClick={e => this.handleAnswerSubmission(e, tweeter.screen_name)}
                      className='tweeter-button'>
                      {tweeter.name}
                    </button>
                  )
                })
              }
            </section>
          </section>
          : <section>
            <h2>Whoops!</h2>
            <p>The right answer was {tweet.user.name}</p>
            <p>See the tweet <a href={`http://www.twitter.com/*/status/${tweet.id_str}`}>here</a></p>
            <p>Your streak was {streak}</p>
            <button>Share on twitter</button>
            <button onClick={this.resetStreak}>Restart</button>
          </section>
        }

      </section>
    );
  }

  resetTimer = () => {
    clearInterval(this.state.timer)
    this.setState({timerRemaining: 10})
    const timer = this.state.timer
    timer()
  }
  tick = () => this.setState({timer: this.state.timer - 1})
  
  getNewTweet = () => fetch('https://tweeter-backend.herokuapp.com')
    .then(res => res.json())
    .then(res => this.setState({ ...res }))
    //Start timer
    // .then(() )
    .catch(console.log)

  handleAnswerSubmission = (e, tweeterHandle) => {
    e.preventDefault()
    const {streak, tweet} = this.state;
    if (tweeterHandle === tweet.user.screen_name) {
      this.setState({ streak: streak + 1, tweet: {}, tweeters: [] })
      this.getNewTweet()
    } else {
      this.setState({ restart: true })
    }
  }

  resetStreak = () => {
    this.setState({ restart: false, streak: 0, tweet: {}, tweeters: [] })
    this.getNewTweet()
  }

}

export default App;
