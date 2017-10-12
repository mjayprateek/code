import React from 'react';
import VideoLibraryItem from './VideoLibraryItem.jsx';

export default class VideoLibrary extends React.Component{

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        console.log('VideoLibraryItem Mounted');
    }

    componentDidUpdate(prevProps, prevState) {
        console.log('VideoLibraryItem Updated');
    }

    onSelectVideo(item){
        this.props.onItemSelect(item);
    }

    render() {


        var self = this;
        var connectionIconClass = this.props.connected ? "icon connection connected" : "icon connection";

        return (
            <div className="video-library">
                <header className="user-background-color">
                    <h1>TrailMix</h1>
                    <i className={connectionIconClass} onClick={this.props.onConnectionClick.bind(this)}></i>
                </header>
                <ul>
                    {this.props.videos.map(function(video) {
                        return <VideoLibraryItem key={video.id} data={video} onSelectVideo={self.onSelectVideo.bind(self)}/>;
                    })}
                </ul>
            </div>
        );
    }

}

