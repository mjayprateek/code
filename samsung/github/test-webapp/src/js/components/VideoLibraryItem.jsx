import React from 'react';

export default class VideoLibraryItem extends React.Component{

    constructor(props) {

        super(props);
    }

    componentDidMount() {
        console.log('VideoLibraryItem Mounted');
    }

    componentDidUpdate(prevProps, prevState) {
        console.log('VideoLibraryItem Updated');
    }

    handleClick(event){
        this.props.onSelectVideo(this.props.data);
    }

    render() {

        return (
            <li onClick={this.handleClick.bind(this)} className="video-item" style={{backgroundImage : 'url('+this.props.data.cover+')'}}>
                <h1>{this.props.data.title}</h1>
            </li>
        );
    }



}

