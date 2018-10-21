import React from 'react';
import { getNewTweetAndTweeters } from '../data'

import {getUserTweets} from '../controller'
getUserTweets('@realDonaldTrump')

class App extends React.Component {
  state = {
    streak: 0,
    tweet: {},
    tweeters: [],
    restart: false 
  }

  componentDidMount() {
    this.setState({
      ...getNewTweetAndTweeters()
    })
    // getUserTweets('@realDonaldTrump')
  }

  render() {
    const { streak, tweet, tweeters, restart} = this.state;
    return (
      <section>
        <h2 className='main-header'>Tweeter</h2>

        {!restart 
          ? <section>
              <h3>Your score: {streak}</h3>

              <p className='tweet-container' style={{ border: "1px solid black", padding: "10px" }}>{tweet.body}</p>

              <p className='helper-container'>Who tweeted it?</p>

              <section className='tweeter-container'>
                {
                  tweeters.map((tweeter, ind) =>
                    <button
                      key={ind}
                      onClick={e => this.handleAnswerSubmission(e, tweeter.handle)}
                      className='tweeter-button'
                    >
                      {tweeter.author}
                    </button>)
                }
              </section>
            </section>
          : <section>
              <h2>Whoops!</h2>
              <p>The right answer was {tweet.author}</p>
              <p>Your streak was {streak}</p>
              <button>Share on twitter</button>
              <button onClick={this.resetStreak}>Restart</button>
            </section>
        }

      </section>
    );
  }

  handleAnswerSubmission = (e, tweeterHandle) => {
    e.preventDefault()
    const { streak, tweet } = this.state;
    if (tweeterHandle === tweet.handle) {
      this.setState({ streak: streak + 1 ,  ...getNewTweetAndTweeters()})
    } else {
      this.setState({restart: true})
    }
  }

  resetStreak = () => {
    this.setState({ restart: false, streak: 0, ...getNewTweetAndTweeters() })
  }

}

export default App;
