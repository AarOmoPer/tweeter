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
      <section>
        <section className='jumbotron jumbotron-fluid'>
          <section className='container'>
            <h2 className='main-header'>Tweeter</h2>
          </section>
        </section>
        {(!wrongAnswer && !outOfTime)
          ? <section className='container'>
            <section className="">
              <p className="">Your streak: {streak}</p>
              <p className="">Seconds left: {secondsRemaining}</p>
            </section>

            <p className='tweet-container' style={{ border: "1px solid black", padding: "10px" }}>{tweet.text}</p>

            <p className='helper-container'>Who tweeted it?</p>

            <section className='fixed-bottom'>
              <section className='container tweeter-container'>
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
