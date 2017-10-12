import React from 'react';

export default class VideoPlayer extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            currentTime : 0
        };
        this.video = null;
        this.currentTime = 0;
        this.intervalCurrentTime = null;
    }

    componentDidMount() {
        console.log('VideoPlayer Mounted');
        this.video = document.getElementById('video');
        this.intervalCurrentTime = setInterval(function(){
            this.setState({currentTime:this.video.currentTime || 0});
        }.bind(this),1000);
    }

    componentWillUnmount(){
        clearTimeout(this.intervalCurrentTime);
    }

    onVideoClick(){
        if(this.video){
            if(this.video.paused){
                this.video.play();
            }else{
                this.video.pause();
            }
        }
    }

    onBackClick(){
        this.props.onBackClick();
    }

    onConnectionClick(){
        this.props.onConnectionClick();
    }

    onSeek(event){
        this.video.currentTime = document.getElementById('myinput').value;
        console.log(this.video.currentTime);
    }

    render() {

        var connectionIconClass = this.props.connected ? "icon connection connected" : "icon connection";

        return (
            <div className="video-player">
                <header>
                    <i className="icon back" onClick={this.onBackClick.bind(this)}></i>
                    <i className={connectionIconClass} onClick={this.onConnectionClick.bind(this)}></i>
                </header>
                <video id="video" autoPlay="true" onClick={this.onVideoClick.bind(this)}>
                    <source src={this.props.data.file} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                <footer>
                    <input id="myinput" type="range" name="points" defaultValue="0" onChange={this.onSeek.bind(this)} value={this.state.currentTime} min="0" max={this.props.data.duration}/>
                </footer>
            </div>
        );
    }
}

