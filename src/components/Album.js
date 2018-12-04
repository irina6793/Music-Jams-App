import React, { Component } from 'react';
import albumData from './../data/albums';
import styles from '../App.css';
import PlayerBar from './PlayerBar';

class Album extends Component {
  constructor(props) {
     super(props);

     const album = albumData.find( album => {
       return album.slug === this.props.match.params.slug
     });

     this.state = {
       album: album,
       currentSong: album.songs[0],
       currentTime: 0,
       duration: album.songs[0].duration,
       isPlaying: false,
       hover: true,
       newIndex: 0,
       volume: 0,
       mute: false,
       orientation: true,
       onChange: this.handleVolumeChange,
       vertical: true,


};

     this.audioElement = document.createElement('audio');
     this.audioElement.src = album.songs[0].audioSrc;
   }

   play() {
       this.audioElement.play();
       this.setState({ isPlaying: true });
     }

   pause() {
     this.audioElement.pause();
     this.setState({ isPlaying: false });
   }
   componentDidMount() {
     this.eventListeners = {
       timeupdate: e => {
         this.setState({ currentTime: this.audioElement.currentTime });
       },
       durationchange: e => {
         this.setState({ duration: this.audioElement.duration });
       }
     };
     this.audioElement.addEventListener('timeupdate', this.eventListeners.timeupdate);
     this.audioElement.addEventListener('durationchange', this.eventListeners.durationchange);
   }

   componentWillUnmount() {
     this.audioElement.src = null;
     this.audioElement.removeEventListener('timeupdate', this.eventListeners.timeupdate);
     this.audioElement.removeEventListener('durationchange', this.eventListeners.durationchange);
   }
  setSong(song) {
     this.audioElement.src = song.audioSrc;
     this.setState({ currentSong: song });

   }
   handleSongClick(song) {
     const isSameSong = this.state.currentSong === song;
     if (this.state.isPlaying && isSameSong) {
       this.pause();
     } else {
       if (!isSameSong) { this.setSong(song); }
       this.play();
     }
   }
   handlePrevClick() {
     const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
      const newIndex = Math.max(0, currentIndex - 1);
      const newSong = this.state.album.songs[newIndex];
      this.setSong(newSong);
      this.play();
       }
   handleNextClick() {
     const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
     const newIndex = Math.min(currentIndex + 1, this.state.album.songs.length - 1);
     const newSong = this.state.album.songs[newIndex];
     this.setSong(newSong);
     this.play();
     }

   handleTimeChange(e) {
    const newTime = this.audioElement.duration * e.target.value;
    this.audioElement.currentTime = newTime;
    this.setState({ currentTime: newTime });
  }

  handleVolumeChange(e) {
    const newVolume = e.target.value;
    this.audioElement.volume = newVolume;
    this.setState({currentVolume:newVolume })
    console.log("fired a volume change");
}

  formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    if (seconds < 10) {
      return minutes + ":" + 0 + seconds;
    }
    return minutes + ":" + seconds;
    }

   render() {
     return (
       <div>
       <section className="album">
         <section id="album-info">
         <img id="album-cover-art" src={this.state.album.albumCover} alt={this.state.album.title}/>
         <div className="album-details">
             <h1 id="album-title">{this.state.album.title}</h1>
             <h2 className="artist">{this.state.album.artist}</h2>
             <div id="release-info">{this.state.album.releaseInfo}</div>
           </div>
         </section>
         <table id="song-list">
          {
           this.state.album.songs.map((song, index) =>
          <tr className="song">
          <button className="play-pause">
             <td id="song-number" key={index} onClick={() => this.handleSongClick(song)} >
             {
               song === this.state.currentSong ?
                <span className={this.state.isPlaying ? 'ion-pause' : 'ion-play'}></span>
               :
                index + 1
             }
             </td>
          </button>
             <td id>{song.title}</td>
             <td id>{this.formatTime(song.duration)} </td>
         </tr>
         )
         }
           <colgroup>
            <col id="song-number-column" />
            <col id="song-title-column" />
            <col id="song-duration-column" />
          </colgroup>
        </table>
        <PlayerBar
                   isPlaying={this.state.isPlaying}
                   currentSong={this.state.currentSong}
                   currentTime={this.audioElement.currentTime}
                   duration={this.audioElement.duration}
                   handleSongClick={() => this.handleSongClick(this.state.currentSong)}
                   handlePrevClick={() => this.handlePrevClick()}
                   handleNextClick={() => this.handleNextClick()}
                   handleTimeChange={(e) => this.handleTimeChange(e)}
                   handleVolumeChange={(e) => this.handleVolumeChange(e)}
                   handleFormatTime={(e) => this.handleFormatTime(e)}
                   volume={this.state.currentVolume}
                   audio={this.audioElement.volume}
                   formatTime={this.formatTime}

        />
       </section>
    </div>
  )
}
}
 export default Album;
