import React from 'react';

class App extends React.Component {
  state = {
    streak: 0,
    tweet: {},
    tweeters: [],
    secondsRemaining: 20,
    wrongAnswer: false,
    outOfTime: false,
  }

  componentDidMount() {
    this.getNewTweet()
  }

  render() {
    const { streak, tweet, tweeters, wrongAnswer, secondsRemaining, outOfTime } = this.state;
    return (
      <section className='hero'>
        <section className='hero-head section'>
          <section className='has-text-centered'>
            <h2 className='main-header title'>Tweeter</h2>
          </section>
        </section>
        <section className='hero-body'>
          <section className='container'>
            {(!wrongAnswer && !outOfTime)
              ? <section className='container'>
                <p className="subtitle">
                  <span className="is-size-6">Streak: {streak}</span>
                  <span className={`is-size-4 is-pulled-right ${secondsRemaining < 6 && 'has-text-danger'}`}>{secondsRemaining}</span>
                </p>

                <p className='tweet-container container'>
                  <p className='box'>
                    {tweet.text}
                  </p>
                </p>
                <p className='subtitle'></p>
                <p className='helper-container subtitle is-size-6 has-text-centered has-text-danger'>Who tweeted it?</p>

                <section className=''>
                  <section className='container tweeter-container'>
                    {
                      tweeters.map((tweeterData, ind) => {
                        const tweeter = tweeterData.data[0]
                        return (
                          <button
                            key={ind}
                            onClick={e => this.handleAnswerSubmission(e, tweeter.screen_name)}
                            className='tweeter-button is-capitalized'>
                            {tweeter.name}
                          </button>
                        )
                      })
                    }
                  </section>
                </section>
              </section>
              : <section>
                <h2>Whoops!</h2>
                <p>{wrongAnswer ? 'Unfortunately, your answer was wrong.' : "I'm afraid you ran out of time."}</p>
                <p>The right answer was {tweet.user.name}</p>
                <p>See the tweet <a href={`http://www.twitter.com/*/status/${tweet.id_str}`}>here</a></p>
                <p>Your streak was {streak}</p>
                <button>Share on twitter</button>
                <button onClick={this.restart}>Restart</button>
              </section>
            }
          </section>
        </section>
      </section>
    );
  }

  startTimer = () => {
    const _this = this
    this.incrementer = setInterval(() => {
      if (_this.state.secondsRemaining === 0) {
        clearInterval(this.incrementer)
        _this.setState({ outOfTime: true })
      }
      else _this.setState({ secondsRemaining: _this.state.secondsRemaining - 1 })
    }, 1000)
  }

  getNewTweet = () => fetch('https://tweeter-backend.herokuapp.com')
    .then(res => res.json())
    .then(res => this.setState({ ...res }))
    .then(this.startTimer)
    .catch(console.log)

  handleAnswerSubmission = (e, tweeterHandle) => {
    e.preventDefault()
    const { streak, tweet } = this.state;
    if (tweeterHandle === tweet.user.screen_name) {
      clearInterval(this.incrementer)
      this.setState({ streak: streak + 1, tweet: {}, tweeters: [], secondsRemaining: 20 })
      this.getNewTweet()
    } else {
      this.setState({ wrongAnswer: true })
    }
  }

  restart = () => {
    clearInterval(this.incrementer)
    this.setState({
      streak: 0,
      tweet: {},
      tweeters: [],
      secondsRemaining: 20,
      wrongAnswer: false,
      outOfTime: false,
    })
    this.getNewTweet()
  }

}

export default App;
