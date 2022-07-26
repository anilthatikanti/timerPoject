// Write your code here
import {Component} from 'react'

import './index.css'

class DigitalTimer extends Component {
  state = {counter: 25, start: false, seconds: 0}

  componentWillUnmount = () => {
    clearInterval(this.timerId)
  }

  increaseCount = () => {
    const {start} = this.state
    if (!start) {
      this.setState(prevState => ({counter: prevState.counter + 1}))
    }
  }

  decreaseCount = () => {
    const {counter, start} = this.state
    if (counter > 1 && !start) {
      this.setState(prevState => ({counter: prevState.counter - 1}))
    }
  }

  timerStart = () => {
    this.timerId = setInterval(() => {
      this.setState(prevState => ({seconds: prevState.seconds + 1}))
    }, 1000)
    this.setState({start: true})
  }

  timerStop = () => {
    this.setState({start: false})
    clearInterval(this.timerId)
  }

  restartTimer = () => {
    clearInterval(this.timerId)
    this.setState({counter: 25, start: false, seconds: 0})
  }

  clearTime = () => {
    const {counter, seconds} = this.state
    if (counter * 60 === seconds) {
      clearInterval(this.timerId)
    }
  }

  render() {
    const {counter, start, seconds} = this.state
    const timeStatus = start ? 'Running' : 'Paused'
    const timerInSec = counter * 60 - seconds
    const Minutes = Math.floor(timerInSec / 60)
    const sec = Math.floor(timerInSec % 60)
    const MinutesShow = Minutes > 9 ? Minutes : `0${Minutes}`
    const secondsShow = sec > 9 ? sec : `0${sec}`
    this.clearTime()

    return (
      <div className="container">
        <h1>Digital Timer</h1>
        <div className="innerContainer">
          <div className="imageAdjust">
            <div className="timerBg">
              <div className="timeBg">
                <h1 className="timeShowing">
                  {MinutesShow}:{secondsShow}
                </h1>
                <p>{timeStatus}</p>
              </div>
            </div>
          </div>
          <div className="buttonsContainer">
            <div className="buttonArrange">
              <div>
                {start ? (
                  <button
                    type="button"
                    className="startContainer"
                    onClick={this.timerStop}
                  >
                    <img
                      className="buttonLogo"
                      id="start"
                      src="https://assets.ccbp.in/frontend/react-js/pause-icon-img.png"
                      alt="pause icon"
                    />
                    <span>Pause</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    className="startContainer"
                    onClick={this.timerStart}
                  >
                    <img
                      className="buttonLogo"
                      id="start"
                      src="https://assets.ccbp.in/frontend/react-js/play-icon-img.png"
                      alt="play icon"
                    />
                    <span>Start</span>
                  </button>
                )}
              </div>
              <div>
                <button
                  type="button"
                  className="startContainer"
                  onClick={this.restartTimer}
                >
                  <img
                    className="buttonLogo"
                    src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                    alt="reset icon"
                  />
                  <span>Reset</span>
                </button>
              </div>
            </div>
            <p className="setLimit">set timer limit</p>
            <div className="manipulationContainer">
              <button
                type="button"
                className="decreaseBtn"
                onClick={this.decreaseCount}
              >
                -
              </button>
              <div className="counterBg">
                <p>{counter}</p>
              </div>
              <button
                type="button"
                className="increaseBtn"
                onClick={this.increaseCount}
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default DigitalTimer
