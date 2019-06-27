import React, { Component } from "react";

class PlayerBar extends Component {
  render() {
    return (
      <div className="player-bar">
        <div className="buttons">
          <button id="previous" onClick={this.props.handlePrevClick}>
            <span className="ion-skip-backward" />
          </button>
          <button id="play-pause" onClick={this.props.handleSongClick}>
            <span className={this.props.isPlaying ? "ion-pause" : "ion-play"} />
          </button>
          <button id="next" onClick={this.props.handleNextClick}>
            <span className="ion-skip-forward" />
          </button>
        </div>
        <section id="time-control">
          <div className="current-time">
            {this.props.formatTime(this.props.currentTime)}{" "}
          </div>
          <input
            type="range"
            className="seek-bar"
            value={this.props.currentTime / this.props.duration || 0}
            max="1"
            min="0"
            step="0.01"
            onChange={this.props.handleTimeChange}
            time="0"
          />
          <div className="total-time">
            {this.props.formatTime(this.props.duration)}
          </div>
        </section>
        <section id="volume-control">
          <button id="low" onClick={this.props.handlePrevClick}>
            <span className="icon ion-volume-low" />
          </button>
          <input
            type="range"
            className="seek-bar"
            value={this.props.volume}
            max="1"
            min="0"
            step="0.01"
            onChange={this.props.handleVolumeChange}
          />
          <span className="icon ion-volume-high" />
        </section>
      </div>
    );
  }
}

export default PlayerBar;
